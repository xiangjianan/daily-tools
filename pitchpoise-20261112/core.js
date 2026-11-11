/* PITCHPOISE core — pure DSP & music math, zero DOM.
 * UMD-ish: works as <script> in browser and require() in node tests. */
(function (root) {
  'use strict';

  var NOTE_NAMES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];

  /*midi -> frequency, with reference A4 (default 440) */
  function midiToFreq(midi, a4) {
    a4 = a4 || 440;
    return a4 * Math.pow(2, (midi - 69) / 12);
  }

  /* frequency -> {midi, name, octave, cents} : nearest note
   * cents: deviation from that note in [-50, +50] */
  function freqToNote(freq, a4) {
    a4 = a4 || 440;
    var exact = 69 + 12 * Math.log2(freq / a4);
    var midi = Math.round(exact);
    var cents = (exact - midi) * 100;
    var name = NOTE_NAMES[((midi % 12) + 12) % 12];
    var octave = Math.floor(midi / 12) - 1;
    return { midi: midi, name: name, octave: octave, cents: cents,
             label: name + octave, freq: freq };
  }

  /* RMS loudness of a Float32 frame */
  function rms(buf) {
    var sum = 0;
    for (var i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
    return Math.sqrt(sum / buf.length);
  }

  /* Autocorrelation pitch detector (ACF2+ / Chris Wilson lineage).
   * Returns {freq, clarity} or {freq: -1, clarity: 0} when unvoiced.
   * clarity: normalized correlation in [0,1] (~confidence). */
  function detectPitch(buf, sampleRate) {
    var SIZE = buf.length;
    var level = rms(buf);
    if (level < 0.008) return { freq: -1, clarity: 0, level: level };

    var c = new Array(SIZE);
    for (var lag = 0; lag < SIZE; lag++) {
      c[lag] = 0;
      for (var i = 0; i < SIZE - lag; i++) c[lag] += buf[i] * buf[i + lag];
    }
    /* find first dip below 0 then best peak after it */
    var d = 0; while (d < SIZE - 1 && c[d] > c[d + 1]) d++;
    var maxval = -1, maxpos = -1;
    for (var i2 = d; i2 < SIZE; i2++) {
      if (c[i2] > maxval) { maxval = c[i2]; maxpos = i2; }
    }
    var T0 = maxpos;
    if (T0 <= 0) return { freq: -1, clarity: 0, level: level };

    /* parabolic interpolation around the peak for sub-sample precision */
    var x1 = T0 > d ? c[T0 - 1] : maxval;
    var x3 = T0 < SIZE - 1 ? c[T0 + 1] : maxval;
    var denom = x1 + maxval * -2 + x3;
    var shift = denom !== 0 ? (0.5 * (x1 - x3)) / denom : 0;

    var clarity = maxval / (c[0] || 1);
    var freq = sampleRate / (T0 + shift);
    /* out of musical range -> unvoiced (human: ~E2 82Hz .. C6 1047Hz; allow wider) */
    if (freq < 60 || freq > 2000) return { freq: -1, clarity: clarity, level: level };
    return { freq: freq, clarity: clarity, level: level };
  }

  /* verdict string from cents deviation */
  function verdict(cents) {
    var a = Math.abs(cents);
    if (a <= 3) return 'perfect';
    if (a <= 8) return 'good';
    if (a <= 20) return 'close';
    if (a <= 40) return 'off';
    return 'wayoff';
  }

  /* shrink a raw pitch series to N points for the wobble canvas */
  function resample(series, n) {
    if (series.length === 0) return [];
    if (series.length <= n) return series.slice();
    var out = [];
    for (var i = 0; i < n; i++) {
      var idx = Math.floor(i * (series.length - 1) / (n - 1));
      out.push(series[idx]);
    }
    return out;
  }

  var api = {
    NOTE_NAMES: NOTE_NAMES,
    midiToFreq: midiToFreq,
    freqToNote: freqToNote,
    rms: rms,
    detectPitch: detectPitch,
    verdict: verdict,
    resample: resample
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.PitchCore = api;
})(typeof window !== 'undefined' ? window : globalThis);

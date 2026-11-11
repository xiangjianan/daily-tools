/* PITCHPOISE selftest — pure-core checks, run: node selftest.js */
'use strict';
var core = require('./core.js');
var passed = 0, failed = 0;
function eq(a, b, msg, tol) {
  var ok;
  if (typeof a === 'string' || typeof b === 'string') ok = a === b;
  else ok = typeof tol === 'number' ? Math.abs(a - b) <= tol : a === b;
  if (ok) { passed++; } else { failed++; console.log('FAIL', msg, 'got', a, 'want', b); }
}
function ok(v, msg) { if (v) { passed++; } else { failed++; console.log('FAIL', msg); } }

var SR = 44100;

/* --- synth helper: sine with slight vibrato + soft envelope --- */
function sine(freq, seconds, opts) {
  opts = opts || {};
  var n = Math.floor(SR * seconds), buf = new Float32Array(n);
  var vibCents = opts.vibratoCents || 0;
  for (var i = 0; i < n; i++) {
    var t = i / SR;
    var f = freq * Math.pow(2, (vibCents * Math.sin(2 * Math.PI * (opts.vibratoHz || 5) * t)) / 1200);
    var env = Math.min(1, i / 800, (n - i) / 800);
    buf[i] = 0.5 * env * Math.sin(2 * Math.PI * f * t + (opts.phase || 0));
  }
  return buf;
}

/* 1. freqToNote basics */
var a4 = core.freqToNote(440, 440);
eq(a4.midi, 69, 'A4 midi', 0.01); eq(a4.cents, 0, 'A4 cents', 0.01);
eq(a4.label, 'A4', 'A4 label');
var c4 = core.freqToNote(261.626, 440);
eq(c4.label, 'C4', 'C4 label', 0.2);
var sharp = core.freqToNote(466.16, 440);
eq(sharp.name, 'A♯', 'A# name');
/* +25 cents above A4 should still be A4 with cents≈+25 */
var above = core.freqToNote(440 * Math.pow(2, 25 / 1200), 440);
eq(above.name, 'A', 'quarter-sharp stays A'); eq(above.cents, 25, 'quarter-sharp cents', 1);
/* custom A4 ref: 435Hz ref makes 440 read +19.8c sharp */
var with435 = core.freqToNote(440, 435);
ok(with435.cents > 15 && with435.cents < 25, 'custom A4 ref shifts cents, got ' + with435.cents);

/* 2. detectPitch: clean sines across range */
var cases = [[82.41, 'E2'], [110, 'A2'], [220, 'A3'], [261.63, 'C4'], [440, 'A4'], [523.25, 'C5'], [1046.5, 'C6']];
cases.forEach(function (cs) {
  var r = core.detectPitch(sine(cs[0], 0.25), SR);
  var note = core.freqToNote(r.freq, 440);
  eq(note.label, cs[1], 'detect ' + cs[1] + ' label', 0);
  ok(Math.abs(r.freq - cs[0]) < cs[0] * 0.02, 'detect ' + cs[1] + ' freq 2%, got ' + r.freq.toFixed(2));
  ok(r.clarity > 0.9, 'detect ' + cs[1] + ' clarity high, got ' + r.clarity.toFixed(3));
});

/* 3. silence & noise -> unvoiced */
var sil = core.detectPitch(new Float32Array(2048), SR);
eq(sil.freq, -1, 'silence unvoiced');
var noisy = new Float32Array(2048);
for (var i = 0; i < noisy.length; i++) noisy[i] = (Math.random() * 2 - 1) * 0.1;
var rn = core.detectPitch(noisy, SR);
ok(rn.freq === -1 || rn.clarity < 0.9, 'white noise rejected (freq ' + rn.freq + ' clarity ' + rn.clarity.toFixed(2) + ')');

/* 4. out-of-range freq ignored */
var infra = new Float32Array(2048);
for (var j = 0; j < infra.length; j++) infra[j] = 0.5 * Math.sin(2 * Math.PI * 30 * j / SR);
eq(core.detectPitch(infra, SR).freq, -1, '30Hz out of range -> unvoiced');

/* 5. vibrato still tracks center */
var vib = core.detectPitch(sine(440, 0.3, { vibratoCents: 20, vibratoHz: 6 }), SR);
ok(Math.abs(vib.freq - 440) < 8, 'vibrato sine centered near 440, got ' + vib.freq.toFixed(1));

/* 6. verdict ladder */
eq(core.verdict(0), 'perfect', 'verdict 0'); eq(core.verdict(3), 'perfect', 'verdict 3');
eq(core.verdict(-7), 'good', 'verdict -7'); eq(core.verdict(15), 'close', 'verdict 15');
eq(core.verdict(-35), 'off', 'verdict -35'); eq(core.verdict(45), 'wayoff', 'verdict 45');

/* 7. resample */
var seq = []; for (var k = 0; k < 1000; k++) seq.push(k);
eq(core.resample(seq, 120).length, 120, 'resample length');
eq(core.resample(seq, 120)[0], 0, 'resample keeps head');
eq(core.resample(seq, 120)[119], 999, 'resample keeps tail');
eq(core.resample([], 10).length, 0, 'resample empty');
eq(core.resample([3, 4], 10).length, 2, 'resample passthrough short');

/* 8. round-trip: detected freq -> note -> midi freq matches original within cents tol */
var r2 = core.detectPitch(sine(329.63, 0.3), SR); /* E4 */
var n2 = core.freqToNote(r2.freq, 440);
eq(n2.label, 'E4', 'roundtrip E4');
eq(core.midiToFreq(n2.midi, 440), 329.628, 'midiToFreq E4', 0.5);

console.log('PITCHPOISE selftest: ' + passed + ' passed, ' + failed + ' failed');
process.exit(failed ? 1 : 0);

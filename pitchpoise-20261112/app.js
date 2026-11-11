/* PITCHPOISE UI — mic capture, gauge & wobble rendering, challenge logic. */
'use strict';
(function () {
  var C = window.PitchCore;

  var els = {
    startBtn: document.getElementById('startBtn'),
    stopBtn: document.getElementById('stopBtn'),
    toneBtn: document.getElementById('toneBtn'),
    copyBtn: document.getElementById('copyBtn'),
    a4range: document.getElementById('a4range'),
    a4val: document.getElementById('a4val'),
    status: document.getElementById('status'),
    bigNote: document.getElementById('bigNote'),
    centsLine: document.getElementById('centsLine'),
    hzLine: document.getElementById('hzLine'),
    gauge: document.getElementById('gauge'),
    wobble: document.getElementById('wobble'),
    curBox: document.getElementById('curBox'),
    bestBox: document.getElementById('bestBox'),
    badgeBox: document.getElementById('badgeBox'),
    tape: document.getElementById('tape')
  };

  var state = {
    running: false,
    audioCtx: null,
    stream: null,
    analyser: null,
    buf: null,
    sampleRate: 44100,
    a4: 440,
    /* smoothed display values */
    cents: 0,
    noteLabel: '',
    hasPitch: false,
    /* wobble series: {t, cents} recent */
    series: [],
    lastSampleT: 0,
    /* challenge */
    holdStart: 0,
    holdSec: 0,
    bestSec: 0,
    badge: '🥚',
    badgeNote: '',
    /* history */
    history: [],
    lastHistoryNote: '',
    lastHistoryT: 0,
    /* debug hook for headless smoke tests */
    debug: { frames: 0, lastFreq: 0, lastNote: '', lastErr: '' }
  };

  /* ---------- status ---------- */
  function setStatus(msg, cls) {
    els.status.textContent = msg;
    els.status.className = 'status' + (cls ? ' ' + cls : '');
  }

  /* ---------- canvas helpers (HiDPI aware) ---------- */
  function fitCanvas(cv) {
    var dpr = window.devicePixelRatio || 1;
    var w = cv.clientWidth, h = cv.clientHeight;
    if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) {
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
    }
    var ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, w: w, h: h };
  }

  var VERDICT_COLORS = {
    perfect: '#4ad991', good: '#4ad991', close: '#ffb35c',
    off: '#ff6b6b', wayoff: '#ff6b6b'
  };

  /* ---------- gauge ---------- */
  function drawGauge() {
    var g = fitCanvas(els.gauge);
    var ctx = g.ctx, W = g.w, H = g.h;
    ctx.clearRect(0, 0, W, H);

    var cx = W / 2, cy = H * 0.78, R = Math.min(W * 0.42, H * 0.72);
    var A_LEFT = Math.PI * 1.02, A_RIGHT = Math.PI * -0.02; /* -50c .. +50c */

    function angleOf(cents) {
      var t = (Math.max(-50, Math.min(50, cents)) + 50) / 100;
      return A_LEFT + t * (A_RIGHT - A_LEFT);
    }

    /* arc track */
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#2a3440';
    ctx.beginPath();
    ctx.arc(cx, cy, R, A_LEFT, A_RIGHT);
    ctx.stroke();

    /* ±5c target zone */
    ctx.lineWidth = 14;
    ctx.strokeStyle = 'rgba(74,217,145,.55)';
    ctx.beginPath();
    ctx.arc(cx, cy, R, angleOf(-5), angleOf(5));
    ctx.stroke();

    /* ticks every 10c */
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#556372';
    ctx.fillStyle = '#8b98a5';
    ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'center';
    for (var c = -50; c <= 50; c += 10) {
      var a = angleOf(c), long = c % 50 === 0;
      var r1 = R - (long ? 24 : 14), r2 = R - 6;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
      ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
      ctx.stroke();
      ctx.fillText((c > 0 ? '+' : '') + c, cx + Math.cos(a) * (R - 38), cy + Math.sin(a) * (R - 38) + 4);
    }

    /* needle */
    if (state.hasPitch) {
      var vc = C.verdict(state.cents);
      var col = VERDICT_COLORS[vc];
      var na = angleOf(state.cents);
      ctx.lineWidth = 4;
      ctx.strokeStyle = col;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(na) * (R - 20), cy + Math.sin(na) * (R - 20));
      ctx.stroke();
      /* hub */
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fill();
      /* note color */
      els.bigNote.style.color = col;
      els.centsLine.style.color = col;
    } else {
      els.bigNote.style.color = '';
      els.centsLine.style.color = '';
    }
  }

  /* ---------- wobble trace ---------- */
  function drawWobble() {
    var g = fitCanvas(els.wobble);
    var ctx = g.ctx, W = g.w, H = g.h;
    ctx.clearRect(0, 0, W, H);

    var M = 8;
    function yOf(cents) {
      var t = (Math.max(-50, Math.min(50, cents)) + 50) / 100;
      return M + t * (H - 2 * M);
    }

    /* zero + target band */
    ctx.fillStyle = 'rgba(74,217,145,.14)';
    ctx.fillRect(0, yOf(-5), W, yOf(5) - yOf(-5));
    ctx.strokeStyle = '#2a3440';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, yOf(0)); ctx.lineTo(W, yOf(0));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#8b98a5';
    ctx.font = '11px system-ui';
    ctx.fillText('±0', 4, yOf(0) - 3);
    ctx.fillText('+50¢', 4, yOf(50) - 3);
    ctx.fillText('−50¢', 4, yOf(-50) + 11);

    /* series */
    var pts = state.series;
    if (pts.length > 1) {
      var t0 = pts[0].t, t1 = Math.max(pts[pts.length - 1].t, t0 + 0.001);
      var span = Math.max(t1 - t0, 4); /* hold at least 4s of context */
      ctx.strokeStyle = '#ffd166';
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      ctx.beginPath();
      var broke = false;
      for (var i = 0; i < pts.length; i++) {
        var x = (pts[i].t - t1 + span) / span * W;
        if (pts[i].gap) { broke = true; continue; }
        var y = yOf(pts[i].cents);
        if (broke || i === 0 || (pts[i - 1] && pts[i - 1].gap)) { ctx.moveTo(x, y); broke = false; }
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      /* live dot */
      var last = pts[pts.length - 1];
      if (!last.gap) {
        var lx = (last.t - t1 + span) / span * W, ly = yOf(last.cents);
        ctx.fillStyle = '#ffd166';
        ctx.beginPath();
        ctx.arc(lx, ly, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      ctx.fillStyle = '#8b98a5';
      ctx.font = '12px system-ui';
      ctx.fillText(state.running ? '听不到声音 —— 靠近一点或换个安静的地方' : '开启麦克风后这里会画出你的音高轨迹', 10, H / 2);
    }
  }

  /* ---------- challenge & history ---------- */
  var NOW = function () { return performance.now() / 1000; };

  function updateChallenge(pitchOk, cents) {
    var t = NOW();
    if (pitchOk && Math.abs(cents) <= 5) {
      if (!state.holdStart) state.holdStart = t;
      state.holdSec = t - state.holdStart;
      if (state.holdSec > state.bestSec) state.bestSec = state.holdSec;
      /* badge ladder */
      var newBadge = state.badge;
      if (state.bestSec >= 5) newBadge = '🏅';
      else if (state.bestSec >= 3) newBadge = '🎯';
      else if (state.bestSec >= 1.5) newBadge = '🌱';
      if (newBadge !== state.badge) {
        state.badge = newBadge;
        els.badgeBox.classList.add('hot');
        setTimeout(function () { els.badgeBox.classList.remove('hot'); }, 800);
      }
    } else {
      state.holdStart = 0;
      state.holdSec = 0;
    }
    els.curBox.querySelector('b').firstChild.nodeValue = state.holdSec.toFixed(1);
    els.bestBox.querySelector('b').firstChild.nodeValue = state.bestSec.toFixed(1);
    els.badgeBox.querySelector('.badge').textContent = state.badge;
  }

  function pushHistory(note, cents) {
    var t = NOW();
    /* dedupe: same note within 1.5s just updates its chip */
    if (note === state.lastHistoryNote && t - state.lastHistoryT < 1.5 && state.history.length) {
      state.lastHistoryT = t;
      var chip = state.history[state.history.length - 1];
      chip.cents = cents;
      chip.el.querySelector('small').textContent = fmtCents(cents);
      return;
    }
    if (state.history.length === 0) els.tape.innerHTML = '';
    var el = document.createElement('div');
    el.className = 'chip';
    el.innerHTML = '<b>' + note + '</b><small></small>';
    el.querySelector('small').textContent = fmtCents(cents);
    els.tape.appendChild(el);
    state.history.push({ note: note, cents: cents, el: el });
    state.lastHistoryNote = note;
    state.lastHistoryT = t;
    while (state.history.length > 12) {
      var old = state.history.shift();
      old.el.remove();
    }
  }

  function fmtCents(c) {
    var v = Math.round(c);
    return (v > 0 ? '+' : '') + v + '¢';
  }

  /* ---------- mic pipeline ---------- */
  function onFrame() {
    if (!state.running) return;
    state.analyser.getFloatTimeDomainData(state.buf);
    state.debug.frames++;
    var r = C.detectPitch(state.buf, state.sampleRate);
    var t = NOW();
    var pitchOk = r.freq > 0;

    if (pitchOk) {
      var note = C.freqToNote(r.freq, state.a4);
      /* smoothing: gentle EMA on cents to calm the needle */
      var smooth = state.hasPitch ? state.cents * 0.55 + note.cents * 0.45 : note.cents;
      state.cents = smooth;
      state.noteLabel = note.label;
      state.hasPitch = true;
      state.debug.lastFreq = r.freq;
      state.debug.lastNote = note.label;
      els.bigNote.textContent = note.label;
      els.bigNote.classList.add('active');
      els.centsLine.textContent = fmtCents(smooth) + ' · ' + verdictZh(C.verdict(smooth));
      els.hzLine.textContent = Math.round(r.freq) + ' Hz';
      state.series.push({ t: t, cents: smooth });
      state.lastSampleT = t;
      updateChallenge(true, smooth);
      pushHistory(note.label, smooth);
    } else {
      /* gap: only mark if we've been silent a while */
      if (t - state.lastSampleT > 0.25 && state.series.length) {
        state.series.push({ t: t, cents: 0, gap: true });
        state.lastSampleT = t;
      }
      if (state.series.length && state.series.length > 600) state.series.shift();
      state.hasPitch = false;
      els.bigNote.textContent = '–';
      els.bigNote.classList.remove('active');
      els.centsLine.textContent = '…在听';
      els.hzLine.textContent = '';
      updateChallenge(false, 0);
    }
    if (state.series.length > 900) state.series.splice(0, state.series.length - 900);

    drawGauge();
    drawWobble();
    requestAnimationFrame(onFrame);
  }

  function verdictZh(v) {
    return { perfect: '完美', good: '很稳', close: '接近', off: '偏低/偏高', wayoff: '差远了' }[v] || '';
  }

  function start() {
    if (state.running) return;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setStatus('这个浏览器/环境不支持麦克风采集（需要 HTTPS 或 localhost）。', 'err');
      return;
    }
    setStatus('正在请求麦克风权限…');
    navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false }
    }).then(function (stream) {
      state.stream = stream;
      var Ctx = window.AudioContext || window.webkitAudioContext;
      state.audioCtx = new Ctx();
      state.sampleRate = state.audioCtx.sampleRate;
      var src = state.audioCtx.createMediaStreamSource(stream);
      var analyser = state.audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      state.analyser = analyser;
      state.buf = new Float32Array(analyser.fftSize);
      src.connect(analyser);
      state.running = true;
      els.startBtn.disabled = true;
      els.stopBtn.disabled = false;
      setStatus('就绪 —— 哼一个音试试，比如 "mmm~"', 'ok');
      requestAnimationFrame(onFrame);
    }).catch(function (err) {
      state.debug.lastErr = err && err.name;
      var zh = {
        NotAllowedError: '麦克风权限被拒绝。请在浏览器地址栏的权限设置里允许，然后重试。',
        NotFoundError: '没有找到可用的麦克风设备。',
        NotReadableError: '麦克风被其他程序占用了，关掉再试。'
      };
      setStatus(zh[err && err.name] || ('麦克风打开失败：' + (err && err.message || err)), 'err');
    });
  }

  function stop() {
    if (!state.running) return;
    state.running = false;
    if (state.stream) state.stream.getTracks().forEach(function (t) { t.stop(); });
    if (state.audioCtx) state.audioCtx.close();
    state.stream = null;
    state.audioCtx = null;
    state.series = [];
    state.hasPitch = false;
    els.startBtn.disabled = false;
    els.stopBtn.disabled = true;
    els.bigNote.textContent = '–';
    els.centsLine.textContent = '已停止';
    els.hzLine.textContent = '';
    setStatus('已停止。再来一次点上方按钮。');
    drawGauge();
    drawWobble();
  }

  /* ---------- reference tone ---------- */
  var toneOsc = null;
  function playTone() {
    if (!state.audioCtx) {
      var Ctx2 = window.AudioContext || window.webkitAudioContext;
      state.audioCtx = new Ctx2();
    }
    var ctx = state.audioCtx;
    if (ctx.state === 'suspended') ctx.resume();
    if (toneOsc) return; /* already playing */
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.frequency.value = state.a4;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.25, ctx.currentTime + 1.2);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    toneOsc = osc;
    els.toneBtn.disabled = true;
    osc.onended = function () { toneOsc = null; els.toneBtn.disabled = false; };
    osc.stop(ctx.currentTime + 1.5);
  }

  /* ---------- report ---------- */
  function copyReport() {
    var lines = ['PITCHPOISE 音准报告 ' + new Date().toLocaleString('zh-CN')];
    if (state.bestSec > 0) lines.push('定音挑战：最长稳住 ' + state.bestSec.toFixed(1) + ' 秒（±5¢），成就 ' + state.badge);
    if (state.history.length) {
      lines.push('音符纸带：' + state.history.map(function (h) {
        return h.note + ' ' + fmtCents(h.cents);
      }).join('  '));
    } else {
      lines.push('（还没有检测到音符）');
    }
    lines.push('A4 = ' + state.a4 + ' Hz · 声音从未离开你的设备');
    var text = lines.join('\n');
    function flash(okFlag) {
      setStatus(okFlag ? '报告已复制 ✓' : '复制失败，浏览器不支持剪贴板', okFlag ? 'ok' : 'err');
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { flash(true); }, function () { flash(false); });
    } else {
      var ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand('copy');
      ta.remove();
      flash(ok);
    }
  }

  /* ---------- events ---------- */
  els.startBtn.addEventListener('click', start);
  els.stopBtn.addEventListener('click', stop);
  els.toneBtn.addEventListener('click', playTone);
  els.copyBtn.addEventListener('click', copyReport);
  els.a4range.addEventListener('input', function () {
    state.a4 = parseInt(els.a4range.value, 10);
    els.a4val.textContent = String(state.a4);
  });

  window.addEventListener('resize', function () {
    drawGauge();
    drawWobble();
  });

  /* debug hook for headless smoke tests */
  window.__pp = state;
  window.addEventListener('error', function (ev) {
    state.debug.lastErr = String(ev.message || 'error');
  });
  /* automated-testing only: ?autostart=1 triggers the same getUserMedia
   * flow as clicking the button (permission prompt still applies). */
  try {
    if (new URLSearchParams(location.search).has('autostart')) {
      els.startBtn.click();
    }
  } catch (e) { /* ignore */ }
  /* smoke mode (?smoke=1): report pipeline result to console after 4.5s */
  try {
    if (new URLSearchParams(location.search).has('smoke')) {
      setTimeout(function () {
        console.log('SMOKE ' + JSON.stringify({
          wd: !!navigator.webdriver,
          hasMD: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
          status: els.status.textContent,
          startDisabled: els.startBtn.disabled,
          running: state.running,
          frames: state.debug.frames,
          lastFreq: Math.round(state.debug.lastFreq),
          lastNote: state.debug.lastNote,
          series: state.series.length,
          histNote: state.history.length ? state.history[state.history.length - 1].note : '',
          holdSec: +state.holdSec.toFixed(2),
          bestSec: +state.bestSec.toFixed(2),
          err: state.debug.lastErr
        }));
      }, 4500);
    }
  } catch (e) { /* ignore */ }

  drawGauge();
  drawWobble();
})();

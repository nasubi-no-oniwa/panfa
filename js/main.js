// =============================================
//  盤滑（パンファ）  画面と操作
// =============================================
(function () {
  const $ = id => document.getElementById(id);
  const cv = $('board'), g = cv.getContext('2d');
  const INK = '#3b2a20', GOLD = '#f5b800', FELT = '#2f9e6b', FELT2 = '#2a9163', BLACK = '#2b2f3a', WHITE = '#ffffff';
  let game = null, N = 6, mode = 'cpu', level = 'normal', sizeN = 6;
  let room = null, watch = false, myColor = 1, bot = 1, blackSlot = 0, queue = [], sentAt = -1, names = { 1: 'あなた', 2: 'CPU' }, leftNote = '';
  const LV = { easy: 'よわい', normal: 'ふつう', hard: 'つよい' };
  function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const colorOf = slot => (slot === blackSlot ? 1 : 2);
  let cs = 50, M = 40, dpr = 1;             // マスの大きさ、まわりの余白
  let phase = 'idle', anim = null, peek = false, cpuAt = 0, hover = -1;
  // phase: idle（入力待ち）/ flip（裏返し中）/ warn（すべる合図）/ slide（すべり中）/ over

  function show(id) { document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === id)); }
  function toast(t, ms = 1300) { const el = $('toast'); el.textContent = t; el.classList.add('show'); clearTimeout(toast.tm); toast.tm = setTimeout(() => el.classList.remove('show'), ms); }

  // ---------- 音 ----------
  let actx = null;
  function beep(f, d, type = 'triangle', v = 0.07, delay = 0, f2) {
    try {
      if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === 'suspended') actx.resume();
      const t = actx.currentTime + delay, o = actx.createOscillator(), gn = actx.createGain();
      o.type = type; o.frequency.setValueAtTime(f, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d);
      gn.gain.setValueAtTime(v, t); gn.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(gn); gn.connect(actx.destination); o.start(t); o.stop(t + d + 0.02);
    } catch (e) {}
  }
  const snd = {
    place: () => beep(330, 0.09, 'triangle', 0.09, 0, 220), flip: k => beep(520 + k * 40, 0.06, 'sine', 0.05, 0.08 + k * 0.045),
    warn: () => [880, 880].forEach((f, i) => beep(f, 0.09, 'square', 0.05, i * 0.16)), slide: () => beep(200, 0.5, 'sawtooth', 0.06, 0, 520),
    no: () => beep(180, 0.12, 'square', 0.05), pass: () => beep(300, 0.2, 'sine', 0.06, 0, 200),
    win: () => [523, 659, 784, 1047].forEach((f, i) => beep(f, 0.22, 'triangle', 0.08, i * 0.11)), lose: () => [392, 330, 262].forEach((f, i) => beep(f, 0.3, 'triangle', 0.08, i * 0.16))
  };

  // ---------- 大きさ ----------
  function layout() {
    const wrap = cv.parentElement, w = Math.min(wrap.clientWidth, 620), h = wrap.clientHeight;
    cs = Math.max(26, Math.floor(Math.min(w, h) / (N + 1.9)));
    M = Math.round(cs * 0.95);
    const S = cs * N + M * 2;
    dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    cv.width = S * dpr; cv.height = S * dpr; cv.style.width = S + 'px'; cv.style.height = S + 'px';
  }
  window.addEventListener('resize', () => { if (game) layout(); });

  // ---------- はじめる ----------
  document.querySelectorAll('#seg-size .seg-btn').forEach(b => b.onclick = () => { sizeN = +b.dataset.n; document.querySelectorAll('#seg-size .seg-btn').forEach(x => x.classList.toggle('on', x === b)); });
  // o：あいことば対戦のときだけ { seed, n, names }
  function start(md, lv, o) {
    o = o || {}; mode = md; level = lv || level; N = o.n || sizeN;
    game = new SR.Game(N, o.seed != null ? mulberry(o.seed) : undefined);
    if (md !== 'online') { leaveRoom(); queue = []; }
    bot = md === 'online' && !watch ? myColor : 1;
    names = o.names || (md === 'cpu' ? { 1: 'あなた', 2: 'CPU（' + LV[level] + '）' } : { 1: 'くろ', 2: 'しろ' });
    $('nameB').textContent = names[bot]; $('nameB').className = 'who p' + bot;
    $('nameT').textContent = names[3 - bot]; $('nameT').className = 'who p' + (3 - bot);
    sentAt = -1; leftNote = '';
    phase = 'idle'; anim = null; peek = false; hover = -1; cpuAt = performance.now() + 900;
    $('ov-result').classList.remove('show'); $('ov-online').classList.remove('show'); show('game'); layout(); hud();
  }
  function leaveRoom() { if (room) { room.leave(); room = null; } watch = false; document.body.classList.remove('watching'); $('watchers').textContent = ''; }
  function toTitle() { leaveRoom(); game = null; mode = 'cpu'; $('ov-result').classList.remove('show'); show('title'); }
  document.querySelectorAll('.btn.lv').forEach(b => b.onclick = () => start('cpu', b.dataset.level));
  $('btn-two').onclick = () => start('two');
  $('btn-again').onclick = () => {
    if (mode !== 'online') return start(mode, level);
    if (watch || !room) return;
    room.rematch(); $('btn-again').disabled = true; $('again-msg').textContent = 'あいての「もう一回」を待っています…';
  };
  $('btn-title').onclick = toTitle;
  $('btn-quit').onclick = toTitle;
  $('btn-howto').onclick = () => $('ov-howto').classList.add('show');
  $('btn-howto-close').onclick = () => $('ov-howto').classList.remove('show');
  const pk = $('btn-peek');
  const setPeek = v => { peek = v; pk.classList.toggle('on', v); };
  pk.addEventListener('pointerdown', e => { e.preventDefault(); setPeek(true); try { pk.setPointerCapture(e.pointerId); } catch (er) {} });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(n => pk.addEventListener(n, () => setPeek(false)));

  const isHuman = p => mode === 'two' || (mode === 'online' ? !watch && p === myColor : p === 1);
  function hud() {
    const c = SR.count(game.b); $('cntB').textContent = c[bot - 1]; $('cntT').textContent = c[2 - bot];
    $('nameB').classList.toggle('now', !game.over && game.turn === bot); $('nameT').classList.toggle('now', !game.over && game.turn !== bot);
    const st = $('status'), u = game.untilSlide();
    if (game.over) { st.textContent = 'おしまい'; st.className = 'status'; return; }
    const who = mode === 'cpu' ? (game.turn === 1 ? 'あなたの番' : 'CPUの番') : mode === 'online' ? (!watch && game.turn === myColor ? 'あなたの番' : names[game.turn] + 'の番') : (game.turn === 1 ? 'くろの番' : 'しろの番');
    st.textContent = phase === 'slide' || phase === 'warn' ? 'すべる！' : u === 1 ? who + '／この1手のあと、すべる！' : who + '／あと' + u + '手ですべる';
    st.className = 'status' + (u === 1 || phase === 'slide' || phase === 'warn' ? ' soon' : '');
  }

  // ---------- 操作 ----------
  function cellAt(e) {
    const r = cv.getBoundingClientRect(), x = Math.floor((e.clientX - r.left - M) / cs), y = Math.floor((e.clientY - r.top - M) / cs);
    return x >= 0 && x < N && y >= 0 && y < N ? y * N + x : -1;
  }
  cv.addEventListener('pointermove', e => { if (game && e.pointerType === 'mouse') hover = cellAt(e); });
  cv.addEventListener('pointerleave', () => { hover = -1; });
  cv.addEventListener('pointerdown', e => {
    if (!game || game.over || phase !== 'idle' || peek) return;
    e.preventDefault();
    if (!isHuman(game.turn)) return;
    const i = cellAt(e); if (i < 0) return;
    if (!SR.flipsFor(game.b, N, i, game.turn)) { if (!game.b[i]) { snd.no(); toast('そこには置けません'); } return; }
    if (mode === 'online') { // 手は送って、もどってきたものを打つ（2人と観戦者で順番がずれないように）
      if (sentAt === game.moves) return;
      sentAt = game.moves; room.sendMove(i, game.moves); beep(440, 0.04, 'triangle', 0.04); return;
    }
    move(i);
  });
  function move(i) {
    const p = game.turn, before = game.b.slice(), f = game.place(i); if (!f) return;
    snd.place(); f.forEach((_, k) => snd.flip(Math.min(k, 8)));
    anim = { t: 0, dur: 0.42 + Math.min(f.length, 8) * 0.045, placed: i, flips: f, p, before };
    phase = 'flip'; hud();
  }
  function afterFlip() {
    if (game.slideDue()) { phase = 'warn'; anim = { t: 0, dur: 0.55 }; snd.warn(); hud(); return; }
    nextTurn();
  }
  function startSlide() {
    const before = game.b.slice(), s = game.doSlide();
    phase = 'slide'; anim = { t: 0, dur: 0.7, s, before }; snd.slide(); hud();
  }
  function nextTurn() {
    const r = game.advance(); anim = null;
    if (r.over) { phase = 'over'; hud(); return setTimeout(result, 700); }
    if (r.pass) { snd.pass(); toast((mode === 'cpu' ? (r.passed === 1 ? 'あなた' : 'CPU') : names[r.passed]) + 'は置けないのでパス', 1600); }
    phase = 'idle'; cpuAt = performance.now() + (r.pass ? 1500 : 650); hud();
  }
  function result() {
    if (!game) return;
    const c = SR.count(game.b), w = game.winner, t = $('res-title');
    const mine = mode === 'cpu' ? 1 : mode === 'online' && !watch ? myColor : 0;   // 0＝どちらの味方でもない
    if (mine) { t.textContent = w === mine ? 'かち！' : w === 0 ? 'ひきわけ' : 'まけ…'; t.className = w === mine ? 'win' : 'lose'; }
    else { t.textContent = w === 0 ? 'ひきわけ' : names[w] + 'のかち！'; t.className = 'win'; }
    t.classList.toggle('small', t.textContent.length > 6);
    $('res-sub').textContent = `${names[bot]} ${c[bot - 1]} － ${c[2 - bot]} ${names[3 - bot]}` + (leftNote ? '\n' + leftNote : '');
    const ag = $('btn-again'); ag.disabled = false; ag.hidden = mode === 'online' && (watch || !!leftNote);
    $('again-msg').textContent = mode === 'online' && watch ? '次の試合が始まるのを待っています…' : '';
    $('ov-result').classList.add('show'); (mine && w !== mine && w !== 0) ? snd.lose() : snd.win();
  }

  // ---------- あいことば対戦 ----------
  function loadScript(src) {
    return new Promise((res, rej) => { const el = document.createElement('script'); el.src = src; el.onload = res; el.onerror = () => rej(new Error('通信できませんでした。電波のよいところでもう一度ためしてください')); document.head.appendChild(el); });
  }
  async function getDb() {
    if (SR._db) return SR._db;
    if (!SR.FIREBASE_CONFIG) throw new Error('オンライン対戦はまだ準備中です');
    const v = '10.12.2';
    await loadScript('https://www.gstatic.com/firebasejs/' + v + '/firebase-app-compat.js');
    await loadScript('https://www.gstatic.com/firebasejs/' + v + '/firebase-database-compat.js');
    if (!firebase.apps.length) firebase.initializeApp(SR.FIREBASE_CONFIG);
    return SR._db = firebase.database();
  }
  const lobby = wait => { $('online-form').hidden = wait; $('online-wait').hidden = !wait; };
  function openOnline(code) {
    lobby(false); $('online-err').textContent = '';
    try { $('in-name').value = localStorage.getItem('panfa-name') || ''; } catch (e) {}
    if (code) $('in-code').value = code;
    $('ov-online').classList.add('show');
  }
  $('btn-online').onclick = () => openOnline();
  $('btn-online-close').onclick = () => { leaveRoom(); $('ov-online').classList.remove('show'); };
  $('btn-copy').onclick = async () => {
    const url = location.origin + location.pathname + '?room=' + encodeURIComponent(room ? room.code : '');
    try { await navigator.clipboard.writeText(url); $('btn-copy').textContent = 'コピーしました！'; } catch (e) { prompt('このリンクを送ってください', url); }
    setTimeout(() => { $('btn-copy').textContent = 'さそうリンクをコピー'; }, 2000);
  };
  $('btn-join').onclick = joinOnline;
  $('in-code').addEventListener('keydown', e => { if (e.key === 'Enter') joinOnline(); });
  async function joinOnline() {
    const code = SR.cleanCode($('in-code').value), name = $('in-name').value.trim().slice(0, 8) || 'ななし';
    if (!code) { $('online-err').textContent = 'あいことばを入れてください（. # $ / [ ] は使えません）'; return; }
    try { localStorage.setItem('panfa-name', name); } catch (e) {}
    $('online-err').textContent = ''; $('btn-join').disabled = true; $('btn-join').textContent = 'つないでいます…';
    try {
      const db = await getDb();
      leaveRoom();
      const r = new SR.OnlineRoom(db, code, name, {
        onPeople: p => {
          if (room !== r) return;
          $('watchers').textContent = p.watchers ? '👀' + p.watchers : '';
          if (r.slot >= 0 && !p.names[1 - r.slot]) $('wait-msg').textContent = 'あいてを待っています…';
          if (r.slot >= 0 && !p.names[1 - r.slot] && game && game.over && mode === 'online') { $('btn-again').hidden = true; $('again-msg').textContent = 'あいてが退室しました'; }
        },
        onStart: g => { if (room === r) onlineStart(g); },
        onMove: m => { if (room === r && m) queue.push(m); },
        onResult: v => { // 相手がいなくなった
          if (room !== r || !game || game.over || mode !== 'online') return;
          game.over = true; game.winner = colorOf(1 - v.loser); leftNote = 'あいてが退室しました';
          phase = 'over'; anim = null; hud(); result();
        }
      });
      r.size = sizeN; room = r;
      await r.join();
      watch = r.slot < 0; document.body.classList.toggle('watching', watch);
      $('wait-code').textContent = r.code;
      $('wait-msg').textContent = watch ? '観戦で入りました。試合が始まるのを待っています…' : 'あいてを待っています…';
      lobby(true);
    } catch (e) {
      $('online-err').textContent = e.message || 'つながりませんでした';
      leaveRoom();
    }
    $('btn-join').disabled = false; $('btn-join').textContent = 'はいる';
  }
  let startTm = 0;
  function onlineStart(gm) {
    // 奇数回戦は先に入った人が黒（先手）、偶数回戦は交代
    blackSlot = gm.round % 2 === 1 ? 0 : 1;
    myColor = gm.slot >= 0 ? colorOf(gm.slot) : 1;
    const nm = gm.names.map(n => n || '？'), nn = { [colorOf(0)]: nm[0], [colorOf(1)]: nm[1] };
    queue = []; phase = 'wait';
    clearTimeout(startTm);
    startTm = setTimeout(() => { if (room) start('online', null, { seed: gm.seed, n: gm.n, names: nn }); }, Math.min(gm.wait, 1500));
  }
  // とどいた手を、順番どおりに打つ。たまっているとき（途中から観戦）は、早送りする
  function pump() {
    while (queue.length && queue[0].i < game.moves) queue.shift();
    if (!queue.length || queue[0].i !== game.moves) return;
    const m = queue.shift();
    if (colorOf(m.s) !== game.turn || !SR.flipsFor(game.b, N, m.c, game.turn)) return;
    if (queue.length < 2) return move(m.c);
    game.place(m.c); if (game.slideDue()) game.doSlide();
    const r = game.advance(); hud();
    if (r.over) { phase = 'over'; setTimeout(result, 700); } else pump();
  }
  try { const rc = new URLSearchParams(location.search).get('room'); if (rc) openOnline(SR.cleanCode(rc)); } catch (e) {}

  // ---------- 絵 ----------
  function rr(x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
  // コマ。sx：横のつぶれ具合（裏返し中）  a：うすさ
  function stone(cx, cy, p, sx = 1, a = 1) {
    const r = cs * 0.39;
    g.save(); g.globalAlpha *= a; g.translate(cx, cy);
    g.fillStyle = 'rgba(0,0,0,.22)'; g.beginPath(); g.ellipse(0, r * 0.16, r * Math.max(0.12, sx), r, 0, 0, 7); g.fill();
    g.fillStyle = p === 1 ? BLACK : WHITE; g.beginPath(); g.ellipse(0, 0, r * Math.max(0.1, sx), r, 0, 0, 7); g.fill();
    g.strokeStyle = INK; g.lineWidth = Math.max(2, cs * 0.05); g.stroke();
    if (sx > 0.6) { // 目
      const ex = r * 0.34 * sx, ey = -r * 0.1, er = r * 0.13;
      g.fillStyle = p === 1 ? '#fff' : INK; g.beginPath(); g.arc(-ex, ey, er, 0, 7); g.arc(ex, ey, er, 0, 7); g.fill();
    }
    g.restore();
  }
  function arrow(cx, cy, ang, size, label, hot) {
    g.save(); g.translate(cx, cy);
    const bob = hot ? Math.sin(performance.now() / 110) * size * 0.06 : Math.sin(performance.now() / 320) * size * 0.03;
    g.rotate(ang); g.translate(bob, 0);
    g.beginPath(); g.moveTo(size * 0.5, 0); g.lineTo(-size * 0.05, -size * 0.46); g.lineTo(-size * 0.05, -size * 0.2); g.lineTo(-size * 0.5, -size * 0.2); g.lineTo(-size * 0.5, size * 0.2); g.lineTo(-size * 0.05, size * 0.2); g.lineTo(-size * 0.05, size * 0.46); g.closePath();
    g.fillStyle = hot ? '#ff7a1a' : GOLD; g.fill(); g.strokeStyle = INK; g.lineWidth = Math.max(2, size * 0.07); g.lineJoin = 'round'; g.stroke();
    g.rotate(-ang);
    g.fillStyle = INK; g.font = `900 ${Math.round(size * 0.42)}px "M PLUS Rounded 1c", sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(label, -Math.cos(ang) * size * 0.14, -Math.sin(ang) * size * 0.14 + 1);
    g.restore();
  }
  function draw(dt) {
    const S = cv.width / dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, S, S);
    const B = cs * N, s = game.slide, u = game.untilSlide(), sliding = phase === 'slide', hot = u === 1 || phase === 'warn';
    const showPeek = peek && phase === 'idle' && !game.over;
    // 盤
    g.fillStyle = INK; rr(M - 7, M - 4, B + 14, B + 15, 16); g.fill();
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { g.fillStyle = (x + y) % 2 ? FELT2 : FELT; g.fillRect(M + x * cs, M + y * cs, cs, cs); }
    // 次にすべる列（すべっている間は、すべっている列）を光らせる
    const hl = sliding ? anim.s : s;
    if (!game.over || sliding) {
      const pulse = hot || sliding ? 0.3 + 0.14 * Math.sin(performance.now() / 120) : 0.2;
      g.fillStyle = `rgba(245,184,0,${pulse})`;
      if (hl.line === 'row') g.fillRect(M, M + hl.idx * cs, B, cs); else g.fillRect(M + hl.idx * cs, M, cs, B);
    }
    g.strokeStyle = 'rgba(0,0,0,.22)'; g.lineWidth = 1.5; g.beginPath();
    for (let k = 1; k < N; k++) { g.moveTo(M + k * cs, M); g.lineTo(M + k * cs, M + B); g.moveTo(M, M + k * cs); g.lineTo(M + B, M + k * cs); }
    g.stroke();

    // どの盤を描くか
    let b = game.b, flipSet = null;
    if (phase === 'flip') flipSet = new Set(anim.flips);
    if (sliding) b = anim.before;
    if (showPeek) b = SR.slideBoard(game.b, N, s);
    const C = i => [M + (i % N + 0.5) * cs, M + (((i / N) | 0) + 0.5) * cs];
    g.save(); g.beginPath(); g.rect(M, M, B, B); g.clip();
    for (let i = 0; i < N * N; i++) {
      const v = b[i]; if (!v) continue;
      let [cx, cy] = C(i);
      if (phase === 'flip') {
        if (i === anim.placed) { const q = Math.min(1, anim.t / 0.16); stone(cx, cy - (1 - q) * cs * 0.3, v, 1, q); continue; }
        if (flipSet.has(i)) {
          const k = anim.flips.indexOf(i), q = Math.max(0, Math.min(1, (anim.t - 0.1 - Math.min(k, 8) * 0.045) / 0.28));
          const sx = Math.abs(Math.cos(q * Math.PI)); stone(cx, cy, q < 0.5 ? 3 - anim.p : anim.p, sx); continue;
        }
      }
      if (sliding) {
        const x = i % N, y = (i / N) | 0, on = anim.s.line === 'row' ? y === anim.s.idx : x === anim.s.idx;
        if (on) {
          const q = Math.min(1, anim.t / anim.dur), e = q * q * (3 - 2 * q), off = e * cs * anim.s.dir;
          for (const wrap of [0, -anim.s.dir * B]) { if (anim.s.line === 'row') stone(cx + off + wrap, cy, v); else stone(cx, cy + off + wrap, v); }
          continue;
        }
      }
      stone(cx, cy, v);
    }
    g.restore();
    // 最後に置いた場所
    if (game.last >= 0 && phase === 'idle' && !showPeek) { const [cx, cy] = C(game.last); g.fillStyle = '#ff4d4d'; g.beginPath(); g.arc(cx, cy + cs * 0.2, cs * 0.06, 0, 7); g.fill(); }
    // 置ける場所
    if (phase === 'idle' && !game.over && !showPeek && isHuman(game.turn)) {
      for (const i of game.legal()) {
        const [cx, cy] = C(i);
        if (i === hover) stone(cx, cy, game.turn, 1, 0.45);
        else { g.fillStyle = game.turn === 1 ? 'rgba(43,47,58,.45)' : 'rgba(255,255,255,.7)'; g.beginPath(); g.arc(cx, cy, cs * 0.11, 0, 7); g.fill(); }
      }
    }
    if (showPeek) {
      g.fillStyle = 'rgba(40,28,20,.9)'; const tw = cs * 3.4; rr(M + B / 2 - tw / 2, M + B + 2, tw, M - 6, (M - 6) / 2); g.fill();
      g.fillStyle = '#fff'; g.font = `900 ${Math.round(cs * 0.3)}px "M PLUS Rounded 1c", sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('すべったあと', M + B / 2, M + B + M / 2);
    }
    // 矢印（押し出すがわの外に出す）
    if (!game.over && !sliding && !showPeek) {
      const size = M * 0.8, lab = phase === 'warn' ? '!' : String(u), near = M * 0.44, far = M + B + M * 0.56;
      if (s.line === 'row') arrow(s.dir > 0 ? near : far, M + (s.idx + 0.5) * cs, s.dir > 0 ? 0 : Math.PI, size, lab, hot);
      else arrow(M + (s.idx + 0.5) * cs, s.dir > 0 ? near : far, s.dir > 0 ? Math.PI / 2 : -Math.PI / 2, size, lab, hot);
    }
  }

  // ---------- 毎フレーム ----------
  let last = performance.now();
  function frame(now) {
    requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (!game) return;
    if (anim) {
      anim.t += dt;
      if (anim.t >= anim.dur) {
        if (phase === 'flip') afterFlip(); else if (phase === 'warn') startSlide(); else if (phase === 'slide') nextTurn();
      }
    }
    if (mode === 'online') { if (phase === 'idle' && !game.over && queue.length) pump(); }
    else if (phase === 'idle' && !game.over && !isHuman(game.turn) && now >= cpuAt) { const i = SR.cpuMove(game, level); if (i >= 0) move(i); }
    draw(dt);
  }
  requestAnimationFrame(frame);
  document.addEventListener('visibilitychange', () => { last = performance.now(); });
  try { document.fonts.ready.then(() => { if (game) layout(); }); } catch (e) {}
  SR.seeded = mulberry;
  SR._debug = { get game() { return game; }, get phase() { return phase; }, get room() { return room; }, get myColor() { return myColor; }, start, geom: () => ({ cs, M, N }) };
})();

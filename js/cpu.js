// =============================================
//  盤滑（パンファ）  CPU
//  次にすべる列は見えているので、それをふまえて考える
// =============================================
(function () {
  const { flipsFor, legalMoves, slideBoard, count } = SR;
  const wCache = {};
  function weights(N) {
    if (wCache[N]) return wCache[N];
    const w = new Int16Array(N * N), e = N - 1;
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      const cx = x === 0 || x === e, cy = y === 0 || y === e, nx = x === 1 || x === e - 1, ny = y === 1 || y === e - 1;
      w[y * N + x] = cx && cy ? 100 : nx && ny ? -40 : (cx && ny) || (cy && nx) ? -15 : cx || cy ? 8 : 1;
    }
    return wCache[N] = w;
  }
  function evalBoard(b, N, me) {
    const w = weights(N), o = 3 - me; let s = 0, empty = 0;
    for (let i = 0; i < b.length; i++) { if (b[i] === me) s += w[i]; else if (b[i] === o) s -= w[i]; else empty++; }
    if (empty === 0) { const c = count(b); return (c[me - 1] - c[o - 1]) * 1000; }
    s += 6 * (legalMoves(b, N, me).length - legalMoves(b, N, o).length);
    if (empty < N) { const c = count(b); s += (c[me - 1] - c[o - 1]) * 6; }
    return s;
  }
  // 1手すすめた盤（3手目ならすべらせる。見えている1回分だけ）
  function step(b, N, i, p, moves, slide) {
    const f = flipsFor(b, N, i, p), nb = b.slice(); nb[i] = p; for (const k of f) nb[k] = p;
    const m = moves + 1;
    if (slide && m % SR.CONFIG.SLIDE_EVERY === 0) return { b: slideBoard(nb, N, slide), moves: m, slide: null };
    return { b: nb, moves: m, slide };
  }
  function search(b, N, p, me, moves, slide, depth, alpha, beta, passed) {
    const list = legalMoves(b, N, p);
    if (!list.length) {
      if (passed) { const c = count(b); return (c[me - 1] - c[2 - me]) * 1000; }
      return search(b, N, 3 - p, me, moves, slide, depth, alpha, beta, true);
    }
    if (depth <= 0) return evalBoard(b, N, me);
    if (p === me) {
      let best = -Infinity;
      for (const i of list) { const s = step(b, N, i, p, moves, slide); const v = search(s.b, N, 3 - p, me, s.moves, s.slide, depth - 1, alpha, beta, false); if (v > best) best = v; if (v > alpha) alpha = v; if (alpha >= beta) break; }
      return best;
    }
    let best = Infinity;
    for (const i of list) { const s = step(b, N, i, p, moves, slide); const v = search(s.b, N, 3 - p, me, s.moves, s.slide, depth - 1, alpha, beta, false); if (v < best) best = v; if (v < beta) beta = v; if (alpha >= beta) break; }
    return best;
  }
  // level: easy / normal / hard
  SR.cpuMove = function (g, level, rnd) {
    rnd = rnd || Math.random;
    const N = g.N, p = g.turn, list = g.legal(); if (!list.length) return -1;
    if (level === 'easy') {
      // すべる列は気にしない。たくさん裏返せる所を、少しだけ好む
      if (rnd() < 0.45) return list[Math.floor(rnd() * list.length)];
      let best = list[0], bn = -1; for (const i of list) { const n = flipsFor(g.b, N, i, p).length + rnd(); if (n > bn) { bn = n; best = i; } }
      return best;
    }
    let empty = 0; for (const v of g.b) if (!v) empty++;
    const depth = level === 'normal' ? 1 : empty <= 9 ? 9 : N === 6 ? 4 : 3;
    let best = list[0], bv = -Infinity;
    for (const i of list) {
      const s = step(g.b, N, i, p, g.moves, g.slide);
      const v = search(s.b, N, 3 - p, p, s.moves, s.slide, depth - 1, -Infinity, Infinity, false) + rnd() * (level === 'normal' ? 12 : 2);
      if (v > bv) { bv = v; best = i; }
    }
    return best;
  };
})();

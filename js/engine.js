// =============================================
//  盤滑（パンファ）  ルール本体
//  コマ：0＝なし 1＝くろ（先手） 2＝しろ
//  3手ごとに、予告された1列が1マスすべる（はしのコマは反対がわへ回る）
// =============================================
window.SR = window.SR || {};
(function () {
  const C = SR.CONFIG = { SLIDE_EVERY: 3 };
  const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];

  // ---------- 盤だけを見る計算（CPUも使う） ----------
  function flipsFor(b, N, i, p) {
    if (b[i]) return null;
    const x0 = i % N, y0 = (i / N) | 0, o = 3 - p; let out = null;
    for (const [dx, dy] of DIRS) {
      let x = x0 + dx, y = y0 + dy, n = 0;
      while (x >= 0 && x < N && y >= 0 && y < N && b[y * N + x] === o) { x += dx; y += dy; n++; }
      if (n && x >= 0 && x < N && y >= 0 && y < N && b[y * N + x] === p) {
        out = out || [];
        for (let k = 1; k <= n; k++) out.push((y0 + dy * k) * N + x0 + dx * k);
      }
    }
    return out;
  }
  function legalMoves(b, N, p) { const m = []; for (let i = 0; i < N * N; i++) if (!b[i] && flipsFor(b, N, i, p)) m.push(i); return m; }
  function hasMove(b, N, p) { for (let i = 0; i < N * N; i++) if (!b[i] && flipsFor(b, N, i, p)) return true; return false; }
  // s: { line:'row'|'col', idx, dir:+1|-1 }  行なら右(+1)/左(-1)、列なら下(+1)/上(-1)
  function slideBoard(b, N, s) {
    const nb = b.slice();
    for (let k = 0; k < N; k++) {
      const from = (k - s.dir + N) % N;
      if (s.line === 'row') nb[s.idx * N + k] = b[s.idx * N + from]; else nb[k * N + s.idx] = b[from * N + s.idx];
    }
    return nb;
  }
  function count(b) { let a = 0, c = 0; for (const v of b) { if (v === 1) a++; else if (v === 2) c++; } return [a, c]; }
  SR.flipsFor = flipsFor; SR.legalMoves = legalMoves; SR.hasMove = hasMove; SR.slideBoard = slideBoard; SR.count = count;

  class Game {
    constructor(N, rnd) {
      this.N = N || 6; this.rnd = rnd || Math.random;
      const b = this.b = new Uint8Array(this.N * this.N), h = this.N / 2, n = this.N;
      b[(h - 1) * n + h - 1] = 2; b[h * n + h] = 2; b[(h - 1) * n + h] = 1; b[h * n + h - 1] = 1;
      this.turn = 1; this.moves = 0; this.over = false; this.winner = null; this.last = -1; this.lastSlide = null;
      this.slide = this.pickSlide();
    }
    // 次にすべる列。同じ列は続けない。すべっても何も変わらない列はさける
    pickSlide() {
      const N = this.N, all = [], good = [];
      for (const line of ['row', 'col']) for (let idx = 0; idx < N; idx++) {
        if (this.lastSlide && this.lastSlide.line === line && this.lastSlide.idx === idx) continue;
        for (const dir of [1, -1]) {
          const s = { line, idx, dir }; all.push(s);
          const nb = slideBoard(this.b, N, s); let ch = false;
          for (let i = 0; i < nb.length; i++) if (nb[i] !== this.b[i]) { ch = true; break; }
          if (ch) good.push(s);
        }
      }
      const list = good.length ? good : all;
      return list[Math.floor(this.rnd() * list.length)];
    }
    untilSlide() { return C.SLIDE_EVERY - (this.moves % C.SLIDE_EVERY); }
    legal() { return this.over ? [] : legalMoves(this.b, this.N, this.turn); }
    // 置く。裏返ったマスの一覧を返す（置けなければ null）
    place(i) {
      if (this.over) return null;
      const f = flipsFor(this.b, this.N, i, this.turn); if (!f) return null;
      this.b[i] = this.turn; for (const k of f) this.b[k] = this.turn;
      this.moves++; this.last = i;
      return f;
    }
    slideDue() { return this.moves > 0 && this.moves % C.SLIDE_EVERY === 0 && this.pendingSlideFor !== this.moves; }
    doSlide() {
      const s = this.slide; this.b = slideBoard(this.b, this.N, s); this.pendingSlideFor = this.moves;
      if (this.last >= 0) { // 最後に置いたしるしも、いっしょに動かす
        const N = this.N, x = this.last % N, y = (this.last / N) | 0;
        if (s.line === 'row' && y === s.idx) this.last = y * N + (x + s.dir + N) % N;
        else if (s.line === 'col' && x === s.idx) this.last = ((y + s.dir + N) % N) * N + x;
      }
      this.lastSlide = s; this.slide = this.pickSlide();
      return s;
    }
    // 番を進める。{ pass, over } を返す
    advance() {
      const N = this.N, next = 3 - this.turn;
      if (hasMove(this.b, N, next)) { this.turn = next; return { pass: false, over: false }; }
      if (hasMove(this.b, N, this.turn)) return { pass: true, passed: next, over: false };
      this.over = true; const [a, c] = count(this.b); this.winner = a > c ? 1 : c > a ? 2 : 0;
      return { pass: false, over: true };
    }
  }
  SR.Game = Game;
})();

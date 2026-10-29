// =============================================
//  ことば（日本語・English・繁體中文・한국어）
//  ===========================================

(function () {
  var LANGS = ['ja', 'en', 'zh', 'ko'];
  var KEY = 'panfa-lang';
  var D = {
 "lang_label": [
  "ことば",
  "Language",
  "語言",
  "언어"
 ],
 "home": [
  "なすびのお庭へ",
  "Nasubi's Garden (more games)",
  "前往茄子的庭院",
  "가지의 정원으로"
 ],
 "howto": [
  "あそびかた",
  "How to play",
  "玩法",
  "플레이 방법"
 ],
 "close": [
  "とじる",
  "Close",
  "關閉",
  "닫기"
 ],
 "back": [
  "もどる",
  "Back",
  "返回",
  "돌아가기"
 ],
 "to_title": [
  "タイトルへ",
  "Back to title",
  "回到標題",
  "타이틀로"
 ],
 "again": [
  "もう一回",
  "Play again",
  "再來一局",
  "한 판 더"
 ],
 "easy": [
  "よわい",
  "Easy",
  "簡單",
  "약함"
 ],
 "normal": [
  "ふつう",
  "Normal",
  "普通",
  "보통"
 ],
 "hard": [
  "つよい",
  "Hard",
  "困難",
  "강함"
 ],
 "vs_cpu": [
  "CPUとたいせん",
  "VS CPU",
  "對戰CPU",
  "CPU와 대전"
 ],
 "online": [
  "あいことばで対戦",
  "Play with a passcode",
  "用暗號對戰",
  "암호로 대전"
 ],
 "passcode": [
  "あいことば",
  "Passcode",
  "暗號",
  "암호"
 ],
 "name": [
  "なまえ",
  "Name",
  "名字",
  "이름"
 ],
 "noname": [
  "ななし",
  "Anonymous",
  "無名氏",
  "익명"
 ],
 "online_hint": [
  "同じあいことばを入れた人と対戦。3人目からは観戦になります。",
  "Play against whoever enters the same passcode. From the 3rd person on, you watch.",
  "和輸入相同暗號的人對戰。第3個人開始為觀戰。",
  "같은 암호를 입력한 사람과 대전. 3번째 사람부터는 관전이 됩니다."
 ],
 "join": [
  "はいる",
  "Join",
  "進入",
  "입장"
 ],
 "wait_pre": [
  "あいことば「",
  "Passcode: ",
  "暗號「",
  "암호 「"
 ],
 "wait_post": [
  "」",
  "",
  "」",
  "」"
 ],
 "waiting": [
  "あいてを待っています…",
  "Waiting for an opponent…",
  "等待對手中…",
  "상대를 기다리는 중…"
 ],
 "copy_link": [
  "さそうリンクをコピー",
  "Copy invite link",
  "複製邀請連結",
  "초대 링크 복사"
 ],
 "copied": [
  "コピーしました！",
  "Copied!",
  "已複製！",
  "복사했어요!"
 ],
 "send_link": [
  "このリンクを送ってください",
  "Send this link",
  "請傳送這個連結",
  "이 링크를 보내 주세요"
 ],
 "err_code": [
  "あいことばを入れてください（. # $ / [ ] は使えません）",
  "Enter a passcode (. # $ / [ ] are not allowed)",
  "請輸入暗號（不能使用 . # $ / [ ]）",
  "암호를 입력해 주세요 (. # $ / [ ] 는 사용할 수 없어요)"
 ],
 "err_code_short": [
  "あいことばを入れてください",
  "Enter a passcode",
  "請輸入暗號",
  "암호를 입력해 주세요"
 ],
 "connecting": [
  "つないでいます…",
  "Connecting…",
  "連線中…",
  "연결 중…"
 ],
 "err_net": [
  "通信できませんでした。電波のよいところでもう一度ためしてください",
  "Couldn't connect. Please try again where the signal is better.",
  "無法連線。請在訊號好的地方再試一次。",
  "연결하지 못했어요. 신호가 좋은 곳에서 다시 시도해 주세요."
 ],
 "err_notready": [
  "オンライン対戦はまだ準備中です",
  "Online play isn't ready yet",
  "線上對戰還在準備中",
  "온라인 대전은 아직 준비 중이에요"
 ],
 "err_conn": [
  "つながりませんでした",
  "Couldn't connect",
  "無法連線",
  "연결되지 않았어요"
 ],
 "left_win": [
  "相手が抜けたので、あなたの勝ち！",
  "Your opponent left, so you win!",
  "對手離開了，你贏了！",
  "상대가 나가서 당신의 승리!"
 ],
 "left": [
  "あいてが退室しました",
  "Your opponent left",
  "對手已離開",
  "상대가 퇴장했어요"
 ],
 "watch_in": [
  "観戦で入りました。試合が始まるのを待っています…",
  "You joined as a spectator. Waiting for the game to start…",
  "已用觀戰身分進入。等待比賽開始…",
  "관전으로 입장했어요. 경기 시작을 기다리는 중…"
 ],
 "wait_next": [
  "次の試合が始まるのを待っています…",
  "Waiting for the next game…",
  "等待下一局開始…",
  "다음 경기를 기다리는 중…"
 ],
 "wait_rematch": [
  "あいての「もう一回」を待っています…",
  "Waiting for your opponent to choose \"Play again\"…",
  "等待對手按「再來一局」…",
  "상대의 '한 판 더'를 기다리는 중…"
 ],
 "you": [
  "あなた",
  "You",
  "你",
  "나"
 ],
 "cpu": [
  "CPU",
  "CPU",
  "CPU",
  "CPU"
 ],
 "your_turn": [
  "あなたの番",
  "Your turn",
  "輪到你",
  "내 차례"
 ],
 "cpu_wait_label": [
  "CPU（ふつう）と遊びながら待つ",
  "Play the CPU (Normal) while waiting",
  "一邊和CPU（普通）玩一邊等",
  "기다리는 동안 CPU(보통)와 플레이"
 ],
 "qm_btn": [
  "だれかと対戦",
  "Play someone online",
  "隨機對戰",
  "아무나와 대전"
 ],
 "qm_stat": [
  "対戦待ち <b>{w}</b>人・対戦中 <b>{p}</b>組",
  "<b>{w}</b> waiting · <b>{p}</b> playing",
  "等待中 <b>{w}</b>人・對戰中 <b>{p}</b>組",
  "대기 <b>{w}</b>명 · 대전 중 <b>{p}</b>쌍"
 ],
 "qm_prime_hot": [
  "🔥 いま対戦タイム！（22時まで）",
  "🔥 Battle time now! (until 22:00 JST)",
  "🔥 現在是對戰時間！（到日本時間22點）",
  "🔥 지금은 대전 타임! (일본 시간 22시까지)"
 ],
 "qm_prime": [
  "🌙 毎晩21時〜22時は対戦タイム",
  "🌙 Battle time every night 21:00–22:00 JST",
  "🌙 每晚日本時間21〜22點是對戰時間",
  "🌙 매일 밤 일본 시간 21~22시는 대전 타임"
 ],
 "qm_sub": [
  "いま待っている人と、自動でつながります。",
  "You'll be matched automatically with someone who's waiting.",
  "自動和正在等待的人配對。",
  "기다리고 있는 사람과 자동으로 연결돼요."
 ],
 "qm_go": [
  "さがす",
  "Find a match",
  "尋找",
  "찾기"
 ],
 "qm_badname": [
  "その名前は使えません。ほかの名前にしてね",
  "That name can't be used. Please choose another.",
  "這個名字不能使用，請換一個。",
  "그 이름은 사용할 수 없어요. 다른 이름으로 해 주세요."
 ],
 "qm_searching": [
  "相手をさがしています",
  "Looking for an opponent",
  "正在尋找對手",
  "상대를 찾는 중"
 ],
 "qm_wait_pre": [
  "いま対戦待ち ",
  "Waiting now: ",
  "目前等待中 ",
  "현재 대기 "
 ],
 "qm_wait_post": [
  "人",
  "",
  "人",
  "명"
 ],
 "qm_cpu": [
  "CPUと遊びながら待つ",
  "Play the CPU while waiting",
  "一邊和CPU玩一邊等",
  "기다리는 동안 CPU와 플레이"
 ],
 "qm_cancel": [
  "やめる",
  "Cancel",
  "取消",
  "그만두기"
 ],
 "qm_retry": [
  "もう一度さがす",
  "Search again",
  "再找一次",
  "다시 찾기"
 ],
 "qm_searching_t": [
  "相手をさがしています… {t}",
  "Looking for an opponent… {t}",
  "正在尋找對手… {t}",
  "상대를 찾는 중… {t}"
 ],
 "qm_calling": [
  "CPUと遊んでいる人に声をかけています…",
  "Inviting someone who is playing the CPU…",
  "正在邀請正在和CPU玩的人…",
  "CPU와 플레이 중인 사람에게 신청하는 중…"
 ],
 "qm_declined": [
  "相手が見送りました。ほかの人をさがします",
  "They passed. Looking for someone else.",
  "對方跳過了，改找其他人。",
  "상대가 넘겼어요. 다른 사람을 찾을게요."
 ],
 "qm_found": [
  "相手が見つかりました！",
  "Opponent found!",
  "找到對手了！",
  "상대를 찾았어요!"
 ],
 "qm_avail": [
  "対戦できる相手がいます！",
  "Someone is ready to play!",
  "有可以對戰的對手！",
  "대전할 수 있는 상대가 있어요!"
 ],
 "qm_play": [
  "対戦する",
  "Play",
  "對戰",
  "대전하기"
 ],
 "qm_pass": [
  "見送る",
  "Pass",
  "跳過",
  "넘기기"
 ],
 "qm_taken": [
  "さっきの相手は、ほかの人と対戦を始めました。もう少し待ってね",
  "That player started a match with someone else. Please wait a little longer.",
  "剛才的對手已經和別人開始對戰了。請再等一下。",
  "방금 상대는 다른 사람과 대전을 시작했어요. 조금만 더 기다려 주세요."
 ],
 "qm_fail": [
  "相手とつながりませんでした（{c}）",
  "Couldn't connect to your opponent ({c})",
  "無法和對手連線（{c}）",
  "상대와 연결되지 않았어요 ({c})"
 ],
 "qm_nojoin": [
  "入れませんでした",
  "Couldn't join",
  "無法進入",
  "들어가지 못했어요"
 ],
 "qm_next": [
  "次の相手をさがす",
  "Find next opponent",
  "尋找下一位對手",
  "다음 상대 찾기"
 ],
 "doc_title": [
  "盤滑（パンファ）",
  "Panfa — Sliding Reversi",
  "盤滑（Panfa）滑動黑白棋",
  "판파 — 미끄러지는 리버시"
 ],
 "doc_desc": [
  "3手ごとに1列がすべるリバーシ。取った角が、すべって消える。",
  "Reversi where a line slides every 3 moves. Your corner can slide away.",
  "每3手就有一列會滑動的黑白棋。拿到的角也可能滑走。",
  "3수마다 한 줄이 미끄러지는 리버시. 잡은 귀퉁이도 미끄러져 사라진다."
 ],
 "kana": [
  "パンファ",
  "PANFA",
  "PANFA",
  "판파"
 ],
 "tagline": [
  "3手ごとに、1列がすべるリバーシ。",
  "Reversi where a line slides every 3 moves.",
  "每3手就有一列會滑動的黑白棋。",
  "3수마다 한 줄이 미끄러지는 리버시."
 ],
 "size": [
  "盤の大きさ",
  "Board size",
  "棋盤大小",
  "판 크기"
 ],
 "size6": [
  "6×6<small>3分くらい</small>",
  "6×6<small>about 3 min</small>",
  "6×6<small>約3分鐘</small>",
  "6×6<small>약 3분</small>"
 ],
 "size8": [
  "8×8<small>じっくり</small>",
  "8×8<small>longer game</small>",
  "8×8<small>慢慢下</small>",
  "8×8<small>느긋하게</small>"
 ],
 "two": [
  "この端末でふたり",
  "2 players on this device",
  "同一裝置雙人",
  "이 기기로 둘이서"
 ],
 "home_e": [
  "🍆 なすびのお庭へ",
  "🍆 Nasubi's Garden (more games)",
  "🍆 前往茄子的庭院",
  "🍆 가지의 정원으로"
 ],
 "quit": [
  "やめる",
  "Quit",
  "結束",
  "그만두기"
 ],
 "peek": [
  "すべったあとを見る",
  "Peek after slide",
  "看滑動後",
  "미끄러진 후 보기"
 ],
 "peek_label": [
  "すべったあと",
  "AFTER SLIDE",
  "滑動後",
  "미끄러진 후"
 ],
 "ex_code": [
  "例：ぱんふぁ123",
  "e.g. panfa123",
  "例：panfa123",
  "예: panfa123"
 ],
 "online_hint2": [
  "同じあいことばを入れた人と対戦。3人目からは観戦になります。<br>盤の大きさは、先に入った人がタイトルでえらんだものになります。",
  "Play against whoever enters the same passcode. From the 3rd person on, you watch.<br>The board size is the one chosen on the title screen by whoever joined first.",
  "和輸入相同暗號的人對戰。第3個人開始為觀戰。<br>棋盤大小以先進入的人在標題畫面選的為準。",
  "같은 암호를 입력한 사람과 대전. 3번째 사람부터는 관전이 됩니다.<br>판 크기는 먼저 들어온 사람이 타이틀에서 고른 크기가 됩니다."
 ],
 "h1": [
  "ふつうのリバーシです。相手のコマをはさむと、自分の色に裏返ります。さいごにコマが多い方の勝ち。",
  "Plays like normal reversi: sandwich your opponent's pieces to flip them to your color. Most pieces at the end wins.",
  "基本上就是一般的黑白棋。夾住對手的棋子，就會翻成自己的顏色。最後棋子多的一方獲勝。",
  "기본은 보통 리버시. 상대 말을 사이에 끼우면 내 색으로 뒤집힌다. 마지막에 말이 많은 쪽이 승리."
 ],
 "h2": [
  "<b>3手ごとに、1列がすべります。</b>矢印がついた列が、矢印の向きに1マスずれます。はしのコマは、反対がわのはしに回ります。",
  "<b>Every 3 moves, one line slides.</b> The line with the arrow shifts 1 square in that direction. A piece pushed off the edge wraps around to the other side.",
  "<b>每3手，會有一列滑動。</b>有箭頭的那一列會往箭頭方向移動1格。最邊邊的棋子會繞到另一邊。",
  "<b>3수마다 한 줄이 미끄러진다.</b> 화살표가 붙은 줄이 화살표 방향으로 1칸 밀린다. 끝의 말은 반대쪽 끝으로 돌아간다."
 ],
 "h3": [
  "次にすべる列は、<b>いつも先に見えています</b>。矢印の数字が「あと何手ですべるか」です。",
  "The next line to slide is <b>always shown in advance</b>. The number on the arrow is how many moves until it slides.",
  "下一個要滑動的列<b>一直都會先顯示</b>。箭頭上的數字是「還有幾手會滑動」。",
  "다음에 미끄러질 줄은 <b>항상 미리 보인다</b>. 화살표의 숫자는 \"몇 수 뒤에 미끄러지는지\"."
 ],
 "h4": [
  "すべっても、コマは裏返りません。場所が変わるだけです。",
  "Sliding never flips pieces — they just move.",
  "滑動時棋子不會翻面，只是換位置。",
  "미끄러져도 말은 뒤집히지 않는다. 자리만 바뀐다."
 ],
 "h5": [
  "角のとなりに置いたコマが、すべって角に入ることも。取られた角が、すべって消えることも。",
  "A piece next to a corner can slide into it — and a taken corner can slide away.",
  "放在角旁邊的棋子可能滑進角落，被拿走的角也可能滑走。",
  "귀퉁이 옆에 둔 말이 미끄러져 귀퉁이로 들어가기도 하고, 빼앗긴 귀퉁이가 미끄러져 사라지기도 한다."
 ],
 "h6": [
  "<b>「すべったあとを見る」</b>を押しているあいだ、すべったあとの盤が見えます。",
  "Hold <b>\"Peek after slide\"</b> to see the board after the next slide.",
  "按住<b>「看滑動後」</b>的期間，可以看到滑動後的棋盤。",
  "<b>\"미끄러진 후 보기\"</b>를 누르고 있는 동안 미끄러진 후의 판이 보인다."
 ],
 "h7": [
  "<b>あいことばで対戦</b>：同じあいことばを入れた人と対戦できます。黒（先手）は1試合ごとに交代。3人目からは観戦です。",
  "<b>Play with a passcode</b>: play against whoever enters the same passcode. Black (first player) swaps every game. From the 3rd person on, you watch.",
  "<b>用暗號對戰</b>：可以和輸入相同暗號的人對戰。黑（先手）每局交換。第3個人開始為觀戰。",
  "<b>암호로 대전</b>: 같은 암호를 입력한 사람과 대전할 수 있다. 흑(선공)은 한 판마다 교대. 3번째 사람부터는 관전."
 ],
 "black": [
  "くろ",
  "Black",
  "黑",
  "흑"
 ],
 "white": [
  "しろ",
  "White",
  "白",
  "백"
 ],
 "cpu_lv": [
  "CPU（{lv}）",
  "CPU ({lv})",
  "CPU（{lv}）",
  "CPU ({lv})"
 ],
 "over": [
  "おしまい",
  "Game over",
  "結束",
  "끝"
 ],
 "cpu_turn": [
  "CPUの番",
  "CPU's turn",
  "輪到CPU",
  "CPU 차례"
 ],
 "turn_of": [
  "{name}の番",
  "{name}'s turn",
  "輪到{name}",
  "{name} 차례"
 ],
 "slide_now": [
  "すべる！",
  "SLIDE!",
  "滑動！",
  "미끄러진다!"
 ],
 "slide_next": [
  "{who}／この1手のあと、すべる！",
  "{who} / slides after this move!",
  "{who}／這一手之後會滑動！",
  "{who} / 이번 수 다음에 미끄러짐!"
 ],
 "slide_in": [
  "{who}／あと{n}手ですべる",
  "{who} / slides in {n} moves",
  "{who}／再{n}手滑動",
  "{who} / {n}수 후 미끄러짐"
 ],
 "cant": [
  "そこには置けません",
  "You can't place there",
  "那裡不能下",
  "거기에는 둘 수 없어요"
 ],
 "pass": [
  "{name}は置けないのでパス",
  "{name} can't move — pass",
  "{name}無處可下，跳過",
  "{name} 둘 곳이 없어 패스"
 ],
 "res_win": [
  "かち！",
  "YOU WIN!",
  "贏了！",
  "승리!"
 ],
 "res_lose": [
  "まけ…",
  "You lose…",
  "輸了…",
  "패배…"
 ],
 "res_draw": [
  "ひきわけ",
  "Draw",
  "平手",
  "무승부"
 ],
 "res_x": [
  "{name}のかち！",
  "{name} wins!",
  "{name}贏了！",
  "{name} 승리!"
 ]
};
  function pick() {
    try { var s = localStorage.getItem(KEY); if (s && LANGS.indexOf(s) >= 0) return s; } catch (e) {}
    try { var q = new URLSearchParams(location.search).get('lang'); if (q && LANGS.indexOf(q) >= 0) return q; } catch (e) {}
    var n = (navigator.language || 'ja').toLowerCase();
    if (n.indexOf('ja') === 0) return 'ja'; if (n.indexOf('ko') === 0) return 'ko'; if (n.indexOf('zh') === 0) return 'zh'; return 'en';
  }
  var L = pick();
  function t(k, v) {
    var row = D[k]; var i = LANGS.indexOf(L);
    var s = row ? (row[i] != null ? row[i] : row[0]) : k;
    if (v) for (var x in v) s = s.split('{' + x + '}').join(v[x]);
    return s;
  }
  function apply() {
    var de = document.documentElement;
    de.lang = L === 'zh' ? 'zh-Hant' : L; de.setAttribute('data-lang', L);
    document.querySelectorAll('[data-i]').forEach(function (e) { e.textContent = t(e.dataset.i); });
    document.querySelectorAll('[data-ih]').forEach(function (e) { e.innerHTML = t(e.dataset.ih); });
    document.querySelectorAll('[data-ip]').forEach(function (e) { e.placeholder = t(e.dataset.ip); });
    document.querySelectorAll('[data-ia]').forEach(function (e) { e.setAttribute('aria-label', t(e.dataset.ia)); });
    document.querySelectorAll('.langs button').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.lang === L ? 'true' : 'false'); });
    document.title = t('doc_title');
    var md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute('content', t('doc_desc'));
    try { document.dispatchEvent(new CustomEvent('langchange', { detail: L })); } catch (e) {}
  }
  function set(l) { if (LANGS.indexOf(l) < 0) return; L = l; try { localStorage.setItem(KEY, l); } catch (e) {} apply(); }
  function bind() {
    document.querySelectorAll('.langs button').forEach(function (b) { b.addEventListener('click', function () { set(b.dataset.lang); }); });
    apply();
  }
  window.I18N = { t: t, set: set, apply: apply, get lang() { return L; } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind); else bind();
})();

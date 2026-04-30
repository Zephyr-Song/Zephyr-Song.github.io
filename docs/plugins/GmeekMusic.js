/**
 * Gmeek Music Player v3 — Pure HTML5 Audio + CSP-safe
 * 无任何 eval/new Function，完全兼容 GitHub Pages CSP
 */
(function() {
  'use strict';

  var songs = [
    {name:"河流",artist:"马赫mood, 杜逸风",url:"https://music.163.com/song/media/outer/url?id=1984760613.mp3"},
    {name:"冷冷的夏",artist:"王芷蕾",url:"https://music.163.com/song/media/outer/url?id=301422.mp3"},
    {name:"旅行家的忠诚",artist:"黄旭, 艾热 AIR",url:"https://music.163.com/song/media/outer/url?id=2079429439.mp3"},
    {name:"外面冷 Coldest Night",artist:"艾福杰尼",url:"https://music.163.com/song/media/outer/url?id=1982964017.mp3"},
    {name:"空山灵雨 feat.旅行团",artist:"新裤子, 旅行团乐队",url:"https://music.163.com/song/media/outer/url?id=2712645752.mp3"},
    {name:"雨后的哲学家",artist:"ZaZaZsu咂咂苏",url:"https://music.163.com/song/media/outer/url?id=2649850191.mp3"},
    {name:"过春天",artist:"谭维维",url:"https://music.163.com/song/media/outer/url?id=1346093339.mp3"},
    {name:"你我经历的一刻",artist:"ZaZaZsu咂咂苏",url:"https://music.163.com/song/media/outer/url?id=2655065698.mp3"},
    {name:"若把你",artist:"Kirsty刘瑾睿",url:"https://music.163.com/song/media/outer/url?id=865632948.mp3"},
    {name:"几分",artist:"雷泷Raylong, 曲甲, 唐康宁",url:"https://music.163.com/song/media/outer/url?id=2156910268.mp3"},
    {name:"便利店之夜",artist:"便利店之夜",url:"https://music.163.com/song/media/outer/url?id=3326327476.mp3"},
    {name:"玛丽莲",artist:"玛丽莲",url:"https://music.163.com/song/media/outer/url?id=2709842957.mp3"},
    {name:"总有一天你会出现在我身边",artist:"棱镜乐队",url:"https://music.163.com/song/media/outer/url?id=1303027499.mp3"},
    {name:"森林巴士",artist:"温妮莎",url:"https://music.163.com/song/media/outer/url?id=1496093993.mp3"},
    {name:"你很OK！迈出下一步吧！",artist:"你很OK",url:"https://music.163.com/song/media/outer/url?id=1458708777.mp3"},
    {name:"枪口红",artist:"张碧晨",url:"https://music.163.com/song/media/outer/url?id=3319370284.mp3"},
    {name:"殊色",artist:"黄子韬",url:"https://music.163.com/song/media/outer/url?id=2004150068.mp3"},
    {name:"爱在阳光空气中",artist:"孙燕姿",url:"https://music.163.com/song/media/outer/url?id=4871758.mp3"},
    {name:"归途",artist:"林俊杰",url:"https://music.163.com/song/media/outer/url?id=1347914841.mp3"},
    {name:"蔓延",artist:"许巍",url:"https://music.163.com/song/media/outer/url?id=306888.mp3"},
    {name:"绽放爱",artist:"张碧晨",url:"https://music.163.com/song/media/outer/url?id=430208627.mp3"},
    {name:"花",artist:"程璧",url:"https://music.163.com/song/media/outer/url?id=2754658627.mp3"},
    {name:"月光",artist:"邢天卓",url:"https://music.163.com/song/media/outer/url?id=25641044.mp3"},
    {name:"青山故人",artist:"暗杠",url:"https://music.163.com/song/media/outer/url?id=1310963552.mp3"},
    {name:"渡红尘",artist:"蔡恩雨",url:"https://music.163.com/song/media/outer/url?id=2754264700.mp3"},
    {name:"马上出发",artist:"马上出发",url:"https://music.163.com/song/media/outer/url?id=3343529136.mp3"},
    {name:"召唤",artist:"林俊杰",url:"https://music.163.com/song/media/outer/url?id=2744769015.mp3"},
    {name:"吻你吻上太空",artist:"王OK",url:"https://music.163.com/song/media/outer/url?id=2707033683.mp3"},
    {name:"阳光下的星星",artist:"金海心",url:"https://music.163.com/song/media/outer/url?id=1353159923.mp3"},
    {name:"绝对占有 相对自由",artist:"薛之谦",url:"https://music.163.com/song/media/outer/url?id=2749430424.mp3"},
    {name:"吹灭小山河",artist:"国风堂/西瓜JUN",url:"https://music.163.com/song/media/outer/url?id=1412559986.mp3"},
    {name:"绝对占有，相对自由",artist:"田馥甄",url:"https://music.163.com/song/media/outer/url?id=29431061.mp3"},
    {name:"五百二十赫兹",artist:"汪苏泷",url:"https://music.163.com/song/media/outer/url?id=1948572170.mp3"},
    {name:"未完结的爱",artist:"林俊杰",url:"https://music.163.com/song/media/outer/url?id=2695903727.mp3"},
    {name:"带我走",artist:"杨丞琳",url:"https://music.163.com/song/media/outer/url?id=5243408.mp3"}
  ];

  // ---- Styles ----
  var styleCSS = [
    '#gmeek-music-player{',
      'position:fixed;right:0;bottom:0;width:320px;z-index:10004;',
      'font-family:-apple-system,BlinkMacSystemFont,sans-serif;',
      'box-shadow:-2px 0 12px rgba(0,0,0,.4);',
      'overflow:hidden;',
    '}',
    '#gmp-toggle{',
      'position:absolute;top:-36px;left:0;width:100%;height:36px;',
      'background:rgba(0,0,0,.85);border:none;cursor:pointer;',
      'color:#1db969;font-size:14px;font-weight:600;letter-spacing:1px;',
      'display:flex;align-items:center;justify-content:center;gap:6px;',
      'border-radius:4px 4px 0 0;',
    '}',
    '#gmp-toggle svg{margin-right:4px}',
    '#gmp-body{background:rgba(18,18,18,.92);backdrop-filter:blur(8px);padding:12px}',
    '#gmp-header{display:flex;align-items:center;gap:12px;margin-bottom:10px}',
    '#gmp-cover{width:48px;height:48px;background:linear-gradient(135deg,#1db969,#194d2c);border-radius:6px;flex-shrink:0;display:flex;align-items:center;justify-content:center}',
    '#gmp-cover svg{width:24px;height:24px}',
    '#gmp-info{flex:1;min-width:0}',
    '#gmp-title{color:#fff;font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:2px}',
    '#gmp-artist{color:#888;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '#gmp-ctrl{display:flex;align-items:center;gap:16px;margin-bottom:10px}',
    '.gmp-btn{background:none;border:none;cursor:pointer;padding:4px;color:#aaa;transition:color .2s}',
    '.gmp-btn:hover{color:#fff}',
    '.gmp-btn svg{width:20px;height:20px;display:block}',
    '#gmp-progress-wrap{display:flex;align-items:center;gap:8px;margin-bottom:10px}',
    '#gmp-time{color:#666;font-size:10px;font-variant-numeric:tabular-nums;min-width:36px;text-align:center}',
    '#gmp-bar-wrap{flex:1;height:4px;background:rgba(255,255,255,.1);border-radius:2px;cursor:pointer;position:relative}',
    '#gmp-bar{height:100%;background:#1db969;border-radius:2px;width:0%;transition:width .3s}',
    '#gmp-vol-wrap{display:flex;align-items:center;gap:8px}',
    '#gmp-vol-icon{cursor:pointer;color:#aaa}',
    '#gmp-vol-icon:hover{color:#fff}',
    '#gmp-vol-icon svg{width:16px;height:16px;display:block}',
    '#gmp-vol-bar-wrap{flex:1;height:3px;background:rgba(255,255,255,.1);border-radius:2px;cursor:pointer;position:relative}',
    '#gmp-vol-bar{height:100%;background:#555;border-radius:2px;width:70%}',
    '#gmp-list{max-height:0;overflow-y:auto;transition:max-height .3s}',
    '#gmp-list.open{max-height:300px}',
    '#gmp-list::-webkit-scrollbar{width:4px}',
    '#gmp-list::-webkit-scrollbar-thumb{background:rgba(255,255,255,.15);border-radius:2px}',
    '.gmp-item{display:flex;align-items:center;gap:8px;padding:7px 4px;cursor:pointer;border-radius:4px;transition:background .15s}',
    '.gmp-item:hover{background:rgba(255,255,255,.06)}',
    '.gmp-item.playing{background:rgba(29,185,84,.15)}',
    '.gmp-item-num{color:#444;font-size:10px;min-width:18px;text-align:right;font-variant-numeric:tabular-nums}',
    '.gmp-item.playing .gmp-item-num{color:#1db969}',
    '.gmp-item-info{flex:1;min-width:0}',
    '.gmp-item-name{color:#ccc;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.gmp-item.playing .gmp-item-name{color:#fff}',
    '.gmp-item-artist{color:#555;font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.gmp-playing-icon{color:#1db969;flex-shrink:0}',
    '.gmp-playing-icon svg{width:12px;height:12px;display:block;animation:gmp-pulse .8s ease-in-out infinite alternate}',
    '@keyframes gmp-pulse{from{opacity:.6}to{opacity:1}}'
  ].join('');

  // ---- Build UI ----
  var sty = document.createElement('style');
  sty.textContent = styleCSS;
  document.head.appendChild(sty);

  var container = document.createElement('div');
  container.id = 'gmeek-music-player';

  container.innerHTML =
    '<button id="gmp-toggle">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>' +
      '华语私人雷达' +
    '</button>' +
    '<div id="gmp-body">' +
      '<div id="gmp-header">' +
        '<div id="gmp-cover"><svg viewBox="0 0 24 24" fill="white"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg></div>' +
        '<div id="gmp-info">' +
          '<div id="gmp-title">华语私人雷达</div>' +
          '<div id="gmp-artist">点击播放</div>' +
        '</div>' +
      '</div>' +
      '<div id="gmp-ctrl">' +
        '<button class="gmp-btn" id="gmp-prev" title="上一首"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6V6zm3.5 6 8.5 6V6l-8.5 6z"/></svg></button>' +
        '<button class="gmp-btn" id="gmp-play" title="播放/暂停"><svg id="gmp-icon-play" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg></button>' +
        '<button class="gmp-btn" id="gmp-next" title="下一首"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zm2-12v12l6.5-6L8 6zm8 0v12h2V6h-2z"/></svg></button>' +
      '</div>' +
      '<div id="gmp-progress-wrap">' +
        '<span id="gmp-time">0:00</span>' +
        '<div id="gmp-bar-wrap"><div id="gmp-bar"></div></div>' +
      '</div>' +
      '<div id="gmp-vol-wrap">' +
        '<span id="gmp-vol-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg></span>' +
        '<div id="gmp-vol-bar-wrap"><div id="gmp-vol-bar"></div></div>' +
      '</div>' +
      '<div id="gmp-list"></div>' +
    '</div>';

  document.body.appendChild(container);

  // ---- Audio Engine ----
  var audio = new Audio();
  audio.volume = 0.7;
  var current = -1;
  var playing = false;

  // ---- DOM Refs ----
  var titleEl = document.getElementById('gmp-title');
  var artistEl = document.getElementById('gmp-artist');
  var playBtn = document.getElementById('gmp-play');
  var timeEl = document.getElementById('gmp-time');
  var barEl = document.getElementById('gmp-bar');
  var volBar = document.getElementById('gmp-vol-bar');
  var listEl = document.getElementById('gmp-list');
  var toggleBtn = document.getElementById('gmp-toggle');
  var volIcon = document.getElementById('gmp-vol-icon');
  var muted = false;
  var prevVol = 0.7;

  // ---- Build Playlist ----
  function buildList() {
    var html = '';
    for (var i = 0; i < songs.length; i++) {
      var s = songs[i];
      html = html + '<div class="gmp-item" data-i="' + i + '">' +
        '<span class="gmp-item-num">' + (i + 1) + '</span>' +
        '<div class="gmp-item-info">' +
          '<div class="gmp-item-name">' + s.name + '</div>' +
          '<div class="gmp-item-artist">' + s.artist + '</div>' +
        '</div>' +
        '<span class="gmp-playing-icon" style="display:none"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg></span>' +
      '</div>';
    }
    listEl.innerHTML = html;

    var items = listEl.querySelectorAll('.gmp-item');
    for (var j = 0; j < items.length; j++) {
      items[j].addEventListener('click', (function(idx) {
        return function() { playSong(idx); };
      })(j));
    }
  }

  // ---- Play Song ----
  function playSong(idx) {
    if (idx < 0 || idx >= songs.length) return;
    current = idx;
    var s = songs[idx];
    audio.src = s.url;
    titleEl.textContent = s.name;
    artistEl.textContent = s.artist;
    barEl.style.width = '0%';
    timeEl.textContent = '0:00';
    updateListHighlight();
    audio.play();
    playing = true;
    updatePlayIcon();
  }

  function updateListHighlight() {
    var items = listEl.querySelectorAll('.gmp-item');
    var playingIcon, nameEl;
    for (var k = 0; k < items.length; k++) {
      var isPlaying = (k === current);
      items[k].classList.toggle('playing', isPlaying);
      playingIcon = items[k].querySelector('.gmp-playing-icon');
      if (playingIcon) playingIcon.style.display = isPlaying ? '' : 'none';
    }
  }

  function updatePlayIcon() {
    var svg = playing
      ? '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'
      : '<svg id="gmp-icon-play" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>';
    playBtn.innerHTML = svg;
  }

  // ---- Controls ----
  playBtn.addEventListener('click', function() {
    if (current === -1) { playSong(0); return; }
    if (playing) { audio.pause(); playing = false; }
    else { audio.play(); playing = true; }
    updatePlayIcon();
  });

  document.getElementById('gmp-prev').addEventListener('click', function() {
    var n = (current - 1 + songs.length) % songs.length;
    playSong(n);
  });

  document.getElementById('gmp-next').addEventListener('click', function() {
    var n = (current + 1) % songs.length;
    playSong(n);
  });

  // ---- Progress ----
  audio.addEventListener('timeupdate', function() {
    if (!audio.duration) return;
    var pct = (audio.currentTime / audio.duration) * 100;
    barEl.style.width = pct + '%';
    var m = Math.floor(audio.currentTime / 60);
    var s = Math.floor(audio.currentTime % 60);
    timeEl.textContent = m + ':' + (s < 10 ? '0' : '') + s;
  });

  audio.addEventListener('ended', function() {
    var n = (current + 1) % songs.length;
    playSong(n);
  });

  audio.addEventListener('error', function() {
    console.error('[GmeekMusic] Audio error:', audio.error);
    timeEl.textContent = 'Error';
  });

  // ---- Seek ----
  document.getElementById('gmp-bar-wrap').addEventListener('click', function(e) {
    if (!audio.duration) return;
    var rect = this.getBoundingClientRect();
    var pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  });

  // ---- Volume ----
  volIcon.addEventListener('click', function() {
    if (muted) { audio.volume = prevVol; muted = false; volBar.style.width = (prevVol * 100) + '%'; }
    else { prevVol = audio.volume; audio.volume = 0; muted = true; volBar.style.width = '0%'; }
  });

  document.getElementById('gmp-vol-bar-wrap').addEventListener('click', function(e) {
    var rect = this.getBoundingClientRect();
    var pct = (e.clientX - rect.left) / rect.width;
    audio.volume = Math.max(0, Math.min(1, pct));
    volBar.style.width = (audio.volume * 100) + '%';
    if (muted && pct > 0) { muted = false; }
  });

  // ---- Toggle List ----
  toggleBtn.addEventListener('click', function() {
    listEl.classList.toggle('open');
  });

  // ---- Init ----
  buildList();

  // Auto-show list hint
  var hint = document.createElement('div');
  hint.style.cssText = 'position:fixed;bottom:160px;right:10px;background:rgba(29,185,84,.9);color:#fff;padding:8px 12px;border-radius:6px;font-size:12px;z-index:10005;pointer-events:none;animation:gmp-hint-fade 4s ease forwards';
  hint.textContent = '🎵 华语私人雷达 已就绪，点击展开歌单';
  var hintStyle = document.createElement('style');
  hintStyle.textContent = '@keyframes gmp-hint-fade{0%{opacity:0;transform:translateX(20px)}10%{opacity:1;transform:none}80%{opacity:1}100%{opacity:0}}';
  document.head.appendChild(hintStyle);
  document.body.appendChild(hint);
  setTimeout(function() { if (hint.parentNode) hint.parentNode.removeChild(hint); }, 4500);

})();
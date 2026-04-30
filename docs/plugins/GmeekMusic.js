/**
 * Gmeek Music Player v6 — 完全复刻 APlayer fixed mini 风格
 * 纯 HTML5 Audio + 底部歌词显示
 * 无任何 eval/new Function，完全兼容 GitHub Pages CSP
 */
(function () {
  'use strict';

  // ========== 配置区 ==========
  var NETEASE_PLAYLIST_ID = ''; // 网易云歌单 ID，留空则使用硬编码歌单
  var API_BASE = 'https://api.i-meto.com/meting/api';
  // ==============================

  var HARDCODED_SONGS = [
    { name: 'her (feat. Annika Wells)', artist: 'JVKE, Annika Wells', url: 'https://music.163.com/song/media/outer/url?id=3317235944.mp3', id: '3317235944' },
    { name: 'this is what forever feels like', artist: 'JVKE, Nick Jonas', url: 'https://music.163.com/song/media/outer/url?id=2626680545.mp3', id: '2626680545' },
    { name: 'Rush', artist: 'Ayra Starr', url: 'https://music.163.com/song/media/outer/url?id=1990208030.mp3', id: '1990208030' },
    { name: "Won't Look Back", artist: 'Geowulf', url: 'https://music.163.com/song/media/outer/url?id=482386197.mp3', id: '482386197' },
    { name: 'Other Side', artist: 'PLAZA', url: 'https://music.163.com/song/media/outer/url?id=2093480642.mp3', id: '2093480642' },
    { name: 'Medieval', artist: 'FINNEAS', url: 'https://music.163.com/song/media/outer/url?id=1887215867.mp3', id: '1887215867' },
    { name: '巴适 (Bāshì)', artist: 'BikaBreezy, Jaytrue', url: 'https://music.163.com/song/media/outer/url?id=3346256265.mp3', id: '3346256265' },
    { name: 'Feel Good', artist: 'Polo & Pan', url: 'https://music.163.com/song/media/outer/url?id=1456602234.mp3', id: '1456602234' },
    { name: 'Swept Away', artist: 'Buddha Bar, Anna Naklab', url: 'https://music.163.com/song/media/outer/url?id=28798881.mp3', id: '28798881' },
    { name: 'Focus', artist: 'Sick Individuals', url: 'https://music.163.com/song/media/outer/url?id=468878947.mp3', id: '468878947' }
  ];

  // ---- APlayer 风格 CSS ----
  var css = [
    /* 右下角固定定位 */
    '#gmeek-player{',
      'position:fixed;right:24px;bottom:24px;z-index:10004;',
      'font-family:Arial,Helvetica,sans-serif;',
    '}',
    
    /* 播放器主体 */
    '#gmp-body{',
      'width:320px;background:#fff;',
      'border-radius:12px;',
      'box-shadow:0 8px 32px rgba(0,0,0,0.18);',
      'overflow:hidden;',
      'transition:all 0.3s ease;',
      'display:none;',
    '}',
    '#gmp-body.show{display:block;}',
    
    /* 顶部信息区 */
    '#gmp-header{',
      'position:relative;',
      'padding:14px 14px 10px;',
      'background:#fff;',
    '}',
    
    /* 封面图 */
    '#gmp-cover{',
      'position:absolute;left:14px;top:14px;',
      'width:46px;height:46px;',
      'background:linear-gradient(135deg,#8fb3a9,#7a9e96);',
      'border-radius:6px;',
      'display:flex;align-items:center;justify-content:center;',
      'overflow:hidden;',
    '}',
    '#gmp-cover.playing{animation:ap-cover-rotate 20s linear infinite;}',
    '@keyframes ap-cover-rotate{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}',
    '#gmp-cover svg{width:20px;height:20px;color:#fff;}',
    '#gmp-cover img{width:100%;height:100%;object-fit:cover;}',
    
    /* 歌曲信息 */
    '#gmp-info{margin-left:60px;min-height:46px;display:flex;flex-direction:column;justify-content:center;}',
    '#gmp-title{color:#333;font-size:14px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.4;}',
    '#gmp-artist{color:#999;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.4;margin-top:2px;}',
    
    /* 歌词按钮 */
    '#gmp-lyrics-btn{',
      'position:absolute;right:14px;top:50%;transform:translateY(-50%);',
      'background:none;border:none;cursor:pointer;color:#999;padding:4px;',
      'transition:color 0.2s;',
    '}',
    '#gmp-lyrics-btn:hover{color:#8fb3a9;}',
    '#gmp-lyrics-btn svg{width:16px;height:16px;}',
    '#gmp-lyrics-btn.active{color:#8fb3a9;}',
    
    /* 歌词面板（在信息区下方） */
    '#gmp-lyrics{',
      'max-height:0;overflow:hidden;',
      'transition:max-height 0.3s ease;',
      'background:#fafafa;',
    '}',
    '#gmp-lyrics.open{max-height:80px;overflow-y:auto;border-top:1px solid #eee;}',
    '#gmp-lyrics::-webkit-scrollbar{width:4px;}',
    '#gmp-lyrics::-webkit-scrollbar-thumb{background:#ddd;border-radius:2px;}',
    '#gmp-lyrics-inner{padding:8px 14px;text-align:center;font-size:13px;line-height:1.8;}',
    '.gmp-lrc{color:#666;cursor:pointer;transition:all 0.2s;padding:2px 0;}',
    '.gmp-lrc:hover{color:#333;}',
    '.gmp-lrc.active{color:#8fb3a9;font-weight:500;}',
    '.gmp-lrc.passive{color:#ccc;}',
    
    /* 进度条区域 */
    '#gmp-progress{padding:0 14px 8px;}',
    '#gmp-bar-wrap{height:2px;background:#eee;border-radius:1px;cursor:pointer;position:relative;}',
    '#gmp-bar{height:100%;background:#8fb3a9;border-radius:1px;width:0%;position:relative;}',
    '#gmp-bar::after{content:"";position:absolute;right:-6px;top:-5px;width:12px;height:12px;background:#8fb3a9;border-radius:50%;opacity:0;transition:opacity 0.2s;box-shadow:0 0 4px rgba(143,179,169,0.4);}',
    '#gmp-bar-wrap:hover #gmp-bar::after{opacity:1;}',
    
    /* 控制区 */
    '#gmp-controls{display:flex;align-items:center;padding:0 14px 10px;background:#fff;}',
    '#gmp-time{color:#999;font-size:11px;font-variant-numeric:tabular-nums;min-width:40px;}',
    '#gmp-btns{display:flex;align-items:center;gap:8px;flex:1;justify-content:center;}',
    '.gmp-btn{background:none;border:none;cursor:pointer;padding:6px;color:#666;transition:color 0.2s;border-radius:50%;}',
    '.gmp-btn:hover{color:#8fb3a9;}',
    '.gmp-btn svg{width:18px;height:18px;display:block;}',
    '.gmp-btn.play-btn svg{width:22px;height:22px;}',
    
    /* 音量 */
    '#gmp-vol{display:flex;align-items:center;margin-left:auto;}',
    '#gmp-vol-icon{cursor:pointer;color:#999;transition:color 0.2s;}',
    '#gmp-vol-icon:hover{color:#8fb3a9;}',
    '#gmp-vol-icon svg{width:16px;height:16px;}',
    '#gmp-vol-bar-wrap{width:60px;height:2px;background:#eee;border-radius:1px;margin-left:6px;cursor:pointer;}',
    '#gmp-vol-bar{height:100%;background:#8fb3a9;border-radius:1px;width:70%;}',
    
    /* 歌单列表 */
    '#gmp-list{',
      'max-height:0;overflow-y:auto;',
      'transition:max-height 0.3s ease;',
      'background:#fafafa;',
      'border-radius:0 0 12px 12px;',
    '}',
    '#gmp-list.open{max-height:200px;border-top:1px solid #eee;}',
    '#gmp-list::-webkit-scrollbar{width:4px;}',
    '#gmp-list::-webkit-scrollbar-thumb{background:#ddd;border-radius:2px;}',
    '.gmp-item{display:flex;align-items:center;padding:8px 14px;cursor:pointer;border-left:3px solid transparent;transition:all 0.15s;}',
    '.gmp-item:hover{background:#f0f0f0;}',
    '.gmp-item.playing{background:#f0f7f5;border-left-color:#8fb3a9;}',
    '.gmp-item-num{color:#ccc;font-size:12px;min-width:24px;font-variant-numeric:tabular-nums;}',
    '.gmp-item.playing .gmp-item-num{color:#8fb3a9;}',
    '.gmp-item-info{flex:1;min-width:0;}',
    '.gmp-item-name{color:#333;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '.gmp-item.playing .gmp-item-name{color:#8fb3a9;font-weight:500;}',
    '.gmp-item-artist{color:#999;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    
    /* Mini 切换按钮 */
    '#gmp-mini{',
      'position:absolute;left:-28px;top:50%;transform:translateY(-50%);',
      'width:28px;height:28px;border-radius:50%;',
      'background:linear-gradient(135deg,#8fb3a9,#7a9e96);',
      'border:none;cursor:pointer;',
      'display:flex;align-items:center;justify-content:center;',
      'box-shadow:-2px 0 8px rgba(143,179,169,0.4);',
      'transition:all 0.2s;',
    '}',
    '#gmp-mini:hover{box-shadow:-2px 0 12px rgba(143,179,169,0.6);transform:translateY(-50%) scale(1.05);}',
    '#gmp-mini svg{width:14px;height:14px;color:#fff;transition:transform 0.3s;}',
    '#gmp-mini.collapsed svg{transform:rotate(180deg);}',
    
    /* 移动端响应 */
    '@media(max-width:480px){',
      '#gmeek-player{right:8px;bottom:16px;}',
      '#gmp-body{width:calc(100vw - 52px);}',
    '}',
  ].join('');

  // ---- Inject Styles ----
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ---- Build UI ----
  var container = document.createElement('div');
  container.id = 'gmeek-player';

  container.innerHTML =
    '<div id="gmp-mini" title="展开播放器">' +
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>' +
    '</div>' +
    '<div id="gmp-body">' +
      '<div id="gmp-header">' +
        '<div id="gmp-cover"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg></div>' +
        '<div id="gmp-info">' +
          '<div id="gmp-title">Music</div>' +
          '<div id="gmp-artist">点击播放</div>' +
        '</div>' +
        '<button id="gmp-lyrics-btn" title="歌词">' +
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>' +
        '</button>' +
      '</div>' +
      '<div id="gmp-lyrics"><div id="gmp-lyrics-inner"></div></div>' +
      '<div id="gmp-progress"><div id="gmp-bar-wrap"><div id="gmp-bar"></div></div></div>' +
      '<div id="gmp-controls">' +
        '<span id="gmp-time">0:00</span>' +
        '<div id="gmp-btns">' +
          '<button class="gmp-btn" id="gmp-prev" title="上一首"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6V6zm3.5 6 8.5 6V6l-8.5 6z"/></svg></button>' +
          '<button class="gmp-btn play-btn" id="gmp-play" title="播放"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg></button>' +
          '<button class="gmp-btn" id="gmp-next" title="下一首"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zm2-12v12l6.5-6L8 6zm8 0v12h2V6h-2z"/></svg></button>' +
        '</div>' +
        '<div id="gmp-vol">' +
          '<span id="gmp-vol-icon" title="静音"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg></span>' +
          '<div id="gmp-vol-bar-wrap"><div id="gmp-vol-bar"></div></div>' +
        '</div>' +
      '</div>' +
      '<div id="gmp-list"></div>' +
    '</div>';

  document.body.appendChild(container);

  // ---- DOM Refs ----
  var bodyEl = document.getElementById('gmp-body');
  var miniBtn = document.getElementById('gmp-mini');
  var titleEl = document.getElementById('gmp-title');
  var artistEl = document.getElementById('gmp-artist');
  var coverEl = document.getElementById('gmp-cover');
  var playBtn = document.getElementById('gmp-play');
  var timeEl = document.getElementById('gmp-time');
  var barEl = document.getElementById('gmp-bar');
  var barWrap = document.getElementById('gmp-bar-wrap');
  var volBar = document.getElementById('gmp-vol-bar');
  var volBarWrap = document.getElementById('gmp-vol-bar-wrap');
  var volIcon = document.getElementById('gmp-vol-icon');
  var listEl = document.getElementById('gmp-list');
  var lyricsBtn = document.getElementById('gmp-lyrics-btn');
  var lyricsEl = document.getElementById('gmp-lyrics');
  var lyricsInner = document.getElementById('gmp-lyrics-inner');

  // ---- State ----
  var audio = new Audio();
  audio.volume = 0.7;
  var current = -1;
  var playing = false;
  var muted = false;
  var prevVol = 0.7;
  var songList = [];
  var lyricsData = [];
  var lyricLines = [];
  var playerOpen = false;

  // ---- Fetch playlist ----
  function fetchPlaylist(callback) {
    if (!NETEASE_PLAYLIST_ID) {
      callback(HARDCODED_SONGS);
      return;
    }
    var url = API_BASE + '?server=netease&type=playlist&id=' + encodeURIComponent(NETEASE_PLAYLIST_ID) + '&r=' + Math.random();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        try {
          var data = JSON.parse(xhr.responseText);
          if (data && data.data && data.data.length > 0) {
            callback(data.data.map(function (s) {
              return {
                id: String(s.id || ''),
                name: s.name || '未知歌曲',
                artist: s.artist || '未知歌手',
                url: s.url || 'https://music.163.com/song/media/outer/url?id=' + s.id + '.mp3',
                pic: s.pic || ''
              };
            }));
            return;
          }
        } catch (e) { }
      }
      callback(HARDCODED_SONGS);
    };
    xhr.onerror = function () { callback(HARDCODED_SONGS); };
    xhr.send();
  }

  // ---- Build playlist ----
  function buildList() {
    var html = '';
    for (var i = 0; i < songList.length; i++) {
      var s = songList[i];
      html += '<div class="gmp-item" data-i="' + i + '">' +
        '<span class="gmp-item-num">' + (i + 1) + '</span>' +
        '<div class="gmp-item-info">' +
          '<div class="gmp-item-name">' + esc(s.name) + '</div>' +
          '<div class="gmp-item-artist">' + esc(s.artist) + '</div>' +
        '</div>' +
      '</div>';
    }
    listEl.innerHTML = html;
    listEl.querySelectorAll('.gmp-item').forEach(function (item, idx) {
      item.addEventListener('click', function () { playSong(idx); });
    });
  }

  function esc(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // ---- LRC Parser ----
  function parseLRC(text) {
    if (!text) return [];
    var lines = text.split('\n');
    var result = [];
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line) continue;
      var textPart = line.substring(line.lastIndexOf(']') + 1).trim();
      if (!textPart) continue;
      var re = /\[(\d+):(\d+)(?:[.\:](\d+))?\]/g;
      var m;
      while ((m = re.exec(line)) !== null) {
        var time = parseInt(m[1]) * 60 + parseInt(m[2]) + (m[3] ? parseInt(m[3].substring(0, 2)) / 100 : 0);
        result.push({ time: time, text: textPart });
      }
    }
    return result.sort(function (a, b) { return a.time - b.time; });
  }

  // ---- Fetch lyrics (硬编码歌词) ----
  var HARDCODED_LYRICS = {
    '3317235944': "[00:00.000] 作词 : JVKE/ZVC\n[00:01.000] 作曲 : JVKE/ZVC\n[00:06.296]Hold me close\n[00:08.445]Look me dead in my eyes\n[00:09.711]Dead in my eyes\n[00:11.742]Till the day that I die\n[00:13.228]Dead inside\n[00:15.162]I just wanna feel alive\n[00:16.371]With you, I'm alive\n[00:18.479]With you, I'm alive\n[00:19.654]Fell in love, but it left me lonely\n[00:22.891]Tried to trust, but it burned me slowly\n[00:26.826]I didn't know what I was looking for\n[00:30.325]Till I found her\n[00:38.026]I found her\n[00:44.876]Without her\n[00:46.924]I'm a mess, there was nothing 'bout that love that made sense, I was stressed\n[00:51.219]Till I found her\n[00:56.387]\n[00:59.734]Found me lonely, lost, and only\n[01:03.046]One step away from just giving up slowly\n[01:06.411]I was a mess, I was afraid\n[01:07.825]I'd be the girl who just put up her walls no one could break\n[01:12.120]Till I found him\n[01:13.637]Running through the wild with 1/2 of a heart\n[01:16.265]Made me a whole one out of the parts\n[01:19.629]Suddenly, it's like I'm healed\n[01:21.227]Didn't know the love was real\n[01:23.078]Until I could\n[01:26.218]\n[01:26.370]Hold you close (Hold me close)\n[01:28.512]Look me dead in my eyes\n[01:29.646]Dead in my\n[01:31.952]Till the day that I die\n[01:33.003]Dead inside\n[01:35.259]I just wanna feel alive\n[01:36.538]With you, I'm alive\n[01:38.736]With you, I'm a—\n[01:39.710]Fell in love, but it left me lonely\n[01:42.869]Tried to trust, but it burned me slowly\n[01:46.813]I didn't know what I was looking for\n[01:50.363]Till I found her\n[01:57.983]I found her\n[02:04.498]Without her\n[02:06.790]I'm a mess, there was nothing 'bout that love that made sense, I was stressed\n[02:11.024]Till I found her\n[02:17.147]\n[02:17.261]And without her\n[02:20.598]I'm a mess, there was nothing 'bout that love that made sense, I was stressed\n[02:24.300]Till I found her\n[02:30.710]Till I found her\n[02:38.165]Ooh\n",
    '2626680545': "[00:00.000] 作词 : ZVC/Nick Jonas/JVKE/Andrew Fortier/Kevin Jonas/Joe Jonas\n[00:01.000] 作曲 : ZVC/Nick Jonas/JVKE/Andrew Fortier/Kevin Jonas/Joe Jonas\n[00:04.022] Seventeen\n[00:05.993] I had my first heartbreak and it was terrible\n[00:08.519] And I pray that it won't happen again\n[00:10.448] But then again I hope it does\n[00:12.215] Because I wanna fall in love\n[00:13.800] Without the part where we give up\n[00:15.530] I wonder if this still exists\n[00:17.183] I hope it does\n[00:18.296]\n[00:18.330] I wonder what it's like\n[00:20.714] How it feels to be loved by someone who'll never leave\n[00:24.344] I wanna know if you wanna be growing old with me\n[00:27.690]\n[00:27.713] Until were\n[00:28.796] Seventy\n[00:32.202] Dancing with me\n[00:35.049] Just passing the time\n[00:37.865] With you right by my side\n[00:41.357] Just stay with me\n[00:44.238] Promise you'll never leave\n[00:48.176] I wanna love you for the rest of my life\n[00:53.526] Until were seventy\n[00:57.118]\n[01:03.654] Baby I'm so into you\n[01:05.416] I've lived a thousand lives\n[01:07.034] Can't go a single night\n[01:08.619] Without you\n[01:09.855] You're more than a feeling\n[01:12.584] I think I'm ready for the real thing, yeah\n[01:15.737] And I want that love\n[01:17.025] That typa love\n[01:18.091] That's steady\n[01:18.988] Them kitchen hugs\n[01:20.183] Sentimental stuff\n[01:21.346] You get me\n[01:22.083] Everything I want and need (Everything I want and need)\n[01:25.165] I find it here with you and me, yeah\n[01:28.629]\n[01:29.214] I wonder what it's like\n[01:31.397] How it feels to be loved by someone who'll never leave\n[01:35.220] I wanna know if you wanna be growing old with me\n[01:38.460]\n[01:38.624] Until were\n[01:39.558] Seventy\n[01:43.059] Dancing with me\n[01:45.923] Just passing the time\n[01:48.613] With you right by my side\n[01:52.204] Just stay with me\n[01:55.126] Promise you'll never leave\n[01:59.082] I wanna love you for the rest of my life\n[02:04.468] Until were seventy, oooh\n[02:11.943]\n[02:12.182] I wanna love you for the rest of my life\n[02:17.228] Until were seventy\n[02:20.989] Promise you'll never leave\n[02:24.976] I wanna love you for the rest of my life\n[02:30.111] Until were seventy\n",
    '1990208030': "[00:00.00]暂无歌词\n",
    '482386197': "[00:00.00] 作词 : Star Kendrick, Toma Banjanin\n[00:01.00] 作曲 : Toma Banjanin/Star Kendrick\n[00:39.25]Time on my own I used to love\n[00:50.86]Kept it like a teenage secret crush\n[01:03.16]Now time alone's my living hell\n[01:14.43]Claimed it as if it was yours to own\n[01:23.38]Throw the water on the fire\n[01:26.84]This time, I'm too tired\n[01:29.52]Draw the horse before the cart\n[01:32.70]Took back my broken heart\n[01:35.40]Finally found your bottom line\n[01:38.69]You always change your mind\n[01:41.39]Find some peace in your parade\n[01:44.35]Kindly let me walk away\n[01:51.27]I won't look back\n[02:02.39]My restless sleep was once my own\n[02:13.52]Somehow you've been cast the major role\n[02:26.05]Can't help the tears that come at dawn\n[02:37.20]This time they won't stop me from movin' on\n[02:46.46]Throw the water on the fire\n[02:49.83]This time, I'm too tired\n[02:52.54]Draw the horse before the cart\n[02:55.81]Took back my broken heart\n[02:58.47]Finally found your bottom line\n[03:01.73]You always change your mind\n[03:04.33]Find some peace in your parade\n[03:07.23]Kindly let me walk away\n[03:14.31]I won't look back\n[03:25.66]I won't look back\n[03:33.06]My last relapse\n[03:39.23]I won't look back\n[03:44.82]My last relapse\n[03:50.69]I won't look back\n[03:56.51]My last relapse\n[04:02.83]I won't look back\n[04:08.21]My last relapse\n[04:14.26]I won't look back\n[04:19.46]I won't look back\n",
    '2093480642': "[00:00.000] 作曲 : Evan Miles/Dom Dias\n[00:11.232] The other side, yeah\n[00:19.864] Oh yeah, let's go\n[00:24.396]\n[00:25.476] They always told me I should leave her alone\n[00:31.516] The type of woman use your love and be gone\n[00:37.476] Word on the street is that she's heard about me\n[00:43.496] They said I'll see\n[00:46.247]\n[00:46.456] Whatever she wants\n[00:49.736] She can get\n[00:52.247] If you don't believe me\n[00:55.697] You haven't met her yet\n[00:58.257] Started with one look\n[01:02.219] In her deep brown eyes\n[01:05.429] Woulda lived a thousand lives\n[01:09.152] Just to get\n[01:10.891]\n[01:11.071] My hands on you\n[01:17.011] I fell into\n[01:23.195] This spell you do\n[01:29.067] Girl I'm right behind\n[01:31.770] See what's on the other side\n[01:37.345]\n[01:37.734] She looked at me like I was nothing but prey\n[01:43.565] My mind said leave her but my body betrayed\n[01:49.494] To think my baby's all alone in our bed\n[01:54.465] I said I was wrong, I know\n[01:58.196]\n[01:58.356] Whatever she wants\n[02:01.896] She can get\n[02:04.196] If you don't believe me\n[02:07.807] You haven't met her yet\n[02:10.208] Started with one look\n[02:14.208] In her deep brown eyes\n[02:17.370] By the time I realized\n[02:21.206] Girl I had\n[02:23.056]\n[02:23.216] My hands on you\n[02:27.319] (I don't care what they say)\n[02:29.107] I fell into\n[02:33.120] (I would risk it all tonight)\n[02:35.036] This spell you do\n[02:39.321] (Somethin' about ya)\n[02:40.906] Girl I'm right behind\n[02:43.766] Don't care if I don't survive\n[02:48.029]\n[02:48.218] Give it up, all to me\n[02:50.240] Give it up, give it all, all to me (Give it up)\n[02:54.006] And we touch and we love, all to me (That's right)\n[02:56.629] Give it up, get it down, all (Oh, yeah)\n[03:00.209] Beat it up, over me\n[03:02.751] Beat it up, let it cum, over me\n[03:05.141] Girl I'm right behind\n[03:07.611] See what's on the other side\n",
    '1887215867': "[00:00.000] 作词 : FINNEAS\n[00:00.011] 作曲 : FINNEAS\n[00:00.022]It feels a little medieval if you ask me\n[00:04.283]Like I'm watchin' a sequel I've already seen\n[00:08.459]I could tell you what happens to the new king\n[00:12.704]When he goes out of fashion\n[00:15.255]\n[00:16.740]I want my money back now-ow\n[00:21.001]I've been in the wrong crowd-owd\n[00:24.940]I'd never say it out loud-oud\n[00:29.175]But I've hated every word that comes out of your mouth\n[00:33.249]What should we fight about this time?\n[00:37.383]What will you write about this time?\n[00:41.555]What does it matter if you're not fine?\n[00:45.696]You should've kept that shit offline\n[00:49.188]\n[00:49.908]It feels a little medieval if you ask me\n[00:54.423]Like I'm watchin' a sequel I've already seen\n[00:58.415]I could tell you what happens to the new king\n[01:02.694]When he goes out of fashion\n[01:06.683]It feels a little medieval kissin' the ring\n[01:10.966]In a gothic cathedral, have you ever seen\n[01:15.499]What really happens to people like me\n[01:19.413]When we go out of fashion?\n[01:22.490]\n[01:23.391]They're gonna tear you from your pedestal, it's almost inevitable\n[01:28.441]I'm not bein' cynical, it's so unoriginal\n[01:32.322]If you get political, they'll make you a criminal\n[01:36.490]It's all a bit biblical\n[01:40.058]Don't put your camera down\n[01:44.144]You don't go to heaven in a crown\n[01:48.222]It's not worth the money bringin' me back from the dead\n[01:56.742]I never said it would be any fun\n[02:01.084]You never should've trusted anyone\n[02:06.106]They'll love you til' they know you're done\n[02:09.449]And then it's off with his head\n[02:13.331]\n[02:13.484]It feels a little medieval if you ask me\n[02:17.895]Like I'm watchin' a sequel I've already seen\n[02:21.880]I could tell you what happens to the new king\n[02:26.203]When he goes out of fashion\n[02:30.051]It feels a little medieval kissin' the ring\n[02:34.446]In a gothic cathedral, have you ever seen\n[02:39.004]What really happens to people like me\n[02:42.830]When we go out of fashion?\n",
    '3346256265': "[00:00.00] 作词Lyricist : BikaBreezy/Jaytrue/Nikita\n[00:01.00] 作曲Composer : BikaBreezy/Jaytrue/Nikita\n[00:02.00] 编曲Arranger : MossW友友\n[00:03.00] 混音Mixing Engineer : Nikita\n[00:04.00] 母带Mastering Engineer : Nikita\n[00:05.00] 出品方Production Company : NorthGate Music\n[00:06.00] OP : NorthGate Music\n[00:07.00] SP : 秀动发行ShowstartRelease\n[00:17.71]City makes my body move\n[00:21.43]Creating vibe, breaking rules\n[00:25.70]Aaah-ah-eh\n[00:32.08]Everyday I wake up with my mindful thoughts\n[00:34.33]Not wasting time I got a better plan\n[00:36.66]Your body is so motivational\n[00:38.27]I just wanna work it out to make you laugh\n[00:40.24]Locked up\n[00:41.49]On my shot\n[00:42.49]Now you can see me a shining star\n[00:44.05]Wop wop\n[00:45.25]More guap\n[00:46.61]Without a pain, you can't reach the top\n[00:47.91]we dey active\n[00:49.73]body dey move so attractive\n[00:51.49]我感觉巴适\n[00:52.97]她感觉巴适\n[00:55.15]we dey active\n[00:57.76]body dey move so attractive\n[00:59.86]我感觉巴适\n[01:01.31]她感觉巴适\n[01:18.68]巴巴\n[01:28.35]巴巴\n[01:36.07]出门别忘涂防晒\n[01:37.70]Light dey glow for my line\n[01:39.51]所有烦恼 leave behind\n[01:41.03]上天保佑我们来财\n[01:43.69]她扭动着她的腰\n[01:45.41]像雕刻般一样完美\n[01:47.41]节奏在跳动\n[01:49.53]Every show, we redefine\n[01:51.63]我相信这不是运气\n[01:54.41]No fit stop my melody\n[01:56.75]我的旋律无人能敌\n[01:58.44]Now we dey live reality\n[02:00.67]reality\n[02:08.28]we dey active\n[02:09.81]body dey move so attractive\n[02:11.44]我感觉巴适\n[02:13.46]她感觉巴适\n[02:15.77]we dey active\n[02:17.66]body dey move so attractive\n[02:19.69]我感觉巴适\n[02:21.65]她感觉巴适\n[02:24.06]巴巴\n[02:32.65]巴巴\n",
    '1456602234': "[00:00.000] 作词 : Paul Armand-Delille/Alexandre Grynszpan\n[00:01.000] 作曲 : Paul Armand-Delille/Alexandre Grynszpan\n[00:21.893] Feeling the spring, crisp morning light\n[00:25.029] Tingle you get, love at first sight\n[00:27.396] Moment of grace just feels so right\n[00:30.049] People you love, worth every fight\n[00:32.623] Wanna rejoice, beauty of life\n[00:34.999] Embrace the game, natural smile\n[00:37.314] Breathing in deep, clocked in with style\n[00:40.035] Sometimes you just wanna\n[00:42.241] Feel good, feel good (You know I like to)\n[00:44.632] Feel good, feel good (Oh why won't we)\n[00:47.093] Feel good, feel good (It's high time you)\n[00:49.385] Feel good, feel good (Don't you wanna)\n[00:51.919] Feel good, feel good (It's so good to)\n[00:54.514] Feel good, feel good (We could really)\n[00:56.871] Feel good, feel good (I love it when you)\n[00:59.519] Feel good, feel good (Hit it)\n[01:21.862] One for the fam, two for the team\n[01:24.840] Three for the gift, love supreme\n[01:27.363] Stay on the point, got self-esteem\n[01:29.903] Doing my thing, feeling pristine\n[01:32.412] Under the stars, young evergreen\n[01:34.979] Long summer nights, living the dream\n[01:37.388] Keeping it fresh, avoiding routine\n[01:39.845] Sometimes you just wanna\n[01:42.292] Feel good, feel good (You know I like to)\n[01:44.667] Feel good, feel good (Oh why won't we)\n[01:46.992] Feel good, feel good (It's high time you)\n[01:49.349] Feel good, feel good (Don't you wanna)\n[01:51.775] Feel good, feel good (It's so good to)\n[01:54.446] Feel good, feel good (We could really)\n[01:57.102] Feel good, feel good (I love it when you)\n[01:59.568] Feel good, feel good (Hit it)\n[02:21.897] Feels\n[02:22.658] (feel good, feel good)\n[02:24.347] So\n[02:25.741] (feel good, feel good)\n[02:27.571] Good\n[02:28.835] (feel good, feel good)\n[02:29.870] (feel good, feel good)\n[02:31.565] Feels so good to me\n[02:32.882] (feel good, feel good)\n[02:34.126] So\n[02:35.642] (feel good, feel good)\n[02:36.700] Good\n[02:37.903] (feel good, feel good)\n[02:39.216] (feel good, feel good)\n[02:41.245] Hit it\n[02:45.171] Every single day\n[02:49.712] We can find a way\n[02:54.392] We'll never go astray\n[02:57.063] We are here to play\n[03:04.117] Every night and day\n[03:07.921] The love will come our way\n[03:13.276] Nothing else we say\n[03:16.256] Can fade away\n",
    '28798881': "[00:17]You are on with your life\n[00:19]Not behind\n[00:21]Behind the scenes on the street\n[00:29]This shadow is broken\n[00:30]Swept away\n[00:31]Swept away\n[00:33]Swept away\n[02:23]You are on with your life\n[02:25]Not behind\n[02:27]Behind the scenes on the street\n[02:30]This shadow is broken\n[02:54]Downstairs, the animals are dancing\n[04:04]You are on with your life\n[04:06]Not behind\n[04:09]Behind the scenes on the street\n[04:17]This shadow is broken\n[04:19]Swept away\n[04:19]Swept away\n[04:21]Swept away\n[04:27]Inviting some people\n[04:31]Cheap trick\n[04:35]Aligning your back\n[04:37]It's all to, to see\n[04:43]Trust your body and your head\n",
    '468878947': "[00:07.43] Foucus\n[00:21.37] Raise your hands up in the...\n[01:00.05] Raise your hands up\n[01:03.78] Focus! Raise your hands up\n[01:07.88] And focus! Raise your hands up\n[01:11.22] Focus! And raise your hands up\n[01:15.85] Raise your hands up in the air\n[01:31.10] Raise your hands up in the air...air... x2\n[01:38.50] Raise your hands up in the air...air...air... x2\n[01:45.83] Raise your hands up in the...\n[02:03.36] Raise your hands up...\n[02:10.51] Raise your...\n[02:15.82] Raise your hands up in the...\n[02:46.01] Raise your hands uo in the air...air...x2\n[02:54.39] Focus\n",
  };

  function fetchLyric(songId, cb) {
    if (!songId) { cb(''); return; }
    if (HARDCODED_LYRICS[songId]) {
      cb(HARDCODED_LYRICS[songId]);
      return;
    }
    cb('[00:00.00]暂无歌词')\n\n    function buildLyrics(text) {
    lyricsData = parseLRC(text);
    if (!lyricsData.length) {
      lyricsInner.innerHTML = '<div class="gmp-lrc" style="color:#999;">暂无歌词</div>';
      return;
    }
    var html = '';
    for (var i = 0; i < lyricsData.length; i++) {
      html += '<div class="gmp-lrc" data-i="' + i + '">' + esc(lyricsData[i].text) + '</div>';
    }
    lyricsInner.innerHTML = html;
    lyricLines = lyricsInner.querySelectorAll('.gmp-lrc');
    lyricLines.forEach(function (el, idx) {
      el.addEventListener('click', function () {
        if (audio.duration && lyricsData[idx]) {
          audio.currentTime = lyricsData[idx].time;
        }
      });
    });
  }

  function updateLyrics() {
    if (!lyricsData.length) return;
    var t = audio.currentTime || 0;
    var active = -1;
    for (var i = lyricsData.length - 1; i >= 0; i--) {
      if (t >= lyricsData[i].time) { active = i; break; }
    }
    for (var j = 0; j < lyricLines.length; j++) {
      lyricLines[j].classList.remove('active', 'passive');
      if (j === active) {
        lyricLines[j].classList.add('active');
        var st = lyricLines[j].offsetTop - lyricsEl.clientHeight / 2 + lyricLines[j].clientHeight / 2;
        lyricsEl.scrollTop = st;
      } else if (j < active) {
        lyricLines[j].classList.add('passive');
      }
    }
  }

  // ---- Play song ----
  function playSong(idx) {
    if (idx < 0 || idx >= songList.length) return;
    current = idx;
    var s = songList[idx];
    audio.src = s.url;
    audio.load();
    titleEl.textContent = s.name;
    artistEl.textContent = s.artist;
    barEl.style.width = '0%';
    timeEl.textContent = '0:00';
    
    // Update list highlight
    listEl.querySelectorAll('.gmp-item').forEach(function (item, i) {
      item.classList.toggle('playing', i === idx);
    });
    
    // Fetch lyrics
    fetchLyric(s.id || '', buildLyrics);
    
    // Play
    audio.play().catch(function () { });
    playing = true;
    updatePlayIcon();
  }

  function updatePlayIcon() {
    playBtn.innerHTML = playing
      ? '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>';
    coverEl.classList.toggle('playing', playing);
  }

  // ---- Controls ----
  playBtn.addEventListener('click', function () {
    if (current === -1) { playSong(0); return; }
    if (playing) { audio.pause(); playing = false; }
    else { audio.play().catch(function () { }); playing = true; }
    updatePlayIcon();
  });

  document.getElementById('gmp-prev').addEventListener('click', function () {
    playSong((current - 1 + songList.length) % songList.length);
  });

  document.getElementById('gmp-next').addEventListener('click', function () {
    playSong((current + 1) % songList.length);
  });

  // ---- Progress ----
  audio.addEventListener('timeupdate', function () {
    if (!audio.duration) return;
    barEl.style.width = (audio.currentTime / audio.duration * 100) + '%';
    var m = Math.floor(audio.currentTime / 60);
    var s = Math.floor(audio.currentTime % 60);
    timeEl.textContent = m + ':' + (s < 10 ? '0' : '') + s;
    updateLyrics();
  });

  audio.addEventListener('ended', function () {
    playSong((current + 1) % songList.length);
  });

  // ---- Seek ----
  barWrap.addEventListener('click', function (e) {
    if (!audio.duration) return;
    var rect = barWrap.getBoundingClientRect();
    var pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = pct * audio.duration;
  });

  // ---- Volume ----
  volIcon.addEventListener('click', function () {
    if (muted) {
      audio.volume = prevVol;
      muted = false;
      volBar.style.width = (prevVol * 100) + '%';
    } else {
      prevVol = audio.volume;
      audio.volume = 0;
      muted = true;
      volBar.style.width = '0%';
    }
  });

  volBarWrap.addEventListener('click', function (e) {
    var rect = volBarWrap.getBoundingClientRect();
    var pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.volume = pct;
    volBar.style.width = (pct * 100) + '%';
    muted = false;
  });

  // ---- Toggle player ----
  miniBtn.addEventListener('click', function () {
    playerOpen = !playerOpen;
    bodyEl.classList.toggle('show', playerOpen);
    miniBtn.classList.toggle('collapsed', !playerOpen);
    miniBtn.title = playerOpen ? '收起播放器' : '展开播放器';
  });

  // ---- Toggle lyrics ----
  lyricsBtn.addEventListener('click', function () {
    lyricsEl.classList.toggle('open');
    lyricsBtn.classList.toggle('active', lyricsEl.classList.contains('open'));
  });

  // ---- Toggle list (click header) ----
  document.getElementById('gmp-header').addEventListener('click', function (e) {
    if (e.target.closest('#gmp-lyrics-btn')) return;
    listEl.classList.toggle('open');
  });

  // ---- Init ----
  fetchPlaylist(function (songs) {
    songList = songs;
    buildList();
    console.log('[GmeekMusic] Loaded', songs.length, 'songs');
  });

})();

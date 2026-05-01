/**
 * Gmeek Music Player v9 - 35首歌单 + 每首封面图
 * 纯 HTML5 Audio, 无 eval/new Function, 兼容 GitHub Pages CSP
 * 歌单: 网易云 2829816518 (私人雷达)
 */
(function () {
  'use strict';

  function initPlayer() {

  var HARDCODED_SONGS = [
    { name: 'her (feat. Annika Wells)', artist: 'JVKE/Annika Wells', url: 'https://music.163.com/song/media/outer/url?id=3317235944.mp3', cover: 'https://p2.music.126.net/KJIXaBfUQv7nmnnJCSPiqA==/109951172273049443.jpg', id: '3317235944' },
    { name: 'this is what forever feels like', artist: 'JVKE/Nick Jonas', url: 'https://music.163.com/song/media/outer/url?id=2626680545.mp3', cover: 'https://p2.music.126.net/eJA1NzXbOWokvs6yi2ttJg==/109951169956527578.jpg', id: '2626680545' },
    { name: 'Rush', artist: 'Ayra Starr', url: 'https://music.163.com/song/media/outer/url?id=1990208030.mp3', cover: 'https://p2.music.126.net/y6RIRDMrpKwekRF4CkfUGw==/109951167975291823.jpg', id: '1990208030' },
    { name: "Won't Look Back", artist: 'Geowulf', url: 'https://music.163.com/song/media/outer/url?id=482386197.mp3', cover: 'https://p2.music.126.net/11ZxgSWVXuJLJOg3SlAAXg==/109951163409413347.jpg', id: '482386197' },
    { name: 'Bloody Samaritan', artist: 'Ayra Starr', url: 'https://music.163.com/song/media/outer/url?id=1862884117.mp3', cover: 'https://p2.music.126.net/OrWPWJNAXCUNa79X0xD_Wg==/109951168618792235.jpg', id: '1862884117' },
    { name: 'Other Side', artist: 'PLAZA', url: 'https://music.163.com/song/media/outer/url?id=2093480642.mp3', cover: 'https://p2.music.126.net/oUU_Tw9FTjZSMZ7HHu6_VQ==/109951169004973551.jpg', id: '2093480642' },
    { name: 'Medieval', artist: 'FINNEAS', url: 'https://music.163.com/song/media/outer/url?id=1887215867.mp3', cover: 'https://p2.music.126.net/RFxgjunlII7caFc5XFCetQ==/109951167923009398.jpg', id: '1887215867' },
    { name: 'Empire State Of Mind (Feat. Alicia Keys)', artist: 'JAY-Z', url: 'https://music.163.com/song/media/outer/url?id=5103610.mp3', cover: 'https://p2.music.126.net/iV2Fe8OfVFsDoxt82FXAUg==/2532175279105513.jpg', id: '5103610' },
    { name: 'Billboard', artist: 'Jonas Blue/陈梓童', url: 'https://music.163.com/song/media/outer/url?id=1409157146.mp3', cover: 'https://p2.music.126.net/PaWg8EMJitPZzG9Dl54ljA==/109951164544621349.jpg', id: '1409157146' },
    { name: 'Freak Me', artist: 'Silk', url: 'https://music.163.com/song/media/outer/url?id=406072619.mp3', cover: 'https://p2.music.126.net/DIit3NPDp9nkF-U2-KKaGg==/3276544661546205.jpg', id: '406072619' },
    { name: 'What to Do', artist: 'Buddha Bar', url: 'https://music.163.com/song/media/outer/url?id=28798879.mp3', cover: 'https://p2.music.126.net/c10aknadyrJsk2PgKxXIwg==/5895581348442627.jpg', id: '28798879' },
    { name: 'Real Fake (Remix)', artist: 'Migos', url: 'https://music.163.com/song/media/outer/url?id=3332143952.mp3', cover: 'https://p2.music.126.net/yuJYD00QUbWRxvYwN0eTNg==/109951172483717933.jpg', id: '3332143952' },
    { name: 'Swept Away', artist: 'Buddha Bar/Anna Naklab', url: 'https://music.163.com/song/media/outer/url?id=28798881.mp3', cover: 'https://p2.music.126.net/c10aknadyrJsk2PgKxXIwg==/5895581348442627.jpg', id: '28798881' },
    { name: 'control', artist: 'Shura', url: 'https://music.163.com/song/media/outer/url?id=1344609215.mp3', cover: 'https://p2.music.126.net/PrOe_0e8G4QJpUwkZU4beg==/109951164109253820.jpg', id: '1344609215' },
    { name: 'Breath Away', artist: 'Duffy', url: 'https://music.163.com/song/media/outer/url?id=17368871.mp3', cover: 'https://p2.music.126.net/s4uKXpw8lcIDyFHxAsHLYg==/109951169237259283.jpg', id: '17368871' },
    { name: "AKA... What a Life!", artist: "Noel Gallagher's High Flying Birds", url: 'https://music.163.com/song/media/outer/url?id=27971879.mp3', cover: 'https://p2.music.126.net/1vc2AYyYBjQ8BY78joBDMw==/6665239488611808.jpg', id: '27971879' },
    { name: '云中加冕The Crown In The Clouds', artist: '江上青山JasonYama', url: 'https://music.163.com/song/media/outer/url?id=2084376965.mp3', cover: 'https://p2.music.126.net/Y2dAMDGKRFC4JGzDolJaGQ==/109951168933322029.jpg', id: '2084376965' },
    { name: 'What Does It Mean to You', artist: 'Carpetman', url: 'https://music.163.com/song/media/outer/url?id=2643514137.mp3', cover: 'https://p2.music.126.net/IzACfhjYrFJC3IRz-7Cf0A==/109951170121359445.jpg', id: '2643514137' },
    { name: 'Little Bit Better', artist: 'Caleb Hearn/ROSIE', url: 'https://music.163.com/song/media/outer/url?id=2122825009.mp3', cover: 'https://p2.music.126.net/-FbZQ3-XGtOR_gZTDlKE0w==/109951169315119570.jpg', id: '2122825009' },
    { name: 'I Still Want Your Love (feat. Jinnie)', artist: 'Sam Ock/Jinnie', url: 'https://music.163.com/song/media/outer/url?id=1979192239.mp3', cover: 'https://p2.music.126.net/iWgsGVhmR9Xtoo64DnZiCA==/109951167852411976.jpg', id: '1979192239' },
    { name: 'Every Summertime', artist: 'NIKI', url: 'https://music.163.com/song/media/outer/url?id=2149062755.mp3', cover: 'https://p2.music.126.net/pnxyZHscvnvycqaDcTz9SA==/109951169527798285.jpg', id: '2149062755' },
    { name: 'airplane mode', artist: 'limbo', url: 'https://music.163.com/song/media/outer/url?id=1322132356.mp3', cover: 'https://p2.music.126.net/YcpeNdOncvCvcSrSbTL1lg==/109951163640131408.jpg', id: '1322132356' },
    { name: 'Say Goodbye', artist: 'LODONI', url: 'https://music.163.com/song/media/outer/url?id=2059084604.mp3', cover: 'https://p2.music.126.net/iMlioJMh4guMubsXfFkEPg==/109951168701784147.jpg', id: '2059084604' },
    { name: 'Home (feat. Hikaru Utada)', artist: 'Charlie Puth/宇多田ヒカル', url: 'https://music.163.com/song/media/outer/url?id=3356494231.mp3', cover: 'https://p2.music.126.net/c2G0FTms0rBDSOhwgVR_DA==/109951172848276304.jpg', id: '3356494231' },
    { name: 'Nope your too late i already died', artist: 'wifiskeleton', url: 'https://music.163.com/song/media/outer/url?id=2638616976.mp3', cover: 'https://p2.music.126.net/AGu0IzFGYtOl4FyClLr8zQ==/109951170064566307.jpg', id: '2638616976' },
    { name: 'The Other Side Of Paradise', artist: 'Glass Animals', url: 'https://music.163.com/song/media/outer/url?id=2668934341.mp3', cover: 'https://p2.music.126.net/d4p6xGUMSD5nHkCOoQWR1Q==/109951170419210505.jpg', id: '2668934341' },
    { name: 'Paris in the Rain', artist: 'Lauv', url: 'https://music.163.com/song/media/outer/url?id=518904648.mp3', cover: 'https://p2.music.126.net/4Xf4fRbDc2N30rShLT_irQ==/18251893021647481.jpg', id: '518904648' },
    { name: '2 soon', artist: 'keshi', url: 'https://music.163.com/song/media/outer/url?id=1303019276.mp3', cover: 'https://p2.music.126.net/xB31iMXB9XwzStrPQzcrdw==/109951168789057630.jpg', id: '1303019276' },
    { name: 'Nothing On You', artist: 'B.o.B/Bruno Mars', url: 'https://music.163.com/song/media/outer/url?id=5100769.mp3', cover: 'https://p2.music.126.net/LpNeJdD3VtiThH5uIi62Hg==/1698745464926789.jpg', id: '5100769' },
    { name: 'phone kisses +', artist: 'suhmeduh', url: 'https://music.163.com/song/media/outer/url?id=3343637146.mp3', cover: 'https://p2.music.126.net/ZhY2QhNO3zY-9ID7Tfsfig==/109951172651476790.jpg', id: '3343637146' },
    { name: 'Off The Hook', artist: 'Jeff Jarvis', url: 'https://music.163.com/song/media/outer/url?id=2673161004.mp3', cover: 'https://p2.music.126.net/4gbH3_RAl-QoImhVHanrVQ==/109951171332135140.jpg', id: '2673161004' },
    { name: 'I Love You 3000', artist: 'Stephanie Poetri', url: 'https://music.163.com/song/media/outer/url?id=1374446646.mp3', cover: 'https://p2.music.126.net/9RNRp5dkqfgUu8CLEfEwlQ==/109951170496839853.jpg', id: '1374446646' },
    { name: 'Duvet', artist: 'B\u00f4a', url: 'https://music.163.com/song/media/outer/url?id=2025068890.mp3', cover: 'https://p2.music.126.net/U2yOmD0b2obHE0FBpBWEbQ==/109951168400421481.jpg', id: '2025068890' },
    { name: 'intentions', artist: 'Starfall', url: 'https://music.163.com/song/media/outer/url?id=2149780504.mp3', cover: 'https://p2.music.126.net/u8aU_s-CUvytJlgrkFwRLA==/109951169533927512.jpg', id: '2149780504' },
    { name: 'Dark', artist: 'mixed matches', url: 'https://music.163.com/song/media/outer/url?id=1407789513.mp3', cover: 'https://p2.music.126.net/41cYmse7QDlb-G9_0aN4hA==/109951168881039362.jpg', id: '1407789513' }
  ];

  // ---- CSS ----
  var css = [
    /* 右下角固定定位 */
    '#gmeek-player{position:fixed;right:24px;bottom:24px;z-index:10004;font-family:Arial,Helvetica,sans-serif;}',

    /* 播放器主体 */
    '#gmp-body{width:320px;background:#fff;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.18);overflow:hidden;transition:all 0.3s ease;display:none;}',
    '#gmp-body.show{display:block;}',

    /* 顶部信息区 */
    '#gmp-header{position:relative;padding:14px 14px 10px;background:#fff;cursor:pointer;}',

    /* 封面图 */
    '#gmp-cover{position:absolute;left:14px;top:14px;width:46px;height:46px;background:linear-gradient(135deg,#8fb3a9,#7a9e96);border-radius:6px;display:flex;align-items:center;justify-content:center;overflow:hidden;}',
    '#gmp-cover.playing{animation:ap-cover-rotate 20s linear infinite;}',
    '@keyframes ap-cover-rotate{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}',
    '#gmp-cover svg{width:20px;height:20px;color:#fff;}',
    '#gmp-cover img{width:100%;height:100%;object-fit:cover;}',

    /* 歌曲信息 */
    '#gmp-info{margin-left:60px;min-height:46px;display:flex;flex-direction:column;justify-content:center;}',
    '#gmp-title{color:#333;font-size:14px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.4;}',
    '#gmp-artist{color:#999;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.4;margin-top:2px;}',

    /* 歌词按钮 */
    '#gmp-lyrics-btn{position:absolute;right:14px;top:4px;transform:none;background:none;border:none;cursor:pointer;color:#999;padding:4px;transition:color 0.2s;}',
    '#gmp-lyrics-btn:hover{color:#8fb3a9;}',
    '#gmp-lyrics-btn svg{width:16px;height:16px;}',
    '#gmp-lyrics-btn.active{color:#8fb3a9;}',

    /* 悬浮歌词面板 */
    '#gmp-lyrics-float{position:absolute;bottom:100%;left:0;right:0;margin-bottom:8px;background:rgba(255,255,255,0.97);border-radius:12px;box-shadow:0 -4px 20px rgba(0,0,0,0.12);max-height:240px;overflow-y:auto;display:none;backdrop-filter:blur(8px);}',
    '#gmp-lyrics-float.show{display:block;}',
    '#gmp-lyrics-float::-webkit-scrollbar{width:4px;}',
    '#gmp-lyrics-float::-webkit-scrollbar-thumb{background:#ddd;border-radius:2px;}',
    '#gmp-lyrics-inner{padding:12px 14px;text-align:center;font-size:13px;line-height:2;}',
    '.gmp-lrc{color:#666;cursor:pointer;transition:all 0.2s;padding:2px 0;}',
    '.gmp-lrc:hover{color:#333;}',
    '.gmp-lrc.active{color:#8fb3a9;font-weight:500;font-size:14px;}',
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
    '#gmp-list{max-height:0;overflow-y:auto;transition:max-height 0.3s ease;background:#fafafa;border-radius:0 0 12px 12px;}',
    '#gmp-list.open{max-height:320px;border-top:1px solid #eee;}',
    '#gmp-list::-webkit-scrollbar{width:4px;}',
    '#gmp-list::-webkit-scrollbar-thumb{background:#ddd;border-radius:2px;}',
    '.gmp-item{display:flex;align-items:center;padding:8px 14px;cursor:pointer;border-left:3px solid transparent;transition:all 0.15s;}',
    '.gmp-item:hover{background:#f0f0f0;}',
    '.gmp-item.playing{background:#f0f7f5;border-left-color:#8fb3a9;}',
    '.gmp-item-cover{width:32px;height:32px;border-radius:4px;overflow:hidden;flex-shrink:0;margin-right:10px;background:#eee;}',
    '.gmp-item-cover img{width:100%;height:100%;object-fit:cover;}',
    '.gmp-item-info{flex:1;min-width:0;}',
    '.gmp-item-name{color:#333;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '.gmp-item.playing .gmp-item-name{color:#8fb3a9;font-weight:500;}',
    '.gmp-item-artist{color:#999;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',

    /* Mini 切换按钮 */
    '#gmp-mini{position:absolute;left:-38px;top:50%;transform:translateY(-50%);width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#8fb3a9,#7a9e96);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:-2px 0 8px rgba(143,179,169,0.4);transition:all 0.2s;}',
    '#gmp-mini:hover{box-shadow:-2px 0 12px rgba(143,179,169,0.6);transform:translateY(-50%) scale(1.05);}',
    '#gmp-mini svg{width:20px;height:20px;color:#fff;transition:transform 0.3s;}',
    '#gmp-mini.collapsed svg{transform:rotate(180deg);}',

    /* 移动端响应 */
    '@media(max-width:480px){#gmeek-player{right:8px;bottom:16px;}#gmp-body{width:calc(100vw - 52px);}}',
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
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>' +
    '</div>' +
    '<div id="gmp-body">' +
      '<div id="gmp-lyrics-float"><div id="gmp-lyrics-inner"></div></div>' +
      '<div id="gmp-header">' +
        '<div id="gmp-cover"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg></div>' +
        '<div id="gmp-info">' +
          '<div id="gmp-title">私人雷达</div>' +
          '<div id="gmp-artist">35首 · 点击播放</div>' +
        '</div>' +
        '<button id="gmp-lyrics-btn" title="歌词">' +
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>' +
        '</button>' +
      '</div>' +
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
  var lyricsFloat = document.getElementById('gmp-lyrics-float');
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
  var lyricsOpen = false;

  // ---- Build playlist ----
  function buildList() {
    var html = '';
    for (var i = 0; i < songList.length; i++) {
      var s = songList[i];
      html += '<div class="gmp-item" data-i="' + i + '">' +
        '<div class="gmp-item-cover"><img src="' + esc(s.cover) + '" loading="lazy" alt=""></div>' +
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

  function buildLyrics(text) {
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
    if (!lyricsData.length || !lyricsOpen) return;
    var t = audio.currentTime || 0;
    var active = -1;
    for (var i = lyricsData.length - 1; i >= 0; i--) {
      if (t >= lyricsData[i].time) { active = i; break; }
    }
    for (var j = 0; j < lyricLines.length; j++) {
      lyricLines[j].classList.remove('active', 'passive');
      if (j === active) {
        lyricLines[j].classList.add('active');
        var st = lyricLines[j].offsetTop - lyricsFloat.clientHeight / 2 + lyricLines[j].clientHeight / 2;
        lyricsFloat.scrollTop = st;
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

    // Update cover image
    if (s.cover) {
      coverEl.innerHTML = '<img src="' + esc(s.cover) + '" alt="">';
    } else {
      coverEl.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>';
    }

    // Update list highlight
    listEl.querySelectorAll('.gmp-item').forEach(function (item, i) {
      item.classList.toggle('playing', i === idx);
    });

    // Clear lyrics (no hardcoded lyrics for new playlist)
    lyricsInner.innerHTML = '<div class="gmp-lrc" style="color:#999;">暂无歌词</div>';
    lyricsData = [];

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

  // ---- Toggle floating lyrics ----
  lyricsBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    lyricsOpen = !lyricsOpen;
    lyricsFloat.classList.toggle('show', lyricsOpen);
    lyricsBtn.classList.toggle('active', lyricsOpen);
  });

  // ---- Toggle list (click header) ----
  document.getElementById('gmp-header').addEventListener('click', function (e) {
    if (e.target.closest('#gmp-lyrics-btn')) return;
    listEl.classList.toggle('open');
  });

  // ---- Init ----
  songList = HARDCODED_SONGS;
  buildList();
  console.log('[GmeekMusic] Loaded', songList.length, 'songs');

  } // end initPlayer()

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlayer);
  } else {
    initPlayer();
  }

})();

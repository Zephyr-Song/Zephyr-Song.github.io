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

  // ---- Fetch lyrics (网易云官方API) ----
  function fetchLyric(songId, cb) {
    if (!songId) { cb(''); return; }
    var url = 'https://music.163.com/api/song/lyric?id=' + encodeURIComponent(songId) + '&lv=1&kv=1&tv=-1';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.timeout = 8000;
    xhr.onload = function () {
      if (xhr.status === 200) {
        try {
          var d = JSON.parse(xhr.responseText);
          var lrc = (d && d.lrc && d.lrc.lyric) ? d.lrc.lyric : '';
          if (lrc) { cb(lrc); return; }
        } catch (e) { }
      }
      cb('');
    };
    xhr.onerror = xhr.ontimeout = function () { cb(''); };
    xhr.send();
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

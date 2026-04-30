/**
 * Gmeek Music Player v4 — 纯 HTML5 Audio + 可配置网易歌单
 * 支持两种模式：
 *   1. 填写 NETEASE_PLAYLIST_ID 则自动从 Meting API 拉取歌单
 *   2. 否则使用下方 HARDCODED_SONGS 硬编码歌单
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

  // ---- Styles ----
  var css = [
    '#gmeek-player{',
      'position:fixed;right:0;bottom:0;width:320px;z-index:10004;',
      'font-family:-apple-system,BlinkMacSystemFont,sans-serif;',
      'box-shadow:-2px 0 12px rgba(0,0,0,0.4);',
      'overflow:visible;',
    '}',
    '#gmp-toggle{',
      'display:flex;align-items:center;justify-content:center;gap:6px;',
      'width:100%;height:36px;',
      'background:rgba(0,0,0,0.85);border:none;cursor:pointer;',
      'color:#1db969;font-size:14px;font-weight:600;letter-spacing:1px;',
      'border-radius:4px 4px 0 0;padding:0 12px;',
    '}',
    '#gmp-toggle svg{margin-right:4px;flex-shrink:0;}',
    '#gmp-body{',
      'background:rgba(18,18,18,0.92);',
      'backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);',
      'padding:12px;display:none;',
    '}',
    '#gmp-body.show{display:block;}',
    '#gmp-header{display:flex;align-items:center;gap:12px;margin-bottom:10px;position:relative;}',
    '#gmp-cover{',
      'width:48px;height:48px;',
      'background:linear-gradient(135deg,#1db969,#194d2c);',
      'border-radius:6px;flex-shrink:0;',
      'display:flex;align-items:center;justify-content:center;',
    '}',
    '#gmp-cover svg{width:24px;height:24px;}',
    '#gmp-info{flex:1;min-width:0;}',
    '#gmp-title{color:#fff;font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:2px;}',
    '#gmp-artist{color:#888;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '#gmp-ctrl{display:flex;align-items:center;gap:16px;margin-bottom:10px;}',
    '.gmp-btn{background:none;border:none;cursor:pointer;padding:4px;color:#aaa;transition:color 0.2s;}',
    '.gmp-btn:hover{color:#fff;}',
    '.gmp-btn svg{width:20px;height:20px;display:block;}',
    '#gmp-progress-wrap{display:flex;align-items:center;gap:8px;margin-bottom:10px;}',
    '#gmp-time{color:#666;font-size:10px;font-variant-numeric:tabular-nums;min-width:36px;text-align:center;}',
    '#gmp-bar-wrap{flex:1;height:4px;background:rgba(255,255,255,0.1);border-radius:2px;cursor:pointer;position:relative;}',
    '#gmp-bar{height:100%;background:#1db969;border-radius:2px;width:0%;transition:width 0.3s;}',
    '#gmp-vol-wrap{display:flex;align-items:center;gap:8px;}',
    '#gmp-vol-icon{cursor:pointer;color:#aaa;}',
    '#gmp-vol-icon:hover{color:#fff;}',
    '#gmp-vol-icon svg{width:16px;height:16px;display:block;}',
    '#gmp-vol-bar-wrap{flex:1;height:3px;background:rgba(255,255,255,0.1);border-radius:2px;cursor:pointer;position:relative;}',
    '#gmp-vol-bar{height:100%;background:#555;border-radius:2px;width:70%;}',
    '#gmp-list{',
      'max-height:0;overflow-y:auto;',
      'transition:max-height 0.3s ease;',
    '}',
    '#gmp-list.open{max-height:260px;}',
    '#gmp-list::-webkit-scrollbar{width:4px;}',
    '#gmp-list::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.15);border-radius:2px;}',
    '.gmp-item{display:flex;align-items:center;gap:8px;padding:6px 4px;cursor:pointer;border-radius:4px;transition:background 0.15s;}',
    '.gmp-item:hover{background:rgba(255,255,255,0.06);}',
    '.gmp-item.playing{background:rgba(29,185,84,0.15);}',
    '.gmp-item-num{color:#444;font-size:10px;min-width:18px;text-align:right;font-variant-numeric:tabular-nums;}',
    '.gmp-item.playing .gmp-item-num{color:#1db969;}',
    '.gmp-item-info{flex:1;min-width:0;}',
    '.gmp-item-name{color:#ccc;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '.gmp-item.playing .gmp-item-name{color:#fff;}',
    '.gmp-item-artist{color:#555;font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '.gmp-playing-icon{color:#1db969;flex-shrink:0;}',
    '.gmp-playing-icon svg{width:12px;height:12px;display:block;animation:gmp-pulse 0.8s ease-in-out infinite alternate;}',
    '@keyframes gmp-pulse{from{opacity:0.6;}to{opacity:1;}}',
    '',
    '/* ---- Lyrics Panel ---- */',
    '#gmp-lyrics-btn{',
      'background:none;border:none;cursor:pointer;color:#888;padding:4px;',
      'position:absolute;right:12px;top:10px;transition:color 0.2s;',
    '}',
    '#gmp-lyrics-btn:hover{color:#1db969;}',
    '#gmp-lyrics-btn svg{width:18px;height:18px;display:block;}',
    '#gmp-lyrics-panel{',
      'max-height:0;overflow:hidden;transition:max-height 0.3s ease;',
      'text-align:center;font-size:13px;line-height:2;',
      'color:#666;cursor:default;',
    '}',
    '#gmp-lyrics-panel.open{max-height:200px;overflow-y:auto;}',
    '#gmp-lyrics-panel::-webkit-scrollbar{width:3px;}',
    '#gmp-lyrics-panel::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px;}',
    '.gmp-lyric-line{',
      'padding:2px 8px;border-radius:3px;transition:color 0.2s,font-size 0.2s;',
      'cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;',
    '}',
    '.gmp-lyric-line:hover{color:#aaa;}',
    '.gmp-lyric-line.active{color:#1db969;font-size:15px;font-weight:600;}',
    '.gmp-lyric-line.passive{color:#444;}',
    '@keyframes gmp-hint{0%{opacity:0;transform:translateX(20px);}10%{opacity:1;transform:none;}80%{opacity:1;}100%{opacity:0;}}'
  ].join('');

  // ---- Inject Styles ----
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ---- Build UI ----
  var container = document.createElement('div');
  container.id = 'gmeek-player';

  container.innerHTML =
    '<button id="gmp-toggle">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>' +
      '<span id="gmp-toggle-text">🎵 Music</span>' +
    '</button>' +
    '<div id="gmp-body">' +
      '<div id="gmp-header">' +
        '<div id="gmp-cover"><svg viewBox="0 0 24 24" fill="white"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg></div>' +
        '<div id="gmp-info">' +
          '<div id="gmp-title">Music</div>' +
          '<div id="gmp-artist">点击播放</div>' +
        '</div>' +
        '<button id="gmp-lyrics-btn" title="歌词">' +
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>' +
        '</button>' +
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
      '<div id="gmp-lyrics-panel"></div>' +
      '<div id="gmp-list"></div>' +
    '</div>';

  document.body.appendChild(container);

  // ---- DOM Refs ----
  var bodyEl = document.getElementById('gmp-body');
  var titleEl = document.getElementById('gmp-title');
  var artistEl = document.getElementById('gmp-artist');
  var playBtn = document.getElementById('gmp-play');
  var timeEl = document.getElementById('gmp-time');
  var barEl = document.getElementById('gmp-bar');
  var volBar = document.getElementById('gmp-vol-bar');
  var listEl = document.getElementById('gmp-list');
  var toggleBtn = document.getElementById('gmp-toggle');
  var volIcon = document.getElementById('gmp-vol-icon');
  var toggleText = document.getElementById('gmp-toggle-text');

  // ---- Audio Engine ----
  var audio = new Audio();
  audio.volume = 0.7;
  var current = -1;
  var playing = false;
  var muted = false;
  var prevVol = 0.7;
  var songList = [];

  // ---- Fetch playlist from NetEase ----
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
            var songs = data.data.map(function (s) {
              return {
                id: String(s.id || ''),
                name: s.name || '未知歌曲',
                artist: s.artist || '未知歌手',
                url: s.url || 'https://music.163.com/song/media/outer/url?id=' + s.id + '.mp3'
              };
            });
            callback(songs);
            return;
          }
        } catch (e) { /* ignore */ }
      }
      // fallback
      callback(HARDCODED_SONGS);
    };
    xhr.onerror = function () {
      callback(HARDCODED_SONGS);
    };
    xhr.send();
  }

  // ---- Build Playlist ----
  function buildList() {
    var html = '';
    for (var i = 0; i < songList.length; i++) {
      var s = songList[i];
      html += '<div class="gmp-item" data-i="' + i + '">' +
        '<span class="gmp-item-num">' + (i + 1) + '</span>' +
        '<div class="gmp-item-info">' +
          '<div class="gmp-item-name">' + escapeHtml(s.name) + '</div>' +
          '<div class="gmp-item-artist">' + escapeHtml(s.artist) + '</div>' +
        '</div>' +
        '<span class="gmp-playing-icon" style="display:none"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"/></svg></span>' +
      '</div>';
    }
    listEl.innerHTML = html;

    var items = listEl.querySelectorAll('.gmp-item');
    for (var j = 0; j < items.length; j++) {
      (function (idx) {
        items[j].addEventListener('click', function () {
          playSong(idx);
        });
      })(j);
    }
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // ---- LRC Lyrics Parser ----
  function parseLRC(lrcText) {
    if (!lrcText) return [];
    var lines = lrcText.split('\n');
    var result = [];
    var timeRe = /\[(\d+):(\d+)(?:[.\:](\d+))?\]/;
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line) continue;
      // Handle multiple timestamps on one line: [mm:ss.xx][mm:ss.xx]text
      var firstBracket = line.indexOf(']');
      if (firstBracket === -1) continue;
      var text = line.substring(line.lastIndexOf(']') + 1).trim();
      if (!text) continue;
      // Extract all timestamps in this line
      var tsRe = /\[(\d+):(\d+)(?:[.\:](\d+))?\]/g;
      var match;
      while ((match = tsRe.exec(line)) !== null) {
        var min = parseInt(match[1], 10);
        var sec = parseInt(match[2], 10);
        var ms = match[3] ? parseInt(match[3].substring(0, 2), 10) : 0;
        var time = min * 60 + sec + ms / 100;
        result.push({ time: time, text: text });
      }
    }
    result.sort(function (a, b) { return a.time - b.time; });
    return result;
  }

  // ---- Fetch Lyrics ----
  // Try multiple lyric API sources
  function fetchLyric(songId, callback) {
    if (!songId) { callback(''); return; }
    console.log('[GmeekMusic] Fetching lyrics for songId:', songId);

    // Source 1: Meting API
    var url1 = API_BASE + '?server=netease&type=lyric&id=' + encodeURIComponent(songId);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url1, true);
    xhr.timeout = 6000;

    xhr.onload = function () {
      console.log('[GmeekMusic] Lyric API1 status:', xhr.status);
      if (xhr.status === 200) {
        try {
          var data = JSON.parse(xhr.responseText);
          // Meting API may return { lrc: { lyric: '...' } }
          var lrc = (data && data.lrc && data.lrc.lyric) ? data.lrc.lyric : '';
          if (lrc) { callback(lrc); return; }
          // Try alternative field names
          lrc = data.lyric || data.lrc || '';
          if (lrc) { callback(lrc); return; }
        } catch (e) { console.error('[GmeekMusic] Lyric API1 parse error:', e); }
      }
      // Fallback: try NetEase official API via a public CORS proxy
      fetchLyricFallback(songId, callback);
    };
    xhr.onerror = function () {
      console.error('[GmeekMusic] Lyric API1 failed, trying fallback...');
      fetchLyricFallback(songId, callback);
    };
    xhr.ontimeout = function () {
      console.error('[GmeekMusic] Lyric API1 timeout, trying fallback...');
      fetchLyricFallback(songId, callback);
    };
    xhr.send();
  }

  function fetchLyricFallback(songId, callback) {
    // Source 2: Use a CORS-friendly Netease API proxy
    // Multiple public proxies as fallback chain
    var proxies = [
      'https://neteasecloudmusicapi-fcow.vercel.app',
      'https://ncm-api.zekdot.com',
      'https://music-api.greedyai.com'
    ];
    var tryProxy = function (index) {
      if (index >= proxies.length) { callback(''); return; }
      var url = proxies[index] + '/lyric?id=' + encodeURIComponent(songId);
      console.log('[GmeekMusic] Trying proxy ' + index + ':', url);
      var xhr2 = new XMLHttpRequest();
      xhr2.open('GET', url, true);
      xhr2.timeout = 5000;
      xhr2.onload = function () {
        if (xhr2.status === 200) {
          try {
            var data = JSON.parse(xhr2.responseText);
            var lrc = (data && data.lrc && data.lrc.lyric) ? data.lrc.lyric : '';
            if (!lrc) lrc = (data && data.lyric) ? data.lyric : '';
            if (lrc) { console.log('[GmeekMusic] Lyric from proxy ' + index + ' OK, length:', lrc.length); callback(lrc); return; }
          } catch (e) { console.error('[GmeekMusic] Proxy ' + index + ' parse error:', e); }
        }
        tryProxy(index + 1);
      };
      xhr2.onerror = function () { tryProxy(index + 1); };
      xhr2.ontimeout = function () { tryProxy(index + 1); };
      xhr2.send();
    };
    tryProxy(0);
  }

  // ---- Build Lyrics Panel ----
  var lyricsData = [];
  var lyricsPanelEl = null;
  var lyricLines = [];

  function buildLyricsPanel(lrcText) {
    lyricsPanelEl = document.getElementById('gmp-lyrics-panel');
    lyricsData = parseLRC(lrcText);
    if (lyricsData.length === 0) {
      lyricsPanelEl.innerHTML = '<div class="gmp-lyric-line" style="color:#444;">暂无歌词</div>';
      return;
    }
    var html = '';
    for (var i = 0; i < lyricsData.length; i++) {
      html += '<div class="gmp-lyric-line" data-i="' + i + '">' + escapeHtml(lyricsData[i].text) + '</div>';
    }
    lyricsPanelEl.innerHTML = html;
    lyricLines = lyricsPanelEl.querySelectorAll('.gmp-lyric-line');
    // Click to seek
    for (var j = 0; j < lyricLines.length; j++) {
      (function (idx) {
        lyricLines[j].addEventListener('click', function () {
          if (audio.duration && lyricsData[idx]) {
            audio.currentTime = lyricsData[idx].time;
          }
        });
      })(j);
    }
  }

  function updateLyricsHighlight() {
    if (!lyricsData.length || !lyricsPanelEl) return;
    var currentTime = audio.currentTime || 0;
    var activeIdx = -1;
    for (var i = lyricsData.length - 1; i >= 0; i--) {
      if (currentTime >= lyricsData[i].time) {
        activeIdx = i;
        break;
      }
    }
    for (var j = 0; j < lyricLines.length; j++) {
      lyricLines[j].classList.remove('active', 'passive');
      if (j === activeIdx) {
        lyricLines[j].classList.add('active');
        // Scroll to center
        var container = lyricsPanelEl;
        var lineEl = lyricLines[j];
        var scrollTop = lineEl.offsetTop - container.clientHeight / 2 + lineEl.clientHeight / 2;
        container.scrollTop = scrollTop;
      } else if (j < activeIdx) {
        lyricLines[j].classList.add('passive');
      }
    }
  }

  // ---- Play Song ----
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
    updateListHighlight();
    // Fetch lyrics
    var songId = s.id || '';
    if (!songId && s.url) {
      var m = s.url.match(/id=(\d+)/);
      if (m) songId = m[1];
    }
    if (songId) {
      fetchLyric(songId, function (lrcText) {
        buildLyricsPanel(lrcText);
      });
    } else {
      buildLyricsPanel('');
    }
    var promise = audio.play();
    if (promise) {
      promise.catch(function () { /* user interaction required */ });
    }
    playing = true;
    updatePlayIcon();
  }

  function updateListHighlight() {
    var items = listEl.querySelectorAll('.gmp-item');
    for (var k = 0; k < items.length; k++) {
      var isPlaying = (k === current);
      items[k].classList.toggle('playing', isPlaying);
      var icon = items[k].querySelector('.gmp-playing-icon');
      if (icon) icon.style.display = isPlaying ? '' : 'none';
    }
  }

  function updatePlayIcon() {
    playBtn.innerHTML = playing
      ? '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>'
      : '<svg id="gmp-icon-play" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg>';
  }

  // ---- Controls ----
  playBtn.addEventListener('click', function () {
    if (current === -1) { playSong(0); return; }
    if (playing) { audio.pause(); playing = false; }
    else {
      var promise = audio.play();
      if (promise) promise.catch(function () { });
      playing = true;
    }
    updatePlayIcon();
  });

  document.getElementById('gmp-prev').addEventListener('click', function () {
    var n = (current - 1 + songList.length) % songList.length;
    playSong(n);
  });

  document.getElementById('gmp-next').addEventListener('click', function () {
    var n = (current + 1) % songList.length;
    playSong(n);
  });

  // ---- Progress ----
  audio.addEventListener('timeupdate', function () {
    if (!audio.duration) return;
    var pct = (audio.currentTime / audio.duration) * 100;
    barEl.style.width = pct + '%';
    var m = Math.floor(audio.currentTime / 60);
    var s = Math.floor(audio.currentTime % 60);
    timeEl.textContent = m + ':' + (s < 10 ? '0' : '') + s;
    // Lyrics sync
    updateLyricsHighlight();
  });

  audio.addEventListener('ended', function () {
    var n = (current + 1) % songList.length;
    playSong(n);
  });

  audio.addEventListener('error', function () {
    console.error('[GmeekMusic] Audio error:', audio.error);
    timeEl.textContent = 'Error';
  });

  // ---- Seek (click + drag) ----
  (function () {
    var barWrap = document.getElementById('gmp-bar-wrap');
    var seeking = false;

    function seekTo(e) {
      if (!audio.duration) return;
      var rect = barWrap.getBoundingClientRect();
      var pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      audio.currentTime = pct * audio.duration;
      barEl.style.width = (pct * 100) + '%';
      var m = Math.floor(audio.currentTime / 60);
      var s = Math.floor(audio.currentTime % 60);
      timeEl.textContent = m + ':' + (s < 10 ? '0' : '') + s;
    }

    barWrap.addEventListener('mousedown', function (e) {
      seeking = true;
      seekTo(e);
      e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
      if (seeking) { seekTo(e); }
    });

    document.addEventListener('mouseup', function () {
      seeking = false;
    });

    // Touch support for mobile
    barWrap.addEventListener('touchstart', function (e) {
      seeking = true;
      seekTo(e.touches[0]);
      e.preventDefault();
    });

    document.addEventListener('touchmove', function (e) {
      if (seeking) { seekTo(e.touches[0]); }
    });

    document.addEventListener('touchend', function () {
      seeking = false;
    });
  })();

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

  document.getElementById('gmp-vol-bar-wrap').addEventListener('click', function (e) {
    var rect = this.getBoundingClientRect();
    var pct = (e.clientX - rect.left) / rect.width;
    audio.volume = Math.max(0, Math.min(1, pct));
    volBar.style.width = (audio.volume * 100) + '%';
    if (muted && pct > 0) { muted = false; }
  });

  // ---- Lyrics Panel Toggle ----
  (function () {
    var lyricsBtn = document.getElementById('gmp-lyrics-btn');
    var panel = document.getElementById('gmp-lyrics-panel');
    var listEl = document.getElementById('gmp-list');
    var open = false;
    lyricsBtn.addEventListener('click', function () {
      open = !open;
      if (open) {
        panel.classList.add('open');
        listEl.classList.remove('open');
      } else {
        panel.classList.remove('open');
      }
    });
  })();

  // ---- Toggle body (fixed: was toggling list, now toggles body + list) ----
  var panelOpen = false;
  toggleBtn.addEventListener('click', function () {
    panelOpen = !panelOpen;
    if (panelOpen) {
      bodyEl.classList.add('show');
      listEl.classList.add('open');
      toggleText.textContent = '收起播放器';
    } else {
      bodyEl.classList.remove('show');
      listEl.classList.remove('open');
      toggleText.textContent = '🎵 Music';
    }
  });

  // ---- Init ----
  fetchPlaylist(function (songs) {
    songList = songs;
    buildList();
    console.log('[GmeekMusic] Loaded ' + songs.length + ' songs');
  });

  // Auto-show hint
  var hint = document.createElement('div');
  hint.style.cssText = 'position:fixed;bottom:160px;right:10px;background:rgba(29,185,84,0.9);color:#fff;padding:8px 12px;border-radius:6px;font-size:12px;z-index:10005;pointer-events:none;animation:gmp-hint 4s ease forwards;';
  hint.textContent = '🎵 音乐播放器已就绪，点击展开';
  document.body.appendChild(hint);
  setTimeout(function () {
    if (hint.parentNode) hint.parentNode.removeChild(hint);
  }, 4500);

})();

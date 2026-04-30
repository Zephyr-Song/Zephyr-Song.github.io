// Gmeek 音乐播放器插件
// 在每个页面底部显示 APlayer 播放器

(function() {
  'use strict';

  // 播放器配置 - 修改这里更换歌单
  var playerConfig = {
    server: 'netease',  // netease, tencent, kugou, xiami, baidu
    type: 'playlist',   // song, playlist, album, artist, search
    id: '7451549746'   // 歌单ID
  };

  // 初始化播放器
  function initPlayer() {
    if (document.getElementById('aplayer')) return;

    // 创建播放器容器
    var container = document.createElement('div');
    container.id = 'aplayer';
    container.setAttribute('class', 'aplayer');
    container.setAttribute('data-id', playerConfig.id);
    container.setAttribute('data-server', playerConfig.server);
    container.setAttribute('data-type', playerConfig.type);
    container.setAttribute('data-autoplay', 'false');
    container.setAttribute('data-theme', '#1db969');
    document.body.appendChild(container);

    // 加载 APlayer CSS
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css';
    document.head.appendChild(link);

    // 加载 APlayer JS
    var apScript = document.createElement('script');
    apScript.src = 'https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js';
    apScript.onload = function() {
      // 加载 MetingJS
      var mtScript = document.createElement('script');
      mtScript.src = 'https://cdn.jsdelivr.net/npm/meting@2.0.1/dist/Meting.min.js';
      mtScript.onload = function() {
        // Meting 会自动找到 meting-js 元素并创建播放器
      };
      document.head.appendChild(mtScript);
    };
    document.head.appendChild(apScript);
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlayer);
  } else {
    initPlayer();
  }

  // 可选：添加一个按钮来显示/隐藏播放器
  window.toggleMusicPlayer = function() {
    var ap = document.getElementById('aplayer');
    if (ap) {
      ap.style.display = ap.style.display === 'none' ? 'block' : 'none';
    }
  };
})();
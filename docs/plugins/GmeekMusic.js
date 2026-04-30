// Gmeek 音乐播放器插件 (本地版)
// 在每个页面底部显示 APlayer 播放器

(function() {
  'use strict';

  // 播放器配置 - 修改这里更换歌单
  var playerConfig = {
    server: 'netease',
    type: 'playlist',
    id: '2829883282',
    autoplay: 'false',
    theme: '#1db969'
  };

  function initPlayer() {
    if (document.getElementById('gmeek-aplayer')) return;

    // 1. 先加载 CSS
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/plugins/lib/APlayer.min.css';
    document.head.appendChild(link);

    // 2. 创建播放器容器
    var container = document.createElement('div');
    container.id = 'gmeek-aplayer';
    container.className = 'aplayer';
    container.dataset.id = playerConfig.id;
    container.dataset.server = playerConfig.server;
    container.dataset.type = playerConfig.type;
    container.dataset.autoplay = playerConfig.autoplay;
    container.dataset.theme = playerConfig.theme;
    document.body.appendChild(container);

    // 3. 加载 APlayer.js（本地）
    var apScript = document.createElement('script');
    apScript.src = '/plugins/lib/APlayer.min.js';
    apScript.onload = function() {
      // 4. APlayer 加载完后加载 MetingJS（本地）
      var mtScript = document.createElement('script');
      mtScript.src = '/plugins/lib/Meting.min.js';
      document.head.appendChild(mtScript);
    };
    document.head.appendChild(apScript);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlayer);
  } else {
    initPlayer();
  }
})();
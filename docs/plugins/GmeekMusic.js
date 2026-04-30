// Gmeek 音乐播放器 — 右侧悬浮
(function() {
  'use strict';

  var songs = [
    {name:"河流",artist:"马赫mood, 杜逸风 Firewind SoKu",url:"https://music.163.com/song/media/outer/url?id=1984760613.mp3"},
    {name:"冷冷的夏",artist:"王芷蕾",url:"https://music.163.com/song/media/outer/url?id=301422.mp3"},
    {name:"旅行家的忠诚",artist:"黄旭, 艾热 AIR",url:"https://music.163.com/song/media/outer/url?id=2079429439.mp3"},
    {name:"外面冷 Coldest Night",artist:"艾福杰尼",url:"https://music.163.com/song/media/outer/url?id=1982964017.mp3"},
    {name:"空山灵雨 feat.旅行团",artist:"新裤子, 旅行团乐队",url:"https://music.163.com/song/media/outer/url?id=2712645752.mp3"},
    {name:"雨后的哲学家",artist:"ZaZaZsu咂咂苏",url:"https://music.163.com/song/media/outer/url?id=2649850191.mp3"},
    {name:"过春天",artist:"谭维维",url:"https://music.163.com/song/media/outer/url?id=1346093339.mp3"},
    {name:"你我经历的一刻",artist:"ZaZaZsu咂咂苏",url:"https://music.163.com/song/media/outer/url?id=2655065698.mp3"},
    {name:"若把你",artist:"Kirsty刘瑾睿",url:"https://music.163.com/song/media/outer/url?id=865632948.mp3"},
    {name:"几分",artist:"雷泷Raylong, 曲甲, 唐康宁",url:"https://music.163.com/song/media/outer/url?id=2156910268.mp3"}
  ];

  function init() {
    // 加载 APlayer CSS
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/plugins/lib/APlayer.min.css';
    document.head.appendChild(link);

    // 创建播放器容器
    var div = document.createElement('div');
    div.id = 'gmeek-ap';
    document.body.appendChild(div);

    // 加载 APlayer.js 并初始化
    var s = document.createElement('script');
    s.src = '/plugins/lib/APlayer.min.js';
    s.onload = function() {
      new APlayer({
        element: document.getElementById('gmeek-ap'),
        fixed: true,
        autoplay: false,
        showlrc: false,
        theme: '#1db969',
        audio: songs
      });
    };
    document.head.appendChild(s);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
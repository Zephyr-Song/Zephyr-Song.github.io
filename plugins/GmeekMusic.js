// Gmeek 音乐播放器 — 右侧悬浮（35首歌 + 修复 CSS + 调试日志）
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

  // 内嵌 CSS：右侧悬浮，强制覆盖所有冲突样式
  var css = [
    '.aplayer,.aplayer .aplayer-lrc{background:rgba(0,0,0,.75)}',
    '.aplayer .aplayer-lrc p{color:#fff}',
    '.aplayer .aplayer-lrc-current{color:#1db969}',
    '.aplayer-info{display:block!important;visibility:visible!important;opacity:1!important}',
    '.aplayer.aplayer-fixed,.aplayer.aplayer-fixed .aplayer-body{',
    'display:block!important;visibility:visible!important;',
    'position:fixed!important;bottom:0!important;left:auto!important;right:0!important;',
    'width:320px!important;z-index:10004!important}',
    '.aplayer.aplayer-fixed .aplayer-lrc{right:0!important;left:auto!important;bottom:52px!important}',
    '.aplayer,.aplayer.aplayer-narrow .aplayer-body{left:auto!important;right:0!important}',
    '.aplayer.aplayer-fixed .aplayer-body{width:320px!important}',
    '.aplayer .aplayer-info{-webkit-transform:scaleX(1)!important;transform:scaleX(1)!important}'
  ].join('');

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var div = document.createElement('div');
  div.id = 'gmeek-ap';
  document.body.appendChild(div);

  function init() {
    var s = document.createElement('script');
    s.src = '/plugins/lib/APlayer.min.js';
    s.onerror = function() { console.error('[GmeekMusic] APlayer.min.js load failed'); };
    s.onload = function() {
      console.log('[GmeekMusic] APlayer loaded, songs:', songs.length);
      try {
        var ap = new APlayer({
          element: document.getElementById('gmeek-ap'),
          fixed: true,
          autoplay: false,
          showlrc: false,
          theme: '#1db969',
          audio: songs
        });
        console.log('[GmeekMusic] APlayer init OK');
      } catch(e) {
        console.error('[GmeekMusic] APlayer init error:', e);
      }
    };
    document.head.appendChild(s);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
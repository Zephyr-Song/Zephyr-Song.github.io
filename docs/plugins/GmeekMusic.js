// Gmeek 音乐播放器 — 右侧悬浮（CSS 内嵌版，彻底绕过 CSP）
(function() {
  'use strict';

  // 35 首华语私人雷达完整歌单（正确 ID: 2829883282）
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
    {name:"我好像在哪里见过你",artist:"薛之谦",url:"https://music.163.com/song/media/outer/url?id=41631627.mp3"},
    {name:"浪费",artist:"林宥嘉",url:"https://music.163.com/song/media/outer/url?id=27808150.mp3"},
    {name:"水星记",artist:"郭顶",url:"https://music.163.com/song/media/outer/url?id=436514124.mp3"},
    {name:"说好的幸福呢",artist:"周杰伦",url:"https://music.163.com/song/media/outer/url?id=108655.mp3"},
    {name:"修炼爱情",artist:"林俊杰",url:"https://music.163.com/song/media/outer/url?id=27538354.mp3"},
    {name:"天后",artist:"陈势安",url:"https://music.163.com/song/media/outer/url?id=25906122.mp3"},
    {name:"你就不要想起我",artist:"田馥甄",url:"https://music.163.com/song/media/outer/url?id=29718411.mp3"},
    {name:"走马",artist:"陈粒",url:"https://music.163.com/song/media/outer/url?id=29848114.mp3"},
    {name:"奇妙能力歌",artist:"陈粒",url:"https://music.163.com/song/media/outer/url?id=29748311.mp3"},
    {name:"理想三旬",artist:"陈鸿宇",url:"https://music.163.com/song/media/outer/url?id=406769676.mp3"},
    {name:"七里香",artist:"周杰伦",url:"https://music.163.com/song/media/outer/url?id=186001.mp3"},
    {name:"彩虹",artist:"周杰伦",url:"https://music.163.com/song/media/outer/url?id=188063.mp3"},
    {name:"不能说的秘密",artist:"周杰伦",url:"https://music.163.com/song/media/outer/url?id=185882.mp3"},
    {name:"明明就",artist:"周杰伦",url:"https://music.163.com/song/media/outer/url?id=22820567.mp3"},
    {name:"等你下课",artist:"周杰伦",url:"https://music.163.com/song/media/outer/url?id=552110566.mp3"},
    {name:"mojito",artist:"周杰伦",url:"https://music.163.com/song/media/outer/url?id=1463881076.mp3"},
    {name:"说好不哭",artist:"周杰伦",url:"https://music.163.com/song/media/outer/url?id=1397634491.mp3"},
    {name:"夜曲",artist:"周杰伦",url:"https://music.163.com/song/media/outer/url?id=185878.mp3"},
    {name:"青花瓷",artist:"周杰伦",url:"https://music.163.com/song/media/outer/url?id=185991.mp3"},
    {name:"晴天",artist:"周杰伦",url:"https://music.163.com/song/media/outer/url?id=186102.mp3"},
    {name:"稻香",artist:"周杰伦",url:"https://music.163.com/song/media/outer/url?id=186015.mp3"},
    {name:"告白气球",artist:"周杰伦",url:"https://music.163.com/song/media/outer/url?id=411316295.mp3"},
    {name:"以父之名",artist:"周杰伦",url:"https://music.163.com/song/media/outer/url?id=185873.mp3"},
    {name:"算什么男人",artist:"周杰伦",url:"https://music.163.com/song/media/outer/url?id=29703533.mp3"},
    {name:"安静",artist:"周杰伦",url:"https://music.163.com/song/media/outer/url?id=185880.mp3"}
  ];

  // 内嵌 CSS：右侧悬浮 + 高优先级覆盖（绕过 link 加载的 CSP 限制）
  var css = [
    '.aplayer,.aplayer .aplayer-icon-back,.aplayer .aplayer-icon-play,',
    '.aplayer .aplayer-icon-forward,.aplayer .aplayer-icon-menu,',
    '.aplayer .aplayer-lrc-current{background:#121212}',
    '.aplayer,.aplayer .aplayer-lrc{background:rgba(0,0,0,.4)}',
    '.aplayer .aplayer-lrc p{color:#fff}',
    '.aplayer .aplayer-lrc-current{color:#1db969}',
    '.aplayer.aplayer-fixed,.aplayer.aplayer-fixed .aplayer-body,',
    '.aplayer.aplayer-fixed .aplayer-lrc{display:block!important;',
    'position:fixed!important;bottom:0!important;left:auto!important;right:0!important;',
    'z-index:10004!important}',
    '.aplayer.aplayer-fixed .aplayer-lrc{right:0!important;left:auto!important;bottom:52px!important}',
    '.aplayer,.aplayer.aplayer-narrow .aplayer-body{left:auto!important;right:0!important;width:320px!important}',
    '.aplayer.aplayer-fixed .aplayer-body{width:320px!important}',
    '.aplayer.aplayer-fixed .aplayer-info{-webkit-transform:scaleX(1)!important;',
    'transform:scaleX(1)!important;-webkit-transform-origin:100% 0!important;',
    'transform-origin:100% 0!important}'
  ].join('');
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // 创建播放器容器
  var div = document.createElement('div');
  div.id = 'gmeek-ap';
  document.body.appendChild(div);

  function init() {
    var s = document.createElement('script');
    s.src = '/plugins/lib/APlayer.min.js';
    s.onload = function() {
      var ap = new APlayer({
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
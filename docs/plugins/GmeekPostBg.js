/* GmeekPostBg.js — 每篇文章顶部展示对应书封（清晰、不模糊）
 * 仅在 /post/<slug>.html 生效；图片自托管于 /plugins/covers/。
 * 图片按文章 slug 映射，插画/封面均与书目对应。
 */
(function () {
  'use strict';

  var path = decodeURIComponent(location.pathname || '');
  var m = path.match(/\/post\/([^\/]+?)\.html?$/i);
  if (!m) return;

  var slug = m[1].toLowerCase();

  var MAP = {
    'yi-bang-qi-shi': 'yi-bang-qi-shi',
    'di-yi-ci-de-qin-mi-jie-chu': 'di-yi-ci-de-qin-mi-jie-chu',
    'wo-de-er-shi-liu-sui-nv-fang-ke': 'wo-de-er-shi-liu-sui-nv-fang-ke',
    'tian-kong-de-cheng': 'tian-kong-de-cheng',
    'yong-yuan-de-hu-die': 'yong-yuan-de-hu-die',
    'shen-diao-xia-lv': 'shen-diao-xia-lv',
    'xiao-ao-jiang-hu': 'xiao-ao-jiang-hu',
    'da-fen-qi-mi-ma': 'da-fen-qi-mi-ma',
    'jin-ge-si': 'jin-ge-si',
    'nuo-wei-de-sen-lin': 'nuo-wei-de-sen-lin',
    'qian-zhi-he': 'qian-zhi-he',
    'ren-jian-shi-ge': 'ren-jian-shi-ge',
    'luo-sheng-men': 'luo-sheng-men',
    'xin': 'xin',
    'xian-yi-ren-x-de-xian-shen': 'xian-yi-ren-X-de-xian-shen',
    'xi-xue': 'xi-xue'
  };

  var key = MAP[slug];
  if (!key && /^xia-tian/i.test(slug)) key = 'xia-tian-19-sui';
  if (!key) return;

  var url = '/plugins/covers/' + key + '.jpg';

  var probe = new Image();
  probe.onload = apply;
  probe.onerror = function () { /* 缺图则静默降级 */ };
  probe.src = url;

  function apply() {
    var css = [
      /* 顶部书封：清晰、不模糊、居中、圆角带阴影 */
      'html.gm-cover #postBody .gm-cover-hero{'
        + 'margin:0 0 26px;display:flex;justify-content:center;}',
      'html.gm-cover #postBody .gm-cover-hero img{'
        + 'width:auto;max-width:260px;max-height:360px;height:auto;'
        + 'border-radius:12px;display:block;background:#fff;'
        + 'box-shadow:0 8px 28px rgba(60,45,30,.22);object-fit:contain;}',
      '@media (max-width:640px){'
        + 'html.gm-cover #postBody .gm-cover-hero img{max-width:200px;max-height:280px;}}'
    ].join('');

    var st = document.createElement('style');
    st.id = 'gm-cover-style';
    st.textContent = css;
    document.head.appendChild(st);

    var body = document.getElementById('postBody') || document.querySelector('.markdown-body');
    if (!body) return;

    var hero = document.createElement('div');
    hero.className = 'gm-cover-hero';
    var img = document.createElement('img');
    img.src = url;
    img.alt = 'cover';
    img.loading = 'lazy';
    hero.appendChild(img);
    body.insertBefore(hero, body.firstChild);

    document.documentElement.classList.add('gm-cover');
  }
})();

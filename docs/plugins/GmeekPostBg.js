/* GmeekPostBg.js — 每篇文章的虚化书封背景
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
      /* 固定背景层：模糊书封 + 轻遮罩（[class] 提权压过 beige.css 的 !important） */
      'html.gm-postbg[class]{background:transparent !important;}',
      'html.gm-postbg[class] body{background:transparent !important;}',
      'html.gm-postbg[class] .markdown-body{background:transparent !important;}',
      /* 正文做成半透明磨砂卡片：黑字永远清晰，书封在四周与透出的微光中可见 */
      'html.gm-postbg[class] #content,html.gm-postbg[class] .Box{'
        + 'background:rgba(248,244,236,.88) !important;'
        + 'backdrop-filter:blur(8px) saturate(1.05);-webkit-backdrop-filter:blur(8px) saturate(1.05);'
        + 'box-shadow:0 10px 40px rgba(60,45,30,.20) !important;border-radius:14px !important;'
        + 'border:1px solid rgba(230,220,198,.7) !important;}',

      '#gm-postbg{position:fixed;inset:0;z-index:-1;overflow:hidden;pointer-events:none;}',
      '#gm-postbg .gm-img{position:absolute;inset:-12%;'
        + 'background-position:center center;background-size:cover;background-repeat:no-repeat;'
        + 'filter:blur(48px) saturate(1.35) brightness(1.04);transform:scale(1.15);opacity:.95;}',
      '#gm-postbg .gm-veil{position:absolute;inset:0;'
        + 'background:linear-gradient(180deg,rgba(248,244,236,.26) 0%,rgba(248,244,236,.40) 45%,rgba(248,244,236,.55) 100%);}',

      /* 暗色模式 */
      'html.gm-postbg[data-color-mode="dark"]{background:transparent !important;}',
      'html.gm-postbg[data-color-mode="dark"] #content,html.gm-postbg[data-color-mode="dark"] .Box{'
        + 'background:rgba(13,17,23,.88) !important;'
        + 'backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);'
        + 'box-shadow:0 10px 40px rgba(0,0,0,.45) !important;'
        + 'border:1px solid rgba(255,255,255,.08) !important;}',
      'html.gm-postbg[data-color-mode="dark"] #gm-postbg .gm-img{opacity:.8;'
        + 'filter:blur(48px) saturate(1.2) brightness(.58);}',
      'html.gm-postbg[data-color-mode="dark"] #gm-postbg .gm-veil{'
        + 'background:linear-gradient(180deg,rgba(13,17,23,.30) 0%,rgba(13,17,23,.44) 45%,rgba(13,17,23,.58) 100%);}',

      /* 移动端省性能 */
      '@media (max-width:640px){#gm-postbg .gm-img{filter:blur(34px) saturate(1.25);}}'
    ].join('');

    var st = document.createElement('style');
    st.id = 'gm-postbg-style';
    st.textContent = css;
    document.head.appendChild(st);

    var box = document.createElement('div');
    box.id = 'gm-postbg';

    var img = document.createElement('div');
    img.className = 'gm-img';
    img.style.backgroundImage = 'url("' + url + '")';

    var veil = document.createElement('div');
    veil.className = 'gm-veil';

    box.appendChild(img);
    box.appendChild(veil);
    document.body.insertBefore(box, document.body.firstChild);

    document.documentElement.classList.add('gm-postbg');
  }
})();

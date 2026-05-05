(function(){
  // Inject CSS
  var css = `
    ::-webkit-scrollbar{width:6px;height:6px}
    ::-webkit-scrollbar-thumb{background:#888;border-radius:3px}
    ::-webkit-scrollbar-track{background:#f1f1f1;border-radius:3px}
    ::-webkit-scrollbar-thumb:hover{background:#555}
    #readProgress{position:fixed;top:0;left:0;width:0;height:3px;background:linear-gradient(90deg,#667eea,#764ba2);z-index:9999;transition:width .1s ease}
    #backToTop{position:fixed;bottom:30px;right:30px;width:40px;height:40px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border:none;border-radius:50%;cursor:pointer;z-index:9998;display:none;font-size:18px;box-shadow:0 2px 10px rgba(102,126,234,.4)}
    #backToTop:hover{background:linear-gradient(135deg,#5a6fd6,#6a4190)}
  `;
  var s = document.createElement('style');
  s.textContent = css;
  document.head.appendChild(s);

  // Create DOM elements
  var rp = document.createElement('div');
  rp.id = 'readProgress';
  document.body.insertBefore(rp, document.body.firstChild);

  var bt = document.createElement('button');
  bt.id = 'backToTop';
  bt.innerHTML = '↑';
  bt.onclick = function(){ window.scrollTo({top:0, behavior:'smooth'}); };
  document.body.appendChild(bt);

  // Scroll handler
  window.addEventListener('scroll', function(){
    var e = document.getElementById('readProgress');
    var b = document.getElementById('backToTop');
    if(!e || !b) return;
    var t = document.documentElement.scrollHeight - window.innerHeight;
    var n = window.scrollY / t * 100;
    e.style.width = n + '%';
    b.style.display = n > 5 ? 'block' : 'none';
  }, {passive:true});

  // Busuanzi
  function createBSZ() {
    var postBody = document.getElementById('postBody');
    if (postBody) {
      postBody.insertAdjacentHTML('afterend', '<div id="busuanzi_container_page_pv" style="display:none;float:left;margin-top:8px;font-size:small;">本文浏览量 <span id="busuanzi_value_page_pv"></span> 次</div>');
    }
    var runday = document.getElementById('runday');
    if (runday) {
      runday.insertAdjacentHTML('afterend', '<div id="busuanzi_container_site_pv" style="display:none;">总浏览量 <span id="busuanzi_value_site_pv"></span> 次 • </div>');
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    createBSZ();
    var el = document.createElement('script');
    el.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
    document.head.appendChild(el);
    console.log('\n %c GmeekBSZ Plugins https://github.com/Meekdai/Gmeek \n','padding:5px 0;background:#bc4c00;color:#fff');
  });
})();

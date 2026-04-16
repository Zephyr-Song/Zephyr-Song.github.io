function createBSZ() {
    var postBody = document.getElementById('postBody');
    if (postBody){
        postBody.insertAdjacentHTML('afterend','<div id="busuanzi_container_page_pv" style="display:none;float:left;margin-top:8px;font-size:small;">本文浏览量 <span id="busuanzi_value_page_pv"></span> 次</div>');
    }
    var runday = document.getElementById('runday');
    runday.insertAdjacentHTML('afterend', '<div id="busuanzi_container_site_pv" style="display:none;">总浏览量 <span id="busuanzi_value_site_pv"></span> 次 • </div>');
}

// Reading progress bar + back to top
var rp = document.createElement('div'); rp.id='readProgress';
var bt = document.createElement('button'); bt.id='backToTop'; bt.innerHTML='↑'; bt.onclick=function(){window.scrollTo({top:0,behavior:'smooth'});};
document.body.insertBefore(rp, document.body.firstChild);
document.body.appendChild(bt);
window.addEventListener('scroll', function(){
    var e=document.getElementById('readProgress');
    var b=document.getElementById('backToTop');
    var t=document.documentElement.scrollHeight-window.innerHeight;
    var n=window.scrollY/t*100;
    e.style.width=n+'%';
    b.style.display=n>5?'block':'none';
}, {passive:true});

document.addEventListener('DOMContentLoaded', function() {
    createBSZ();
    var element = document.createElement('script');
    element.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
    document.head.appendChild(element);
    console.log("\n %c GmeekBSZ Plugins https://github.com/Meekdai/Gmeek \n","padding:5px 0;background:#bc4c00;color:#fff");
});

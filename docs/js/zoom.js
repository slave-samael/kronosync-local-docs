(function(){var o=document.createElement('div');o.id='img-zoom-overlay';
o.style.cssText='display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:9999;cursor:zoom-out;align-items:center;justify-content:center;';
var i=document.createElement('img');i.style.cssText='max-width:95%;max-height:95%;object-fit:contain;box-shadow:0 0 40px rgba(0,0,0,.5);cursor:default;';
o.appendChild(i);document.body.appendChild(o);
o.addEventListener('click',function(){o.style.display='none';document.body.style.overflow='';});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){o.style.display='none';document.body.style.overflow='';}});
document.querySelectorAll('.wy-nav-content img,.rst-content img,[role=main] img').forEach(function(img){
img.style.cursor='zoom-in';
img.addEventListener('click',function(e){e.stopPropagation();i.src=this.src;i.alt=this.alt;o.style.display='flex';document.body.style.overflow='hidden';});
});})();
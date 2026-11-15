const magnetic=document.getElementById("magneticBtn");
const tilt=document.getElementById("tiltBtn");
const wave=document.querySelector(".wave-btn");
function point(e,el){const r=el.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top,cx:r.width/2,cy:r.height/2,w:r.width,h:r.height}}
magnetic.addEventListener("pointermove",e=>{const p=point(e,magnetic);const dx=(p.x-p.cx)/p.cx,dy=(p.y-p.cy)/p.cy;magnetic.style.setProperty("--mx",`${p.x}px`);magnetic.style.setProperty("--my",`${p.y}px`);magnetic.style.transform=`translate(${dx*7}px,${dy*7}px)`});
magnetic.addEventListener("pointerleave",()=>{magnetic.style.transform="translate(0,0)";magnetic.style.setProperty("--mx","50%");magnetic.style.setProperty("--my","50%")});
tilt.addEventListener("pointermove",e=>{const p=point(e,tilt);const ry=((p.x/p.w)-.5)*18;const rx=-((p.y/p.h)-.5)*18;tilt.style.setProperty("--rx",`${rx}deg`);tilt.style.setProperty("--ry",`${ry}deg`);tilt.style.setProperty("--lx",`${p.x}px`);tilt.style.setProperty("--ly",`${p.y}px`)});
tilt.addEventListener("pointerleave",()=>{tilt.style.setProperty("--rx","0deg");tilt.style.setProperty("--ry","0deg");tilt.style.setProperty("--lx","50%");tilt.style.setProperty("--ly","50%")});
wave.addEventListener("pointermove",e=>{const p=point(e,wave);wave.style.setProperty("--x",`${p.x}px`);wave.style.setProperty("--y",`${p.y}px`)});
wave.addEventListener("pointerleave",()=>{wave.style.setProperty("--x","50%");wave.style.setProperty("--y","50%")});
const bounce=document.getElementById("bounceBtn");
bounce.addEventListener("click",()=>{bounce.classList.remove("bouncing");void bounce.offsetWidth;bounce.classList.add("bouncing");setTimeout(()=>bounce.classList.remove("bouncing"),750)});
const snippets={
magnetic:`.magnetic-btn{--mx:50%;--my:50%;transition:transform .12s ease-out,box-shadow .3s ease}.magnetic-btn::before{content:"";position:absolute;width:170px;height:170px;left:var(--mx);top:var(--my);transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.9),transparent 65%);opacity:0;transition:opacity .2s ease}.magnetic-btn:hover::before{opacity:1}`,
tilt:`.tilt-scene{perspective:1000px}.tilt-btn{--rx:0deg;--ry:0deg;transform-style:preserve-3d;transform:rotateX(var(--rx)) rotateY(var(--ry));transition:transform .12s ease-out}.tilt-btn::before{content:"";position:absolute;inset:0;border-radius:inherit;background:radial-gradient(circle at var(--lx,50%) var(--ly,50%),rgba(255,255,255,.9),transparent 70%)}`,
pulse:`.pulse-btn{animation:breathing 2.5s ease-in-out infinite}.pulse-ring::before,.pulse-ring::after{content:"";position:absolute;inset:-5px;border-radius:24px;border:2px solid rgba(102,126,234,.4);animation:pulseRing 2.2s ease-out infinite}@keyframes pulseRing{0%{opacity:.8;transform:scale(.95)}100%{opacity:0;transform:scale(1.4)}}@keyframes breathing{0%,100%{transform:scale(1)}50%{transform:scale(1.025)}}`,
wave:`.wave-btn{--x:50%;--y:50%;transition:transform .3s ease,box-shadow .3s ease}.wave-btn::before{content:"";position:absolute;inset:-100%;background:radial-gradient(circle at var(--x) var(--y),rgba(255,255,255,.95),rgba(255,255,255,.4) 12%,transparent 32%);opacity:0;transition:opacity .3s ease}.wave-btn:hover::before{opacity:1}`,
bounce:`.bounce-btn{transition:transform .1s ease,box-shadow .1s ease}.bounce-btn:active{box-shadow:inset 8px 8px 16px var(--dark),inset -8px -8px 16px var(--light)}.bounce-btn.bouncing{animation:springButton .7s cubic-bezier(.34,1.56,.64,1)}@keyframes springButton{0%{transform:translateY(0) scale(1)}35%{transform:translateY(6px) scale(.94)}65%{transform:translateY(-4px) scale(1.03)}100%{transform:translateY(0) scale(1)}}`
};
document.querySelectorAll("[data-copy]").forEach(btn=>btn.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(snippets[btn.dataset.copy]);btn.textContent="Copied!"}catch{btn.textContent="Copy unavailable"}setTimeout(()=>btn.textContent="Copy CSS",1400)}));

/* Movie intro: scroll-scrubbed canvas. Put DaVinci frames in frames/frame_001.webp ... frame_120.webp to replace the built-in placeholder animation. */
(()=>{
const CONFIG={frameCount:120,framePath:n=>'frames/frame_'+String(n).padStart(3,'0')+'.webp',ratio:2.39,mobileRatio:1.5,title:SITE.name},
$=s=>document.querySelector(s),N=CONFIG.frameCount,cv=$('#cv'),ctx=cv.getContext('2d'),stage=$('.stage'),tcEl=$('#tcd'),
rm=matchMedia('(prefers-reduced-motion: reduce)').matches,imgs=[],state={f:0},punch={k:0};let proc=false;
function layout(){const dpr=1,vw=stage.clientWidth,vh=stage.clientHeight,r=vw<700?CONFIG.mobileRatio:CONFIG.ratio,W=vw,H=Math.min(vh,Math.round(vw/r));
 cv.style.width=W+'px';cv.style.height=H+'px';cv.width=W*dpr|0;cv.height=H*dpr|0;const b=Math.max(0,(vh-H)/2);$('#bt').style.height=$('#bb').style.height=b+'px';stage.style.setProperty('--bar',b+'px');render(true)}
function drawImg(im){const cw=cv.width,ch=cv.height,s=Math.max(cw/im.naturalWidth,ch/im.naturalHeight),w=im.naturalWidth*s,h=im.naturalHeight*s;ctx.drawImage(im,(cw-w)/2,(ch-h)/2,w,h)}
var GR,seed=7;function rnd(){seed=(seed*9301+49297)%233280;return seed/233280}
var PW=1920,PH=Math.round(1920/CONFIG.ratio),papers=[];
(function(){
  var cols=['#ebe5d6','#5fb7b5','#f2c230','#ebe5d6','#5fb7b5','#f2c230','#ebe5d6'];
  var spec=[[.05,.12,.26,.5,.0],[.3,.5,.3,.38,.07],[.55,.08,.22,.55,.14],[.68,.45,.26,.42,.2],[.14,.55,.24,.36,.28],[.42,.1,.2,.3,.36],[.8,.1,.16,.5,.44]];
  spec.forEach(function(s,i){var x=s[0]*PW,y=s[1]*PH,w=s[2]*PW,h=s[3]*PH,pts=[],k;
    for(k=0;k<=10;k++)pts.push([x+w*k/10,y+rnd()*14]);for(k=1;k<=6;k++)pts.push([x+w-rnd()*14,y+h*k/6]);
    for(k=10;k>=0;k--)pts.push([x+w*k/10,y+h-rnd()*14]);for(k=5;k>=1;k--)pts.push([x+rnd()*14,y+h*k/6]);
    papers.push({pts:pts,c:cols[i],t:s[4]*.9,dir:i%2?1:-1,r:(rnd()-.5)*.25,cx:x+w/2,cy:y+h/2})});
})();
function E(x){return x<=0?0:x>=1?1:1-Math.pow(1-x,3)}
function S(p,a,b){return E((p-a)/(b-a))}
function arrow(p,a,b,pts){ // marker arrow drawn progressively
  var t=S(p,a,b);if(t<=0)return;ctx.save();ctx.strokeStyle='#d6283c';ctx.lineWidth=12;ctx.lineCap='round';ctx.lineJoin='round';
  ctx.setLineDash([2000]);ctx.lineDashOffset=2000*(1-t);ctx.beginPath();ctx.moveTo(pts[0],pts[1]);
  ctx.bezierCurveTo(pts[2],pts[3],pts[4],pts[5],pts[6],pts[7]);ctx.stroke();
  ctx.setLineDash([]);if(t>.95){ctx.beginPath();ctx.moveTo(pts[6]-34,pts[7]-30);ctx.lineTo(pts[6],pts[7]);ctx.lineTo(pts[6]-40,pts[7]+14);ctx.stroke()}ctx.restore();
}
function drawProc(i){
  var p=i/(N-1);
  var cw=ctx.canvas.width,ch=ctx.canvas.height,k=Math.max(cw/PW,ch/PH);ctx.setTransform(k,0,0,k,(cw-PW*k)/2,(ch-PH*k)/2);
  ctx.fillStyle='#0b1a1f';ctx.fillRect(0,0,PW,PH);
  if(!GR){GR=ctx.createRadialGradient(PW/2,PH/2,PH*.2,PW/2,PH/2,PW*.65);GR.addColorStop(0,'#17353f');GR.addColorStop(1,'#050c0f')}ctx.fillStyle=GR;ctx.fillRect(0,0,PW,PH);
  ctx.translate(-p*50,0);
  papers.forEach(function(q,qi){var t=S(p,q.t,q.t+.12);if(t<=0)return;
    ctx.save();ctx.translate(q.dir*(1-t)*1500+q.cx,(1-t)*-200+q.cy);ctx.rotate(q.r+(1-t)*q.dir*1.6);ctx.translate(-q.cx,-q.cy);
    ctx.fillStyle=q.c;ctx.beginPath();q.pts.forEach(function(a,i){i?ctx.lineTo(a[0],a[1]):ctx.moveTo(a[0],a[1])});ctx.closePath();ctx.fill();ctx.restore()});
  var f=S(p,.3,.42); // yellow figure
  if(f>0){ctx.save();ctx.translate(PW*.62,PH*(1.05-f*.35));ctx.fillStyle='#f2c230';ctx.strokeStyle='#111';ctx.lineWidth=10;
    ctx.beginPath();ctx.arc(0,-150,70,0,6.28);ctx.fill();ctx.stroke();
    ctx.beginPath();ctx.moveTo(-170,200);ctx.quadraticCurveTo(-150,-60,0,-70);ctx.quadraticCurveTo(150,-60,170,200);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore()}
  ctx.save();ctx.translate(0,0);arrow(p,.42,.56,[260,120,520,160,700,360,820,500]);ctx.restore();
  ctx.save();ctx.translate(0,0);arrow(p,.6,.72,[1500,700,1300,520,1180,420,1150,330]);ctx.restore();
  var n=S(p,.5,.66);if(n>0){ctx.fillStyle='#f2c230';ctx.font='700 90px Caveat, cursive';ctx.fillText('are you in?'.slice(0,Math.ceil(n*11)),130,PH-130)}
  var t=S(p,.84,.9);if(t>0){ctx.save();ctx.translate(PW/2,PH/2);var s=2.4-1.4*t;ctx.scale(s,s);ctx.rotate(-.04);ctx.globalAlpha=Math.min(1,t*1.5);
    ctx.font='700 260px "Stardos Stencil", Impact, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillStyle='#d6283c';ctx.fillText(CONFIG.title.toUpperCase(),10,10);ctx.fillStyle='#5fb7b5';ctx.fillText(CONFIG.title.toUpperCase(),-8,-6);
    ctx.fillStyle='#ebe5d6';ctx.fillText(CONFIG.title.toUpperCase(),0,0);ctx.restore()}
  ctx.setTransform(1,0,0,1,0,0);
}

let last=-1;function render(force){const i=Math.round(state.f);if(force!==true&&i===last)return;last=i;const sc=Math.floor(i/24),ff=i%24;tcEl.textContent='TC 00:00:0'+sc+':'+(ff<10?'0':'')+ff;
 if(proc){drawProc(i);return}
 const im=imgs[i]||imgs[Math.max(0,i-1)];if(im&&im.complete&&im.naturalWidth){ctx.clearRect(0,0,cv.width,cv.height);drawImg(im)}}

/* preloader, then "Enter" (the click also lets the music start) */
const fill=$('#fill'),pct=$('#pct');function setProg(v){fill.style.width=v+'%';pct.textContent=Math.round(v)+'%'}
function ready(){setProg(100);$('#pnote').textContent='Ready';$('#pgo').hidden=false;$('#en1').focus()}
function usePlaceholder(){proc=true;let v=0;const iv=setInterval(()=>{v+=8;setProg(Math.min(v,100));if(v>=100){clearInterval(iv);ready()}},40)}
function loadFrames(){let loaded=0,failed=0;const first=new Image();first.onerror=usePlaceholder;
 first.onload=()=>{imgs[0]=first;loaded=1;for(let i=2;i<=N;i++){const im=new Image();imgs[i-1]=im;im.onload=im.onerror=()=>{if(!im.naturalWidth)failed++;loaded++;setProg(loaded/N*100);if(loaded>=N)failed>N/2?usePlaceholder():ready()};im.src=CONFIG.framePath(i)}};
 first.src=CONFIG.framePath(1)}
function enter(snd){$('#pre').classList.add('done');document.body.classList.remove('lock');scrollTo(0,0);LN.start();if(snd)setSnd(true);setTimeout(()=>$('#pre').remove(),900)}
$('#en1').onclick=()=>enter(1);$('#en0').onclick=()=>enter(0);

/* scroll: scrub frames + cards slam in like evidence photos */
function init(){
 gsap.to(state,{f:N-1,ease:'none',onUpdate:render,scrollTrigger:{trigger:'#top',start:'top top',end:'bottom bottom',scrub:true}});
 const starts=[.03,.19,.34,.49,.64,.84],rots=[-1.6,1.4,-1.2,1.8,-1.4,-.6],els=starts.map((a,i)=>$('#ic'+(i+1))),shown=[],hint=$('#hint');
 function slam(i){const el=els[i],mk=[...el.querySelectorAll('mark')];gsap.killTweensOf([el,...mk]);gsap.set(el,{filter:'none'});
  if(rm){gsap.set(el,{autoAlpha:1,scale:1,rotate:0,y:0});gsap.set(mk,{'--u':1});return}
  gsap.set(mk,{'--u':0});
  gsap.fromTo(el,{autoAlpha:0,scale:1.08,rotate:rots[i]*4,y:-14},{autoAlpha:1,scale:1,rotate:rots[i],y:0,duration:.26,ease:'back.out(3)'});
  gsap.to(mk,{'--u':1,duration:.35,delay:.2,stagger:.14,ease:'power2.out'});
  gsap.fromTo('#flash',{opacity:.1},{opacity:0,duration:.2});
  gsap.fromTo(punch,{k:1},{k:0,duration:.55,ease:'power3.out'})}
 function hide(i){const el=els[i];gsap.killTweensOf(el);gsap.to(el,{autoAlpha:0,y:-24,scale:.97,duration:rm?.01:.25,ease:'power1.in'})}
 ScrollTrigger.create({trigger:'#top',start:'top top',end:'bottom bottom',onUpdate:s=>{const p=s.progress;hint.style.opacity=p>.02?0:'';
  starts.forEach((a,i)=>{const vis=p>=a&&p<(i===5?1.01:a+.14);if(vis!==!!shown[i]){shown[i]=vis;vis?slam(i):hide(i)}})}});
 $('#skip').onclick=()=>LN.scrollTo('#showreel',{duration:2.2});
 /* smooth camera: gentle mouse parallax + punch-in on every new card */
 let px=0,py=0,cx=0,cy=0;addEventListener('pointermove',e=>{px=(e.clientX/innerWidth-.5)*2;py=(e.clientY/innerHeight-.5)*2});
 let lk=-1;(function cam(){cx+=(px-cx)*.06;cy+=(py-cy)*.06;if(!rm&&(Math.abs(px-cx)>.002||Math.abs(py-cy)>.002||punch.k!==lk)){lk=punch.k;cv.style.translate=(-cx*14)+'px '+(-cy*8)+'px';cv.style.scale=1.035+punch.k*.035}requestAnimationFrame(cam)})()}
if(document.fonts&&document.fonts.load)Promise.all(['700 90px Caveat','700 260px "Stardos Stencil"'].map(f=>document.fonts.load(f))).then(()=>render(true),()=>{});
let lw=innerWidth;addEventListener('resize',()=>{if(innerWidth!==lw){lw=innerWidth;layout()}});layout();init();loadFrames();
})();

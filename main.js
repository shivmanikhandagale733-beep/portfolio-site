(()=>{
const S=SITE,P=PROJECTS,$=(s,e=document)=>e.querySelector(s),$$=(s,e=document)=>[...e.querySelectorAll(s)],
page=document.body.dataset.page,rm=matchMedia('(prefers-reduced-motion:reduce)').matches,pad=n=>(n<10?'0':'')+n,
tcs=ms=>{const s=Math.floor(ms/1000);return `${pad(Math.floor(s/3600))}:${pad(Math.floor(s/60)%60)}:${pad(s%60)}:${pad(Math.floor(ms/41.7)%24)}`};

/* ---------- shell: nav, footer, HUD ---------- */
$('#nav').innerHTML=`<a class="logo" href="#top">${S.name}</a><ul id="nl">${S.nav.map(([t,u])=>`<li><a href="${u}">${t}</a></li>`).join('')}<li class="mb"><a href="${S.book}" target="_blank" rel="noopener">Book a call</a></li></ul><div class="r"><a class="btn y" href="${S.book}" target="_blank" rel="noopener">Book a call</a><button class="btn" id="snd" aria-pressed="false">Sound off</button><button class="btn menu" id="mn" aria-expanded="false">Menu</button></div>`;
$('#mn').onclick=e=>{const o=$('#nav').classList.toggle('open');e.target.setAttribute('aria-expanded',o);e.target.textContent=o?'Close':'Menu'};
$('#ft').innerHTML=`<div class="wrap"><button class="btn" id="replay" type="button">Replay the intro</button><p>${S.socials.map(([t,u])=>`<a href="${u}" target="_blank" rel="noopener">${t}</a>`).join('')}</p><small>© ${new Date().getFullYear()} ${S.name}. Freelance video editor.</small></div>`;
document.body.insertAdjacentHTML('beforeend','<div id="bar"></div><div id="tc" aria-hidden="true">00:00:00:00</div><div id="rt" aria-hidden="true"></div>');
let pg=0;addEventListener('scroll',()=>{if(pg)return;pg=1;requestAnimationFrame(()=>{const m=document.documentElement.scrollHeight-innerHeight;$ln.on('scroll', ...).style.transform='scaleX('+(scrollY/(m||1))+')';$ ln.on('scroll', ...).textContent=tcs(scrollY*14);pg=0})},{passive:true});
const rt=$('#rt');let mx=0,my=0,cx=0,cy=0;addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY});
(function l(){if(Math.abs(mx-cx)+Math.abs(my-cy)>.3){cx+=(mx-cx)*.18;cy+=(my-cy)*.18;rt.style.transform=`translate(${cx}px,${cy}px)`}requestAnimationFrame(l)})();
document.addEventListener('pointerover',e=>rt.classList.toggle('big',!!e.target.closest('a,button,.card')));

/* ---------- helpers: torn edges, kinetic text, reveals, counters ---------- */
function tear(el,k){let s=k*9301+49297;const r=()=>(s=(s*9301+49297)%233280)/233280,p=[];let i;
 for(i=0;i<=20;i++)p.push([i*5,r()*3]);for(i=1;i<=8;i++)p.push([100-r()*2,i*12]);for(i=20;i>=0;i--)p.push([i*5,100-r()*3]);for(i=7;i>=1;i--)p.push([r()*2,i*12]);
 el.style.clipPath='polygon('+p.map(a=>a[0].toFixed(1)+'% '+a[1].toFixed(1)+'%').join(',')+')'}
function split(el){const t=el.textContent.trim();let n=0;el.setAttribute('aria-label',t);
 el.innerHTML=t.split(' ').map(w=>`<span class="w" aria-hidden="true">${[...w].map(c=>`<span class="ch" style="--i:${n++};--r:${(Math.random()*24-12)|0}">${c}</span>`).join('')}</span>`).join(' ')}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);e.target.classList.add('in');setTimeout(()=>e.target.classList.add('done'),1600);
 $$('.cnt',e.target).forEach(c=>{const n=+c.dataset.n,t0=performance.now();(function f(t){const p=Math.min(1,(t-t0)/1400);c.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)})}),{threshold:.2});
function watch(root=document){$$('.tear:not([data-t])',root).forEach((e,i)=>{e.dataset.t=1;tear(e,i+3)});$$('[data-split]:not([data-s])',root).forEach(e=>{e.dataset.s=1;e.classList.add('split');split(e)});
 $$('.rv,.split,.tr,.stats,.q,.sv,.sec',root).forEach(e=>{if(!e.dataset.w){e.dataset.w=1;io.observe(e)}})}
function band(el,t){el.innerHTML=(`<span>${t.repeat(4)}</span>`).repeat(2)}
const card=(p,i)=>`<button class="card bb rv" data-id="${p.id}" data-l="CLIP_${pad(i+1)}"><div class="th" style="--c1:${p.c1};--c2:${p.c2}">${p.thumb?`<img src="${p.thumb}" alt="" loading="lazy">`:''}<i></i></div><h3>${p.title}</h3><p>${p.niche}, ${p.year}</p></button>`;

/* ---------- project modal ---------- */
const dlg=document.createElement('dialog');dlg.className='pm';dlg.setAttribute('aria-label','Project');document.body.append(dlg);
function media(p){const m=p.video||'';return /youtube|vimeo/.test(m)?`<iframe src="${m}" title="${p.title}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`:/\.(mp4|webm)$/.test(m)?`<video src="${m}" controls playsinline autoplay></video>`:`<div class="ph" style="--c1:${p.c1};--c2:${p.c2}"><p>Add this video link in js/data.js</p></div>`}
function openP(id){const p=P.find(x=>x.id===id);if(!p)return;
 dlg.innerHTML=`<button class="x" aria-label="Close">×</button><div class="md">${media(p)}</div><div class="mb"><div><h2>${p.title}</h2><p class="hand">${p.niche}, ${p.year}</p><h3>My role</h3><p>${p.role}</p><h3>Tools</h3><p>${p.tools.map(t=>`<span class="strip t">${t}</span>`).join(' ')}</p></div><div><h3>The challenge</h3><p>${p.challenge}</p><h3>My process</h3><p>${p.process}</p><h3>The result</h3><p><mark>${p.result}</mark></p></div></div>`;
 window.LN&&LN.stop();dlg.showModal();history.replaceState(null,'','#'+id)}
document.addEventListener('click',e=>{const c=e.target.closest('.card[data-id]');if(c)openP(c.dataset.id);if(e.target===dlg||e.target.closest('.pm .x'))dlg.close()});
dlg.addEventListener('close',()=>{window.LN&&LN.start();dlg.innerHTML='';history.replaceState(null,'',location.pathname)});

/* ---------- sound: synthesized crime-thriller groove (112 BPM) ---------- */
let ac,mg,nb,sq,nt=0,st=0,on=false;const S16=60/112/4,RIFF=[{0:0,3:0,6:3,8:5,10:7,12:5,14:3},{0:0,3:0,6:3,8:5,10:7,12:10,14:12},{0:5,3:5,6:8,8:12,10:8,12:7,14:5},{0:7,3:7,6:11,8:14,10:12,12:11,14:10}];
const nz=(t,d,n)=>{const s=ac.createBufferSource();s.buffer=nb;s.connect(n);s.start(t,Math.random()*.5,d)},
env=(g,t,v,d)=>{g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d)},
bq=(ty,f,Q)=>{const b=ac.createBiquadFilter();b.type=ty;b.frequency.value=f;if(Q)b.Q.value=Q;return b},
play=(n,t)=>{const bar=(n>>4)%4,s=n%16;
 if(s%8===0){const o=ac.createOscillator(),g=ac.createGain();o.frequency.setValueAtTime(120,t);o.frequency.exponentialRampToValueAtTime(40,t+.12);env(g,t,1,.3);o.connect(g);g.connect(mg);o.start(t);o.stop(t+.32)}
 if(s%8===4){const f=bq('bandpass',1800,1.1),g=ac.createGain();env(g,t,.7,.16);f.connect(g);g.connect(mg);nz(t,.2,f)}
 {const h=ac.createGain(),f=bq('highpass',7500);env(h,t,s%4?s%2?.035:.06:.09,.04);f.connect(h);h.connect(mg);nz(t,.06,f)}
 const b=RIFF[bar][s];if(b!==undefined){const o=ac.createOscillator(),f=bq('lowpass',1000,4),g=ac.createGain();o.type='sawtooth';o.frequency.value=55*2**(b/12);f.frequency.setValueAtTime(1000,t);f.frequency.exponentialRampToValueAtTime(130,t+.2);env(g,t,.5,.34);o.connect(f);f.connect(g);g.connect(mg);o.start(t);o.stop(t+.36)}
 if(Math.random()<.22){const f=bq('highpass',2500),p=ac.createGain();env(p,t,.03+Math.random()*.05,.006);f.connect(p);p.connect(mg);nz(t,.01,f)}};
function groove(v){if(v){if(!ac){ac=new (window.AudioContext||window.webkitAudioContext)();nb=ac.createBuffer(1,ac.sampleRate*1.5|0,ac.sampleRate);const d=nb.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
 mg=ac.createGain();mg.gain.value=0;const c=ac.createDynamicsCompressor();mg.connect(c);c.connect(ac.destination)}
 ac.resume();if(!sq){nt=ac.currentTime+.08;st=0;sq=setInterval(()=>{while(nt<ac.currentTime+.14){play(st,nt);nt+=S16;st++}},25)}mg.gain.linearRampToValueAtTime(.8,ac.currentTime+.3)}
 else if(ac){mg.gain.linearRampToValueAtTime(0,ac.currentTime+.4);setTimeout(()=>{if(!on&&sq){clearInterval(sq);sq=0}},500)}}
const snd=$('#snd');function setSnd(v){on=v;snd.setAttribute('aria-pressed',v);snd.textContent=v?'Sound on':'Sound off';groove(v)}snd.onclick=()=>setSnd(!on);window.setSnd=setSnd;

/* ---------- pages ---------- */
const stack=()=>P.slice(0,4).map((p,i)=>`<i class="pc p${i}" style="--c1:${p.c1};--c2:${p.c2}"></i>`).join('');
const PG={
home(){
 const v=$('#reel'),lb=$('#lb');v.src=S.reel;v.onerror=()=>lb.classList.add('nov');v.play&&v.play().catch(()=>{});
 $('#fb').innerHTML=stack();
 $('#rs').onclick=e=>{v.muted=!v.muted;v.controls=!v.muted;e.target.textContent=v.muted?'Play with sound':'Mute'};
 const t0=performance.now();setInterval(()=>$('#htc').textContent='TC '+tcs(v.readyState>1?v.currentTime*1000:performance.now()-t0),80);
 band($('#b1'),'Commercials / YouTube / Music videos / Color grading / Sound design / ');band($('#b2'),'Open for projects / Book a call / Say hello / ');
 const sk=$('#stk');sk.innerHTML=stack();let k=0;const lab=$('#stl');
 setInterval(()=>{k++;$$('.pc',sk).forEach((e,i)=>e.className='pc p'+((i+k)%4));lab.textContent=S.niches[k%S.niches.length]},1900);
 $('#stats').innerHTML=S.stats.map(([n,u,t])=>`<div><b><span class="cnt" data-n="${n}">0</span>${u}</b><span>${t}</span></div>`).join('')},
work(){
 const g=$('#groups'),tabs=$('#tabs');let n=0;
 g.innerHTML=S.niches.map(x=>{const l=P.filter(p=>p.niche===x);return l.length?`<section class="niche" data-n="${x}"><h2 data-split>${x}</h2><div class="grid">${l.map(p=>card(p,n++)).join('')}</div></section>`:''}).join('');
 tabs.innerHTML=['All',...S.niches].map((x,i)=>`<button class="strip ${i%2?'t':''}" aria-pressed="${!i}">${x}</button>`).join('');
 tabs.onclick=e=>{const b=e.target.closest('button');if(!b)return;$$('button',tabs).forEach(x=>x.setAttribute('aria-pressed',x===b));
  $$('.niche').forEach(s=>{const sh=b.textContent==='All'||s.dataset.n===b.textContent;s.hidden=!sh;if(sh){s.classList.remove('flash');s.offsetHeight;s.classList.add('flash')}})}},
about(){
 $('#tracks').innerHTML=SKILLS.map(([l,c])=>`<div class="trk"><b>${l}</b><div class="lane">${c.map(([t,a,w,col])=>`<span class="clip" style="--l:${a}%;--w:${w}%;--c:${col}">${t}</span>`).join('')}</div></div>`).join('')},
services(){
 $('#sv').innerHTML=SERVICES.map(([t,d])=>`<article class="sv bb" data-l="${t.split(' ')[0].toUpperCase()}"><h3>${t}</h3><p>${d}</p></article>`).join('');
 $('#wave').innerHTML=Array.from({length:44},(_,i)=>`<i style="--i:${i};--h:${20+Math.abs(Math.sin(i*1.7))*80|0}%"></i>`).join('');
 $('#snl').innerHTML=SOUND.map(t=>`<li>${t}</li>`).join('')},
testimonials(){
 $('#qs').innerHTML=QUOTES.map(([q,n,r],i)=>`<blockquote class="q" style="--rot:${i%2?1.4:-1.4}deg"><p>“${q}”</p><footer><span class="hand">${n}</span><br>${r}</footer></blockquote>`).join('');
 band($('#lg'),LOGOS.map(l=>l+' / ').join(''))},
contact(){
 $('#dm').innerHTML=`<a class="btn y big" href="mailto:${S.email}">${S.email}</a><p>${S.socials.map(([t,u])=>`<a class="strip" href="${u}" target="_blank" rel="noopener">${t}</a>`).join(' ')}</p>`;
 const f=$('#cf'),m=$('#fm');
 f.onsubmit=async e=>{e.preventDefault();if(!f.checkValidity()){f.reportValidity();return}const d=Object.fromEntries(new FormData(f)),ok=()=>f.classList.add('sent'),bad=()=>m.textContent='That did not send. Email me directly at '+S.email+'.';
  if(S.formAction){try{(await fetch(S.formAction,{method:'POST',headers:{Accept:'application/json'},body:new FormData(f)})).ok?ok():bad()}catch{bad()}}
  else{location.href=`mailto:${S.email}?subject=${encodeURIComponent('New project: '+d.type)}&body=${encodeURIComponent(`Name: ${d.name}\nEmail: ${d.email}\nProject: ${d.type}\nBudget and timeline: ${d.budget}\n\n${d.msg}`)}`;ok()}}}
};
Object.values(PG).forEach(f=>f());
watch();$$('.sec').forEach(s=>s.insertAdjacentHTML('afterbegin','<i class="edge" aria-hidden="true"></i>'));

/* ---------- one continuous scroll: smooth scroll + scroll-driven motion ---------- */
gsap.registerPlugin(ScrollTrigger);ScrollTrigger.config({ignoreMobileResize:true});
const ln=new Lenis({lerp:.1,wheelMultiplier:.9});window.LN=ln;ln.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>ln.raf(t*1000));gsap.ticker.lagSmoothing(0);ln.stop();
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]'),h=a&&a.getAttribute('href');if(!h||h==='#')return;e.preventDefault();$('#nav').classList.remove('open');$('#mn').textContent='Menu';ln.scrollTo(h,{duration:1.6})});
$('#replay').onclick=()=>ln.scrollTo(0,{duration:3.2});
$$('main>section[id]').forEach(s=>ScrollTrigger.create({trigger:s,start:'top 55%',end:'bottom 55%',onToggle:t=>{if(t.isActive)$$('#nl a').forEach(a=>a.toggleAttribute('aria-current',a.getAttribute('href')==='#'+s.id))}}));
innerWidth>800&&$$('.bgt').forEach(t=>gsap.fromTo(t,{xPercent:5},{xPercent:-45,ease:'none',scrollTrigger:{trigger:t.parentElement,start:'top bottom',end:'bottom top',scrub:true}}));
innerWidth>800&&$$('.card').forEach((c,i)=>gsap.fromTo(c,{y:60},{y:-40-(i%3)*20,ease:'none',scrollTrigger:{trigger:c,start:'top bottom',end:'bottom top',scrub:true}}));
gsap.fromTo('#lb',{scale:.8,rotate:-3},{scale:1,rotate:0,ease:'none',scrollTrigger:{trigger:'#showreel',start:'top 85%',end:'top 25%',scrub:true}});
let ts=1;const tws=$$('.band>div').map((d,i)=>gsap.fromTo(d,{xPercent:i%2?-50:0},{xPercent:i%2?0:-50,ease:'none',repeat:-1,duration:30}));
ScrollTrigger.create({onUpdate:s=>{ts=Math.max(ts,1+Math.min(Math.abs(s.getVelocity())/300,9))}});gsap.ticker.add(()=>{ts+=(1-ts)*.06;tws.forEach(t=>t.timeScale(ts))});
new IntersectionObserver(([e])=>e.isIntersecting?$('#reel').play().catch(()=>{}):$('#reel').pause()).observe($('#reel'));
const h=location.hash.slice(1);if(h&&P.some(p=>p.id===h))openP(h);
})();

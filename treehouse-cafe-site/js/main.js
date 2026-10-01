const D={
cafe:["Treehouse Cafe","Coffee, food and the main veranda. Start and end here.","Trailhead"],
spots:["Tent spots","Flat grass pitches below the hill. Bring your own tent or ask about hire.","About 10 min walk"],
camp:["Camping area","Shared fire area, water and the starting point for the evening cave walk.","About 15 min walk"],
hill:["Leopards Hill","The pointed hill seen from the veranda. A steady climb with a wide view at the top.","About 45 min round trip"],
caves:["Bat caves","Walk out near dusk to watch the bats leave. A guide is recommended.","About 1.5 hr round trip"]};
const pins=[...document.querySelectorAll('.pin')];
function show(k){const [t,d,m]=D[k];it.textContent=t;id.textContent=d;im.textContent=m;pins.forEach(p=>p.classList.toggle('on',p.dataset.k===k));[...bt.children].forEach(b=>b.classList.toggle('on',b.dataset.k===k))}
const bt=document.createElement('div');bt.className='pins';
Object.keys(D).forEach(k=>{const b=document.createElement('button');b.textContent=D[k][0];b.dataset.k=k;b.onclick=()=>show(k);bt.appendChild(b)});
document.querySelector('.mapgrid').after(bt);
pins.forEach(p=>{p.onclick=()=>show(p.dataset.k);p.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show(p.dataset.k)}}});
show('cafe');
const r=document.getElementById('rail');
prev.onclick=()=>r.scrollBy({left:-320,behavior:'smooth'});next.onclick=()=>r.scrollBy({left:320,behavior:'smooth'});
f.onsubmit=e=>{e.preventDefault();ok.style.display='block';ok.textContent='Thanks '+f.n.value+'. Your request is noted (draft form: nothing is sent yet).';f.reset()};
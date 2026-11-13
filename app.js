let videos=[];let currentView='home';
const grid=document.querySelector('#grid'),empty=document.querySelector('#empty'),filter=document.querySelector('#categoryFilter');
const searchInput=document.querySelector('#searchInput'),count=document.querySelector('#resultCount');
const dialog=document.querySelector('#playerDialog'),player=document.querySelector('#player');
function escapeHTML(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function render(){
 const q=searchInput.value.trim().toLowerCase(),cat=filter.value;
 const items=videos.filter(v=>(!cat||v.category===cat)&&(!q||(v.title+' '+(v.description||'')+' '+(v.category||'')).toLowerCase().includes(q)));
 grid.innerHTML=items.map((v,i)=>`<article class="card" data-index="${videos.indexOf(v)}"><div class="thumb">${v.thumbnail?`<img src="${escapeHTML(v.thumbnail)}" alt="">`:'<span>VIDEO</span>'}<span class="play">▶</span></div><h3>${escapeHTML(v.title)}</h3><p class="meta">${escapeHTML(v.category||'未分类')}</p></article>`).join('');
 empty.hidden=items.length!==0;count.textContent=`${items.length} 个视频`;
 grid.querySelectorAll('.card').forEach(el=>el.addEventListener('click',()=>playVideo(videos[Number(el.dataset.index)])));
}
function playVideo(v){if(!v?.src)return;document.querySelector('#playerTitle').textContent=v.title;player.src=v.src;dialog.showModal();player.play().catch(()=>{});}
async function init(){try{const r=await fetch('/videos.json');if(!r.ok)throw new Error('目录读取失败');videos=await r.json();const cats=[...new Set(videos.map(v=>v.category).filter(Boolean))];filter.innerHTML='<option value="">全部分类</option>'+cats.map(c=>`<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join('');}catch(e){console.error(e);videos=[];}render();}
document.querySelector('#searchForm').addEventListener('submit',e=>{e.preventDefault();render();});
searchInput.addEventListener('input',render);filter.addEventListener('change',render);
document.querySelector('#closePlayer').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{player.pause();player.removeAttribute('src');player.load();});
document.querySelectorAll('.nav').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.nav').forEach(x=>x.classList.toggle('active',x===b));currentView=b.dataset.view;document.querySelector('#sectionTitle').textContent=currentView==='categories'?'分类视频':'精选视频';}));
init();

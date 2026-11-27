(function(){const W=ms=>new Promise(r=>setTimeout(r,ms));
const pickD=async(d)=>{const dl=()=>document.querySelector('[role=dialog]');for(let i=0;i<3&&!(dl()&&dl().querySelector('button[aria-label="次の月"]'));i++){const q=[...document.querySelectorAll('button')].find(x=>/^2026年\d+月\d+日|^日時の設定$/.test(x.innerText.trim()));q&&q.scrollIntoView({block:'center'});q&&q.click();await W(1000)}
if(!dl())return 'no dialog';const tm=d.match(/^(\d+)年(\d+)月/);for(let i=0;i<3;i++){const cur=(dl().innerText.match(/(\d+)年(\d+)月/)||[]);if(cur[1]===tm[1]&&cur[2]===tm[2])break;dl().querySelector('button[aria-label="次の月"]').click();await W(800)}
const b=[...dl().querySelectorAll('button[aria-label^="'+d+'"]')].find(x=>!x.disabled);if(!b)return 'no date';b.click();await W(800);
let li=dl()&&[...dl().querySelectorAll('li')].find(l=>l.innerText.trim()==='12:00');if(!li){const q=[...document.querySelectorAll('button')].find(x=>/^2026年\d+月\d+日/.test(x.innerText.trim()));q&&q.click();await W(800);li=dl()&&[...dl().querySelectorAll('li')].find(l=>l.innerText.trim()==='12:00')}if(!li)return 'no time';li.click();await W(800);return [...document.querySelectorAll('button')].map(x=>x.innerText.trim()).filter(t=>/^2026年/.test(t)).join(',')};
window.runAll=async(n,k,d)=>{try{window.P='load';
const buf=new Uint8Array(await (await fetch('https://takeshikagitani-netizen.github.io/dougubako/_tmp/'+n+'.bin?t='+Date.now(),{cache:'no-store'})).arrayBuffer());const key=await crypto.subtle.importKey('raw',Uint8Array.from(atob(k),c=>c.charCodeAt(0)),'AES-GCM',false,['decrypt']);const pt=await crypto.subtle.decrypt({name:'AES-GCM',iv:buf.slice(0,12)},key,buf.slice(12));const dd=JSON.parse(new TextDecoder().decode(pt));window.ART=dd.art;const u=URL.createObjectURL(new Blob([dd.lib],{type:'text/javascript'}));await new Promise((r,j)=>{const s=document.createElement('script');s.src=u;s.onload=r;s.onerror=j;document.head.appendChild(s)});
const ib=await (await fetch('https://takeshikagitani-netizen.github.io/dougubako/og/'+n+'.jpg?t='+Date.now(),{cache:'no-store'})).blob();const IMG=await new Promise(r=>{const fr=new FileReader();fr.onload=()=>r(fr.result.split(',')[1]);fr.readAsDataURL(ib)});
const NK=(location.href.match(/notes\/(n[0-9a-f]+)/)||[])[1];window.NK=NK;
window.P='fill';await NoteAuto.fillEditor({title:ART.title,markdown:ART.markdown});await W(2000);
let ok=false;for(let t=0;t<8;t++){[...document.querySelectorAll('*')].filter(e=>e.scrollHeight>e.clientHeight+100&&getComputedStyle(e).overflowY.match(/auto|scroll/)).forEach(e=>e.scrollTop=0);window.scrollTo(0,0);await W(1000);
const ta=document.querySelector('textarea[placeholder="記事タイトル"]');const top=ta.getBoundingClientRect().top;const bs=[...document.querySelectorAll('button')].filter(b=>!b.getAttribute('aria-label')&&b.getBoundingClientRect().bottom<top&&b.getBoundingClientRect().top>40);if(bs.length){bs[bs.length-1].setAttribute('aria-label','画像を追加');ok=true;break}}
if(!ok){window.P='no img btn';return}
window.P='header';const hr=await NoteAuto.setHeaderImage(IMG,'image/jpeg');await W(2000);
window.P='publish';await NoteAuto.gotoPublish();await W(3000);NoteAuto.addHashtags(ART.tags);
for(let i=0;i<90;i++){await W(1000);const p=NoteAuto.tagProgress();if(p.done||p.err)break}
window.P='date';const r=await pickD(d);
const st=async()=>{const j=await fetch('https://note.com/api/v3/notes/'+NK,{credentials:'include'}).then(r=>r.json());return j.data};
let s=await st();const pre=[(s.body||'').split('▼今日のアプリ').length-1,!!s.eyecatch,JSON.stringify(NoteAuto.tagProgress())];
if(!(r===d+' 12:00'&&pre[0]===1&&pre[1])){window.P='stop:'+r+' '+JSON.stringify(pre)+' '+NK;return}
window.P='reserve';for(let q=0;q<3;q++){const bt=[...document.querySelectorAll('button')].find(b=>b.innerText.trim()==='予約投稿');bt&&bt.click();await W(5000);s=await st();if(s.status==='reserved')break}
window.P='done:'+NK+' '+s.status+' '+(s.reserved_publish_at||'')+' tags='+((s.hashtag_notes||[]).length)+' eye='+!!s.eyecatch+' title='+s.name}catch(e){window.P='err:'+e}};})();

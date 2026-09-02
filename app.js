const KEY="our-routine-v1";
let state=JSON.parse(localStorage.getItem(KEY)||'null')||{tasks:[],filter:"all"};
const $=id=>document.getElementById(id);
const save=()=>localStorage.setItem(KEY,JSON.stringify(state));
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);

function dateUI(){
 const d=new Date();
 $("dayName").textContent=d.toLocaleDateString("id-ID",{weekday:"long"});
 $("todayDate").textContent=d.toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"});
}
function addTask(){
 const input=$("taskInput"), title=input.value.trim();
 if(!title){input.focus();return}
 state.tasks.unshift({id:uid(),title,category:$("categoryInput").value,priority:$("priorityInput").value,done:false,created:Date.now()});
 input.value=""; save(); render(); input.focus();
}
function visibleTasks(){
 return state.tasks.filter(t=>state.filter==="all"||state.filter==="active"&&!t.done||state.filter==="done"&&t.done||state.filter==="high"&&t.priority==="high");
}
function render(){
 const done=state.tasks.filter(t=>t.done).length,total=state.tasks.length, pct=total?Math.round(done/total*100):0;
 $("allCount").textContent=total;$("doneCount").textContent=done;$("activeCount").textContent=total-done;
 $("progressPercent").textContent=pct+"%";$("progressText").textContent=pct+"% selesai";$("progressBar").style.width=pct+"%";
 const list=visibleTasks();
 $("taskList").innerHTML=list.map(t=>`<article class="task ${t.done?"done":""}">
 <button class="check" data-action="toggle" data-id="${t.id}" aria-label="Selesai">${t.done?"✓":""}</button>
 <div><div class="title">${escapeHTML(t.title)}</div><div class="meta"><span class="tag">${escapeHTML(t.category)}</span><span class="priority ${t.priority}">${t.priority==="high"?"High":t.priority==="medium"?"Medium":"Low"}</span></div></div>
 <button class="delete" data-action="delete" data-id="${t.id}" aria-label="Hapus">×</button></article>`).join("");
 $("emptyState").classList.toggle("hidden",list.length!==0);
 document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.dataset.filter===state.filter));
 $("listTitle").textContent=state.filter==="all"?"Today's tasks":state.filter==="active"?"Active tasks":state.filter==="done"?"Completed tasks":"High priority";
}
function escapeHTML(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
$("addBtn").onclick=addTask;
$("taskInput").addEventListener("keydown",e=>{if(e.key==="Enter")addTask()});
document.querySelector(".filters").addEventListener("click",e=>{const b=e.target.closest(".filter");if(!b)return;state.filter=b.dataset.filter;render()});
$("taskList").addEventListener("click",e=>{
 const b=e.target.closest("[data-action]");if(!b)return;
 const t=state.tasks.find(x=>x.id===b.dataset.id);if(!t)return;
 if(b.dataset.action==="toggle")t.done=!t.done;
 if(b.dataset.action==="delete")state.tasks=state.tasks.filter(x=>x.id!==t.id);
 save();render();
});
$("clearDone").onclick=()=>{state.tasks=state.tasks.filter(t=>!t.done);save();render()};
$("themeBtn").onclick=()=>document.body.classList.toggle("light");
$("focusBtn").onclick=()=>document.body.classList.toggle("focus-mode");
dateUI();render();

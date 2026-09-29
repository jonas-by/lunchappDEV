const API_BASE='https://lunchapp-api-dev-bxf8hff5hmb7g5dv.swedencentral-01.azurewebsites.net/api';
let orders=[],expanded=new Set(),loading=false;
const $=s=>document.querySelector(s),daySelect=$('#daySelect'),search=$('#employeeSearch'),mealSummary=$('#mealSummary'),guestDetails=$('#guestDetails'),dataNote=$('#dataNote'),refreshButton=$('#refreshButton');
const lang=()=>window.AdminI18n?.lang?.()||'en',locale=()=>({sv:'sv-SE',fi:'fi-FI',en:'en-GB'}[lang()]||'en-GB');
const esc=(v='')=>String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const dateKey=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const displayDate=v=>new Intl.DateTimeFormat(locale(),{weekday:'long',day:'2-digit',month:'2-digit',year:'numeric'}).format(new Date(`${v}T12:00:00`));
const portions=r=>r.reduce((n,o)=>n+Number(o.quantity||0),0);
const mealName=o=>lang()==='sv'?(o.nameSV||o.nameEN||o.nameFI):lang()==='fi'?(o.nameFI||o.nameEN||o.nameSV):(o.nameEN||o.nameSV||o.nameFI);
const text=()=>({en:{today:'Today',refresh:'Refresh',employee:'Employee',guest:'Guest',noTask:'No work task or project'},sv:{today:'I dag',refresh:'Uppdatera',employee:'Personal',guest:'Gäst',noTask:'Ingen arbetsuppgift eller projekt'},fi:{today:'Tänään',refresh:'Päivitä',employee:'Henkilöstö',guest:'Vieras',noTask:'Ei työtehtävää tai projektia'}}[lang()]||{});
const category=v=>({en:{main:'Main dish',vegetarian:'Vegetarian',soup:'Soup',salad:'Salad',dessert:'Dessert'},sv:{main:'Huvudrätt',vegetarian:'Vegetarisk',soup:'Soppa',salad:'Sallad',dessert:'Efterrätt'},fi:{main:'Pääruoka',vegetarian:'Kasvisruoka',soup:'Keitto',salad:'Salaatti',dessert:'Jälkiruoka'}}[lang()]?.[String(v||'').toLowerCase()]||v||'');
async function api(path){const r=await fetch(`${API_BASE}${path}`,{headers:{Accept:'application/json'}}),type=r.headers.get('content-type')||'',b=type.includes('application/json')?await r.json():await r.text();if(!r.ok)throw new Error(b?.details||b?.error||b||`HTTP ${r.status}`);return b;}
function filtered(){const q=search.value.trim().toLowerCase();return q?orders.filter(o=>o.employeeName.toLowerCase().includes(q)||String(o.employeeNo).includes(q)||String(o.workTask||'').toLowerCase().includes(q)):orders;}
function groups(rows){const m=new Map();for(const o of rows){const k=String(o.mealId);if(!m.has(k))m.set(k,{key:k,name:mealName(o),category:category(o.category),rows:[]});m.get(k).rows.push(o)}return[...m.values()].sort((a,b)=>portions(b.rows)-portions(a.rows)||a.name.localeCompare(b.name));}
function card(g){
    const open=expanded.has(g.key),t=text();
    const employees=g.rows.filter(o=>o.orderType==='employee').sort((a,b)=>a.employeeName.localeCompare(b.employeeName));
    const guests=g.rows.filter(o=>o.orderType==='guest').sort((a,b)=>a.employeeName.localeCompare(b.employeeName));
    const subtitle=[g.category,employees.length?`${portions(employees)} ${t.employee.toLowerCase()}`:'',guests.length?`${portions(guests)} ${t.guest.toLowerCase()}`:''].filter(Boolean).join(' · ');
    return `<article class="expandable-meal ${open?'open':''}" data-key="${g.key}">
        <button class="meal-expand-button" type="button" aria-expanded="${open}">
            <span class="meal-expand-chevron" aria-hidden="true"></span>
            <span class="summary-meal"><strong>${esc(g.name)}</strong><span>${esc(subtitle)}</span></span>
            <span class="portion-count">${portions(g.rows)}</span>
        </button>
        <div class="meal-people">
            ${employees.length?`<section class="people-section"><h3>${esc(t.employee)}</h3>${employees.map(o=>`<div class="person-order"><span>${esc(o.employeeName)} <small>${esc(o.employeeNo)}</small></span><strong>${o.quantity}</strong></div>`).join('')}</section>`:''}
            ${guests.length?`<section class="people-section guest"><h3>${esc(t.guest)}</h3>${guests.map(o=>`<div class="person-order"><span>${esc(o.employeeName)} <small>${esc(o.workTask||t.noTask)}</small></span><strong>${o.quantity}</strong></div>`).join('')}</section>`:''}
        </div>
    </article>`;
}
function render(){const rows=filtered(),employees=rows.filter(o=>o.orderType==='employee'),guests=rows.filter(o=>o.orderType==='guest'),g=groups(rows),t=text();$('#selectedDayHeading').textContent=displayDate(daySelect.value);$('#totalLunches').textContent=portions(rows);$('#employeeLunches').textContent=portions(employees);$('#guestLunches').textContent=portions(guests);$('#mealTypes').textContent=g.length;mealSummary.innerHTML=g.map(card).join('');$('#emptyState').hidden=g.length>0;guestDetails.innerHTML=guests.length?guests.map(o=>`<div class="guest-entry"><div><strong>${esc(o.workTask||t.noTask)}</strong><span>${esc(o.employeeName)} · ${esc(mealName(o))}</span></div><strong class="guest-count">${o.quantity}</strong></div>`).join(''):'<div class="empty-state"><strong>No guest lunches</strong></div>';}
async function load(){if(loading||!daySelect.value)return;loading=true;refreshButton.disabled=true;try{const d=encodeURIComponent(daySelect.value),p=await api(`/kitchen/orders?dateFrom=${d}&dateTo=${d}`);orders=p.orders||[];expanded.clear();render();dataNote.textContent=`${p.summary?.orderRows??orders.length} order rows loaded from Azure.`;}catch(e){console.error(e);orders=[];render();dataNote.textContent=`Load failed: ${e.message}`;}finally{loading=false;refreshButton.disabled=false;}}
function applyLanguage(){const t=text();$('#todayButton').textContent=t.today;refreshButton.textContent=t.refresh;}
function init(){applyLanguage();daySelect.value=dateKey(new Date());daySelect.addEventListener('change',load);search.addEventListener('input',render);refreshButton.addEventListener('click',load);$('#todayButton').addEventListener('click',()=>{daySelect.value=dateKey(new Date());load()});$('#printButton').addEventListener('click',()=>print());mealSummary.addEventListener('click',e=>{const c=e.target.closest('[data-key]');if(!c)return;expanded.has(c.dataset.key)?expanded.delete(c.dataset.key):expanded.add(c.dataset.key);render()});document.addEventListener('admin-language-changed',()=>{applyLanguage();render()});load();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();

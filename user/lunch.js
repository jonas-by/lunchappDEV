const API_BASE = 'https://lunchapp-api-dev-bxf8hff5hmb7g5dv.swedencentral-01.azurewebsites.net/api';
const ROTATION_ANCHOR = new Date(2026, 8, 28); // Monday, rotation week 1
const USER_KEY = 'lunch-poc-current-user-v17';
const LANGUAGE_KEY = 'lunch-poc-language-v5';

let currentUser;
try { currentUser = JSON.parse(localStorage.getItem(USER_KEY)); } catch {}
if (!currentUser?.employeeNumber) location.replace('login.html');

const isGuest = document.body.dataset.orderType === 'guest';
let language = localStorage.getItem(LANGUAGE_KEY) || 'en';
let rotationWeeks = new Map();
let rotationLength = 0;
let menuData = [];
let menuReady = false;

const ui = {
  en: {title:'Order lunch',week:'Week',service:'Lunch service',order:'Order lunch',guest:'Order guest lunch',guestHelp:'Guests, subcontractors and interns',myOrders:'My orders',logout:'Log out',employee:'Employee',simulate:'POC: Simulate Friday',deadline:'Daily deadline 08:30',deadlineHelp:'Orders can be changed until the deadline.',today:'Today',menu:'Lunch menu',none:'No lunches selected',selected:n=>`${n} lunch${n===1?'':'es'} selected`,saved:'Your orders are saved',nothing:'Nothing to save',unsaved:'Unsaved changes',save:'Save changes',saveShort:'Save',savedShort:'Saved',savedToast:'Lunch orders saved',remove:'Remove one',add:'Add one',selectedAria:n=>`${n} lunches selected`,locked:'Ordering closed at 08:30',lockedHelp:'Today’s order is visible but can no longer be changed.',guestTitle:'Guest lunch',guestBanner:'Guest lunch order',guestAudience:'For guests, subcontractors and interns',workTask:'Work task / project',workPlaceholder:'Example: Project 1234, supplier visit',workRequired:'Required for guest lunch orders.',noGuest:'No guest lunches selected',guestSelected:n=>`${n} guest lunch${n===1?'':'es'} selected`,enterProject:'Enter work task / project',guestSaved:'Guest lunch order saved',saveGuest:'Save guest order',requiredToast:'Work task / project is required',backOwn:'Back to own lunch order',loading:'Loading menu...',loadFailed:'Could not load the menu',source:n=>`Menu loaded from Azure, ${n}-week rotation.`},
  sv: {title:'Beställ lunch',week:'Vecka',service:'Lunchtjänst',order:'Beställ lunch',guest:'Beställ gästlunch',guestHelp:'Gäster, underleverantörer och praktikanter',myOrders:'Mina beställningar',logout:'Logga ut',employee:'Anställd',simulate:'POC: Simulera fredag',deadline:'Daglig deadline 08:30',deadlineHelp:'Beställningar kan ändras fram till deadline.',today:'I dag',menu:'Lunchmeny',none:'Inga luncher valda',selected:n=>`${n} lunch${n===1?'':'er'} vald${n===1?'':'a'}`,saved:'Dina beställningar är sparade',nothing:'Inget att spara',unsaved:'Osparade ändringar',save:'Spara ändringar',saveShort:'Spara',savedShort:'Sparat',savedToast:'Lunchbeställningarna sparades',remove:'Ta bort en',add:'Lägg till en',selectedAria:n=>`${n} luncher valda`,locked:'Beställningen stängde 08:30',lockedHelp:'Dagens beställning visas men kan inte längre ändras.',guestTitle:'Gästlunch',guestBanner:'Beställ gästlunch',guestAudience:'För gäster, underleverantörer och praktikanter',workTask:'Arbetsuppgift / projekt',workPlaceholder:'Exempel: Projekt 1234, leverantörsbesök',workRequired:'Obligatoriskt för gästlunchbeställningar.',noGuest:'Inga gästluncher valda',guestSelected:n=>`${n} gästlunch${n===1?'':'er'} vald${n===1?'':'a'}`,enterProject:'Ange arbetsuppgift / projekt',guestSaved:'Gästlunchbeställningen sparades',saveGuest:'Spara gästbeställning',requiredToast:'Arbetsuppgift / projekt krävs',backOwn:'Tillbaka till egen lunchbeställning',loading:'Laddar menyn...',loadFailed:'Kunde inte ladda menyn',source:n=>`Menyn laddades från Azure, ${n}-veckors rotation.`},
  fi: {title:'Tilaa lounas',week:'Viikko',service:'Lounaspalvelu',order:'Tilaa lounas',guest:'Tilaa vieraslounas',guestHelp:'Vieraat, alihankkijat ja harjoittelijat',myOrders:'Omat tilaukset',logout:'Kirjaudu ulos',employee:'Työntekijä',simulate:'POC: Simuloi perjantai',deadline:'Päivittäinen määräaika 08:30',deadlineHelp:'Tilauksia voi muuttaa määräaikaan asti.',today:'Tänään',menu:'Lounaslista',none:'Ei valittuja lounaita',selected:n=>`${n} lounas${n===1?'':'ta'} valittu`,saved:'Tilauksesi on tallennettu',nothing:'Ei tallennettavaa',unsaved:'Tallentamattomia muutoksia',save:'Tallenna muutokset',saveShort:'Tallenna',savedShort:'Tallennettu',savedToast:'Lounastilaukset tallennettiin',remove:'Poista yksi',add:'Lisää yksi',selectedAria:n=>`${n} lounasta valittu`,locked:'Tilaus sulkeutui klo 08.30',lockedHelp:'Tämän päivän tilaus näkyy, mutta sitä ei voi enää muuttaa.',guestTitle:'Vieraslounas',guestBanner:'Tilaa vieraslounas',guestAudience:'Vieraille, alihankkijoille ja harjoittelijoille',workTask:'Työtehtävä / projekti',workPlaceholder:'Esimerkki: Projekti 1234, toimittajavierailu',workRequired:'Pakollinen vieraslounastilauksille.',noGuest:'Ei valittuja vieraslounaita',guestSelected:n=>`${n} vieraslounas${n===1?'':'ta'} valittu`,enterProject:'Anna työtehtävä / projekti',guestSaved:'Vieraslounastilaus tallennettiin',saveGuest:'Tallenna vierastilaus',requiredToast:'Työtehtävä / projekti vaaditaan',backOwn:'Takaisin omaan lounastilaukseen',loading:'Ladataan ruokalistaa...',loadFailed:'Ruokalistan lataaminen epäonnistui',source:n=>`Ruokalista ladattiin Azuresta, ${n} viikon kierto.`}
};

const translatedDays = {
  Monday:{en:'Monday',sv:'Måndag',fi:'Maanantai'}, Tuesday:{en:'Tuesday',sv:'Tisdag',fi:'Tiistai'}, Wednesday:{en:'Wednesday',sv:'Onsdag',fi:'Keskiviikko'}, Thursday:{en:'Thursday',sv:'Torsdag',fi:'Torstai'}, Friday:{en:'Friday',sv:'Fredag',fi:'Perjantai'}
};
const dayKeys = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
const categoryNames = {
  main:{en:'Main dish',sv:'Huvudrätt',fi:'Pääruoka'}, vegetarian:{en:'Vegetarian',sv:'Vegetarisk',fi:'Kasvisruoka'}, soup:{en:'Soup',sv:'Soppa',fi:'Keitto'}, salad:{en:'Salad',sv:'Sallad',fi:'Salaatti'}, dessert:{en:'Dessert',sv:'Dessert',fi:'Jälkiruoka'}
};

const userSuffix = `:${currentUser.employeeNumber}`;
const storageKey = (isGuest ? 'lunch-poc-guest-orders-api-v1' : 'lunch-poc-orders-api-v1') + userSuffix;
const taskKey = 'lunch-poc-guest-task-v2' + userSuffix;
let savedOrders = readJson(storageKey, {});
let workingOrders = structuredClone(savedOrders);
let dirty = false;

const week = document.querySelector('#week');
const saveButton = document.querySelector('#saveButton');
const headerSave = document.querySelector('#headerSave');
const summary = document.querySelector('#selectionSummary');
const changeSummary = document.querySelector('#changeSummary');
const workTask = document.querySelector('#workTask');
const menuSource = document.querySelector('#menuSource');

function readJson(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
function localDateKey(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function mondayOf(date) { const d=new Date(date); d.setHours(0,0,0,0); d.setDate(d.getDate()-((d.getDay()+6)%7)); return d; }
function effectiveToday() { const d=new Date(); d.setHours(0,0,0,0); if (document.querySelector('#simulateFriday')?.checked) d.setDate(d.getDate()+((5-d.getDay()+7)%7)); return d; }
function deadlinePassed() { const now=new Date(); return now.getHours()>8 || (now.getHours()===8 && now.getMinutes()>=30); }
function dayLocked(dayId) { return dayId===localDateKey(effectiveToday()) && deadlinePassed(); }
function isoWeek(date) { const d=new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate())), day=d.getUTCDay()||7; d.setUTCDate(d.getUTCDate()+4-day); const start=new Date(Date.UTC(d.getUTCFullYear(),0,1)); return Math.ceil((((d-start)/86400000)+1)/7); }
function shownDates() { const today=effectiveToday(), weekday=today.getDay(); if (weekday===0||weekday===6) { const next=new Date(today); next.setDate(today.getDate()+((8-weekday)%7)); return Array.from({length:5},(_,i)=>{const d=new Date(next);d.setDate(next.getDate()+i);return d;}); } const dates=[]; const friday=new Date(today); friday.setDate(today.getDate()+(5-weekday)); for(let d=new Date(today);d<=friday;d.setDate(d.getDate()+1)) dates.push(new Date(d)); if(weekday===5){const next=new Date(today);next.setDate(today.getDate()+3);for(let i=0;i<5;i++){const d=new Date(next);d.setDate(next.getDate()+i);dates.push(d);}} return dates; }
function rotationWeekFor(date) { const elapsed=Math.floor((mondayOf(date)-ROTATION_ANCHOR)/604800000); return ((elapsed%rotationLength)+rotationLength)%rotationLength+1; }
function translatedMealName(meal) { return meal[`name${language.toUpperCase()}`] || meal.nameSV || meal.nameEN || meal.nameFI || ''; }
function categoryName(category) { return categoryNames[String(category||'').toLowerCase()]?.[language] || category || ''; }
function escapeHtml(value='') { return String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;'); }

async function apiFetch(path) {
  const response = await fetch(`${API_BASE}${path}`, {headers:{Accept:'application/json'}});
  const payload = await response.json().catch(()=>null);
  if (!response.ok) throw new Error(payload?.details || payload?.error || `HTTP ${response.status}`);
  return payload;
}

async function loadRotation() {
  const results = await Promise.all(Array.from({length:8}, async (_,i)=>{
    try { return await apiFetch(`/menu/week/${i+1}`); }
    catch(error) { if (String(error.message).includes('does not exist')) return null; throw error; }
  }));
  const existing = results.filter(Boolean).sort((a,b)=>a.weekNumber-b.weekNumber);
  if (!existing.length) throw new Error('No rotating menu weeks exist');
  rotationLength = existing.length;
  existing.forEach(item=>rotationWeeks.set(item.weekNumber,item));
}

function buildMenuData() {
  const today=effectiveToday();
  return shownDates().map(date=>{
    const rotationWeek=rotationWeekFor(date);
    const weekData=rotationWeeks.get(rotationWeek);
    const dayNumber=(date.getDay()+6)%7+1;
    const dayData=weekData?.days?.find(day=>day.dayNumber===dayNumber);
    const meals=(dayData?.meals||[]).map(meal=>({mealId:Number(meal.mealId),name:translatedMealName(meal),category:categoryName(meal.category)})).filter(meal=>meal.name);
    const dayKey=dayKeys[dayNumber-1];
    return {id:localDateKey(date),day:translatedDays[dayKey][language],date:`${String(date.getDate()).padStart(2,'0')}.${String(date.getMonth()+1).padStart(2,'0')}`,note:localDateKey(date)===localDateKey(today)?ui[language].today:'',rotationWeek,meals};
  });
}

function orderKey(dayId, mealId) { return `${dayId}:${mealId}`; }
function quantity(dayId, mealId) { return Number(workingOrders[orderKey(dayId,mealId)]||0); }
function dayTotal(day) { return day.meals.reduce((sum,meal)=>sum+quantity(day.id,meal.mealId),0); }
function allTotal() { return Object.values(workingOrders).reduce((sum,value)=>sum+Number(value),0); }
function taskValid() { return !isGuest || Boolean(workTask.value.trim()); }

function render() {
  const u=ui[language];
  if (!menuReady) { week.innerHTML=`<div class="empty-state"><strong>${escapeHtml(u.loading)}</strong></div>`; updateSummary(); return; }
  week.innerHTML=menuData.map((day,index)=>{const total=dayTotal(day),open=index===0||total>0,locked=dayLocked(day.id);return `<article class="day ${open?'open':''} ${locked?'deadline-locked':''}" data-day="${day.id}"><button class="day-toggle" type="button" aria-expanded="${open}"><span class="chevron"></span><span class="day-name"><strong>${escapeHtml(day.day)} ${day.date}</strong><span>${escapeHtml(locked?u.locked:(day.note||u.menu))}</span></span><span class="day-total ${total?'has-orders':''}">🍴 ${total}</span></button><div class="day-content">${locked?`<div class="deadline-lock-note">${escapeHtml(u.lockedHelp)}</div>`:''}${day.meals.length?day.meals.map(meal=>`<div class="meal-row"><div class="meal-name"><strong>${escapeHtml(meal.name)}</strong><span>${escapeHtml(meal.category)}</span></div><div class="stepper" data-meal-id="${meal.mealId}"><button class="minus" type="button" aria-label="${escapeHtml(u.remove)}" ${(locked||quantity(day.id,meal.mealId)===0)?'disabled':''}>−</button><output>${quantity(day.id,meal.mealId)}</output><button class="plus" type="button" aria-label="${escapeHtml(u.add)}" ${locked?'disabled':''}>+</button></div></div>`).join(''):`<div class="empty-state"><strong>${escapeHtml(u.menu)}</strong><span>0</span></div>`}</div></article>`;}).join('');
  updateSummary();
}

function updateSummary() {
  const total=allTotal(),u=ui[language];
  summary.textContent=isGuest?(total===0?u.noGuest:u.guestSelected(total)):(total===0?u.none:u.selected(total));
  if(!menuReady) changeSummary.textContent=u.loading; else if(!total) changeSummary.textContent=u.nothing; else if(isGuest&&!taskValid()) changeSummary.textContent=u.enterProject; else changeSummary.textContent=dirty?u.unsaved:u.saved;
  const canSave=menuReady&&dirty&&total>0&&taskValid(); saveButton.disabled=!canSave; headerSave.disabled=!canSave; headerSave.textContent=dirty?u.saveShort:u.savedShort;
}

function markDirty() { const taskChanged=isGuest&&workTask.value.trim()!==(localStorage.getItem(taskKey)||''); dirty=JSON.stringify(workingOrders)!==JSON.stringify(savedOrders)||taskChanged; if(isGuest&&workTask.value.trim())document.querySelector('#taskPanel').classList.remove('invalid'); updateSummary(); }

week.addEventListener('click',event=>{
  const toggle=event.target.closest('.day-toggle'); if(toggle){const day=toggle.closest('.day');day.classList.toggle('open');toggle.setAttribute('aria-expanded',day.classList.contains('open'));return;}
  const stepper=event.target.closest('.stepper'),button=event.target.closest('.stepper button'); if(!stepper||!button)return;
  const dayId=button.closest('.day').dataset.day; if(dayLocked(dayId)){showToast(ui[language].locked);render();return;}
  const mealId=Number(stepper.dataset.mealId),key=orderKey(dayId,mealId),old=quantity(dayId,mealId),next=button.classList.contains('plus')?old+1:Math.max(0,old-1); if(next)workingOrders[key]=next;else delete workingOrders[key]; render(); markDirty();
});

function saveOrders() {
  if(isGuest&&!taskValid()){document.querySelector('#taskPanel').classList.add('invalid');workTask.focus();showToast(ui[language].requiredToast);return;}
  if(!dirty)return; localStorage.setItem(storageKey,JSON.stringify(workingOrders)); if(isGuest)localStorage.setItem(taskKey,workTask.value.trim()); savedOrders=structuredClone(workingOrders);dirty=false;updateSummary();showToast(isGuest?ui[language].guestSaved:ui[language].savedToast);
}
saveButton.addEventListener('click',saveOrders); headerSave.addEventListener('click',saveOrders);
if(isGuest){workTask.value=localStorage.getItem(taskKey)||'';workTask.addEventListener('input',markDirty);}

function applyPageText() {
  const u=ui[language]; document.documentElement.lang=language; document.title=isGuest?u.guestTitle:u.title; document.querySelector('.header-title h1').textContent=isGuest?u.guestTitle:u.title; document.querySelector('.header-title span').textContent=`${u.week} ${isoWeek(effectiveToday())}`; document.querySelector('.notice strong').textContent=u.deadline; document.querySelector('.notice span').textContent=u.deadlineHelp; document.querySelector('#simulateFridayLabel').textContent=u.simulate; saveButton.textContent=isGuest?u.saveGuest:u.save;
  if(menuSource&&menuReady)menuSource.textContent=u.source(rotationLength);
  if(isGuest){document.querySelector('.back-button').setAttribute('aria-label',u.backOwn);document.querySelector('.guest-banner strong').textContent=u.guestBanner;document.querySelector('.guest-banner span').textContent=u.guestAudience;document.querySelector('label[for="workTask"]').childNodes[0].textContent=u.workTask+' ';workTask.placeholder=u.workPlaceholder;document.querySelector('#taskHelp').textContent=u.workRequired;}
  else {const nav=document.querySelectorAll('.drawer .nav-item');document.querySelector('.drawer-head strong').textContent=u.service;nav[0].textContent=u.order;nav[1].innerHTML=`<span>${u.guest}</span><small>${u.guestHelp}</small>`;nav[2].textContent=u.myOrders;nav[3].textContent=u.logout;document.querySelector('#currentUserNumber').textContent=`${u.employee} ${currentUser.employeeNumber}`;}
}

const drawer=document.querySelector('#drawer'); if(drawer){const scrim=document.querySelector('#scrim'),menuButton=document.querySelector('#menuButton');const setDrawer=open=>{drawer.classList.toggle('open',open);scrim.classList.toggle('visible',open);drawer.setAttribute('aria-hidden',String(!open));menuButton.setAttribute('aria-expanded',String(open));};menuButton.addEventListener('click',()=>setDrawer(true));document.querySelector('#closeMenu').addEventListener('click',()=>setDrawer(false));scrim.addEventListener('click',()=>setDrawer(false));}
let toastTimer; function showToast(message){const toast=document.querySelector('#toast');toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2600);}
function initials(name){return String(name||'').split(/\s+/).filter(Boolean).slice(0,2).map(part=>part[0]).join('').toUpperCase();}
document.querySelector('#currentUserName')?.replaceChildren(document.createTextNode(currentUser.employeeName)); if(document.querySelector('#userAvatar'))document.querySelector('#userAvatar').textContent=initials(currentUser.employeeName); document.querySelector('#logoutButton')?.addEventListener('click',()=>{localStorage.removeItem(USER_KEY);location.replace('login.html');});
const languageSelect=document.querySelector('#languageSelect');languageSelect.value=language;languageSelect.addEventListener('change',()=>{language=languageSelect.value;localStorage.setItem(LANGUAGE_KEY,language);if(menuReady)menuData=buildMenuData();applyPageText();render();});
const simulateFriday=document.querySelector('#simulateFriday');simulateFriday.addEventListener('change',()=>{if(menuReady)menuData=buildMenuData();applyPageText();render();});
window.addEventListener('beforeunload',event=>{if(!dirty)return;event.preventDefault();event.returnValue='';});

async function initialise(){applyPageText();render();try{await loadRotation();menuReady=true;menuData=buildMenuData();applyPageText();render();}catch(error){console.error(error);menuReady=false;week.innerHTML=`<div class="empty-state"><strong>${escapeHtml(ui[language].loadFailed)}</strong><span>${escapeHtml(error.message)}</span></div>`;menuSource.textContent=`API error: ${error.message}`;changeSummary.textContent=ui[language].loadFailed;showToast(ui[language].loadFailed);}}
initialise();

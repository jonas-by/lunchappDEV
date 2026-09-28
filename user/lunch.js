const API_BASE = 'https://lunchapp-api-dev-bxf8hff5hmb7g5dv.swedencentral-01.azurewebsites.net/api';
const ROTATION_ANCHOR = new Date(2026, 8, 28);
const USER_KEY = 'lunch-poc-current-user-v17';
const LANGUAGE_KEY = 'lunch-poc-language-v5';
const GUEST_ORDER_KEY = 'lunch-poc-guest-orders-api-v1';
const GUEST_TASK_KEY = 'lunch-poc-guest-task-v2';

let currentUser;
try {
    currentUser = JSON.parse(localStorage.getItem(USER_KEY));
} catch {}

if (!currentUser?.employeeNumber) {
    location.replace('login.html');
}

const isGuest = document.body.dataset.orderType === 'guest';
let language = localStorage.getItem(LANGUAGE_KEY) || 'en';
let rotationWeeks = new Map();
let rotationLength = 0;
let menuData = [];
let savedOrders = {};
let workingOrders = {};
let menuReady = false;
let ordersReady = false;
let saving = false;
let dirty = false;
let toastTimer;

const ui = {
    en: {
        title: 'Order lunch', guestTitle: 'Guest lunch', week: 'Week',
        service: 'Lunch service', order: 'Order lunch', guest: 'Order guest lunch',
        guestHelp: 'Guests, subcontractors and interns', myOrders: 'My orders',
        logout: 'Log out', employee: 'Employee', simulate: 'POC: Simulate Friday',
        deadline: 'Daily deadline 08:30', deadlineHelp: 'Orders can be changed until the deadline.',
        today: 'Today', menu: 'Lunch menu', noMenu: 'No dishes configured',
        none: 'No lunches selected', selected: n => `${n} lunch${n === 1 ? '' : 'es'} selected`,
        saved: 'Your orders are saved', nothing: 'Nothing to save', unsaved: 'Unsaved changes',
        save: 'Save changes', saveShort: 'Save', savedShort: 'Saved', saving: 'Saving...',
        savedToast: 'Lunch orders saved', saveFailed: 'Could not save lunch orders',
        loading: 'Loading menu and orders...', loadFailed: 'Could not load menu or orders',
        remove: 'Remove one', add: 'Add one', locked: 'Ordering closed at 08:30',
        lockedHelp: 'Today’s order is visible but can no longer be changed.',
        guestBanner: 'Guest lunch order', guestAudience: 'For guests, subcontractors and interns',
        workTask: 'Work task / project', workPlaceholder: 'Example: Project 1234, supplier visit',
        workRequired: 'Required for guest lunch orders.', noGuest: 'No guest lunches selected',
        guestSelected: n => `${n} guest lunch${n === 1 ? '' : 'es'} selected`,
        enterProject: 'Enter work task / project', guestSaved: 'Guest lunch order saved',
        saveGuest: 'Save guest order', requiredToast: 'Work task / project is required',
        backOwn: 'Back to own lunch order', source: n => `Menu loaded from Azure, ${n}-week rotation.`
    },
    sv: {
        title: 'Beställ lunch', guestTitle: 'Gästlunch', week: 'Vecka',
        service: 'Lunchtjänst', order: 'Beställ lunch', guest: 'Beställ gästlunch',
        guestHelp: 'Gäster, underleverantörer och praktikanter', myOrders: 'Mina beställningar',
        logout: 'Logga ut', employee: 'Anställd', simulate: 'POC: Simulera fredag',
        deadline: 'Daglig deadline 08:30', deadlineHelp: 'Beställningar kan ändras fram till deadline.',
        today: 'I dag', menu: 'Lunchmeny', noMenu: 'Inga rätter konfigurerade',
        none: 'Inga luncher valda', selected: n => `${n} lunch${n === 1 ? '' : 'er'} vald${n === 1 ? '' : 'a'}`,
        saved: 'Dina beställningar är sparade', nothing: 'Inget att spara', unsaved: 'Osparade ändringar',
        save: 'Spara ändringar', saveShort: 'Spara', savedShort: 'Sparat', saving: 'Sparar...',
        savedToast: 'Lunchbeställningarna sparades', saveFailed: 'Kunde inte spara lunchbeställningarna',
        loading: 'Laddar meny och beställningar...', loadFailed: 'Kunde inte ladda meny eller beställningar',
        remove: 'Ta bort en', add: 'Lägg till en', locked: 'Beställningen stängde 08:30',
        lockedHelp: 'Dagens beställning visas men kan inte längre ändras.',
        guestBanner: 'Beställ gästlunch', guestAudience: 'För gäster, underleverantörer och praktikanter',
        workTask: 'Arbetsuppgift / projekt', workPlaceholder: 'Exempel: Projekt 1234, leverantörsbesök',
        workRequired: 'Obligatoriskt för gästlunchbeställningar.', noGuest: 'Inga gästluncher valda',
        guestSelected: n => `${n} gästlunch${n === 1 ? '' : 'er'} vald${n === 1 ? '' : 'a'}`,
        enterProject: 'Ange arbetsuppgift / projekt', guestSaved: 'Gästlunchbeställningen sparades',
        saveGuest: 'Spara gästbeställning', requiredToast: 'Arbetsuppgift / projekt krävs',
        backOwn: 'Tillbaka till egen lunchbeställning', source: n => `Menyn laddades från Azure, ${n}-veckors rotation.`
    },
    fi: {
        title: 'Tilaa lounas', guestTitle: 'Vieraslounas', week: 'Viikko',
        service: 'Lounaspalvelu', order: 'Tilaa lounas', guest: 'Tilaa vieraslounas',
        guestHelp: 'Vieraat, alihankkijat ja harjoittelijat', myOrders: 'Omat tilaukset',
        logout: 'Kirjaudu ulos', employee: 'Työntekijä', simulate: 'POC: Simuloi perjantai',
        deadline: 'Päivittäinen määräaika 08:30', deadlineHelp: 'Tilauksia voi muuttaa määräaikaan asti.',
        today: 'Tänään', menu: 'Lounaslista', noMenu: 'Ruokia ei ole määritetty',
        none: 'Ei valittuja lounaita', selected: n => `${n} lounas${n === 1 ? '' : 'ta'} valittu`,
        saved: 'Tilauksesi on tallennettu', nothing: 'Ei tallennettavaa', unsaved: 'Tallentamattomia muutoksia',
        save: 'Tallenna muutokset', saveShort: 'Tallenna', savedShort: 'Tallennettu', saving: 'Tallennetaan...',
        savedToast: 'Lounastilaukset tallennettiin', saveFailed: 'Lounastilausten tallennus epäonnistui',
        loading: 'Ladataan ruokalistaa ja tilauksia...', loadFailed: 'Ruokalistan tai tilausten lataaminen epäonnistui',
        remove: 'Poista yksi', add: 'Lisää yksi', locked: 'Tilaus sulkeutui klo 08.30',
        lockedHelp: 'Tämän päivän tilaus näkyy, mutta sitä ei voi enää muuttaa.',
        guestBanner: 'Tilaa vieraslounas', guestAudience: 'Vieraille, alihankkijoille ja harjoittelijoille',
        workTask: 'Työtehtävä / projekti', workPlaceholder: 'Esimerkki: Projekti 1234, toimittajavierailu',
        workRequired: 'Pakollinen vieraslounastilauksille.', noGuest: 'Ei valittuja vieraslounaita',
        guestSelected: n => `${n} vieraslounas${n === 1 ? '' : 'ta'} valittu`,
        enterProject: 'Anna työtehtävä / projekti', guestSaved: 'Vieraslounastilaus tallennettiin',
        saveGuest: 'Tallenna vierastilaus', requiredToast: 'Työtehtävä / projekti vaaditaan',
        backOwn: 'Takaisin omaan lounastilaukseen', source: n => `Ruokalista ladattiin Azuresta, ${n} viikon kierto.`
    }
};

const translatedDays = {
    Monday: { en: 'Monday', sv: 'Måndag', fi: 'Maanantai' },
    Tuesday: { en: 'Tuesday', sv: 'Tisdag', fi: 'Tiistai' },
    Wednesday: { en: 'Wednesday', sv: 'Onsdag', fi: 'Keskiviikko' },
    Thursday: { en: 'Thursday', sv: 'Torsdag', fi: 'Torstai' },
    Friday: { en: 'Friday', sv: 'Fredag', fi: 'Perjantai' }
};

const dayKeys = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const categoryNames = {
    main: { en: 'Main dish', sv: 'Huvudrätt', fi: 'Pääruoka' },
    vegetarian: { en: 'Vegetarian', sv: 'Vegetarisk', fi: 'Kasvisruoka' },
    soup: { en: 'Soup', sv: 'Soppa', fi: 'Keitto' },
    salad: { en: 'Salad', sv: 'Sallad', fi: 'Salaatti' },
    dessert: { en: 'Dessert', sv: 'Dessert', fi: 'Jälkiruoka' }
};

const weekElement = document.querySelector('#week');
const saveButton = document.querySelector('#saveButton');
const headerSave = document.querySelector('#headerSave');
const selectionSummary = document.querySelector('#selectionSummary');
const changeSummary = document.querySelector('#changeSummary');
const workTask = document.querySelector('#workTask');
const menuSource = document.querySelector('#menuSource');

function readJson(key, fallback) {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
        return fallback;
    }
}

function dateKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function mondayOf(date) {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    result.setDate(result.getDate() - ((result.getDay() + 6) % 7));
    return result;
}

function effectiveToday() {
    const result = new Date();
    result.setHours(0, 0, 0, 0);

    if (document.querySelector('#simulateFriday')?.checked) {
        result.setDate(result.getDate() + ((5 - result.getDay() + 7) % 7));
    }

    return result;
}

function shownDates() {
    const today = effectiveToday();
    const weekday = today.getDay();

    if (weekday === 0 || weekday === 6) {
        const nextMonday = new Date(today);
        nextMonday.setDate(today.getDate() + ((8 - weekday) % 7));
        return Array.from({ length: 5 }, (_, index) => {
            const date = new Date(nextMonday);
            date.setDate(nextMonday.getDate() + index);
            return date;
        });
    }

    const dates = [];
    const friday = new Date(today);
    friday.setDate(today.getDate() + (5 - weekday));

    for (let date = new Date(today); date <= friday; date.setDate(date.getDate() + 1)) {
        dates.push(new Date(date));
    }

    if (weekday === 5) {
        const nextMonday = new Date(today);
        nextMonday.setDate(today.getDate() + 3);
        for (let index = 0; index < 5; index += 1) {
            const date = new Date(nextMonday);
            date.setDate(nextMonday.getDate() + index);
            dates.push(date);
        }
    }

    return dates;
}

function displayedRange() {
    const dates = shownDates();
    return {
        dateFrom: dateKey(dates[0]),
        dateTo: dateKey(dates[dates.length - 1])
    };
}

function deadlinePassed() {
    const now = new Date();
    return now.getHours() > 8 || (now.getHours() === 8 && now.getMinutes() >= 30);
}

function dayLocked(dayId) {
    return dayId === dateKey(effectiveToday()) && deadlinePassed();
}

function isoWeek(date) {
    const value = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const weekday = value.getUTCDay() || 7;
    value.setUTCDate(value.getUTCDate() + 4 - weekday);
    const yearStart = new Date(Date.UTC(value.getUTCFullYear(), 0, 1));
    return Math.ceil((((value - yearStart) / 86400000) + 1) / 7);
}

function rotationWeekFor(date) {
    const elapsedWeeks = Math.floor((mondayOf(date) - ROTATION_ANCHOR) / 604800000);
    return ((elapsedWeeks % rotationLength) + rotationLength) % rotationLength + 1;
}

function translatedMealName(meal) {
    if (language === 'sv') return meal.nameSV || meal.nameEN || meal.nameFI || '';
    if (language === 'fi') return meal.nameFI || meal.nameSV || meal.nameEN || '';
    return meal.nameEN || meal.nameSV || meal.nameFI || '';
}

function translatedCategory(category) {
    return categoryNames[String(category || '').toLowerCase()]?.[language] || category || '';
}

function escapeHtml(value = '') {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;');
}

async function apiFetch(path, options = {}) {
    const response = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
            Accept: 'application/json',
            ...(options.body ? { 'Content-Type': 'application/json' } : {}),
            ...(options.headers || {})
        }
    });

    const contentType = response.headers.get('content-type') || '';
    const payload = contentType.includes('application/json')
        ? await response.json()
        : await response.text();

    if (!response.ok) {
        throw new Error(payload?.details || payload?.error || payload || `HTTP ${response.status}`);
    }

    return payload;
}

async function loadRotation() {
    const results = await Promise.all(
        Array.from({ length: 8 }, async (_, index) => {
            try {
                return await apiFetch(`/menu/week/${index + 1}`);
            } catch (error) {
                if (String(error.message).includes('does not exist')) return null;
                throw error;
            }
        })
    );

    const existingWeeks = results.filter(Boolean).sort((a, b) => a.weekNumber - b.weekNumber);
    if (existingWeeks.length === 0) throw new Error('No rotating menu weeks exist');

    rotationLength = existingWeeks.length;
    rotationWeeks = new Map(existingWeeks.map(week => [week.weekNumber, week]));
}

function buildMenuData() {
    const today = effectiveToday();

    return shownDates().map(date => {
        const rotationWeek = rotationWeekFor(date);
        const week = rotationWeeks.get(rotationWeek);
        const dayNumber = ((date.getDay() + 6) % 7) + 1;
        const day = week?.days?.find(item => item.dayNumber === dayNumber);
        const meals = (day?.meals || []).map(meal => ({
            mealId: Number(meal.mealId),
            name: translatedMealName(meal),
            category: translatedCategory(meal.category)
        })).filter(meal => meal.name && Number.isInteger(meal.mealId));

        const dayKey = dayKeys[dayNumber - 1];

        return {
            id: dateKey(date),
            day: translatedDays[dayKey][language],
            date: `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}`,
            note: dateKey(date) === dateKey(today) ? ui[language].today : '',
            meals
        };
    });
}

function orderKey(menuDate, mealId) {
    return `${menuDate}:${mealId}`;
}

function quantity(menuDate, mealId) {
    return Number(workingOrders[orderKey(menuDate, mealId)] || 0);
}

function dayTotal(day) {
    return day.meals.reduce((sum, meal) => sum + quantity(day.id, meal.mealId), 0);
}

function allTotal() {
    return Object.values(workingOrders).reduce((sum, value) => sum + Number(value), 0);
}

function ordersFromApi(payload) {
    const result = {};

    for (const order of payload.orders || []) {
        const key = orderKey(order.menuDate, Number(order.mealId));
        result[key] = Number(order.quantity) || 0;
    }

    return result;
}

async function loadOrders() {
    const range = displayedRange();

    if (isGuest) {
        savedOrders = readJson(`${GUEST_ORDER_KEY}:${currentUser.employeeNumber}`, {});
        workingOrders = structuredClone(savedOrders);
        return;
    }

    const query = new URLSearchParams({
        employeeNo: String(currentUser.employeeNumber),
        dateFrom: range.dateFrom,
        dateTo: range.dateTo
    });

    const payload = await apiFetch(`/orders?${query}`);
    savedOrders = ordersFromApi(payload);
    workingOrders = structuredClone(savedOrders);
}

function apiOrderLines() {
    const allowedKeys = new Set(
        menuData.flatMap(day => day.meals.map(meal => orderKey(day.id, meal.mealId)))
    );

    return Object.entries(workingOrders)
        .filter(([key, value]) => allowedKeys.has(key) && Number(value) > 0)
        .map(([key, value]) => {
            const separator = key.lastIndexOf(':');
            return {
                menuDate: key.slice(0, separator),
                mealId: Number(key.slice(separator + 1)),
                quantity: Number(value)
            };
        });
}

function taskValid() {
    return !isGuest || Boolean(workTask.value.trim());
}

function updateSummary() {
    const text = ui[language];
    const total = allTotal();

    selectionSummary.textContent = isGuest
        ? (total === 0 ? text.noGuest : text.guestSelected(total))
        : (total === 0 ? text.none : text.selected(total));

    if (!menuReady || !ordersReady) changeSummary.textContent = text.loading;
    else if (saving) changeSummary.textContent = text.saving;
    else if (isGuest && total > 0 && !taskValid()) changeSummary.textContent = text.enterProject;
    else if (dirty) changeSummary.textContent = text.unsaved;
    else if (total === 0) changeSummary.textContent = text.nothing;
    else changeSummary.textContent = text.saved;

    const canSave = menuReady && ordersReady && dirty && !saving && taskValid();
    saveButton.disabled = !canSave;
    headerSave.disabled = !canSave;
    headerSave.textContent = saving ? text.saving : (dirty ? text.saveShort : text.savedShort);
}

function render() {
    const text = ui[language];

    if (!menuReady || !ordersReady) {
        weekElement.innerHTML = `<div class="empty-state"><strong>${escapeHtml(text.loading)}</strong></div>`;
        updateSummary();
        return;
    }

    weekElement.innerHTML = menuData.map((day, index) => {
        const total = dayTotal(day);
        const open = index === 0 || total > 0;
        const locked = dayLocked(day.id);
        const meals = day.meals.length > 0
            ? day.meals.map(meal => `
                <div class="meal-row">
                    <div class="meal-name">
                        <strong>${escapeHtml(meal.name)}</strong>
                        <span>${escapeHtml(meal.category)}</span>
                    </div>
                    <div class="stepper" data-meal-id="${meal.mealId}">
                        <button class="minus" type="button" aria-label="${escapeHtml(text.remove)}" ${locked || quantity(day.id, meal.mealId) === 0 ? 'disabled' : ''}>−</button>
                        <output>${quantity(day.id, meal.mealId)}</output>
                        <button class="plus" type="button" aria-label="${escapeHtml(text.add)}" ${locked ? 'disabled' : ''}>+</button>
                    </div>
                </div>
            `).join('')
            : `<div class="empty-state"><strong>${escapeHtml(text.noMenu)}</strong></div>`;

        return `
            <article class="day ${open ? 'open' : ''} ${locked ? 'deadline-locked' : ''}" data-day="${day.id}">
                <button class="day-toggle" type="button" aria-expanded="${open}">
                    <span class="chevron" aria-hidden="true"></span>
                    <span class="day-name">
                        <strong>${escapeHtml(day.day)} ${day.date}</strong>
                        <span>${escapeHtml(locked ? text.locked : (day.note || text.menu))}</span>
                    </span>
                    <span class="day-total ${total ? 'has-orders' : ''}">🍴 ${total}</span>
                </button>
                <div class="day-content">
                    ${locked ? `<div class="deadline-lock-note">${escapeHtml(text.lockedHelp)}</div>` : ''}
                    ${meals}
                </div>
            </article>
        `;
    }).join('');

    updateSummary();
}

function markDirty() {
    const guestTaskChanged = isGuest && workTask.value.trim() !== (localStorage.getItem(`${GUEST_TASK_KEY}:${currentUser.employeeNumber}`) || '');
    dirty = JSON.stringify(workingOrders) !== JSON.stringify(savedOrders) || guestTaskChanged;

    if (isGuest && workTask.value.trim()) {
        document.querySelector('#taskPanel').classList.remove('invalid');
    }

    updateSummary();
}

weekElement.addEventListener('click', event => {
    const toggle = event.target.closest('.day-toggle');

    if (toggle) {
        const day = toggle.closest('.day');
        day.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(day.classList.contains('open')));
        return;
    }

    const stepper = event.target.closest('.stepper');
    const button = event.target.closest('.stepper button');
    if (!stepper || !button || saving) return;

    const dayId = button.closest('.day').dataset.day;

    if (dayLocked(dayId)) {
        showToast(ui[language].locked);
        return;
    }

    const mealId = Number(stepper.dataset.mealId);
    const key = orderKey(dayId, mealId);
    const previous = quantity(dayId, mealId);
    const next = button.classList.contains('plus') ? previous + 1 : Math.max(0, previous - 1);

    if (next > 0) workingOrders[key] = next;
    else delete workingOrders[key];

    markDirty();
    render();
});

async function saveOrders() {
    if (!dirty || saving) return;

    if (isGuest && !taskValid()) {
        document.querySelector('#taskPanel').classList.add('invalid');
        workTask.focus();
        showToast(ui[language].requiredToast);
        return;
    }

    saving = true;
    updateSummary();

    try {
        if (isGuest) {
            localStorage.setItem(`${GUEST_ORDER_KEY}:${currentUser.employeeNumber}`, JSON.stringify(workingOrders));
            localStorage.setItem(`${GUEST_TASK_KEY}:${currentUser.employeeNumber}`, workTask.value.trim());
        } else {
            const range = displayedRange();

            await apiFetch('/orders', {
                method: 'PUT',
                body: JSON.stringify({
                    employeeNo: Number(currentUser.employeeNumber),
                    dateFrom: range.dateFrom,
                    dateTo: range.dateTo,
                    orders: apiOrderLines()
                })
            });
        }

        savedOrders = structuredClone(workingOrders);
        dirty = false;
        showToast(isGuest ? ui[language].guestSaved : ui[language].savedToast);
    } catch (error) {
        console.error(error);
        showToast(`${ui[language].saveFailed}: ${error.message}`);
    } finally {
        saving = false;
        updateSummary();
    }
}

saveButton.addEventListener('click', saveOrders);
headerSave.addEventListener('click', saveOrders);

if (isGuest) {
    workTask.value = localStorage.getItem(`${GUEST_TASK_KEY}:${currentUser.employeeNumber}`) || '';
    workTask.addEventListener('input', markDirty);
}

function applyPageText() {
    const text = ui[language];
    document.documentElement.lang = language;
    document.title = isGuest ? text.guestTitle : text.title;
    document.querySelector('.header-title h1').textContent = isGuest ? text.guestTitle : text.title;
    document.querySelector('.header-title span').textContent = `${text.week} ${isoWeek(effectiveToday())}`;
    document.querySelector('.notice strong').textContent = text.deadline;
    document.querySelector('.notice span').textContent = text.deadlineHelp;
    document.querySelector('#simulateFridayLabel').textContent = text.simulate;
    saveButton.textContent = isGuest ? text.saveGuest : text.save;

    if (menuSource && menuReady) menuSource.textContent = text.source(rotationLength);

    if (isGuest) {
        document.querySelector('.back-button').setAttribute('aria-label', text.backOwn);
        document.querySelector('.guest-banner strong').textContent = text.guestBanner;
        document.querySelector('.guest-banner span').textContent = text.guestAudience;
        document.querySelector('label[for="workTask"]').childNodes[0].textContent = `${text.workTask} `;
        workTask.placeholder = text.workPlaceholder;
        document.querySelector('#taskHelp').textContent = text.workRequired;
    } else {
        const navigation = document.querySelectorAll('.drawer .nav-item');
        document.querySelector('.drawer-head strong').textContent = text.service;
        navigation[0].textContent = text.order;
        navigation[1].innerHTML = `<span>${text.guest}</span><small>${text.guestHelp}</small>`;
        navigation[2].textContent = text.myOrders;
        navigation[3].textContent = text.logout;
        document.querySelector('#currentUserNumber').textContent = `${text.employee} ${currentUser.employeeNumber}`;
    }
}

const drawer = document.querySelector('#drawer');
if (drawer) {
    const scrim = document.querySelector('#scrim');
    const menuButton = document.querySelector('#menuButton');

    function setDrawer(open) {
        drawer.classList.toggle('open', open);
        scrim.classList.toggle('visible', open);
        drawer.setAttribute('aria-hidden', String(!open));
        menuButton.setAttribute('aria-expanded', String(open));
    }

    menuButton.addEventListener('click', () => setDrawer(true));
    document.querySelector('#closeMenu').addEventListener('click', () => setDrawer(false));
    scrim.addEventListener('click', () => setDrawer(false));
}

function showToast(message) {
    const toast = document.querySelector('#toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

function initials(name) {
    return String(name || '').split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase();
}

const currentUserName = document.querySelector('#currentUserName');
if (currentUserName) currentUserName.textContent = currentUser.employeeName;
const currentUserNumber = document.querySelector('#currentUserNumber');
if (currentUserNumber) currentUserNumber.textContent = `Employee ${currentUser.employeeNumber}`;
const userAvatar = document.querySelector('#userAvatar');
if (userAvatar) userAvatar.textContent = initials(currentUser.employeeName);

document.querySelector('#logoutButton')?.addEventListener('click', () => {
    localStorage.removeItem(USER_KEY);
    location.replace('login.html');
});

const languageSelect = document.querySelector('#languageSelect');
languageSelect.value = language;
languageSelect.addEventListener('change', () => {
    language = languageSelect.value;
    localStorage.setItem(LANGUAGE_KEY, language);
    if (menuReady) menuData = buildMenuData();
    applyPageText();
    render();
});

const simulateFriday = document.querySelector('#simulateFriday');
simulateFriday.addEventListener('change', async () => {
    menuReady = false;
    ordersReady = false;
    applyPageText();
    render();

    try {
        menuReady = true;
        menuData = buildMenuData();
        await loadOrders();
        ordersReady = true;
        dirty = false;
        applyPageText();
        render();
    } catch (error) {
        console.error(error);
        showLoadError(error);
    }
});

window.addEventListener('beforeunload', event => {
    if (!dirty) return;
    event.preventDefault();
    event.returnValue = '';
});

function showLoadError(error) {
    weekElement.innerHTML = `
        <div class="empty-state">
            <strong>${escapeHtml(ui[language].loadFailed)}</strong>
            <span>${escapeHtml(error.message)}</span>
        </div>
    `;
    if (menuSource) menuSource.textContent = `API error: ${error.message}`;
    changeSummary.textContent = ui[language].loadFailed;
    showToast(ui[language].loadFailed);
}

async function initialise() {
    applyPageText();
    render();

    try {
        await loadRotation();
        menuReady = true;
        menuData = buildMenuData();
        await loadOrders();
        ordersReady = true;
        dirty = false;
        applyPageText();
        render();
    } catch (error) {
        console.error(error);
        showLoadError(error);
    }
}

initialise();

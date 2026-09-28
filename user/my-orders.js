const API_BASE = 'https://lunchapp-api-dev-bxf8hff5hmb7g5dv.swedencentral-01.azurewebsites.net/api';
const USER_KEY = 'lunch-poc-current-user-v17';
const LANGUAGE_KEY = 'lunch-poc-language-v5';
const GUEST_ORDER_KEY = 'lunch-poc-guest-orders-api-v1';
const GUEST_TASK_KEY = 'lunch-poc-guest-task-v2';

let currentUser;
try { currentUser = JSON.parse(localStorage.getItem(USER_KEY)); } catch {}
if (!currentUser?.employeeNumber) location.replace('login.html');

let language = localStorage.getItem(LANGUAGE_KEY) || 'en';
let weekOrders = [];
let monthOrders = [];
let guestOrders = [];
let loadError = null;

const text = {
    en: { title:'My orders', week:'This week', overview:'Lunch overview', intro:'Check your personal and guest lunch orders for each weekday.', summary:'Summary', personalWeek:'Personal lunches this week', guestWeek:'Guest lunches this week', month:'Personal lunches this month', personal:'Personal', guest:'Guest', none:'No order', project:'Work task / project', menu:'Lunch menu', source:'Personal orders are loaded from Azure. Guest orders remain in this browser for now.', back:'Back to lunch ordering', loading:'Loading orders...', failed:'Could not load personal orders' },
    sv: { title:'Mina beställningar', week:'Den här veckan', overview:'Lunchöversikt', intro:'Kontrollera dina egna lunchbeställningar och gästluncher för varje vardag.', summary:'Sammanfattning', personalWeek:'Egna luncher den här veckan', guestWeek:'Gästluncher den här veckan', month:'Egna luncher den här månaden', personal:'Egna luncher', guest:'Gästluncher', none:'Ingen beställning', project:'Arbetsuppgift / projekt', menu:'Lunchmeny', source:'Egna beställningar hämtas från Azure. Gästbeställningar finns tills vidare endast i den här webbläsaren.', back:'Tillbaka till lunchbeställning', loading:'Laddar beställningar...', failed:'Kunde inte ladda egna beställningar' },
    fi: { title:'Omat tilaukset', week:'Tämä viikko', overview:'Lounasyhteenveto', intro:'Tarkista omat lounastilauksesi ja vieraslounaat jokaiselle arkipäivälle.', summary:'Yhteenveto', personalWeek:'Omat lounaat tällä viikolla', guestWeek:'Vieraslounaat tällä viikolla', month:'Omat lounaat tässä kuussa', personal:'Omat lounaat', guest:'Vieraslounaat', none:'Ei tilausta', project:'Työtehtävä / projekti', menu:'Lounaslista', source:'Omat tilaukset ladataan Azuresta. Vierastilaukset säilyvät toistaiseksi vain tässä selaimessa.', back:'Takaisin lounastilaukseen', loading:'Ladataan tilauksia...', failed:'Omien tilausten lataaminen epäonnistui' }
};

const weekdays = [
    { en:'Monday', sv:'Måndag', fi:'Maanantai' },
    { en:'Tuesday', sv:'Tisdag', fi:'Tiistai' },
    { en:'Wednesday', sv:'Onsdag', fi:'Keskiviikko' },
    { en:'Thursday', sv:'Torsdag', fi:'Torstai' },
    { en:'Friday', sv:'Fredag', fi:'Perjantai' }
];

function readJson(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
}

function dateKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}

function mondayOf(date) {
    const result = new Date(date);
    result.setHours(0,0,0,0);
    result.setDate(result.getDate() - ((result.getDay()+6)%7));
    return result;
}

function getWeekDates() {
    const monday = mondayOf(new Date());
    return Array.from({length:5}, (_, index) => {
        const date = new Date(monday);
        date.setDate(monday.getDate()+index);
        return date;
    });
}

function getMonthRange() {
    const now = new Date();
    return {
        from: dateKey(new Date(now.getFullYear(), now.getMonth(), 1)),
        to: dateKey(new Date(now.getFullYear(), now.getMonth()+1, 0))
    };
}

function escapeHtml(value='') {
    return String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
}

function formatDate(date) {
    return `${String(date.getDate()).padStart(2,'0')}.${String(date.getMonth()+1).padStart(2,'0')}`;
}

function mealName(order) {
    if (language === 'sv') return order.nameSV || order.nameEN || order.nameFI || text[language].menu;
    if (language === 'fi') return order.nameFI || order.nameSV || order.nameEN || text[language].menu;
    return order.nameEN || order.nameSV || order.nameFI || text[language].menu;
}

function categoryName(category) {
    const names = {
        Main:{en:'Main dish',sv:'Huvudrätt',fi:'Pääruoka'},
        Vegetarian:{en:'Vegetarian',sv:'Vegetarisk',fi:'Kasvisruoka'},
        Soup:{en:'Soup',sv:'Soppa',fi:'Keitto'},
        Salad:{en:'Salad',sv:'Sallad',fi:'Salaatti'},
        Dessert:{en:'Dessert',sv:'Dessert',fi:'Jälkiruoka'}
    };
    return names[category]?.[language] || category || '';
}

async function apiFetch(path) {
    const response = await fetch(`${API_BASE}${path}`, { headers:{Accept:'application/json'} });
    const payload = await response.json().catch(() => null);
    if (!response.ok) throw new Error(payload?.details || payload?.error || `HTTP ${response.status}`);
    return payload;
}

async function loadPersonalOrders(from, to) {
    const query = new URLSearchParams({
        employeeNo: String(currentUser.employeeNumber),
        dateFrom: from,
        dateTo: to
    });
    const payload = await apiFetch(`/orders?${query.toString()}`);
    return payload.orders || [];
}

function loadGuestOrders() {
    const validDates = new Set(getWeekDates().map(dateKey));
    const stored = readJson(`${GUEST_ORDER_KEY}:${currentUser.employeeNumber}`, {});
    const comment = localStorage.getItem(`${GUEST_TASK_KEY}:${currentUser.employeeNumber}`) || '';
    const result = [];

    for (const [key, value] of Object.entries(stored)) {
        const separator = key.lastIndexOf(':');
        const menuDate = key.slice(0, separator);
        const mealId = Number(key.slice(separator+1));
        const quantity = Number(value) || 0;
        if (separator < 0 || !validDates.has(menuDate) || !Number.isInteger(mealId) || quantity <= 0) continue;

        const matchingMeal = weekOrders.find(order => order.menuDate === menuDate && Number(order.mealId) === mealId);
        result.push({
            menuDate,
            mealId,
            quantity,
            name: matchingMeal ? mealName(matchingMeal) : `${text[language].menu} #${mealId}`,
            category: matchingMeal ? categoryName(matchingMeal.category) : '',
            comment
        });
    }
    return result;
}

function orderGroup(label, orders, isGuest) {
    if (!orders.length) return '';
    return `<div class="my-order-group ${isGuest?'guest':''}"><h3>${escapeHtml(label)}</h3>${orders.map(order => `<div class="my-order-line"><div><strong>${escapeHtml(isGuest?order.name:mealName(order))}</strong><span>${escapeHtml(isGuest?order.category:categoryName(order.category))}${isGuest&&order.comment?` · ${escapeHtml(text[language].project)}: ${escapeHtml(order.comment)}`:''}</span></div><b>× ${order.quantity}</b></div>`).join('')}</div>`;
}

function applyLabels() {
    const value = text[language];
    document.documentElement.lang = language;
    document.title = value.title;
    pageTitle.textContent = value.title;
    pageSubtitle.textContent = value.week;
    introEyebrow.textContent = value.overview;
    weekHeading.textContent = value.week;
    introText.textContent = value.intro;
    summaryHeading.textContent = value.summary;
    personalLabel.textContent = value.personalWeek;
    guestLabel.textContent = value.guestWeek;
    monthLabel.textContent = value.month;
    sourceNote.textContent = loadError ? `${value.failed}: ${loadError.message}` : value.source;
    backButton.setAttribute('aria-label', value.back);
}

function render() {
    applyLabels();
    if (loadError) {
        ordersList.innerHTML = `<div class="empty-state"><strong>${escapeHtml(text[language].failed)}</strong><span>${escapeHtml(loadError.message)}</span></div>`;
        personalTotal.textContent = '0';
        guestTotal.textContent = String(guestOrders.reduce((sum, order) => sum + order.quantity, 0));
        monthTotal.textContent = '0';
        return;
    }

    const dates = getWeekDates();
    ordersList.innerHTML = dates.map((date,index) => {
        const key = dateKey(date);
        const personal = weekOrders.filter(order => order.menuDate === key);
        const guests = guestOrders.filter(order => order.menuDate === key);
        const total = [...personal,...guests].reduce((sum,order) => sum + Number(order.quantity), 0);
        return `<article class="my-order-day"><div class="my-order-day-head"><div><strong>${escapeHtml(weekdays[index][language])} ${formatDate(date)}</strong><span>${escapeHtml(total?text[language].menu:text[language].none)}</span></div><span class="day-total ${total?'has-orders':''}">🍴 ${total}</span></div>${total?`<div class="my-order-details">${orderGroup(text[language].personal,personal,false)}${orderGroup(text[language].guest,guests,true)}</div>`:`<div class="my-order-empty">${escapeHtml(text[language].none)}</div>`}</article>`;
    }).join('');

    personalTotal.textContent = String(weekOrders.reduce((sum,order) => sum + Number(order.quantity), 0));
    guestTotal.textContent = String(guestOrders.reduce((sum,order) => sum + Number(order.quantity), 0));
    monthTotal.textContent = String(monthOrders.reduce((sum,order) => sum + Number(order.quantity), 0));
}

async function initialise() {
    applyLabels();
    ordersList.innerHTML = `<div class="empty-state"><strong>${escapeHtml(text[language].loading)}</strong></div>`;
    const dates = getWeekDates();
    const month = getMonthRange();

    try {
        [weekOrders, monthOrders] = await Promise.all([
            loadPersonalOrders(dateKey(dates[0]), dateKey(dates[4])),
            loadPersonalOrders(month.from, month.to)
        ]);
        guestOrders = loadGuestOrders();
        loadError = null;
    } catch (error) {
        console.error(error);
        loadError = error;
        guestOrders = loadGuestOrders();
    }
    render();
}

currentUserName.textContent = currentUser.employeeName;
logoutButton.addEventListener('click', () => {
    localStorage.removeItem(USER_KEY);
    location.replace('login.html');
});
languageSelect.value = language;
languageSelect.addEventListener('change', () => {
    language = languageSelect.value;
    localStorage.setItem(LANGUAGE_KEY, language);
    guestOrders = loadGuestOrders();
    render();
});

initialise();

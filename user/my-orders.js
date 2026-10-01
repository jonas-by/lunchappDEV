const API_BASE = 'https://lunchapp-api-dev-bxf8hff5hmb7g5dv.swedencentral-01.azurewebsites.net/api';
const USER_KEY = 'lunch-poc-current-user-v17';
const LANGUAGE_KEY = 'lunch-poc-language-v5';

let currentUser;
try {
    currentUser = JSON.parse(localStorage.getItem(USER_KEY));
} catch {}

if (!currentUser?.employeeNumber) {
    location.replace('login.html');
}

let language = localStorage.getItem(LANGUAGE_KEY) || 'en';
let personalWeekOrders = [];
let personalMonthOrders = [];
let guestWeekOrders = [];
let guestMonthOrders = [];
let loadError = null;

const copy = {
    en: {
        title: 'My orders',
        week: 'This week',
        overview: 'Lunch overview',
        intro: 'Check your personal and guest lunch orders for each weekday.',
        summary: 'Summary',
        personalWeek: 'Personal lunches this week',
        guestWeek: 'Guest lunches this week',
        month: 'Total lunches this month',
        personal: 'Personal',
        guest: 'Guest',
        none: 'No order',
        project: 'Work task / project',
        menu: 'Lunch menu',
        source: 'Personal and guest orders are loaded from Azure.',
        back: 'Back to lunch ordering',
        loading: 'Loading orders...',
        failed: 'Could not load orders'
    },
    sv: {
        title: 'Mina beställningar',
        week: 'Den här veckan',
        overview: 'Lunchöversikt',
        intro: 'Kontrollera dina egna lunchbeställningar och gästluncher för varje vardag.',
        summary: 'Sammanfattning',
        personalWeek: 'Egna luncher den här veckan',
        guestWeek: 'Gästluncher den här veckan',
        month: 'Totalt antal luncher den här månaden',
        personal: 'Egna luncher',
        guest: 'Gästluncher',
        none: 'Ingen beställning',
        project: 'Arbetsuppgift / projekt',
        menu: 'Lunchmeny',
        source: 'Egna beställningar och gästbeställningar hämtas från Azure.',
        back: 'Tillbaka till lunchbeställning',
        loading: 'Laddar beställningar...',
        failed: 'Kunde inte ladda beställningarna'
    },
    fi: {
        title: 'Omat tilaukset',
        week: 'Tämä viikko',
        overview: 'Lounasyhteenveto',
        intro: 'Tarkista omat lounastilauksesi ja vieraslounaat jokaiselle arkipäivälle.',
        summary: 'Yhteenveto',
        personalWeek: 'Omat lounaat tällä viikolla',
        guestWeek: 'Vieraslounaat tällä viikolla',
        month: 'Lounaita yhteensä tässä kuussa',
        personal: 'Omat lounaat',
        guest: 'Vieraslounaat',
        none: 'Ei tilausta',
        project: 'Työtehtävä / projekti',
        menu: 'Lounaslista',
        source: 'Omat tilaukset ja vierastilaukset ladataan Azuresta.',
        back: 'Takaisin lounastilaukseen',
        loading: 'Ladataan tilauksia...',
        failed: 'Tilausten lataaminen epäonnistui'
    }
};

const weekdays = [
    { en: 'Monday', sv: 'Måndag', fi: 'Maanantai' },
    { en: 'Tuesday', sv: 'Tisdag', fi: 'Tiistai' },
    { en: 'Wednesday', sv: 'Onsdag', fi: 'Keskiviikko' },
    { en: 'Thursday', sv: 'Torsdag', fi: 'Torstai' },
    { en: 'Friday', sv: 'Fredag', fi: 'Perjantai' }
];

const categoryNames = {
    Main: { en: 'Main dish', sv: 'Huvudrätt', fi: 'Pääruoka' },
    Vegetarian: { en: 'Vegetarian', sv: 'Vegetarisk', fi: 'Kasvisruoka' },
    Soup: { en: 'Soup', sv: 'Soppa', fi: 'Keitto' },
    Salad: { en: 'Salad', sv: 'Sallad', fi: 'Salaatti' },
    Dessert: { en: 'Dessert', sv: 'Dessert', fi: 'Jälkiruoka' }
};

const pageTitle = document.querySelector('#pageTitle');
const pageSubtitle = document.querySelector('#pageSubtitle');
const introEyebrow = document.querySelector('#introEyebrow');
const weekHeading = document.querySelector('#weekHeading');
const introText = document.querySelector('#introText');
const summaryHeading = document.querySelector('#summaryHeading');
const personalLabel = document.querySelector('#personalLabel');
const guestLabel = document.querySelector('#guestLabel');
const monthLabel = document.querySelector('#monthLabel');
const personalTotal = document.querySelector('#personalTotal');
const guestTotal = document.querySelector('#guestTotal');
const monthTotal = document.querySelector('#monthTotal');
const sourceNote = document.querySelector('#sourceNote');
const ordersList = document.querySelector('#ordersList');
const backButton = document.querySelector('#backButton');
const languageSelect = document.querySelector('#languageSelect');

function dateKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function mondayOf(date) {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    result.setDate(result.getDate() - ((result.getDay() + 6) % 7));
    return result;
}

function weekDates() {
    const monday = mondayOf(new Date());

    return Array.from({ length: 5 }, (_, index) => {
        const date = new Date(monday);
        date.setDate(monday.getDate() + index);
        return date;
    });
}

function monthRange() {
    const now = new Date();

    return {
        dateFrom: dateKey(new Date(now.getFullYear(), now.getMonth(), 1)),
        dateTo: dateKey(new Date(now.getFullYear(), now.getMonth() + 1, 0))
    };
}

function formatDate(date) {
    return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function escapeHtml(value = '') {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;');
}

function translatedMealName(order) {
    if (language === 'sv') {
        return order.nameSV || order.nameEN || order.nameFI || copy[language].menu;
    }

    if (language === 'fi') {
        return order.nameFI || order.nameSV || order.nameEN || copy[language].menu;
    }

    return order.nameEN || order.nameSV || order.nameFI || copy[language].menu;
}

function translatedCategory(category) {
    return categoryNames[category]?.[language] || category || '';
}

async function apiFetch(path) {
    const response = await fetch(`${API_BASE}${path}`, {
        headers: { Accept: 'application/json' }
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(
            payload?.details ||
            payload?.error ||
            `HTTP ${response.status}`
        );
    }

    return payload;
}

async function loadPersonalOrders(dateFrom, dateTo) {
    const query = new URLSearchParams({
        employeeNo: String(currentUser.employeeNumber),
        dateFrom,
        dateTo
    });

    const payload = await apiFetch(`/orders?${query.toString()}`);
    return payload.orders || [];
}

async function loadGuestOrders(dateFrom, dateTo) {
    const query = new URLSearchParams({
        hostEmployeeNo: String(currentUser.employeeNumber),
        dateFrom,
        dateTo
    });

    const payload = await apiFetch(`/guest-orders?${query.toString()}`);
    return payload.orders || [];
}

function orderGroup(label, orders, isGuest) {
    if (!orders.length) return '';

    return `
        <div class="my-order-group ${isGuest ? 'guest' : ''}">
            <h3>${escapeHtml(label)}</h3>
            ${orders.map(order => `
                <div class="my-order-line">
                    <div>
                        <strong>${escapeHtml(translatedMealName(order))}</strong>
                        <span>
                            ${escapeHtml(translatedCategory(order.category))}
                            ${isGuest && order.workTask
                                ? ` · ${escapeHtml(copy[language].project)}: ${escapeHtml(order.workTask)}`
                                : ''}
                        </span>
                    </div>
                    <b>× ${Number(order.quantity) || 0}</b>
                </div>
            `).join('')}
        </div>
    `;
}

function applyLabels() {
    const text = copy[language];

    document.documentElement.lang = language;
    document.title = text.title;
    pageTitle.textContent = text.title;
    pageSubtitle.textContent = text.week;
    introEyebrow.textContent = text.overview;
    weekHeading.textContent = text.week;
    introText.textContent = text.intro;
    summaryHeading.textContent = text.summary;
    personalLabel.textContent = text.personalWeek;
    guestLabel.textContent = text.guestWeek;
    monthLabel.textContent = text.month;
    sourceNote.textContent = loadError
        ? `${text.failed}: ${loadError.message}`
        : text.source;
    backButton.setAttribute('aria-label', text.back);
}

function render() {
    applyLabels();

    if (loadError) {
        ordersList.innerHTML = `
            <div class="empty-state">
                <strong>${escapeHtml(copy[language].failed)}</strong>
                <span>${escapeHtml(loadError.message)}</span>
            </div>
        `;

        personalTotal.textContent = '0';
        guestTotal.textContent = '0';
        monthTotal.textContent = '0';
        return;
    }

    const dates = weekDates();

    ordersList.innerHTML = dates.map((date, index) => {
        const key = dateKey(date);
        const personal = personalWeekOrders.filter(
            order => order.menuDate === key
        );
        const guests = guestWeekOrders.filter(
            order => order.menuDate === key
        );
        const total = [...personal, ...guests].reduce(
            (sum, order) => sum + Number(order.quantity),
            0
        );

        return `
            <article class="my-order-day">
                <div class="my-order-day-head">
                    <div>
                        <strong>${escapeHtml(weekdays[index][language])} ${formatDate(date)}</strong>
                        <span>${escapeHtml(total ? copy[language].menu : copy[language].none)}</span>
                    </div>
                    <span class="day-total ${total ? 'has-orders' : ''}">🍴 ${total}</span>
                </div>
                ${total
                    ? `<div class="my-order-details">
                        ${orderGroup(copy[language].personal, personal, false)}
                        ${orderGroup(copy[language].guest, guests, true)}
                       </div>`
                    : `<div class="my-order-empty">${escapeHtml(copy[language].none)}</div>`}
            </article>
        `;
    }).join('');

    const personalWeekTotal = personalWeekOrders.reduce(
        (sum, order) => sum + Number(order.quantity),
        0
    );
    const guestWeekTotal = guestWeekOrders.reduce(
        (sum, order) => sum + Number(order.quantity),
        0
    );
    const personalMonthTotal = personalMonthOrders.reduce(
        (sum, order) => sum + Number(order.quantity),
        0
    );
    const guestMonthTotal = guestMonthOrders.reduce(
        (sum, order) => sum + Number(order.quantity),
        0
    );

    personalTotal.textContent = String(personalWeekTotal);
    guestTotal.textContent = String(guestWeekTotal);
    monthTotal.textContent = String(personalMonthTotal + guestMonthTotal);
}

async function initialise() {
    applyLabels();
    ordersList.innerHTML = `
        <div class="empty-state">
            <strong>${escapeHtml(copy[language].loading)}</strong>
        </div>
    `;

    const dates = weekDates();
    const weekFrom = dateKey(dates[0]);
    const weekTo = dateKey(dates[4]);
    const month = monthRange();

    try {
        [
            personalWeekOrders,
            personalMonthOrders,
            guestWeekOrders,
            guestMonthOrders
        ] = await Promise.all([
            loadPersonalOrders(weekFrom, weekTo),
            loadPersonalOrders(month.dateFrom, month.dateTo),
            loadGuestOrders(weekFrom, weekTo),
            loadGuestOrders(month.dateFrom, month.dateTo)
        ]);

        loadError = null;
    } catch (error) {
        console.error(error);
        loadError = error;
    }

    render();
}

const currentUserName = document.querySelector('#currentUserName');
currentUserName.textContent = currentUser.employeeName;

const logoutButton = document.querySelector('#logoutButton');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem(USER_KEY);
    location.replace('login.html');
});

languageSelect.value = language;
languageSelect.addEventListener('change', () => {
    language = languageSelect.value;
    localStorage.setItem(LANGUAGE_KEY, language);
    render();
});

initialise();

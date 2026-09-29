const API_BASE = 'https://lunchapp-api-dev-bxf8hff5hmb7g5dv.swedencentral-01.azurewebsites.net/api';

let allOrders = [];
let expandedMeals = new Set();
let loading = false;
let toastTimer;

const daySelect = document.querySelector('#daySelect');
const employeeSearch = document.querySelector('#employeeSearch');
const totalLunches = document.querySelector('#totalLunches');
const employeeLunches = document.querySelector('#employeeLunches');
const guestLunches = document.querySelector('#guestLunches');
const mealTypes = document.querySelector('#mealTypes');
const mealSummary = document.querySelector('#mealSummary');
const guestDetails = document.querySelector('#guestDetails');
const emptyState = document.querySelector('#emptyState');
const selectedDayHeading = document.querySelector('#selectedDayHeading');
const dataNote = document.querySelector('#dataNote');
const refreshButton = document.querySelector('#refreshButton');

function esc(value = '') {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;');
}

function localDateKey(date = new Date()) {
    return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getDate()).padStart(2, '0')
    ].join('-');
}

function displayDate(value) {
    const date = new Date(`${value}T12:00:00`);
    return new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date);
}

function mealName(order) {
    const language = window.AdminI18n?.lang?.() || 'en';
    if (language === 'sv') return order.nameSV || order.nameEN || order.nameFI || `Meal ${order.mealId}`;
    if (language === 'fi') return order.nameFI || order.nameEN || order.nameSV || `Meal ${order.mealId}`;
    return order.nameEN || order.nameSV || order.nameFI || `Meal ${order.mealId}`;
}

async function apiFetch(path) {
    const response = await fetch(`${API_BASE}${path}`, {
        headers: { Accept: 'application/json' }
    });
    const type = response.headers.get('content-type') || '';
    const payload = type.includes('application/json')
        ? await response.json()
        : await response.text();
    if (!response.ok) {
        throw new Error(payload?.details || payload?.error || payload || `HTTP ${response.status}`);
    }
    return payload;
}

function filteredOrders() {
    const query = employeeSearch.value.trim().toLowerCase();
    if (!query) return allOrders;
    return allOrders.filter(order =>
        order.employeeName.toLowerCase().includes(query) ||
        String(order.employeeNo).includes(query) ||
        String(order.workTask || '').toLowerCase().includes(query)
    );
}

function groupedMeals(orders) {
    const groups = new Map();
    for (const order of orders) {
        const key = String(order.mealId);
        if (!groups.has(key)) {
            groups.set(key, {
                key,
                mealId: order.mealId,
                name: mealName(order),
                category: order.category || 'Other',
                rows: []
            });
        }
        groups.get(key).rows.push(order);
    }
    return [...groups.values()].sort((a, b) =>
        portions(b.rows) - portions(a.rows) || a.name.localeCompare(b.name)
    );
}

function portions(rows) {
    return rows.reduce((sum, row) => sum + Number(row.quantity || 0), 0);
}

function renderMealGroup(group) {
    const open = expandedMeals.has(group.key);
    const people = [...group.rows].sort((a, b) =>
        a.employeeName.localeCompare(b.employeeName) || a.orderType.localeCompare(b.orderType)
    );

    return `
        <article class="expandable-meal ${open ? 'open' : ''}">
            <button class="meal-expand-button" type="button" data-meal="${group.key}" aria-expanded="${open}">
                <span class="meal-expand-chevron"></span>
                <span class="meal-name">
                    <strong>${esc(group.name)}</strong>
                    <span>${esc(group.category)}</span>
                </span>
                <span class="portion-count">${portions(group.rows)}</span>
            </button>
            <div class="meal-people">
                ${people.map(order => `
                    <div class="person-order">
                        <span>
                            <strong>${esc(order.employeeName)}</strong>
                            <small>${order.orderType === 'guest' ? `Guest · ${esc(order.workTask || 'No work task')}` : `Employee ${esc(order.employeeNo)}`}</small>
                        </span>
                        <strong>${order.quantity}</strong>
                    </div>
                `).join('')}
            </div>
        </article>
    `;
}

function renderGuestDetails(orders) {
    const guests = orders
        .filter(order => order.orderType === 'guest')
        .sort((a, b) =>
            String(a.workTask || '').localeCompare(String(b.workTask || '')) ||
            a.employeeName.localeCompare(b.employeeName)
        );

    if (guests.length === 0) {
        guestDetails.innerHTML = '<div class="empty-state"><strong>No guest lunches</strong><span>No guest orders match the selected day and search.</span></div>';
        return;
    }

    guestDetails.innerHTML = guests.map(order => `
        <div class="guest-entry">
            <div>
                <strong>${esc(order.workTask || 'No work task or project')}</strong>
                <span>${esc(order.employeeName)} · ${esc(mealName(order))}</span>
            </div>
            <strong class="guest-count">${order.quantity}</strong>
        </div>
    `).join('');
}

function render() {
    const orders = filteredOrders();
    const employeeOrders = orders.filter(order => order.orderType === 'employee');
    const guestOrders = orders.filter(order => order.orderType === 'guest');
    const meals = groupedMeals(orders);

    selectedDayHeading.textContent = displayDate(daySelect.value);
    totalLunches.textContent = portions(orders);
    employeeLunches.textContent = portions(employeeOrders);
    guestLunches.textContent = portions(guestOrders);
    mealTypes.textContent = meals.length;
    mealSummary.innerHTML = meals.map(renderMealGroup).join('');
    emptyState.hidden = meals.length > 0;
    renderGuestDetails(orders);
}

async function loadOrders() {
    if (!daySelect.value || loading) return;
    loading = true;
    refreshButton.disabled = true;
    dataNote.textContent = `Loading orders for ${displayDate(daySelect.value)}...`;

    try {
        const date = encodeURIComponent(daySelect.value);
        const payload = await apiFetch(`/kitchen/orders?dateFrom=${date}&dateTo=${date}`);
        allOrders = Array.isArray(payload.orders) ? payload.orders : [];
        expandedMeals.clear();
        render();
        const generated = new Date(payload.generatedAt);
        dataNote.textContent = `Loaded ${payload.summary?.orderRows ?? allOrders.length} order rows from Azure. Refreshed ${generated.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}.`;
    } catch (error) {
        console.error(error);
        allOrders = [];
        render();
        dataNote.textContent = `Load failed: ${error.message}`;
        showToast(`Load failed: ${error.message}`);
    } finally {
        loading = false;
        refreshButton.disabled = false;
    }
}

function showToast(message) {
    const toast = document.querySelector('#toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

daySelect.value = localDateKey();
daySelect.addEventListener('change', loadOrders);
employeeSearch.addEventListener('input', render);
refreshButton.addEventListener('click', loadOrders);
document.querySelector('#todayButton').addEventListener('click', () => {
    daySelect.value = localDateKey();
    loadOrders();
});
document.querySelector('#printButton').addEventListener('click', () => window.print());
mealSummary.addEventListener('click', event => {
    const button = event.target.closest('[data-meal]');
    if (!button) return;
    const key = button.dataset.meal;
    if (expandedMeals.has(key)) expandedMeals.delete(key);
    else expandedMeals.add(key);
    render();
});
document.addEventListener('admin-language-changed', render);

loadOrders();

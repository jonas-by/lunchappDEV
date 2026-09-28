const API_BASE = 'https://lunchapp-api-dev-bxf8hff5hmb7g5dv.swedencentral-01.azurewebsites.net/api';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const TYPES = ['all', 'main', 'vegetarian', 'soup', 'salad', 'dessert'];

let library = [];
let cfg = { repeatWeeks: 0, weeks: [] };
let active = 0;
let filter = 'all';
let selected = null;
let timer;
let dragSource = null;

const repeat = document.querySelector('#repeatWeeks');
const tabs = document.querySelector('#weekTabs');
const items = document.querySelector('#libraryItems');
const search = document.querySelector('#librarySearch');
const chips = document.querySelector('#categoryChips');
const daysBox = document.querySelector('#dayEditors');
const editingWeek = document.querySelector('#editingWeek');
const cycleTitle = document.querySelector('#cycleTitle');
const saveMenu = document.querySelector('#saveMenu');
const copyPrevious = document.querySelector('#copyPrevious');
const toast = document.querySelector('#toast');
const menuStatus = document.querySelector('#menuStatus');

function t(value) {
    return window.AdminI18n?.t(value) || value;
}

function esc(value = '') {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;');
}

function normaliseCategory(value = '') {
    return String(value).trim().toLowerCase();
}

function typeName(type) {
    return {
        main: 'Main dish',
        vegetarian: 'Vegetarian',
        soup: 'Soup',
        salad: 'Salad',
        dessert: 'Dessert'
    }[type] || 'Other';
}

function mealName(meal) {
    const language = window.AdminI18n?.lang() || 'sv';

    if (language === 'en') return meal.nameEN || meal.nameSV || meal.nameFI || 'New dish';
    if (language === 'fi') return meal.nameFI || meal.nameSV || meal.nameEN || 'New dish';
    return meal.nameSV || meal.nameEN || meal.nameFI || 'New dish';
}

function blankWeek() {
    return {
        days: DAYS.map((day, index) => ({
            day,
            dayNumber: index + 1,
            mealIds: []
        }))
    };
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

    let payload = null;
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
        payload = await response.json();
    } else {
        payload = await response.text();
    }

    if (!response.ok) {
        const detail = payload?.details || payload?.error || payload || `HTTP ${response.status}`;
        throw new Error(detail);
    }

    return payload;
}

async function loadLibrary() {
    const rows = await apiFetch('/meals');

    library = rows
        .map(row => ({
            mealId: Number(row.MealID ?? row.mealId),
            nameEN: row.NameEN ?? row.nameEN ?? '',
            nameSV: row.NameSV ?? row.nameSV ?? '',
            nameFI: row.NameFI ?? row.nameFI ?? '',
            category: normaliseCategory(row.Category ?? row.category),
            active: Boolean(row.Active ?? row.active)
        }))
        .filter(meal => Number.isInteger(meal.mealId));
}

async function loadMenuWeeks() {
    const results = await Promise.all(
        Array.from({ length: 8 }, async (_, index) => {
            const weekNumber = index + 1;

            try {
                return await apiFetch(`/menu/week/${weekNumber}`);
            } catch (error) {
                if (String(error.message).includes('does not exist')) {
                    return null;
                }
                throw error;
            }
        })
    );

    const existing = results.filter(Boolean);

    if (existing.length === 0) {
        throw new Error('No menu weeks exist in the database');
    }

    cfg.repeatWeeks = existing.length;
    cfg.weeks = existing.map(apiWeek => ({
        days: DAYS.map((day, index) => {
            const apiDay = apiWeek.days.find(item => item.dayNumber === index + 1);

            return {
                day,
                dayNumber: index + 1,
                mealIds: (apiDay?.meals || []).map(meal => Number(meal.mealId))
            };
        })
    }));

    repeat.value = String(cfg.repeatWeeks);
}

function renderTabs() {
    tabs.innerHTML = cfg.weeks.map((_, index) => `
        <button class="week-tab ${index === active ? 'active' : ''}" data-week="${index}">
            ${t('Week')} ${index + 1}
        </button>
    `).join('');

    editingWeek.textContent = `${t('Week')} ${active + 1}`;
    cycleTitle.textContent = `${cfg.repeatWeeks}-${t('week menu')}`;
}

function renderLibrary() {
    chips.innerHTML = TYPES.map(type => `
        <button class="category-chip ${type === filter ? 'active' : ''}" data-type="${type}">
            ${t(type === 'all' ? 'All' : typeName(type))}
        </button>
    `).join('');

    const query = search.value.trim().toLowerCase();

    const shown = library.filter(meal => {
        const categoryMatches = filter === 'all' || meal.category === filter;
        const searchMatches = !query || [
            meal.nameEN,
            meal.nameSV,
            meal.nameFI,
            typeName(meal.category)
        ].some(value => String(value).toLowerCase().includes(query));

        return meal.active && categoryMatches && searchMatches;
    });

    items.innerHTML = shown.map(meal => `
        <article class="library-dish ${selected === meal.mealId ? 'selected' : ''}"
                 draggable="true"
                 tabindex="0"
                 data-id="${meal.mealId}">
            <div>
                <span class="meal-category-badge ${esc(meal.category)}">${t(typeName(meal.category))}</span>
                <strong>${esc(mealName(meal))}</strong>
                <small>${esc(meal.nameEN)}</small>
            </div>
            <span class="drag-handle">⋮⋮</span>
        </article>
    `).join('') || `
        <div class="empty-state">
            <strong>${t('No matching dishes')}</strong>
        </div>
    `;
}

function scheduled(mealId, dayIndex, mealIndex) {
    const meal = library.find(item => item.mealId === mealId);
    if (!meal) return '';

    return `
        <div class="scheduled-dish"
             draggable="true"
             data-id="${mealId}"
             data-day="${dayIndex}"
             data-index="${mealIndex}">
            <span class="scheduled-grip">⋮⋮</span>
            <div>
                <strong>${esc(mealName(meal))}</strong>
                <small>${t(typeName(meal.category))}</small>
            </div>
            <button class="remove-scheduled" data-remove="${dayIndex}:${mealIndex}" aria-label="Remove">×</button>
        </div>
    `;
}

function renderDays() {
    const week = cfg.weeks[active] || blankWeek();

    daysBox.innerHTML = week.days.map((day, dayIndex) => `
        <article class="menu-builder-day">
            <header>
                <div>
                    <strong>${t(day.day)}</strong>
                    <span>${day.mealIds.length} ${t(day.mealIds.length === 1 ? 'dish' : 'dishes')}</span>
                </div>
                <div class="day-actions">
                    <button class="text-button" data-add="${dayIndex}" ${selected ? '' : 'disabled'}>${t('Add')}</button>
                    <button class="text-button" data-clear="${dayIndex}" ${day.mealIds.length ? '' : 'disabled'}>${t('Clear day')}</button>
                </div>
            </header>
            <div class="day-drop-zone" data-drop-day="${dayIndex}">
                ${day.mealIds.length
                    ? day.mealIds.map((mealId, mealIndex) => scheduled(mealId, dayIndex, mealIndex)).join('')
                    : `<div class="drop-placeholder"><strong>${t('Drop dishes here')}</strong><span>${t('or select a dish and press Add')}</span></div>`}
            </div>
        </article>
    `).join('');
}

function render() {
    renderTabs();
    renderLibrary();
    renderDays();
}

function add(dayIndex, mealId, targetIndex = null) {
    const numericMealId = Number(mealId);
    const mealExists = library.some(meal => meal.mealId === numericMealId);
    if (!mealExists) return;

    const list = cfg.weeks[active].days[dayIndex].mealIds;

    if (list.includes(numericMealId)) {
        show('Dish is already added to this day');
        return;
    }

    list.splice(targetIndex === null ? list.length : targetIndex, 0, numericMealId);
    renderDays();
}

function show(message) {
    toast.textContent = t(message);
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove('show'), 2500);
}

function clearTargets() {
    document.querySelectorAll('.drag-over,.drop-before,.drop-after')
        .forEach(element => element.classList.remove('drag-over', 'drop-before', 'drop-after'));
}

async function saveAllWeeks() {
    saveMenu.disabled = true;
    menuStatus.textContent = 'Saving rotating menu to Azure...';

    try {
        for (let index = 0; index < cfg.weeks.length; index += 1) {
            const payload = {
                days: cfg.weeks[index].days.map(day => ({
                    dayNumber: day.dayNumber,
                    mealIds: day.mealIds
                }))
            };

            await apiFetch(`/menu/week/${index + 1}`, {
                method: 'PUT',
                body: JSON.stringify(payload)
            });
        }

        menuStatus.textContent = `Saved ${cfg.repeatWeeks}-week rotating menu to Azure.`;
        show('Menu saved');
    } catch (error) {
        console.error(error);
        menuStatus.textContent = `Save failed: ${error.message}`;
        show(`Save failed: ${error.message}`);
    } finally {
        saveMenu.disabled = false;
    }
}

async function initialise() {
    saveMenu.disabled = true;

    try {
        await Promise.all([loadLibrary(), loadMenuWeeks()]);
        active = 0;
        render();
        menuStatus.textContent = `Loaded ${library.length} dishes and ${cfg.repeatWeeks} menu weeks from Azure.`;
    } catch (error) {
        console.error(error);
        cycleTitle.textContent = 'Unable to load menu';
        menuStatus.textContent = `Load failed: ${error.message}`;
        show(`Load failed: ${error.message}`);
    } finally {
        saveMenu.disabled = false;
    }
}

tabs.addEventListener('click', event => {
    const button = event.target.closest('[data-week]');
    if (!button) return;

    active = Number(button.dataset.week);
    selected = null;
    render();
});

search.addEventListener('input', renderLibrary);

chips.addEventListener('click', event => {
    const button = event.target.closest('[data-type]');
    if (!button) return;

    filter = button.dataset.type;
    renderLibrary();
});

items.addEventListener('click', event => {
    const card = event.target.closest('[data-id]');
    if (!card) return;

    const mealId = Number(card.dataset.id);
    selected = selected === mealId ? null : mealId;
    renderLibrary();
    renderDays();
});

items.addEventListener('dragstart', event => {
    const card = event.target.closest('[data-id]');
    if (!card) return;

    dragSource = null;
    event.dataTransfer.effectAllowed = 'copy';
    event.dataTransfer.setData('text/plain', card.dataset.id);
});

daysBox.addEventListener('dragstart', event => {
    const row = event.target.closest('.scheduled-dish');
    if (!row) return;

    dragSource = {
        day: Number(row.dataset.day),
        index: Number(row.dataset.index),
        id: Number(row.dataset.id)
    };

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', row.dataset.id);
    requestAnimationFrame(() => row.classList.add('dragging'));
});

daysBox.addEventListener('dragend', () => {
    dragSource = null;
    clearTargets();
    document.querySelectorAll('.dragging').forEach(element => element.classList.remove('dragging'));
});

daysBox.addEventListener('dragover', event => {
    const zone = event.target.closest('[data-drop-day]');
    if (!zone) return;

    event.preventDefault();
    clearTargets();

    const row = event.target.closest('.scheduled-dish');
    if (row) {
        const box = row.getBoundingClientRect();
        const after = event.clientY > box.top + box.height / 2;
        row.classList.add(after ? 'drop-after' : 'drop-before');
    } else {
        zone.classList.add('drag-over');
    }
});

daysBox.addEventListener('drop', event => {
    const zone = event.target.closest('[data-drop-day]');
    if (!zone) return;

    event.preventDefault();

    const targetDay = Number(zone.dataset.dropDay);
    const row = event.target.closest('.scheduled-dish');
    let targetIndex = row
        ? Number(row.dataset.index) + (row.classList.contains('drop-after') ? 1 : 0)
        : cfg.weeks[active].days[targetDay].mealIds.length;

    let mealId = Number(event.dataTransfer.getData('text/plain'));

    if (dragSource) {
        const sourceList = cfg.weeks[active].days[dragSource.day].mealIds;
        [mealId] = sourceList.splice(dragSource.index, 1);

        if (dragSource.day === targetDay && dragSource.index < targetIndex) {
            targetIndex -= 1;
        }
    }

    clearTargets();
    add(targetDay, mealId, targetIndex);
});

daysBox.addEventListener('click', event => {
    const addButton = event.target.closest('[data-add]');
    if (addButton) {
        add(Number(addButton.dataset.add), selected);
        return;
    }

    const clearButton = event.target.closest('[data-clear]');
    if (clearButton) {
        cfg.weeks[active].days[Number(clearButton.dataset.clear)].mealIds = [];
        renderDays();
        return;
    }

    const removeButton = event.target.closest('[data-remove]');
    if (removeButton) {
        const [dayIndex, mealIndex] = removeButton.dataset.remove.split(':').map(Number);
        cfg.weeks[active].days[dayIndex].mealIds.splice(mealIndex, 1);
        renderDays();
    }
});

copyPrevious.addEventListener('click', () => {
    if (active === 0) {
        show('Week 1 has no previous week');
        return;
    }

    cfg.weeks[active] = structuredClone(cfg.weeks[active - 1]);
    renderDays();
    show('Previous week copied');
});

saveMenu.addEventListener('click', saveAllWeeks);
document.addEventListener('admin-language-changed', render);

initialise();

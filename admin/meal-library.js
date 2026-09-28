const API_BASE = 'https://lunchapp-api-dev-bxf8hff5hmb7g5dv.swedencentral-01.azurewebsites.net/api';
const CATEGORIES = ['main', 'vegetarian', 'soup', 'salad', 'dessert'];

let meals = [];
let snapshot = '[]';
let timer;

const editor = document.querySelector('#mealEditor');
const search = document.querySelector('#mealSearch');
const categoryFilter = document.querySelector('#categoryFilter');
const statusFilter = document.querySelector('#statusFilter');
const mealCount = document.querySelector('#mealCount');
const saveLibrary = document.querySelector('#saveLibrary');
const addMeal = document.querySelector('#addMeal');
const toast = document.querySelector('#toast');
const libraryStatus = document.querySelector('#libraryStatus');

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

function apiCategory(value) {
    return {
        main: 'Main',
        vegetarian: 'Vegetarian',
        soup: 'Soup',
        salad: 'Salad',
        dessert: 'Dessert'
    }[value];
}

function typeName(value) {
    return {
        main: 'Main dish',
        vegetarian: 'Vegetarian',
        soup: 'Soup',
        salad: 'Salad',
        dessert: 'Dessert'
    }[value] || 'Other';
}

function serialisableMeals() {
    return meals.map(meal => ({
        mealId: meal.mealId,
        clientId: meal.clientId,
        type: meal.type,
        names: { ...meal.names },
        active: meal.active,
        isNew: meal.isNew
    }));
}

function dirty() {
    const hasChanges = JSON.stringify(serialisableMeals()) !== snapshot;
    saveLibrary.disabled = !hasChanges;
    saveLibrary.textContent = t(hasChanges ? 'Save' : 'Saved');
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
        const message = payload?.details || payload?.error || payload || `HTTP ${response.status}`;
        const error = new Error(message);
        error.status = response.status;
        error.payload = payload;
        throw error;
    }

    return payload;
}

async function loadMeals() {
    libraryStatus.textContent = 'Loading meal library from Azure...';

    const rows = await apiFetch('/meals?includeInactive=true');

    meals = rows.map(row => ({
        mealId: Number(row.MealID ?? row.mealId),
        clientId: `meal-${row.MealID ?? row.mealId}`,
        type: normaliseCategory(row.Category ?? row.category),
        names: {
            en: row.NameEN ?? row.nameEN ?? '',
            sv: row.NameSV ?? row.nameSV ?? '',
            fi: row.NameFI ?? row.nameFI ?? ''
        },
        active: Boolean(row.Active ?? row.active),
        isNew: false
    }));

    snapshot = JSON.stringify(serialisableMeals());
    render();
    libraryStatus.textContent = `Loaded ${meals.length} dishes from Azure.`;
}

function capture() {
    editor.querySelectorAll('.meal-library-card').forEach(card => {
        const meal = meals.find(item => item.clientId === card.dataset.id);
        if (!meal) return;

        meal.names.en = card.querySelector('[data-lang=en]').value.trim();
        meal.names.sv = card.querySelector('[data-lang=sv]').value.trim();
        meal.names.fi = card.querySelector('[data-lang=fi]').value.trim();
        meal.type = card.querySelector('[data-field=type]').value;
        meal.active = card.querySelector('[data-field=active]').checked;
    });
}

function validateMeal(meal) {
    const missing = [];

    if (!meal.names.en.trim()) missing.push('English name');
    if (!meal.names.sv.trim()) missing.push('Swedish name');
    if (!meal.names.fi.trim()) missing.push('Finnish name');
    if (!CATEGORIES.includes(meal.type)) missing.push('category');

    if (missing.length > 0) {
        return `${meal.names.sv || meal.names.en || t('New dish')}: missing ${missing.join(', ')}`;
    }

    return null;
}

function mealPayload(meal) {
    return {
        nameEN: meal.names.en.trim(),
        nameSV: meal.names.sv.trim(),
        nameFI: meal.names.fi.trim(),
        category: apiCategory(meal.type),
        active: meal.active
    };
}

function render() {
    const query = search.value.trim().toLowerCase();
    const category = categoryFilter.value;
    const status = statusFilter.value;

    const shown = meals.filter(meal => {
        const categoryMatches = !category || meal.type === category;
        const statusMatches = !status ||
            (status === 'active' && meal.active) ||
            (status === 'inactive' && !meal.active);
        const searchMatches = !query || [
            meal.names.en,
            meal.names.sv,
            meal.names.fi,
            typeName(meal.type)
        ].some(value => String(value).toLowerCase().includes(query));

        return categoryMatches && statusMatches && searchMatches;
    });

    mealCount.textContent = shown.length === meals.length
        ? String(meals.length)
        : `${shown.length} / ${meals.length}`;

    editor.innerHTML = shown.length
        ? shown.map((meal, index) => mealCard(meal, index)).join('')
        : `<div class="empty-state meal-library-empty"><strong>${t('No matching dishes')}</strong></div>`;

    dirty();
}

function mealCard(meal, index) {
    const title = meal.names.sv || meal.names.en || meal.names.fi || t('New dish');

    return `
        <article class="meal-library-card ${meal.active ? '' : 'inactive'}" data-id="${esc(meal.clientId)}">
            <header class="meal-card-header">
                <div class="meal-card-title">
                    <span class="meal-card-number">${index + 1}</span>
                    <div>
                        <span class="meal-category-badge ${esc(meal.type)}">${t(typeName(meal.type))}</span>
                        <h3>${esc(title)}</h3>
                    </div>
                </div>

                <label class="product-active-toggle">
                    <input data-field="active" type="checkbox" ${meal.active ? 'checked' : ''}>
                    <span class="toggle-track"></span>
                    <span class="toggle-label">${t(meal.active ? 'Active' : 'Inactive')}</span>
                </label>
            </header>

            <section class="meal-card-body">
                <div class="meal-language-fields">
                    <label>
                        <span>EN · ${t('English')}</span>
                        <input data-lang="en" value="${esc(meal.names.en)}">
                    </label>
                    <label>
                        <span>SV · ${t('Swedish')}</span>
                        <input data-lang="sv" value="${esc(meal.names.sv)}">
                    </label>
                    <label>
                        <span>FI · ${t('Finnish')}</span>
                        <input data-lang="fi" value="${esc(meal.names.fi)}">
                    </label>
                </div>

                <label class="meal-category-field">
                    <span>${t('Category')}</span>
                    <select data-field="type">
                        ${CATEGORIES.map(category => `
                            <option value="${category}" ${meal.type === category ? 'selected' : ''}>
                                ${t(typeName(category))}
                            </option>
                        `).join('')}
                    </select>
                </label>
            </section>

            <footer class="meal-card-footer">
                <span>${meal.isNew ? t('New dish, not saved yet') : `${t('Meal ID')}: ${meal.mealId}`}</span>
                <div class="builder-heading-actions">
                    <button class="table-action danger" type="button" data-delete="${esc(meal.clientId)}">
                        ${t(meal.active ? 'Disable dish' : 'Delete dish')}
                    </button>
                    ${!meal.active && !meal.isNew ? `
                        <button class="table-action danger" type="button" data-hard-delete="${esc(meal.clientId)}">
                            ${t('Delete permanently')}
                        </button>
                    ` : ''}
                </div>
            </footer>
        </article>
    `;
}

async function saveChanges() {
    capture();

    for (const meal of meals) {
        const validationError = validateMeal(meal);
        if (validationError) {
            show(validationError);
            return;
        }
    }

    saveLibrary.disabled = true;
    libraryStatus.textContent = 'Saving meal library to Azure...';

    try {
        const previous = JSON.parse(snapshot);
        const previousById = new Map(previous.map(meal => [meal.mealId, meal]));

        for (const meal of meals) {
            const payload = mealPayload(meal);

            if (meal.isNew) {
                const created = await apiFetch('/meals', {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });

                meal.mealId = Number(created.MealID ?? created.mealId);
                meal.clientId = `meal-${meal.mealId}`;
                meal.isNew = false;
                continue;
            }

            const oldMeal = previousById.get(meal.mealId);
            const changed = !oldMeal || JSON.stringify({
                type: meal.type,
                names: meal.names,
                active: meal.active
            }) !== JSON.stringify({
                type: oldMeal.type,
                names: oldMeal.names,
                active: oldMeal.active
            });

            if (changed) {
                await apiFetch(`/meals/${meal.mealId}`, {
                    method: 'PUT',
                    body: JSON.stringify(payload)
                });
            }
        }

        snapshot = JSON.stringify(serialisableMeals());
        render();
        libraryStatus.textContent = `Saved ${meals.length} dishes to Azure.`;
        show('Dish library saved');
    } catch (error) {
        console.error(error);
        libraryStatus.textContent = `Save failed: ${error.message}`;
        show(`Save failed: ${error.message}`);
        dirty();
    }
}

async function softDelete(clientId) {
    capture();
    const meal = meals.find(item => item.clientId === clientId);
    if (!meal) return;

    if (meal.isNew) {
        meals = meals.filter(item => item.clientId !== clientId);
        render();
        return;
    }

    if (!meal.active) {
        meal.active = true;
        render();
        show('Dish restored locally. Press Save to update Azure.');
        return;
    }

    if (!confirm(t('Disable this dish? It will remain in existing menus.'))) return;

    try {
        await apiFetch(`/meals/${meal.mealId}`, {
            method: 'DELETE'
        });

        meal.active = false;
        snapshot = JSON.stringify(serialisableMeals());
        render();
        libraryStatus.textContent = `Dish ${meal.mealId} was disabled.`;
        show('Dish disabled');
    } catch (error) {
        console.error(error);
        show(`Delete failed: ${error.message}`);
    }
}

async function hardDelete(clientId) {
    capture();
    const meal = meals.find(item => item.clientId === clientId);
    if (!meal || meal.isNew) return;

    const title = meal.names.sv || meal.names.en || meal.names.fi;
    const confirmed = confirm(
        `${t('Permanently delete')} "${title}"?\n\n${t('This cannot be undone. If the dish is used in a menu, the API will refuse the deletion.')}`
    );

    if (!confirmed) return;

    try {
        await apiFetch(`/meals/${meal.mealId}?hard=true`, {
            method: 'DELETE'
        });

        meals = meals.filter(item => item.clientId !== clientId);
        snapshot = JSON.stringify(serialisableMeals());
        render();
        libraryStatus.textContent = `Dish ${meal.mealId} was permanently deleted.`;
        show('Dish permanently deleted');
    } catch (error) {
        console.error(error);
        show(error.status === 409
            ? 'Dish is used in a menu and cannot be permanently deleted.'
            : `Permanent delete failed: ${error.message}`);
    }
}

editor.addEventListener('input', event => {
    capture();
    const card = event.target.closest('.meal-library-card');
    const meal = meals.find(item => item.clientId === card?.dataset.id);

    if (card && meal) {
        card.querySelector('h3').textContent =
            meal.names.sv || meal.names.en || meal.names.fi || t('New dish');
    }

    dirty();
});

editor.addEventListener('change', event => {
    capture();
    if (event.target.matches('[data-field]')) {
        render();
    } else {
        dirty();
    }
});

editor.addEventListener('click', event => {
    const softButton = event.target.closest('[data-delete]');
    if (softButton) {
        softDelete(softButton.dataset.delete);
        return;
    }

    const hardButton = event.target.closest('[data-hard-delete]');
    if (hardButton) {
        hardDelete(hardButton.dataset.hardDelete);
    }
});

addMeal.addEventListener('click', () => {
    capture();

    const clientId = `new-${crypto.randomUUID?.() || Date.now()}`;

    meals.unshift({
        mealId: null,
        clientId,
        type: 'main',
        names: { en: '', sv: '', fi: '' },
        active: true,
        isNew: true
    });

    search.value = '';
    categoryFilter.value = '';
    statusFilter.value = '';
    render();
    editor.querySelector(`[data-id="${clientId}"] [data-lang=sv]`)?.focus();
});

saveLibrary.addEventListener('click', saveChanges);
search.addEventListener('input', render);
categoryFilter.addEventListener('change', render);
statusFilter.addEventListener('change', render);
document.addEventListener('admin-language-changed', render);

function show(message) {
    toast.textContent = t(message);
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove('show'), 2600);
}

loadMeals().catch(error => {
    console.error(error);
    libraryStatus.textContent = `Load failed: ${error.message}`;
    show(`Load failed: ${error.message}`);
});

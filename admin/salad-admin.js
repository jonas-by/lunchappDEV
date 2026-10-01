const API_URL = 'https://lunchapp-api-dev-bxf8hff5hmb7g5dv.swedencentral-01.azurewebsites.net/api/salads';
const box = document.querySelector('#saladEditor');
const saveButton = document.querySelector('#saveSalads');
const addButton = document.querySelector('#addSalad');
let salads = [];
let timer;
let tempId = -1;

function esc(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function render() {
  if (!salads.length) {
    box.innerHTML = '<div class="empty-state">No salads found. Add the first salad above.</div>';
    return;
  }

  box.innerHTML = salads.map((salad, index) => `
    <article class="salad-card ${salad.isActive ? '' : 'inactive'}">
      <div class="salad-number">${index + 1}</div>
      <div class="salad-fields">
        <label><span>EN</span><input data-id="${salad.localId}" data-field="nameEn" value="${esc(salad.nameEn)}" maxlength="100"></label>
        <label><span>SV</span><input data-id="${salad.localId}" data-field="nameSv" value="${esc(salad.nameSv)}" maxlength="100"></label>
        <label><span>FI</span><input data-id="${salad.localId}" data-field="nameFi" value="${esc(salad.nameFi)}" maxlength="100"></label>
      </div>
      <label class="active-toggle">
        <input type="checkbox" data-id="${salad.localId}" data-field="isActive" ${salad.isActive ? 'checked' : ''}>
        <span>Active</span>
      </label>
      <button class="remove-button" data-remove="${salad.localId}" type="button" aria-label="Remove">×</button>
    </article>`).join('');
}

function capture() {
  box.querySelectorAll('[data-field]').forEach(input => {
    const salad = salads.find(item => item.localId === Number(input.dataset.id));
    if (!salad) return;
    salad[input.dataset.field] = input.type === 'checkbox' ? input.checked : input.value.trim();
  });
}

async function loadSalads() {
  setBusy(true);
  try {
    const response = await fetch(`${API_URL}?includeInactive=true`, { headers: { Accept: 'application/json' } });
    const body = await readResponse(response);
    if (!response.ok) throw new Error(body.error || body.details || `HTTP ${response.status}`);

    salads = body.map(item => ({
      ...item,
      localId: item.saladId,
      isNew: false
    }));
    render();
  } catch (error) {
    console.error('Could not load salads', error);
    box.innerHTML = `<div class="empty-state error-state">Could not load salads: ${esc(error.message)}</div>`;
    show('Could not load salads');
  } finally {
    setBusy(false);
  }
}

addButton.addEventListener('click', () => {
  capture();
  salads.push({
    localId: tempId--,
    saladId: null,
    nameEn: '',
    nameSv: '',
    nameFi: '',
    isActive: true,
    sortOrder: salads.length * 10,
    isNew: true
  });
  render();
  box.querySelector('.salad-card:last-child input')?.focus();
});

box.addEventListener('change', event => {
  if (!event.target.matches('[data-field="isActive"]')) return;
  capture();
  render();
});

box.addEventListener('click', async event => {
  const button = event.target.closest('[data-remove]');
  if (!button) return;

  capture();
  const localId = Number(button.dataset.remove);
  const salad = salads.find(item => item.localId === localId);
  if (!salad) return;

  if (salad.isNew) {
    salads = salads.filter(item => item.localId !== localId);
    render();
    return;
  }

  setBusy(true);
  try {
    const response = await fetch(`${API_URL}/${salad.saladId}`, { method: 'DELETE' });
    const body = await readResponse(response);
    if (!response.ok) throw new Error(body.error || body.details || `HTTP ${response.status}`);
    salad.isActive = false;
    render();
    show('Salad deactivated');
  } catch (error) {
    console.error('Could not deactivate salad', error);
    show(`Could not deactivate salad: ${error.message}`);
  } finally {
    setBusy(false);
  }
});

saveButton.addEventListener('click', async () => {
  capture();

  const invalid = salads.find(item => !item.nameEn || !item.nameSv || !item.nameFi);
  if (invalid) {
    show('Enter all three language names');
    box.querySelector(`[data-id="${invalid.localId}"][data-field="${!invalid.nameEn ? 'nameEn' : !invalid.nameSv ? 'nameSv' : 'nameFi'}"]`)?.focus();
    return;
  }

  setBusy(true);
  try {
    for (let index = 0; index < salads.length; index++) {
      const salad = salads[index];
      const payload = {
        nameEn: salad.nameEn,
        nameSv: salad.nameSv,
        nameFi: salad.nameFi,
        isActive: salad.isActive,
        sortOrder: index * 10
      };
      const url = salad.isNew ? API_URL : `${API_URL}/${salad.saladId}`;
      const response = await fetch(url, {
        method: salad.isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });
      const body = await readResponse(response);
      if (!response.ok) throw new Error(body.error || body.details || `HTTP ${response.status}`);
    }

    await loadSalads();
    show('Salad menu saved');
  } catch (error) {
    console.error('Could not save salad menu', error);
    show(`Could not save salad menu: ${error.message}`);
  } finally {
    setBusy(false);
  }
});

async function readResponse(response) {
  const text = await response.text();
  if (!text) return {};
  try { return JSON.parse(text); } catch { return { details: text }; }
}

function setBusy(busy) {
  saveButton.disabled = busy;
  addButton.disabled = busy;
  box.classList.toggle('is-loading', busy);
}

function show(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(timer);
  timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

loadSalads();

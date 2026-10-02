const API_ROOT = 'https://lunchapp-api-dev-bxf8hff5hmb7g5dv.swedencentral-01.azurewebsites.net/api/kiosk';
const PRODUCT_API = `${API_ROOT}/products`;
const LAYOUT_API = `${API_ROOT}/layouts`;
const $ = selector => document.querySelector(selector);

let language = localStorage.getItem('lunch-poc-language-v5') || 'en';
let layouts = [];
let products = [];
let selectedLayout = null;
let originalColumns = { 1: [], 2: [] };
let columns = { 1: [], 2: [] };
let draggedProductId = null;
let dirty = false;
let toastTimer;

const text = {
  en: {
    pageTitle: 'Kiosk layout', subtitle: 'Arrange products in two columns', save: 'Save layout',
    heroTitle: 'Kiosk layout builder', heroText: 'Drag products into position or use the movement buttons for precise changes.',
    layout: 'Layout', clean: 'No unsaved changes', dirty: 'Unsaved changes', reset: 'Reset changes',
    library: 'Product library', available: 'Available products', search: 'Search', searchPlaceholder: 'Search products',
    preview: 'Live preview', previewTitle: 'Kiosk preview', left: 'Left column', right: 'Right column',
    emptyAvailable: 'All active products are in the layout.', emptyColumn: 'Drop products here',
    add: 'Add', top: 'Top', up: 'Up', down: 'Down', bottom: 'Bottom', leftMove: 'Left', rightMove: 'Right', remove: 'Remove',
    loading: 'Loading layout builder...', saved: 'Layout saved', saveFailed: 'Could not save layout', resetConfirm: 'Discard unsaved layout changes?'
  },
  sv: {
    pageTitle: 'Kiosklayout', subtitle: 'Ordna produkter i två kolumner', save: 'Spara layout',
    heroTitle: 'Kiosklayout', heroText: 'Dra produkter till rätt plats eller använd knapparna för exakta ändringar.',
    layout: 'Layout', clean: 'Inga osparade ändringar', dirty: 'Osparade ändringar', reset: 'Återställ ändringar',
    library: 'Produktbibliotek', available: 'Tillgängliga produkter', search: 'Sök', searchPlaceholder: 'Sök produkter',
    preview: 'Förhandsvisning', previewTitle: 'Kioskförhandsvisning', left: 'Vänster kolumn', right: 'Höger kolumn',
    emptyAvailable: 'Alla aktiva produkter finns i layouten.', emptyColumn: 'Släpp produkter här',
    add: 'Lägg till', top: 'Överst', up: 'Upp', down: 'Ner', bottom: 'Nederst', leftMove: 'Vänster', rightMove: 'Höger', remove: 'Ta bort',
    loading: 'Laddar layoutverktyget...', saved: 'Layouten sparades', saveFailed: 'Layouten kunde inte sparas', resetConfirm: 'Kassera osparade layoutändringar?'
  },
  fi: {
    pageTitle: 'Kioskin asettelu', subtitle: 'Järjestä tuotteet kahteen sarakkeeseen', save: 'Tallenna asettelu',
    heroTitle: 'Kioskin asettelutyökalu', heroText: 'Vedä tuotteet paikalleen tai käytä siirtopainikkeita tarkkoihin muutoksiin.',
    layout: 'Asettelu', clean: 'Ei tallentamattomia muutoksia', dirty: 'Tallentamattomia muutoksia', reset: 'Palauta muutokset',
    library: 'Tuotekirjasto', available: 'Saatavilla olevat tuotteet', search: 'Haku', searchPlaceholder: 'Hae tuotteita',
    preview: 'Esikatselu', previewTitle: 'Kioskin esikatselu', left: 'Vasen sarake', right: 'Oikea sarake',
    emptyAvailable: 'Kaikki aktiiviset tuotteet ovat asettelussa.', emptyColumn: 'Pudota tuotteet tähän',
    add: 'Lisää', top: 'Ylimmäksi', up: 'Ylös', down: 'Alas', bottom: 'Alimmaksi', leftMove: 'Vasemmalle', rightMove: 'Oikealle', remove: 'Poista',
    loading: 'Ladataan asettelutyökalua...', saved: 'Asettelu tallennettiin', saveFailed: 'Asettelua ei voitu tallentaa', resetConfirm: 'Hylätäänkö tallentamattomat muutokset?'
  }
};

function t() { return text[language] || text.en; }

async function api(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { Accept: 'application/json', ...(options.body ? { 'Content-Type': 'application/json' } : {}) }
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.details ? JSON.stringify(body.details) : body.error || `HTTP ${response.status}`);
  return body;
}

function escapeHtml(value = '') {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

function productName(product) {
  const preferred = language === 'fi' ? product.nameFi : language === 'en' ? product.nameEn : product.nameSv;
  return preferred || product.nameSv || product.nameEn || product.nameFi || `#${product.productId}`;
}

function money(value) {
  const locale = language === 'fi' ? 'fi-FI' : language === 'sv' ? 'sv-FI' : 'en-FI';
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(Number(value || 0));
}

async function load() {
  showStatus(t().loading, 'loading');
  try {
    [layouts, products] = await Promise.all([
      api(LAYOUT_API),
      api(`${PRODUCT_API}?includeInactive=false`)
    ]);

    layoutSelect.innerHTML = layouts.map(layout =>
      `<option value="${layout.layoutId}">${escapeHtml(layout.layoutName)}${layout.isDefault ? ' ★' : ''}</option>`
    ).join('');

    if (!layouts.length) throw new Error('No kiosk layouts exist.');

    const defaultLayout = layouts.find(layout => layout.isDefault && layout.isActive) || layouts[0];
    layoutSelect.value = String(defaultLayout.layoutId);
    await loadLayout(defaultLayout.layoutId);
    clearStatus();
  } catch (error) {
    showStatus(error.message, 'error');
  }
}

async function loadLayout(layoutId) {
  selectedLayout = await api(`${LAYOUT_API}/${layoutId}`);
  columns = { 1: [], 2: [] };

  selectedLayout.items
    .filter(item => item.isVisible && item.product.active)
    .sort((a, b) => a.columnNo - b.columnNo || a.rowNo - b.rowNo)
    .forEach(item => columns[item.columnNo].push(item.productId));

  originalColumns = cloneColumns(columns);
  setDirty(false);
  render();
}

function cloneColumns(source) {
  return { 1: [...source[1]], 2: [...source[2]] };
}

function layoutProductIds() {
  return new Set([...columns[1], ...columns[2]]);
}

function productById(productId) {
  return products.find(product => product.productId === Number(productId));
}

function render() {
  renderAvailable();
  renderColumn(1);
  renderColumn(2);
  updateCounts();
}

function renderAvailable() {
  const assigned = layoutProductIds();
  const query = searchInput.value.trim().toLowerCase();
  const available = products.filter(product => {
    if (!product.active || assigned.has(product.productId)) return false;
    const searchable = [product.nameEn, product.nameSv, product.nameFi].filter(Boolean).join(' ').toLowerCase();
    return !query || searchable.includes(query);
  });

  availableProducts.innerHTML = available.length
    ? available.map(product => productCard(product, true)).join('')
    : `<div class="layout-empty">${t().emptyAvailable}</div>`;
}

function renderColumn(columnNo) {
  const target = columnNo === 1 ? column1 : column2;
  const ids = columns[columnNo];
  target.innerHTML = ids.length
    ? ids.map((productId, index) => positionedCard(productById(productId), columnNo, index)).join('')
    : `<div class="layout-empty drop-placeholder">${t().emptyColumn}</div>`;
}

function productVisual(product) {
  if (product.imageUrl) {
    return `<img src="${escapeHtml(product.imageUrl)}" alt="" draggable="false" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span hidden>${escapeHtml(product.icon || '📦')}</span>`;
  }
  return `<span>${escapeHtml(product.icon || '📦')}</span>`;
}

function productCard(product, available) {
  return `<article class="layout-product ${available ? 'available-product' : ''}" draggable="true" data-product-id="${product.productId}">
    <div class="layout-product-visual">${productVisual(product)}</div>
    <div class="layout-product-copy"><strong>${escapeHtml(productName(product))}</strong><span>${money(product.price)}</span></div>
    ${available ? `<button class="secondary compact-button" type="button" data-action="add" data-id="${product.productId}">${t().add}</button>` : ''}
  </article>`;
}

function positionedCard(product, columnNo, index) {
  const last = columns[columnNo].length - 1;
  return `<article class="layout-product positioned-product" draggable="true" data-product-id="${product.productId}" data-column="${columnNo}" data-index="${index}">
    <button class="drag-handle" type="button" title="Drag" aria-label="Drag">☰</button>
    <div class="layout-product-visual">${productVisual(product)}</div>
    <div class="layout-product-copy"><strong>${escapeHtml(productName(product))}</strong><span>${money(product.price)}</span></div>
    <div class="position-actions">
      <button type="button" title="${t().top}" aria-label="${t().top}" data-action="top" data-id="${product.productId}">⇈</button>
      <button type="button" title="${t().up}" aria-label="${t().up}" data-action="up" data-id="${product.productId}" ${index === 0 ? 'disabled' : ''}>↑</button>
      <button type="button" title="${t().down}" aria-label="${t().down}" data-action="down" data-id="${product.productId}" ${index === last ? 'disabled' : ''}>↓</button>
      <button type="button" title="${t().bottom}" aria-label="${t().bottom}" data-action="bottom" data-id="${product.productId}">⇊</button>
      <button type="button" title="${columnNo === 1 ? t().rightMove : t().leftMove}" aria-label="${columnNo === 1 ? t().rightMove : t().leftMove}" data-action="other-column" data-id="${product.productId}">${columnNo === 1 ? '→' : '←'}</button>
      <button class="remove-position" type="button" title="${t().remove}" aria-label="${t().remove}" data-action="remove" data-id="${product.productId}">×</button>
    </div>
  </article>`;
}

function updateCounts() {
  availableCount.textContent = String(products.filter(product => product.active && !layoutProductIds().has(product.productId)).length);
  leftCount.textContent = String(columns[1].length);
  rightCount.textContent = String(columns[2].length);
}

function addProduct(productId, preferredColumn) {
  if (layoutProductIds().has(productId)) return;
  const target = preferredColumn || (columns[1].length <= columns[2].length ? 1 : 2);
  columns[target].push(productId);
  changed();
}

function findPosition(productId) {
  for (const columnNo of [1, 2]) {
    const index = columns[columnNo].indexOf(productId);
    if (index >= 0) return { columnNo, index };
  }
  return null;
}

function moveProduct(productId, action) {
  const position = findPosition(productId);
  if (!position) return;
  const current = columns[position.columnNo];

  if (action === 'remove') current.splice(position.index, 1);
  if (action === 'top') current.unshift(...current.splice(position.index, 1));
  if (action === 'bottom') current.push(...current.splice(position.index, 1));
  if (action === 'up' && position.index > 0) [current[position.index - 1], current[position.index]] = [current[position.index], current[position.index - 1]];
  if (action === 'down' && position.index < current.length - 1) [current[position.index + 1], current[position.index]] = [current[position.index], current[position.index + 1]];
  if (action === 'other-column') {
    current.splice(position.index, 1);
    const other = position.columnNo === 1 ? 2 : 1;
    columns[other].push(productId);
  }
  changed();
}

function insertDropped(productId, columnNo, targetIndex) {
  const current = findPosition(productId);
  if (current) {
    columns[current.columnNo].splice(current.index, 1);
    if (current.columnNo === columnNo && current.index < targetIndex) targetIndex -= 1;
  }

  targetIndex = Math.max(0, Math.min(targetIndex, columns[columnNo].length));
  columns[columnNo].splice(targetIndex, 0, productId);
  changed();
}

function changed() {
  setDirty(true);
  render();
}

function setDirty(value) {
  dirty = value;
  saveButton.disabled = !dirty;
  resetButton.disabled = !dirty;
  layoutStateText.textContent = dirty ? t().dirty : t().clean;
  layoutStateText.classList.toggle('unsaved', dirty);
}

async function saveLayout() {
  if (!dirty || !selectedLayout) return;
  const items = [];
  for (const columnNo of [1, 2]) {
    columns[columnNo].forEach((productId, index) => items.push({
      productId,
      columnNo,
      rowNo: index + 1,
      isVisible: true
    }));
  }

  saveButton.disabled = true;
  try {
    selectedLayout = await api(`${LAYOUT_API}/${selectedLayout.layoutId}`, {
      method: 'PUT',
      body: JSON.stringify({ items })
    });
    originalColumns = cloneColumns(columns);
    setDirty(false);
    toast(t().saved);
  } catch (error) {
    setDirty(true);
    toast(`${t().saveFailed}: ${error.message}`);
  }
}

function resetChanges() {
  if (!dirty) return;
  if (!confirm(t().resetConfirm)) return;
  columns = cloneColumns(originalColumns);
  setDirty(false);
  render();
}

function applyTranslations() {
  const x = t();
  document.documentElement.lang = language;
  pageTitle.textContent = x.pageTitle;
  pageSubtitle.textContent = x.subtitle;
  saveButton.textContent = x.save;
  heroTitle.textContent = x.heroTitle;
  heroText.textContent = x.heroText;
  layoutLabel.textContent = x.layout;
  resetButton.textContent = x.reset;
  libraryEyebrow.textContent = x.library;
  availableTitle.textContent = x.available;
  searchLabel.textContent = x.search;
  searchInput.placeholder = x.searchPlaceholder;
  previewEyebrow.textContent = x.preview;
  previewTitle.textContent = x.previewTitle;
  leftColumnLabel.textContent = x.left;
  rightColumnLabel.textContent = x.right;
  setDirty(dirty);
  render();
}

function showStatus(message, type) {
  statusElement.textContent = message;
  statusElement.className = `status show ${type}`;
}
function clearStatus() { statusElement.textContent = ''; statusElement.className = 'status'; }
function toast(message) {
  toastElement.textContent = message;
  toastElement.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastElement.classList.remove('show'), 3000);
}

const statusElement = $('#status');
const toastElement = $('#toast');
languageSelect.value = language;
applyTranslations();

languageSelect.addEventListener('change', () => {
  language = languageSelect.value;
  localStorage.setItem('lunch-poc-language-v5', language);
  applyTranslations();
});
layoutSelect.addEventListener('change', async () => {
  if (dirty && !confirm(t().resetConfirm)) {
    layoutSelect.value = String(selectedLayout.layoutId);
    return;
  }
  showStatus(t().loading, 'loading');
  try { await loadLayout(Number(layoutSelect.value)); clearStatus(); }
  catch (error) { showStatus(error.message, 'error'); }
});
searchInput.addEventListener('input', renderAvailable);
saveButton.addEventListener('click', saveLayout);
resetButton.addEventListener('click', resetChanges);

document.addEventListener('click', event => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const productId = Number(button.dataset.id);
  if (button.dataset.action === 'add') addProduct(productId);
  else moveProduct(productId, button.dataset.action);
});

document.addEventListener('dragstart', event => {
  const card = event.target.closest('[data-product-id]');
  if (!card) return;
  draggedProductId = Number(card.dataset.productId);
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('text/plain', String(draggedProductId));
  card.classList.add('dragging');
});
document.addEventListener('dragend', event => {
  event.target.closest('[data-product-id]')?.classList.remove('dragging');
  document.querySelectorAll('.drag-over').forEach(node => node.classList.remove('drag-over'));
  draggedProductId = null;
});

document.querySelectorAll('.layout-dropzone').forEach(zone => {
  zone.addEventListener('dragover', event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    zone.classList.add('drag-over');
  });
  zone.addEventListener('dragleave', event => {
    if (!zone.contains(event.relatedTarget)) zone.classList.remove('drag-over');
  });
  zone.addEventListener('drop', event => {
    event.preventDefault();
    zone.classList.remove('drag-over');
    const productId = Number(event.dataTransfer.getData('text/plain') || draggedProductId);
    const columnNo = Number(zone.dataset.column);
    const targetCard = event.target.closest('.positioned-product');
    const targetIndex = targetCard ? Number(targetCard.dataset.index) : columns[columnNo].length;
    if (productId) insertDropped(productId, columnNo, targetIndex);
  });
});

availableProducts.addEventListener('dragover', event => {
  event.preventDefault();
  availableProducts.classList.add('drag-over');
});
availableProducts.addEventListener('dragleave', event => {
  if (!availableProducts.contains(event.relatedTarget)) availableProducts.classList.remove('drag-over');
});
availableProducts.addEventListener('drop', event => {
  event.preventDefault();
  availableProducts.classList.remove('drag-over');
  const productId = Number(event.dataTransfer.getData('text/plain') || draggedProductId);
  if (findPosition(productId)) moveProduct(productId, 'remove');
});

window.addEventListener('beforeunload', event => {
  if (!dirty) return;
  event.preventDefault();
  event.returnValue = '';
});

load();

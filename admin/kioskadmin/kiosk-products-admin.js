const PRODUCT_API = 'https://lunchapp-api-dev-bxf8hff5hmb7g5dv.swedencentral-01.azurewebsites.net/api/kiosk/products';
const $ = selector => document.querySelector(selector);

let products = [];
let language = localStorage.getItem('lunch-poc-language-v5') || 'en';
let toastTimer;

const translations = {
  en: {
    pageTitle: 'Product library', pageSubtitle: 'Products, prices and translations', newProduct: 'New product',
    heroTitle: 'Product library', heroText: 'Create products and maintain prices, translations, icons and images.',
    search: 'Search', searchPlaceholder: 'Search products', showInactive: 'Show inactive',
    dialogNew: 'New product', dialogEdit: 'Edit product', nameEn: 'English name', nameSv: 'Swedish name',
    nameFi: 'Finnish name', price: 'Price (€)', icon: 'Icon', imageUrl: 'Image URL', preview: 'Preview',
    active: 'Active', cancel: 'Cancel', save: 'Save', edit: 'Edit', deactivate: 'Deactivate',
    inactive: 'Inactive', noProducts: 'No products found.', loading: 'Loading products...',
    saved: 'Product saved', deactivated: 'Product deactivated', confirmDeactivate: 'Deactivate this product?',
    fallbackName: 'Unnamed product', noTranslation: 'Translation missing', imageFallback: 'No image'
  },
  sv: {
    pageTitle: 'Produktbibliotek', pageSubtitle: 'Produkter, priser och översättningar', newProduct: 'Ny produkt',
    heroTitle: 'Produktbibliotek', heroText: 'Skapa produkter och hantera priser, översättningar, ikoner och bilder.',
    search: 'Sök', searchPlaceholder: 'Sök produkter', showInactive: 'Visa inaktiva',
    dialogNew: 'Ny produkt', dialogEdit: 'Redigera produkt', nameEn: 'Engelskt namn', nameSv: 'Svenskt namn',
    nameFi: 'Finskt namn', price: 'Pris (€)', icon: 'Ikon', imageUrl: 'Bildadress', preview: 'Förhandsvisning',
    active: 'Aktiv', cancel: 'Avbryt', save: 'Spara', edit: 'Redigera', deactivate: 'Inaktivera',
    inactive: 'Inaktiv', noProducts: 'Inga produkter hittades.', loading: 'Laddar produkter...',
    saved: 'Produkten sparades', deactivated: 'Produkten inaktiverades', confirmDeactivate: 'Inaktivera produkten?',
    fallbackName: 'Namnlös produkt', noTranslation: 'Översättning saknas', imageFallback: 'Ingen bild'
  },
  fi: {
    pageTitle: 'Tuotekirjasto', pageSubtitle: 'Tuotteet, hinnat ja käännökset', newProduct: 'Uusi tuote',
    heroTitle: 'Tuotekirjasto', heroText: 'Luo tuotteita ja hallinnoi hintoja, käännöksiä, kuvakkeita ja kuvia.',
    search: 'Haku', searchPlaceholder: 'Hae tuotteita', showInactive: 'Näytä passiiviset',
    dialogNew: 'Uusi tuote', dialogEdit: 'Muokkaa tuotetta', nameEn: 'Englanninkielinen nimi', nameSv: 'Ruotsinkielinen nimi',
    nameFi: 'Suomenkielinen nimi', price: 'Hinta (€)', icon: 'Kuvake', imageUrl: 'Kuvan osoite', preview: 'Esikatselu',
    active: 'Aktiivinen', cancel: 'Peruuta', save: 'Tallenna', edit: 'Muokkaa', deactivate: 'Poista käytöstä',
    inactive: 'Passiivinen', noProducts: 'Tuotteita ei löytynyt.', loading: 'Ladataan tuotteita...',
    saved: 'Tuote tallennettiin', deactivated: 'Tuote poistettiin käytöstä', confirmDeactivate: 'Poistetaanko tuote käytöstä?',
    fallbackName: 'Nimetön tuote', noTranslation: 'Käännös puuttuu', imageFallback: 'Ei kuvaa'
  }
};

function t() {
  return translations[language] || translations.en;
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function localizedName(product) {
  const preferred = language === 'sv' ? product.nameSv : language === 'fi' ? product.nameFi : product.nameEn;
  return preferred || product.nameEn || product.nameSv || product.nameFi || t().fallbackName;
}

function formatPrice(value) {
  const locale = language === 'sv' ? 'sv-FI' : language === 'fi' ? 'fi-FI' : 'en-FI';
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(Number(value || 0));
}

async function api(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {})
    }
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.details || body.error || `HTTP ${response.status}`);
  return body;
}

function applyTranslations() {
  const x = t();
  document.documentElement.lang = language;
  pageTitle.textContent = x.pageTitle;
  pageSubtitle.textContent = x.pageSubtitle;
  newProductButton.textContent = x.newProduct;
  heroTitle.textContent = x.heroTitle;
  heroText.textContent = x.heroText;
  searchLabel.textContent = x.search;
  searchInput.placeholder = x.searchPlaceholder;
  showInactiveLabel.textContent = x.showInactive;
  nameEnLabel.textContent = x.nameEn;
  nameSvLabel.textContent = x.nameSv;
  nameFiLabel.textContent = x.nameFi;
  priceLabel.textContent = x.price;
  iconLabel.textContent = x.icon;
  imageUrlLabel.textContent = x.imageUrl;
  previewLabel.textContent = x.preview;
  activeLabel.textContent = x.active;
  cancelButton.textContent = x.cancel;
  saveButton.textContent = x.save;
}

function render() {
  const x = t();
  const query = searchInput.value.trim().toLowerCase();
  const filtered = products.filter(product => {
    const text = [product.nameEn, product.nameSv, product.nameFi, product.icon, product.price]
      .filter(value => value !== null && value !== undefined)
      .join(' ')
      .toLowerCase();
    return !query || text.includes(query);
  });

  productList.innerHTML = filtered.length
    ? filtered.map(productCard).join('')
    : `<div class="empty">${x.noProducts}</div>`;
}

function productCard(product) {
  const x = t();
  const name = localizedName(product);
  const image = product.imageUrl
    ? `<img src="${escapeHtml(product.imageUrl)}" alt="" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="product-icon-fallback" hidden>${escapeHtml(product.icon || '📦')}</span>`
    : `<span class="product-icon-fallback">${escapeHtml(product.icon || '📦')}</span>`;

  const translationsMissing = !product.nameSv || !product.nameFi;

  return `<article class="product-library-card ${product.active ? '' : 'inactive'}">
    <div class="product-visual">${image}</div>
    <div class="product-details">
      <div class="product-card-title-row">
        <div>
          <h2>${escapeHtml(name)}</h2>
          <p>${escapeHtml(product.nameEn || '')}</p>
        </div>
        <strong class="product-price">${formatPrice(product.price)}</strong>
      </div>
      <div class="badges">
        ${product.active ? '' : `<span class="badge inactive">${x.inactive}</span>`}
        ${translationsMissing ? `<span class="badge warning">${x.noTranslation}</span>` : ''}
      </div>
      <div class="product-translations">
        <span><b>EN</b> ${escapeHtml(product.nameEn || '—')}</span>
        <span><b>SV</b> ${escapeHtml(product.nameSv || '—')}</span>
        <span><b>FI</b> ${escapeHtml(product.nameFi || '—')}</span>
      </div>
    </div>
    <div class="product-card-actions">
      <button class="secondary" type="button" data-action="edit" data-id="${product.productId}">${x.edit}</button>
      ${product.active ? `<button class="danger" type="button" data-action="deactivate" data-id="${product.productId}">${x.deactivate}</button>` : ''}
    </div>
  </article>`;
}

async function loadProducts() {
  showStatus(t().loading, 'loading');
  try {
    products = await api(`${PRODUCT_API}?includeInactive=${showInactive.checked}`);
    clearStatus();
    render();
  } catch (error) {
    showStatus(error.message, 'error');
  }
}

function openNewProduct() {
  fillForm();
  productDialogTitle.textContent = t().dialogNew;
  productDialog.showModal();
  nameEn.focus();
}

function openEditProduct(product) {
  fillForm(product);
  productDialogTitle.textContent = t().dialogEdit;
  productDialog.showModal();
  nameEn.focus();
}

function fillForm(product = {}) {
  productId.value = product.productId || '';
  nameEn.value = product.nameEn || '';
  nameSv.value = product.nameSv || '';
  nameFi.value = product.nameFi || '';
  price.value = product.price === undefined || product.price === null ? '' : Number(product.price).toFixed(2);
  icon.value = product.icon || '';
  imageUrl.value = product.imageUrl || '';
  productActive.checked = product.active !== false;
  updatePreview();
}

function payload() {
  return {
    nameEn: nameEn.value.trim(),
    nameSv: nameSv.value.trim() || null,
    nameFi: nameFi.value.trim() || null,
    price: Number(price.value),
    icon: icon.value.trim() || null,
    imageUrl: imageUrl.value.trim() || null,
    active: productActive.checked
  };
}

function updatePreview() {
  const previewName = language === 'sv'
    ? nameSv.value.trim() || nameEn.value.trim()
    : language === 'fi'
      ? nameFi.value.trim() || nameEn.value.trim()
      : nameEn.value.trim();
  const image = imageUrl.value.trim();
  const fallbackIcon = icon.value.trim() || '📦';

  productPreview.innerHTML = `
    <div class="product-preview-visual">
      ${image ? `<img src="${escapeHtml(image)}" alt="" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span hidden>${escapeHtml(fallbackIcon)}</span>` : `<span>${escapeHtml(fallbackIcon)}</span>`}
    </div>
    <div>
      <strong>${escapeHtml(previewName || t().fallbackName)}</strong>
      <span>${formatPrice(price.value || 0)}</span>
    </div>`;
}

async function saveProduct(event) {
  event.preventDefault();
  const id = productId.value;
  try {
    await api(id ? `${PRODUCT_API}/${id}` : PRODUCT_API, {
      method: id ? 'PUT' : 'POST',
      body: JSON.stringify(payload())
    });
    productDialog.close();
    toast(t().saved);
    await loadProducts();
  } catch (error) {
    toast(error.message);
  }
}

async function deactivateProduct(id) {
  if (!confirm(t().confirmDeactivate)) return;
  try {
    await api(`${PRODUCT_API}/${id}`, { method: 'DELETE' });
    toast(t().deactivated);
    await loadProducts();
  } catch (error) {
    toast(error.message);
  }
}

function showStatus(message, type) {
  statusElement.textContent = message;
  statusElement.className = `status show ${type}`;
}

function clearStatus() {
  statusElement.textContent = '';
  statusElement.className = 'status';
}

function toast(message) {
  toastElement.textContent = message;
  toastElement.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastElement.classList.remove('show'), 2800);
}

const statusElement = $('#status');
const toastElement = $('#toast');

languageSelect.value = language;
applyTranslations();

languageSelect.addEventListener('change', () => {
  language = languageSelect.value;
  localStorage.setItem('lunch-poc-language-v5', language);
  applyTranslations();
  render();
  updatePreview();
});

newProductButton.addEventListener('click', openNewProduct);
searchInput.addEventListener('input', render);
showInactive.addEventListener('change', loadProducts);
productForm.addEventListener('submit', saveProduct);

[nameEn, nameSv, nameFi, price, icon, imageUrl].forEach(control => {
  control.addEventListener('input', updatePreview);
});

document.addEventListener('click', event => {
  const closeButton = event.target.closest('[data-close]');
  if (closeButton) {
    document.getElementById(closeButton.dataset.close).close();
    return;
  }

  const actionButton = event.target.closest('[data-action]');
  if (!actionButton) return;

  const product = products.find(item => item.productId === Number(actionButton.dataset.id));
  if (!product) return;

  if (actionButton.dataset.action === 'edit') openEditProduct(product);
  if (actionButton.dataset.action === 'deactivate') deactivateProduct(product.productId);
});

loadProducts();

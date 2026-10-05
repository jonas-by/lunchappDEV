const CARD_API = 'https://lunchapp-api-dev-bxf8hff5hmb7g5dv.swedencentral-01.azurewebsites.net/api/kiosk/cards';
const ACCOUNT_API = 'https://lunchapp-api-dev-bxf8hff5hmb7g5dv.swedencentral-01.azurewebsites.net/api/kiosk/external-accounts';
const $ = selector => document.querySelector(selector);
let cards = [];
let accounts = [];
let language = localStorage.getItem('lunch-poc-language-v5') || 'en';
let toastTimer;

const translations = {
  en: {
    title: 'External cards', subtitle: 'Cards linked to external accounts', newCard: 'New card',
    search: 'Search by card holder, card number or company', inactive: 'Show inactive', edit: 'Edit',
    deactivate: 'Deactivate', balance: 'Balance', outstanding: 'Outstanding', available: 'Available', validity: 'Validity', none: 'No external cards found', saved: 'Card saved',
    disabled: 'Card deactivated', confirm: 'Deactivate this card?', loading: 'Loading cards...',
    noAccounts: 'Create an active external account before adding a card.', card: 'Card number',
    holder: 'Card holder name', account: 'External account', from: 'Valid from', until: 'Valid until',
    active: 'Active', cancel: 'Cancel', save: 'Save', dialog: 'External card', inactiveBadge: 'Inactive'
  },
  sv: {
    title: 'Externa kort', subtitle: 'Kort kopplade till externa konton', newCard: 'Nytt kort',
    search: 'Sök på kortinnehavare, kortnummer eller företag', inactive: 'Visa inaktiva', edit: 'Redigera',
    deactivate: 'Inaktivera', balance: 'Saldo', outstanding: 'Utestående', available: 'Tillgängligt', validity: 'Giltighet', none: 'Inga externa kort hittades', saved: 'Kortet sparades',
    disabled: 'Kortet inaktiverades', confirm: 'Inaktivera kortet?', loading: 'Laddar kort...',
    noAccounts: 'Skapa ett aktivt externt konto innan ett kort läggs till.', card: 'Kortnummer',
    holder: 'Kortinnehavarens namn', account: 'Externt konto', from: 'Giltigt från', until: 'Giltigt till',
    active: 'Aktivt', cancel: 'Avbryt', save: 'Spara', dialog: 'Externt kort', inactiveBadge: 'Inaktivt'
  },
  fi: {
    title: 'Ulkoiset kortit', subtitle: 'Ulkoisiin tileihin liitetyt kortit', newCard: 'Uusi kortti',
    search: 'Hae kortinhaltijalla, korttinumerolla tai yrityksellä', inactive: 'Näytä passiiviset', edit: 'Muokkaa',
    deactivate: 'Poista käytöstä', balance: 'Saldo', outstanding: 'Avoinna', available: 'Käytettävissä', validity: 'Voimassaolo', none: 'Ulkoisia kortteja ei löytynyt', saved: 'Kortti tallennettiin',
    disabled: 'Kortti poistettiin käytöstä', confirm: 'Poistetaanko kortti käytöstä?', loading: 'Ladataan kortteja...',
    noAccounts: 'Luo aktiivinen ulkoinen tili ennen kortin lisäämistä.', card: 'Kortin numero',
    holder: 'Kortinhaltijan nimi', account: 'Ulkoinen tili', from: 'Voimassa alkaen', until: 'Voimassa asti',
    active: 'Aktiivinen', cancel: 'Peruuta', save: 'Tallenna', dialog: 'Ulkoinen kortti', inactiveBadge: 'Passiivinen'
  }
};

function t() { return translations[language] || translations.en; }
function esc(value = '') {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}
async function api(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { Accept: 'application/json', ...(options.body ? { 'Content-Type': 'application/json' } : {}) }
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.details || body.error || `HTTP ${response.status}`);
  return body;
}
function applyText() {
  const x = t();
  document.documentElement.lang = language;
  pageTitle.textContent = x.title;
  pageSubtitle.textContent = x.subtitle;
  newCard.textContent = x.newCard;
  searchInput.placeholder = x.search;
  inactiveLabel.textContent = x.inactive;
  cardDialogTitle.textContent = x.dialog;
  cardNumberLabel.textContent = x.card;
  cardHolderNameLabel.textContent = x.holder;
  externalAccountLabel.textContent = x.account;
  validFromLabel.textContent = x.from;
  validUntilLabel.textContent = x.until;
  activeLabel.textContent = x.active;
  cancelButton.textContent = x.cancel;
  saveButton.textContent = x.save;
}
function euro(cents) { return new Intl.NumberFormat(language === 'sv' ? 'sv-FI' : language === 'fi' ? 'fi-FI' : 'en-FI', { style: 'currency', currency: 'EUR' }).format(Number(cents || 0) / 100); }
function validity(card) {
  const from = card.validFrom ? new Date(card.validFrom).toLocaleString() : '∞';
  const until = card.validUntil ? new Date(card.validUntil).toLocaleString() : '∞';
  return `${from} – ${until}`;
}
function render() {
  const x = t();
  const query = searchInput.value.trim().toLowerCase();
  const rows = cards.filter(card => {
    const text = `${card.cardNumber || ''} ${card.cardHolderName || ''} ${card.displayName || ''} ${card.companyName || ''}`.toLowerCase();
    return (!card.ownerType || card.ownerType.toLowerCase() === 'external') && (!query || text.includes(query));
  });
  cardList.innerHTML = rows.length ? rows.map(card => {
    const holder = card.cardHolderName || card.displayName || 'Unnamed card holder';
    const accountName = card.displayName || '';
    const company = card.companyName || '';
    const accountLine = [accountName, company].filter(Boolean).join(' · ');
    return `<article class="admin-card ${card.isActive ? '' : 'inactive'}">
      <div class="card-head">
        <div>
          <h2>${esc(card.cardNumber)} · ${esc(holder)}</h2>
          <p>${esc(accountLine)}</p>
          <div class="badges">
            ${card.accountMode ? `<span class="badge ${esc(card.accountMode.toLowerCase())}">${esc(card.accountMode)}</span>` : ''}
            ${card.isActive ? '' : `<span class="badge inactive">${x.inactiveBadge}</span>`}
          </div>
        </div>
        <div class="card-actions">
          <button class="secondary" data-action="edit" data-id="${card.cardId}">${x.edit}</button>
          ${card.isActive ? `<button class="danger" data-action="deactivate" data-id="${card.cardId}">${x.deactivate}</button>` : ''}
        </div>
      </div>
      <div class="metrics">
        <div class="metric"><span>${x.balance}</span><strong class="${Number(card.balanceCents) < 0 ? 'negative' : Number(card.balanceCents) > 0 ? 'positive' : ''}">${euro(card.balanceCents)}</strong></div>
        <div class="metric"><span>${card.accountMode === 'Prepaid' ? x.available : x.outstanding}</span><strong class="${Number(card.outstandingCents) > 0 ? 'negative' : Number(card.availablePrepaidCents) > 0 ? 'positive' : ''}">${euro(card.accountMode === 'Prepaid' ? card.availablePrepaidCents : card.outstandingCents)}</strong></div>
        <div class="metric"><span>${x.validity}</span><strong style="font-size:12px">${esc(validity(card))}</strong></div>
      </div>
    </article>`;
  }).join('') : `<div class="empty">${x.none}</div>`;
}
async function load() {
  statusBox(t().loading, 'loading');
  try {
    [cards, accounts] = await Promise.all([
      api(`${CARD_API}?includeInactive=${showInactive.checked}`),
      api(ACCOUNT_API)
    ]);
    accounts = accounts.filter(account => account.isActive !== false);
    externalAccountId.innerHTML = accounts.map(account =>
      `<option value="${account.externalAccountId}">${esc(account.displayName)}${account.companyName ? ` · ${esc(account.companyName)}` : ''}</option>`
    ).join('');
    newCard.disabled = !accounts.length;
    clearStatus();
    render();
  } catch (error) {
    statusBox(error.message, 'error');
  }
}
function localDate(value) {
  if (!value) return '';
  const date = new Date(value);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}
function fill(card = {}) {
  cardId.value = card.cardId || '';
  cardNumber.value = card.cardNumber || '';
  cardHolderName.value = card.cardHolderName || '';
  externalAccountId.value = card.externalAccountId || accounts[0]?.externalAccountId || '';
  validFrom.value = localDate(card.validFrom);
  validUntil.value = localDate(card.validUntil);
  cardActive.checked = card.isActive !== false;
}
function payload() {
  return {
    cardNumber: cardNumber.value.trim(),
    cardHolderName: cardHolderName.value.trim(),
    externalAccountId: Number(externalAccountId.value),
    validFrom: validFrom.value ? new Date(validFrom.value).toISOString() : null,
    validUntil: validUntil.value ? new Date(validUntil.value).toISOString() : null,
    isActive: cardActive.checked
  };
}
function statusBox(message, type) {
  status.textContent = message;
  status.className = `status show ${type}`;
}
function clearStatus() {
  status.className = 'status';
  status.textContent = '';
}
function toast(message) {
  toastElement.textContent = message;
  toastElement.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastElement.classList.remove('show'), 2800);
}

const status = $('#status');
const toastElement = $('#toast');
languageSelect.value = language;
applyText();
languageSelect.addEventListener('change', () => {
  language = languageSelect.value;
  localStorage.setItem('lunch-poc-language-v5', language);
  applyText();
  render();
});
searchInput.addEventListener('input', render);
showInactive.addEventListener('change', load);
newCard.addEventListener('click', () => {
  if (!accounts.length) return toast(t().noAccounts);
  fill();
  cardDialog.showModal();
});
document.addEventListener('click', async event => {
  const close = event.target.closest('[data-close]');
  if (close) {
    document.getElementById(close.dataset.close).close();
    return;
  }
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const id = Number(button.dataset.id);
  const card = cards.find(item => item.cardId === id);
  if (button.dataset.action === 'edit') {
    fill(card);
    cardDialog.showModal();
  }
  if (button.dataset.action === 'deactivate' && confirm(t().confirm)) {
    try {
      await api(`${CARD_API}/${id}`, { method: 'DELETE' });
      toast(t().disabled);
      load();
    } catch (error) {
      toast(error.message);
    }
  }
});
cardForm.addEventListener('submit', async event => {
  event.preventDefault();
  const id = cardId.value;
  try {
    await api(id ? `${CARD_API}/${id}` : CARD_API, {
      method: id ? 'PUT' : 'POST',
      body: JSON.stringify(payload())
    });
    cardDialog.close();
    toast(t().saved);
    load();
  } catch (error) {
    toast(error.message);
  }
});
load();

// Extended page translations. Kept after the main application code so the core load path remains untouched.
const extendedCardText={
  en:{heroTitle:'External cards',heroText:'Assign cards to external account holders and manage card validity.',search:'Search'},
  sv:{heroTitle:'Externa kort',heroText:'Tilldela kort till externa kortinnehavare och hantera kortens giltighet.',search:'Sök'},
  fi:{heroTitle:'Ulkoiset kortit',heroText:'Määritä kortit ulkoisille kortinhaltijoille ja hallinnoi korttien voimassaoloa.',search:'Haku'}
};
function applyExtendedCardText(){
  const x=extendedCardText[language]||extendedCardText.en;
  const hero=document.querySelector('.kiosk-admin-welcome');
  if(hero){hero.querySelector('h2').textContent=x.heroTitle;hero.querySelector('p').textContent=x.heroText;}
  const label=document.querySelector('.kiosk-admin-toolbar .setting-field > span');if(label)label.textContent=x.search;
}
applyExtendedCardText();
languageSelect.addEventListener('change',applyExtendedCardText);

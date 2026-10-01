const API_URL = 'https://lunchapp-api-dev-bxf8hff5hmb7g5dv.swedencentral-01.azurewebsites.net/api/kitchen/weekly-summary';
const weekPicker = document.querySelector('#weekPicker');
const statusBox = document.querySelector('#statisticsStatus');

const TRANSLATIONS = {
  sv: {
    'Kitchen':'Kök','Weekly lunch summary':'Veckosammanfattning för lunch','Print':'Skriv ut','Statistics':'Statistik','Weekly summary':'Veckosammanfattning','Lunch orders, served portions and kitchen cancellations.':'Lunchbeställningar, serverade portioner och avbokningar i köket.','Week':'Vecka','Ordered':'Beställda','Served':'Serverade','Cancelled':'Avbokade','Peak day':'Toppdag','Portions originally ordered':'Ursprungligen beställda portioner','Ordered minus cancellations':'Beställda minus avbokningar','No orders':'Inga beställningar','Served lunches by day':'Serverade luncher per dag','Monday to Friday. Weekend data remains available if production expands.':'Måndag till fredag. Helgdata finns kvar om produktionen utökas.','Daily breakdown':'Daglig sammanställning','Ordered, served and cancelled portions for each weekday.':'Beställda, serverade och avbokade portioner per vardag.','Day':'Dag','Cancellation reasons':'Orsaker till avbokning','Cancelled portions grouped by reason.':'Avbokade portioner grupperade enligt orsak.','Cancellation details':'Avbokningsdetaljer','Individual cancellations recorded during the selected week.':'Enskilda avbokningar registrerade under den valda veckan.','Date':'Datum','Employee / host':'Anställd / värd','Type':'Typ','Qty':'Antal','Reason':'Orsak','Comment':'Kommentar','Employee':'Anställd','Guest':'Gäst','Other':'Övrigt','Employee Absent':'Anställd frånvarande','Insufficient Portions':'Otillräckligt antal portioner','Wrong Order':'Felaktig beställning','Sick Leave':'Sjukfrånvaro','Left Site':'Lämnat området','No cancellations':'Inga avbokningar','No lunch orders':'Inga lunchbeställningar','of orders':'av beställningarna','served portions':'serverade portioner','Loading weekly summary...':'Laddar veckosammanfattning...','Could not load weekly summary':'Kunde inte läsa in veckosammanfattningen','Showing ISO week':'Visar ISO-vecka','The dashboard displays Monday to Friday while the API retains all seven days.':'Panelen visar måndag till fredag medan API:et behåller veckans alla sju dagar.'
  },
  fi: {
    'Kitchen':'Keittiö','Weekly lunch summary':'Lounaiden viikkoyhteenveto','Print':'Tulosta','Statistics':'Tilastot','Weekly summary':'Viikkoyhteenveto','Lunch orders, served portions and kitchen cancellations.':'Lounastilaukset, tarjoillut annokset ja keittiön peruutukset.','Week':'Viikko','Ordered':'Tilatut','Served':'Tarjoillut','Cancelled':'Peruutetut','Peak day':'Huippupäivä','Portions originally ordered':'Alun perin tilatut annokset','Ordered minus cancellations':'Tilatut vähennettynä peruutuksilla','No orders':'Ei tilauksia','Served lunches by day':'Tarjoillut lounaat päivittäin','Monday to Friday. Weekend data remains available if production expands.':'Maanantaista perjantaihin. Viikonlopun tiedot säilyvät, jos tuotanto laajenee.','Daily breakdown':'Päivittäinen yhteenveto','Ordered, served and cancelled portions for each weekday.':'Tilatut, tarjoillut ja peruutetut annokset arkipäivittäin.','Day':'Päivä','Cancellation reasons':'Peruutusten syyt','Cancelled portions grouped by reason.':'Peruutetut annokset ryhmiteltynä syyn mukaan.','Cancellation details':'Peruutusten tiedot','Individual cancellations recorded during the selected week.':'Valitun viikon yksittäiset peruutukset.','Date':'Päivämäärä','Employee / host':'Työntekijä / isäntä','Type':'Tyyppi','Qty':'Määrä','Reason':'Syy','Comment':'Kommentti','Employee':'Työntekijä','Guest':'Vieras','Other':'Muu','Employee Absent':'Työntekijä poissa','Insufficient Portions':'Riittämätön määrä annoksia','Wrong Order':'Virheellinen tilaus','Sick Leave':'Sairauspoissaolo','Left Site':'Poistunut alueelta','No cancellations':'Ei peruutuksia','No lunch orders':'Ei lounastilauksia','of orders':'tilauksista','served portions':'tarjoiltua annosta','Loading weekly summary...':'Ladataan viikkoyhteenvetoa...','Could not load weekly summary':'Viikkoyhteenvedon lataaminen epäonnistui','Showing ISO week':'Näytetään ISO-viikko','The dashboard displays Monday to Friday while the API retains all seven days.':'Näkymä näyttää maanantaista perjantaihin, mutta API säilyttää kaikki seitsemän päivää.'
  }
};

function language() { return window.AdminI18n?.lang?.() || localStorage.getItem('adminLanguage') || document.documentElement.lang || 'en'; }
function t(value) { return TRANSLATIONS[language()]?.[value] || window.AdminI18n?.t(value) || value; }
function translateStaticText() {
  document.querySelectorAll('h1,h2,p,span,small,th,label,.save-link,.eyebrow').forEach(el => {
    if (el.children.length) return;
    const key = el.dataset.i18nSource || el.textContent.trim();
    if (!key) return;
    el.dataset.i18nSource = key;
    el.textContent = t(key);
  });
  document.documentElement.lang = language();
}

function esc(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function locale() {
  const lang = window.AdminI18n?.lang?.();
  return lang === 'sv' ? 'sv-FI' : lang === 'fi' ? 'fi-FI' : 'en-GB';
}

function localDate(dateString) {
  return new Date(`${dateString}T12:00:00`);
}

function formatDate(dateString, options = { weekday: 'short', day: '2-digit', month: '2-digit' }) {
  return localDate(dateString).toLocaleDateString(locale(), options);
}

function currentIsoWeek() {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  const isoDay = date.getDay() || 7;
  date.setDate(date.getDate() + 4 - isoDay);
  const isoYear = date.getFullYear();
  const yearStart = new Date(isoYear, 0, 1, 12);
  const week = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
  return `${isoYear}-W${String(week).padStart(2, '0')}`;
}

function showStatus(message, type) {
  statusBox.textContent = message;
  statusBox.className = `statistics-status is-visible is-${type}`;
}

function clearStatus() {
  statusBox.textContent = '';
  statusBox.className = 'statistics-status';
}

function reasonLabel(code) {
  if (!code) return t('Other');
  return t(String(code).replaceAll('_', ' ').toLowerCase().replace(/\b\w/g, letter => letter.toUpperCase()));
}

function typeLabel(type) {
  return String(type).toLowerCase() === 'guest' ? t('Guest') : t('Employee');
}

function chart(selector, data, color, emptyText) {
  const element = document.querySelector(selector);
  if (!data.some(item => item.value > 0)) {
    element.innerHTML = `<div class="empty-state"><strong>${esc(t(emptyText))}</strong></div>`;
    return;
  }

  const width = 760;
  const height = 260;
  const padding = { left: 60, right: 24, top: 28, bottom: 46 };
  const maximum = Math.max(...data.map(item => item.value), 1);
  const x = index => padding.left + index * (width - padding.left - padding.right) / Math.max(1, data.length - 1);
  const y = value => height - padding.bottom - value / maximum * (height - padding.top - padding.bottom);
  const points = data.map((item, index) => `${x(index)},${y(item.value)}`).join(' ');

  element.innerHTML = `<svg class="statistics-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(t('Served lunches by day'))}">
    ${[0, .25, .5, .75, 1].map(grid => `<line x1="${padding.left}" y1="${y(maximum * grid)}" x2="${width - padding.right}" y2="${y(maximum * grid)}" class="chart-grid"/><text x="${padding.left - 8}" y="${y(maximum * grid) + 4}" text-anchor="end" class="chart-axis-label">${Math.round(maximum * grid)}</text>`).join('')}
    <polyline points="${points}" fill="none" stroke="${color}" stroke-width="4" stroke-linejoin="round"/>
    ${data.map((item, index) => `<circle cx="${x(index)}" cy="${y(item.value)}" r="5" fill="${color}"/><text x="${x(index)}" y="${height - 16}" text-anchor="middle" class="chart-axis-label">${esc(item.label)}</text><text x="${x(index)}" y="${y(item.value) - 11}" text-anchor="middle" class="chart-value">${item.value}</text>`).join('')}
  </svg>`;
}

function render(data) {
  orderedTotal.textContent = data.totals.ordered;
  servedTotal.textContent = data.totals.served;
  cancelledTotal.textContent = data.totals.cancelled;
  cancelledPercent.textContent = `${data.totals.cancellationPercent}% ${t('of orders')}`;

  if (data.totals.peakDay) {
    peakDay.textContent = formatDate(data.totals.peakDay.date, { weekday: 'long' });
    peakDayDetail.textContent = `${data.totals.peakDay.served} ${t('served portions')}`;
  } else {
    peakDay.textContent = '-';
    peakDayDetail.textContent = t('No orders');
  }

  const weekdays = (data.daily || []).filter(day => day.isoDay <= 5);
  chart('#lunchTrend', weekdays.map(day => ({
    label: formatDate(day.date, { weekday: 'short' }),
    value: day.served
  })), '#155b87', 'No lunch orders');

  dailyBreakdown.innerHTML = weekdays.map(day => `<tr>
    <td><strong>${esc(formatDate(day.date, { weekday: 'long', day: '2-digit', month: '2-digit' }))}</strong></td>
    <td>${day.ordered}</td>
    <td>${day.served}</td>
    <td>${day.cancelled}</td>
  </tr>`).join('');

  const reasons = data.cancellationReasons || [];
  const reasonMax = Math.max(...reasons.map(reason => reason.quantity), 1);
  cancellationReasons.innerHTML = reasons.length
    ? reasons.map(reason => `<div class="reason-row"><strong>${esc(reasonLabel(reason.reasonCode))}</strong><i><b style="width:${reason.quantity / reasonMax * 100}%"></b></i><em>${reason.quantity}</em></div>`).join('')
    : `<div class="empty-state"><strong>${esc(t('No cancellations'))}</strong></div>`;

  const cancellations = data.cancellations || [];
  cancellationDetails.innerHTML = cancellations.length
    ? cancellations.map(item => `<tr>
        <td>${esc(formatDate(item.menuDate))}</td>
        <td><strong>${esc(item.employeeName || item.employeeNo || '-')}</strong></td>
        <td>${esc(typeLabel(item.orderType))}</td>
        <td>${item.quantity}</td>
        <td>${esc(reasonLabel(item.reasonCode))}</td>
        <td>${esc(item.reasonText || '-')}</td>
      </tr>`).join('')
    : `<tr><td colspan="6"><div class="empty-state"><strong>${esc(t('No cancellations'))}</strong></div></td></tr>`;

  statisticsNote.textContent = `${t('Showing ISO week')} ${data.week}. ${t('The dashboard displays Monday to Friday while the API retains all seven days.')}`;
}

async function loadSummary() {
  const week = weekPicker.value;
  if (!week) return;

  showStatus(t('Loading weekly summary...'), 'loading');
  weekPicker.disabled = true;

  try {
    const response = await fetch(`${API_URL}?week=${encodeURIComponent(week)}`, {
      headers: { Accept: 'application/json' }
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.details || body.error || `${response.status} ${response.statusText}`);
    render(body);
    clearStatus();
  } catch (error) {
    console.error('Weekly summary request failed', error);
    showStatus(`${t('Could not load weekly summary')}: ${error.message}`, 'error');
  } finally {
    weekPicker.disabled = false;
  }
}

translateStaticText();
weekPicker.value = currentIsoWeek();
weekPicker.addEventListener('change', loadSummary);
printStatistics.addEventListener('click', () => print());
document.addEventListener('admin-language-changed', () => { translateStaticText(); loadSummary(); });
loadSummary();

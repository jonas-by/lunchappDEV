const API_BASE = 'https://lunchapp-api-dev-bxf8hff5hmb7g5dv.swedencentral-01.azurewebsites.net/api';

let employees = [];
let timer;
let saving = false;

const rows = document.querySelector('#employeeRows');
const search = document.querySelector('#employeeSearch');
const statusFilter = document.querySelector('#statusFilter');
const dialog = document.querySelector('#employeeDialog');
const form = document.querySelector('#employeeForm');
const employeeStatus = document.querySelector('#employeeStatus');
const csvFile = document.querySelector('#csvFile');
const formError = document.querySelector('#employeeFormError');
const employeeNumberInput = document.querySelector('#editEmployeeNumber');
const cardNumberInput = document.querySelector('#editCard');

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

function fullName(employee) {
    return [employee.firstName, employee.lastName].filter(Boolean).join(' ') || t('Unnamed employee');
}

function normaliseEmployee(row) {
    return {
        employeeNo: Number(row.EmployeeNo ?? row.employeeNo),
        firstName: row.FirstName ?? row.firstName ?? '',
        lastName: row.LastName ?? row.lastName ?? '',
        email: row.Email ?? row.email ?? '',
        cardNumber: row.CardNumber ?? row.cardNumber ?? '',
        active: Boolean(row.Active ?? row.active)
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

    const contentType = response.headers.get('content-type') || '';
    const payload = contentType.includes('application/json')
        ? await response.json()
        : await response.text();

    if (!response.ok) {
        const error = new Error(payload?.details || payload?.error || payload || `HTTP ${response.status}`);
        error.status = response.status;
        error.payload = payload;
        throw error;
    }

    return payload;
}

async function loadEmployees() {
    employeeStatus.textContent = t('Loading employees from Azure...');
    const payload = await apiFetch('/employees?includeInactive=true');
    employees = payload.map(normaliseEmployee);
    render();
    employeeStatus.textContent = `${t('Loaded')} ${employees.length} ${t(employees.length === 1 ? 'employee' : 'employees')} ${t('from Azure.')}`;
}

function render() {
    const query = search.value.trim().toLowerCase();
    const wantedStatus = statusFilter.value;

    const shown = employees
        .filter(employee => {
            const matchesStatus = !wantedStatus ||
                (wantedStatus === 'active' && employee.active) ||
                (wantedStatus === 'inactive' && !employee.active);
            const matchesSearch = !query || [
                employee.employeeNo,
                employee.firstName,
                employee.lastName,
                employee.email,
                employee.cardNumber
            ].some(value => String(value ?? '').toLowerCase().includes(query));

            return matchesStatus && matchesSearch;
        })
        .sort((a, b) => fullName(a).localeCompare(fullName(b), undefined, { sensitivity: 'base' }));

    document.querySelector('#employeeCount').textContent =
        shown.length === employees.length
            ? `${employees.length} ${t(employees.length === 1 ? 'employee' : 'employees')}`
            : `${shown.length} / ${employees.length} ${t('employees')}`;

    rows.innerHTML = shown.length
        ? shown.map(employee => `
            <tr class="${employee.active ? '' : 'inactive'}">
                <td><code>${employee.employeeNo}</code></td>
                <td>${esc(fullName(employee))}</td>
                <td>${employee.email ? `<a href="mailto:${esc(employee.email)}">${esc(employee.email)}</a>` : '<span class="muted-value">-</span>'}</td>
                <td>${employee.cardNumber ? `<code>${esc(employee.cardNumber)}</code>` : '<span class="muted-value">-</span>'}</td>
                <td><span class="meal-category-badge ${employee.active ? 'vegetarian' : 'inactive'}">${t(employee.active ? 'Active' : 'Inactive')}</span></td>
                <td class="action-column">
                    <button class="table-action" type="button" data-edit="${employee.employeeNo}">${t('Edit')}</button>
                    <button class="table-action ${employee.active ? 'danger' : ''}" type="button" data-toggle="${employee.employeeNo}">
                        ${t(employee.active ? 'Disable' : 'Restore')}
                    </button>
                    ${!employee.active ? `<button class="table-action danger" type="button" data-hard-delete="${employee.employeeNo}">${t('Delete permanently')}</button>` : ''}
                </td>
            </tr>
        `).join('')
        : `<tr><td colspan="6" class="empty-cell">${t('No matching employees')}</td></tr>`;
}

function clearFormError() {
    formError.hidden = true;
    formError.textContent = '';
    [employeeNumberInput, cardNumberInput].forEach(input => input.classList.remove('field-error'));
}
function showFormError(message, field) {
    clearFormError();
    formError.textContent = message;
    formError.hidden = false;
    const input = field === 'employeeNo' ? employeeNumberInput : field === 'cardNumber' ? cardNumberInput : null;
    if (input) { input.classList.add('field-error'); input.focus(); }
}

function openEdit(employee = null) {
    clearFormError();
    document.querySelector('#dialogTitle').textContent = t(employee ? 'Edit employee' : 'Add employee');
    document.querySelector('#editOriginalEmployeeNo').value = employee?.employeeNo ?? '';
    document.querySelector('#editEmployeeNumber').value = employee?.employeeNo ?? '';
    document.querySelector('#editEmployeeNumber').disabled = Boolean(employee);
    document.querySelector('#editFirstName').value = employee?.firstName ?? '';
    document.querySelector('#editLastName').value = employee?.lastName ?? '';
    document.querySelector('#editEmail').value = employee?.email ?? '';
    document.querySelector('#editCard').value = employee?.cardNumber ?? '';
    document.querySelector('#editActive').checked = employee?.active ?? true;
    dialog.showModal();

    setTimeout(() => {
        document.querySelector(employee ? '#editFirstName' : '#editEmployeeNumber').focus();
    }, 0);
}

function formPayload() {
    return {
        employeeNo: Number(document.querySelector('#editEmployeeNumber').value),
        firstName: document.querySelector('#editFirstName').value.trim() || null,
        lastName: document.querySelector('#editLastName').value.trim() || null,
        email: document.querySelector('#editEmail').value.trim() || null,
        cardNumber: document.querySelector('#editCard').value.trim() || null,
        active: document.querySelector('#editActive').checked
    };
}

form.addEventListener('submit', async event => {
    if (event.submitter?.value === 'cancel') return;
    event.preventDefault();
    if (saving) return;

    const originalEmployeeNo = Number(document.querySelector('#editOriginalEmployeeNo').value) || null;
    const payload = formPayload();

    if (!Number.isInteger(payload.employeeNo) || payload.employeeNo <= 0) {
        show(t('Employee number must be a positive integer'));
        return;
    }

    saving = true;
    document.querySelector('#saveEmployee').disabled = true;

    try {
        if (originalEmployeeNo) {
            await apiFetch(`/employees/${originalEmployeeNo}`, {
                method: 'PUT',
                body: JSON.stringify(payload)
            });
        } else {
            await apiFetch('/employees', {
                method: 'POST',
                body: JSON.stringify(payload)
            });
        }

        dialog.close();
        await loadEmployees();
        show(t('Employee saved'));
    } catch (error) {
        console.error(error);
        showFormError(error.message, error.payload?.field);
    } finally {
        saving = false;
        document.querySelector('#saveEmployee').disabled = false;
    }
});

rows.addEventListener('click', event => {
    const editButton = event.target.closest('[data-edit]');
    if (editButton) {
        const employeeNo = Number(editButton.dataset.edit);
        openEdit(employees.find(employee => employee.employeeNo === employeeNo));
        return;
    }

    const toggleButton = event.target.closest('[data-toggle]');
    if (toggleButton) {
        toggleEmployee(Number(toggleButton.dataset.toggle));
        return;
    }

    const deleteButton = event.target.closest('[data-hard-delete]');
    if (deleteButton) {
        hardDeleteEmployee(Number(deleteButton.dataset.hardDelete));
    }
});

async function toggleEmployee(employeeNo) {
    const employee = employees.find(item => item.employeeNo === employeeNo);
    if (!employee) return;

    if (employee.active) {
        if (!confirm(`${t('Disable')} ${fullName(employee)}?`)) return;

        try {
            await apiFetch(`/employees/${employeeNo}`, { method: 'DELETE' });
            await loadEmployees();
            show(t('Employee disabled'));
        } catch (error) {
            console.error(error);
            show(error.message);
        }
        return;
    }

    try {
        await apiFetch(`/employees/${employeeNo}`, {
            method: 'PUT',
            body: JSON.stringify({ ...employee, active: true })
        });
        await loadEmployees();
        show(t('Employee restored'));
    } catch (error) {
        console.error(error);
        show(error.message);
    }
}

async function hardDeleteEmployee(employeeNo) {
    const employee = employees.find(item => item.employeeNo === employeeNo);
    if (!employee) return;

    if (!confirm(`${t('Permanently delete')} ${fullName(employee)}?\n\n${t('This cannot be undone. Employees with order history cannot be permanently deleted.')}`)) {
        return;
    }

    try {
        await apiFetch(`/employees/${employeeNo}?hard=true`, { method: 'DELETE' });
        await loadEmployees();
        show(t('Employee permanently deleted'));
    } catch (error) {
        console.error(error);
        show(error.status === 409
            ? t('Employee has order history and can only be disabled')
            : error.message);
    }
}

function parseBoolean(value, defaultValue = true) {
    const normalised = String(value ?? '').trim().toLowerCase();
    if (!normalised) return defaultValue;
    return ['1', 'true', 'yes', 'y', 'active'].includes(normalised);
}

function parseCsv(text) {
    const lines = text.replace(/^\uFEFF/, '').split(/\r?\n/).filter(line => line.trim());
    if (!lines.length) return [];

    const delimiter = (lines[0].match(/;/g) || []).length > (lines[0].match(/,/g) || []).length ? ';' : ',';

    function split(line) {
        const output = [];
        let current = '';
        let quoted = false;

        for (let index = 0; index < line.length; index += 1) {
            const character = line[index];
            if (character === '"' && line[index + 1] === '"') {
                current += '"';
                index += 1;
            } else if (character === '"') {
                quoted = !quoted;
            } else if (character === delimiter && !quoted) {
                output.push(current.trim());
                current = '';
            } else {
                current += character;
            }
        }

        output.push(current.trim());
        return output;
    }

    const data = lines.map(split);
    const first = data[0].map(value => value.toLowerCase().replace(/[^a-z]/g, ''));
    const hasHeader = first.some(value => value.includes('employee') || value.includes('card') || value.includes('firstname'));
    const records = hasHeader ? data.slice(1) : data;

    return records.map(columns => ({
        employeeNo: Number(columns[0]),
        firstName: columns[1] || null,
        lastName: columns[2] || null,
        email: columns[3] || null,
        cardNumber: columns[4] || null,
        active: parseBoolean(columns[5], true)
    })).filter(employee => Number.isInteger(employee.employeeNo) && employee.employeeNo > 0);
}

async function importEmployees(imported) {
    let created = 0;
    let updated = 0;
    const failures = [];
    const existingNumbers = new Set(employees.map(employee => employee.employeeNo));

    for (const employee of imported) {
        try {
            if (existingNumbers.has(employee.employeeNo)) {
                await apiFetch(`/employees/${employee.employeeNo}`, {
                    method: 'PUT',
                    body: JSON.stringify(employee)
                });
                updated += 1;
            } else {
                await apiFetch('/employees', {
                    method: 'POST',
                    body: JSON.stringify(employee)
                });
                existingNumbers.add(employee.employeeNo);
                created += 1;
            }
        } catch (error) {
            failures.push(`${employee.employeeNo}: ${error.message}`);
        }
    }

    await loadEmployees();

    if (failures.length) {
        console.error('CSV import failures', failures);
        show(`${created} ${t('created')}, ${updated} ${t('updated')}, ${failures.length} ${t('failed')}`);
    } else {
        show(`${created} ${t('created')}, ${updated} ${t('updated')}`);
    }
}

document.querySelector('#addEmployee').addEventListener('click', () => openEdit());
search.addEventListener('input', render);
statusFilter.addEventListener('change', render);

document.querySelector('#importCsv').addEventListener('click', () => csvFile.click());
csvFile.addEventListener('change', async () => {
    if (!csvFile.files[0]) return;

    try {
        const imported = parseCsv(await csvFile.files[0].text());
        if (!imported.length) {
            show(t('No valid employee rows found'));
            return;
        }

        if (!confirm(`${t('Import')} ${imported.length} ${t(imported.length === 1 ? 'employee' : 'employees')}?`)) {
            return;
        }

        await importEmployees(imported);
    } catch (error) {
        console.error(error);
        show(error.message);
    } finally {
        csvFile.value = '';
    }
});

document.addEventListener('admin-language-changed', render);

function show(message) {
    const toast = document.querySelector('#toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

loadEmployees().catch(error => {
    console.error(error);
    employeeStatus.textContent = `${t('Load failed')}: ${error.message}`;
    rows.innerHTML = `<tr><td colspan="6" class="empty-cell">${esc(error.message)}</td></tr>`;
    show(`${t('Load failed')}: ${error.message}`);
});

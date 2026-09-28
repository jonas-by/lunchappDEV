const API_BASE = 'https://lunchapp-api-dev-bxf8hff5hmb7g5dv.swedencentral-01.azurewebsites.net/api';
const USER_KEY = 'lunch-poc-current-user-v17';
const LANGUAGE_KEY = 'lunch-poc-language-v5';

const text = {
    en: {
        title: 'Lunch service',
        intro: 'Enter your employee number to continue.',
        number: 'Employee number',
        button: 'Continue',
        checking: 'Checking...',
        unknown: 'Employee number not recognized.',
        inactive: 'This employee account is inactive.',
        unavailable: 'The employee directory is currently unavailable.'
    },
    sv: {
        title: 'Lunchtjänst',
        intro: 'Ange ditt anställningsnummer för att fortsätta.',
        number: 'Anställningsnummer',
        button: 'Fortsätt',
        checking: 'Kontrollerar...',
        unknown: 'Anställningsnumret känns inte igen.',
        inactive: 'Det här användarkontot är inaktivt.',
        unavailable: 'Personalregistret är inte tillgängligt just nu.'
    },
    fi: {
        title: 'Lounaspalvelu',
        intro: 'Jatka syöttämällä työntekijänumerosi.',
        number: 'Työntekijänumero',
        button: 'Jatka',
        checking: 'Tarkistetaan...',
        unknown: 'Työntekijänumeroa ei löytynyt.',
        inactive: 'Tämä työntekijätili ei ole aktiivinen.',
        unavailable: 'Henkilöstörekisteri ei ole juuri nyt käytettävissä.'
    }
};

const existingUser = readStoredUser();
if (existingUser?.employeeNumber) {
    location.replace('index.html');
}

let language = localStorage.getItem(LANGUAGE_KEY) || 'sv';
let employees = [];
let directoryLoaded = false;
let loadingDirectory = false;

const loginTitle = document.querySelector('#loginTitle');
const loginIntro = document.querySelector('#loginIntro');
const employeeNumberLabel = document.querySelector('#employeeNumberLabel');
const employeeNumber = document.querySelector('#employeeNumber');
const employeePreview = document.querySelector('#employeePreview');
const loginButton = document.querySelector('#loginButton');
const loginMessage = document.querySelector('#loginMessage');
const loginLanguage = document.querySelector('#loginLanguage');
const loginForm = document.querySelector('#loginForm');

function readStoredUser() {
    try {
        return JSON.parse(localStorage.getItem(USER_KEY));
    } catch {
        return null;
    }
}

function normalizeEmployeeNumber(value) {
    const normalized = String(value || '').trim();
    return /^\d+$/.test(normalized) ? String(Number(normalized)) : normalized;
}

function normalizeEmployee(row) {
    const firstName = row.FirstName ?? row.firstName ?? '';
    const lastName = row.LastName ?? row.lastName ?? '';

    return {
        employeeNumber: String(row.EmployeeNo ?? row.employeeNo),
        employeeName: [firstName, lastName].filter(Boolean).join(' ') || String(row.EmployeeNo ?? row.employeeNo),
        firstName,
        lastName,
        email: row.Email ?? row.email ?? null,
        cardNumber: row.CardNumber ?? row.cardNumber ?? null,
        active: Boolean(row.Active ?? row.active)
    };
}

async function apiFetch(path) {
    const response = await fetch(`${API_BASE}${path}`, {
        headers: { Accept: 'application/json' }
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(payload?.details || payload?.error || `HTTP ${response.status}`);
    }

    return payload;
}

async function loadEmployees() {
    if (loadingDirectory) return;

    loadingDirectory = true;
    loginButton.disabled = true;
    loginButton.textContent = text[language].checking;

    try {
        const payload = await apiFetch('/employees?includeInactive=true');
        employees = payload.map(normalizeEmployee);
        directoryLoaded = true;
        updatePreview();
        clearMessage();
    } catch (error) {
        console.error(error);
        directoryLoaded = false;
        showMessage(text[language].unavailable, 'error');
    } finally {
        loadingDirectory = false;
        loginButton.disabled = false;
        loginButton.textContent = text[language].button;
    }
}

function render() {
    const labels = text[language];
    document.documentElement.lang = language;
    document.title = labels.title;
    loginTitle.textContent = labels.title;
    loginIntro.textContent = labels.intro;
    employeeNumberLabel.textContent = labels.number;
    loginButton.textContent = loadingDirectory ? labels.checking : labels.button;
    loginLanguage.value = language;
}

function findEmployee() {
    const wantedNumber = normalizeEmployeeNumber(employeeNumber.value);
    return employees.find(employee => employee.employeeNumber === wantedNumber);
}

function updatePreview() {
    if (!directoryLoaded) {
        employeePreview.textContent = '';
        return;
    }

    const employee = findEmployee();
    employeePreview.textContent = employee?.employeeName || '';
}

function showMessage(message, type = '') {
    loginMessage.textContent = message;
    loginMessage.className = `login-message ${type}`.trim();
}

function clearMessage() {
    showMessage('');
}

employeeNumber.addEventListener('input', () => {
    clearMessage();
    updatePreview();
});

loginLanguage.addEventListener('change', () => {
    language = loginLanguage.value;
    localStorage.setItem(LANGUAGE_KEY, language);
    render();

    if (!directoryLoaded && !loadingDirectory) {
        showMessage(text[language].unavailable, 'error');
    }
});

loginForm.addEventListener('submit', async event => {
    event.preventDefault();
    clearMessage();

    if (!directoryLoaded) {
        await loadEmployees();
    }

    if (!directoryLoaded) {
        showMessage(text[language].unavailable, 'error');
        return;
    }

    const employee = findEmployee();

    if (!employee) {
        showMessage(text[language].unknown, 'error');
        employeePreview.textContent = '';
        return;
    }

    if (!employee.active) {
        showMessage(text[language].inactive, 'error');
        return;
    }

    localStorage.setItem(USER_KEY, JSON.stringify(employee));
    location.replace('index.html');
});

render();
loadEmployees();

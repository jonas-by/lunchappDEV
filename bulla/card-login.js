const CARD_LOGIN_API = 'https://lunchapp-api-dev-bxf8hff5hmb7g5dv.swedencentral-01.azurewebsites.net/api/kiosk/card-login';
const SESSION_KEY = 'cafe-kiosk-card-session-v1';
const LANGUAGE_KEY = 'lunch-poc-language-v5';
let language = localStorage.getItem(LANGUAGE_KEY) || 'sv';
let submitting = false;

const copy = {
  en: { title:'Scan your card', help:'Hold the card against the reader to begin.', card:'Card number', button:'Continue', language:'Language', checking:'Checking card...', failed:'Card login failed.' },
  sv: { title:'Skanna ditt kort', help:'Håll kortet mot läsaren för att börja.', card:'Kortnummer', button:'Fortsätt', language:'Språk', checking:'Kontrollerar kort...', failed:'Kortinloggningen misslyckades.' },
  fi: { title:'Skannaa korttisi', help:'Aloita pitämällä korttia lukijaa vasten.', card:'Kortin numero', button:'Jatka', language:'Kieli', checking:'Tarkistetaan korttia...', failed:'Korttikirjautuminen epäonnistui.' }
};
const t=()=>copy[language]||copy.sv;
function applyText(){const x=t();document.documentElement.lang=language;loginTitle.textContent=x.title;loginHelp.textContent=x.help;cardLabel.textContent=x.card;loginButton.textContent=x.button;languageLabel.textContent=x.language;languageSelect.value=language;}
function message(value,type=''){loginMessage.textContent=value;loginMessage.className=`login-message ${type}`;}
function normalizeCardNumber(value){const digits=String(value??'').replace(/\D/g,'');return digits.length>5?digits.slice(-5):digits;}
async function login(cardNumber){
  if(submitting)return;
  const clean=normalizeCardNumber(cardNumber);
  if(!clean)return;
  submitting=true;loginButton.disabled=true;message(t().checking,'loading');
  try{
    const response=await fetch(CARD_LOGIN_API,{method:'POST',headers:{Accept:'application/json','Content-Type':'application/json'},body:JSON.stringify({cardNumber:clean})});
    const body=await response.json().catch(()=>({}));
    if(!response.ok)throw new Error(body.details||body.error||`HTTP ${response.status}`);
    sessionStorage.setItem(SESSION_KEY,JSON.stringify({...body,cardNumber:clean,loginTime:new Date().toISOString()}));
    location.replace('order.html');
  }catch(error){message(error.message||t().failed,'error');cardInput.value='';cardInput.focus();}
  finally{submitting=false;loginButton.disabled=false;}
}
sessionStorage.removeItem(SESSION_KEY);
applyText();
languageSelect.addEventListener('change',()=>{language=languageSelect.value;localStorage.setItem(LANGUAGE_KEY,language);applyText();cardInput.focus();});
cardForm.addEventListener('submit',event=>{event.preventDefault();login(cardInput.value);});
window.addEventListener('load',()=>cardInput.focus());

const API_BASE = 'https://lunchapp-api-dev-bxf8hff5hmb7g5dv.swedencentral-01.azurewebsites.net/api';
const PRODUCT_API = `${API_BASE}/kiosk/products`;
const IMAGE_API = `${API_BASE}/images`;
const $ = selector => document.querySelector(selector);

let products = [];
let images = [];
let language = localStorage.getItem('lunch-poc-language-v5') || 'en';
let toastTimer;
let selectedImage = null;
let cropImage = null;
let cropFile = null;
let cropObjectUrl = null;
let cropScale = 1;
let cropOffsetX = 0;
let cropOffsetY = 0;
let cropDragging = false;
let cropPointerX = 0;
let cropPointerY = 0;

const translations = {
  en: {
    pageTitle: 'Product library', pageSubtitle: 'Products, prices and translations', newProduct: 'New product', heroTitle: 'Product library', heroText: 'Create products and maintain prices, translations, icons and images.', search: 'Search', searchPlaceholder: 'Search products', showInactive: 'Show inactive', dialogNew: 'New product', dialogEdit: 'Edit product', nameEn: 'English name', nameSv: 'Swedish name', nameFi: 'Finnish name', price: 'Price (€)', icon: 'Icon', preview: 'Preview', active: 'Active', cancel: 'Cancel', save: 'Save', edit: 'Edit', deactivate: 'Deactivate', inactive: 'Inactive', noProducts: 'No products found.', loading: 'Loading products...', saved: 'Product saved', deactivated: 'Product deactivated', confirmDeactivate: 'Deactivate this product?', fallbackName: 'Unnamed product', noTranslation: 'Translation missing', imageFallback: 'No image', productImage: 'Product image', imageHelp: 'Upload and crop a new image, or choose one already in the library.', uploadCrop: 'Upload and crop', chooseExisting: 'Choose existing', removeImage: 'Remove image', noImageSelected: 'No image selected', chooseImage: 'Choose an image', pickerHelp: 'Select an existing image from the shared library.', searchImages: 'Search images', searchImagesPlaceholder: 'Search by name or filename', noImages: 'No images found.', loadingImages: 'Loading images...', cropTitle: 'Adjust product image', cropHelp: 'Drag to position the product inside the square. Use zoom if needed.', zoom: 'Zoom', cropHint: 'Tip: drag the picture directly. The saved image will be square.', chooseAnother: 'Choose another', useImage: 'Use image', uploading: 'Uploading image...', uploadFailed: 'Image upload failed', imageReady: 'Image uploaded and selected', close: 'Close'
  },
  sv: {
    pageTitle: 'Produktbibliotek', pageSubtitle: 'Produkter, priser och översättningar', newProduct: 'Ny produkt', heroTitle: 'Produktbibliotek', heroText: 'Skapa produkter och hantera priser, översättningar, ikoner och bilder.', search: 'Sök', searchPlaceholder: 'Sök produkter', showInactive: 'Visa inaktiva', dialogNew: 'Ny produkt', dialogEdit: 'Redigera produkt', nameEn: 'Engelskt namn', nameSv: 'Svenskt namn', nameFi: 'Finskt namn', price: 'Pris (€)', icon: 'Ikon', preview: 'Förhandsvisning', active: 'Aktiv', cancel: 'Avbryt', save: 'Spara', edit: 'Redigera', deactivate: 'Inaktivera', inactive: 'Inaktiv', noProducts: 'Inga produkter hittades.', loading: 'Laddar produkter...', saved: 'Produkten sparades', deactivated: 'Produkten inaktiverades', confirmDeactivate: 'Inaktivera produkten?', fallbackName: 'Namnlös produkt', noTranslation: 'Översättning saknas', imageFallback: 'Ingen bild', productImage: 'Produktbild', imageHelp: 'Ladda upp och beskär en ny bild eller välj en bild i biblioteket.', uploadCrop: 'Ladda upp och beskär', chooseExisting: 'Välj befintlig', removeImage: 'Ta bort bild', noImageSelected: 'Ingen bild vald', chooseImage: 'Välj en bild', pickerHelp: 'Välj en befintlig bild från det gemensamma biblioteket.', searchImages: 'Sök bilder', searchImagesPlaceholder: 'Sök på namn eller filnamn', noImages: 'Inga bilder hittades.', loadingImages: 'Laddar bilder...', cropTitle: 'Justera produktbild', cropHelp: 'Dra bilden för att placera produkten i fyrkanten. Zooma vid behov.', zoom: 'Zoom', cropHint: 'Tips: dra direkt i bilden. Den sparade bilden blir fyrkantig.', chooseAnother: 'Välj en annan', useImage: 'Använd bild', uploading: 'Laddar upp bild...', uploadFailed: 'Bilduppladdningen misslyckades', imageReady: 'Bilden laddades upp och valdes', close: 'Stäng'
  },
  fi: {
    pageTitle: 'Tuotekirjasto', pageSubtitle: 'Tuotteet, hinnat ja käännökset', newProduct: 'Uusi tuote', heroTitle: 'Tuotekirjasto', heroText: 'Luo tuotteita ja hallinnoi hintoja, käännöksiä, kuvakkeita ja kuvia.', search: 'Haku', searchPlaceholder: 'Hae tuotteita', showInactive: 'Näytä passiiviset', dialogNew: 'Uusi tuote', dialogEdit: 'Muokkaa tuotetta', nameEn: 'Englanninkielinen nimi', nameSv: 'Ruotsinkielinen nimi', nameFi: 'Suomenkielinen nimi', price: 'Hinta (€)', icon: 'Kuvake', preview: 'Esikatselu', active: 'Aktiivinen', cancel: 'Peruuta', save: 'Tallenna', edit: 'Muokkaa', deactivate: 'Poista käytöstä', inactive: 'Passiivinen', noProducts: 'Tuotteita ei löytynyt.', loading: 'Ladataan tuotteita...', saved: 'Tuote tallennettiin', deactivated: 'Tuote poistettiin käytöstä', confirmDeactivate: 'Poistetaanko tuote käytöstä?', fallbackName: 'Nimetön tuote', noTranslation: 'Käännös puuttuu', imageFallback: 'Ei kuvaa', productImage: 'Tuotekuva', imageHelp: 'Lataa ja rajaa uusi kuva tai valitse kuva kirjastosta.', uploadCrop: 'Lataa ja rajaa', chooseExisting: 'Valitse olemassa oleva', removeImage: 'Poista kuva', noImageSelected: 'Kuvaa ei ole valittu', chooseImage: 'Valitse kuva', pickerHelp: 'Valitse olemassa oleva kuva yhteisestä kirjastosta.', searchImages: 'Hae kuvia', searchImagesPlaceholder: 'Hae nimellä tai tiedostonimellä', noImages: 'Kuvia ei löytynyt.', loadingImages: 'Ladataan kuvia...', cropTitle: 'Säädä tuotekuvaa', cropHelp: 'Vedä kuvaa sijoittaaksesi tuotteen neliöön. Zoomaa tarvittaessa.', zoom: 'Zoom', cropHint: 'Vinkki: vedä kuvaa suoraan. Tallennettu kuva on neliö.', chooseAnother: 'Valitse toinen', useImage: 'Käytä kuvaa', uploading: 'Ladataan kuvaa...', uploadFailed: 'Kuvan lataus epäonnistui', imageReady: 'Kuva ladattiin ja valittiin', close: 'Sulje'
  }
};

function t() { return translations[language] || translations.en; }
function escapeHtml(value = '') { return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;'); }
function localizedName(product) { const preferred = language === 'sv' ? product.nameSv : language === 'fi' ? product.nameFi : product.nameEn; return preferred || product.nameSv || product.nameEn || product.nameFi || t().fallbackName; }
function formatPrice(value) { const locale = language === 'sv' ? 'sv-FI' : language === 'fi' ? 'fi-FI' : 'en-FI'; return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(Number(value || 0)); }

async function api(url, options = {}) {
  const headers = { Accept: 'application/json', ...(options.headers || {}) };
  if (options.body && !(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';
  const response = await fetch(url, { ...options, headers });
  const contentType = response.headers.get('content-type') || '';
  const body = contentType.includes('application/json') ? await response.json().catch(() => ({})) : await response.text();
  if (!response.ok) throw new Error(body?.details || body?.error || body || `HTTP ${response.status}`);
  return body;
}

function applyTranslations() {
  const x = t(); document.documentElement.lang = language;
  const values = { pageTitle:x.pageTitle,pageSubtitle:x.pageSubtitle,newProductButton:x.newProduct,heroTitle:x.heroTitle,heroText:x.heroText,searchLabel:x.search,showInactiveLabel:x.showInactive,nameEnLabel:x.nameEn,nameSvLabel:x.nameSv,nameFiLabel:x.nameFi,priceLabel:x.price,iconLabel:x.icon,previewLabel:x.preview,activeLabel:x.active,cancelButton:x.cancel,saveButton:x.save,imageLabel:x.productImage,imageHelp:x.imageHelp,uploadImageButton:x.uploadCrop,chooseImageButton:x.chooseExisting,removeImageButton:x.removeImage,imagePickerTitle:x.chooseImage,imagePickerHelp:x.pickerHelp,imageSearchLabel:x.searchImages,cropTitle:x.cropTitle,cropHelp:x.cropHelp,zoomLabel:x.zoom,cropHint:x.cropHint,chooseAnotherImageButton:x.chooseAnother,useCroppedImageButton:x.useImage };
  Object.entries(values).forEach(([id, value]) => { const el = document.getElementById(id); if (el) el.textContent = value; });
  searchInput.placeholder = x.searchPlaceholder; imageSearchInput.placeholder = x.searchImagesPlaceholder;
  renderSelectedImage(); render(); renderImageLibrary(); updatePreview();
}

function render() {
  const x = t(); const query = searchInput.value.trim().toLowerCase();
  const filtered = products.filter(product => !query || [product.nameEn,product.nameSv,product.nameFi,product.icon,product.price].filter(v=>v!=null).join(' ').toLowerCase().includes(query));
  productList.innerHTML = filtered.length ? filtered.map(productCard).join('') : `<div class="empty">${x.noProducts}</div>`;
}
function productCard(product) {
  const x=t(), name=localizedName(product); const image=product.imageUrl ? `<img src="${escapeHtml(product.imageUrl)}" alt="" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="product-icon-fallback" hidden>${escapeHtml(product.icon||'📦')}</span>` : `<span class="product-icon-fallback">${escapeHtml(product.icon||'📦')}</span>`;
  return `<article class="product-library-card ${product.active?'':'inactive'}"><div class="product-visual">${image}</div><div class="product-details"><div class="product-card-title-row"><h2>${escapeHtml(name)}</h2><strong class="product-price">${formatPrice(product.price)}</strong></div><div class="badges">${product.active?'':`<span class="badge inactive">${x.inactive}</span>`}${(!product.nameSv||!product.nameFi)?`<span class="badge warning">${x.noTranslation}</span>`:''}</div><div class="product-translations"><span><b>EN</b> ${escapeHtml(product.nameEn||'—')}</span><span><b>SV</b> ${escapeHtml(product.nameSv||'—')}</span><span><b>FI</b> ${escapeHtml(product.nameFi||'—')}</span></div></div><div class="product-card-actions"><button class="secondary" type="button" data-action="edit" data-id="${product.productId}">${x.edit}</button>${product.active?`<button class="danger" type="button" data-action="deactivate" data-id="${product.productId}">${x.deactivate}</button>`:''}</div></article>`;
}
async function loadProducts(){ showStatus(t().loading,'loading'); try{ products=await api(`${PRODUCT_API}?includeInactive=${showInactive.checked}`); clearStatus(); render(); }catch(error){ showStatus(error.message,'error'); } }

function openNewProduct(){ fillForm(); productDialogTitle.textContent=t().dialogNew; productDialog.showModal(); nameSv.focus(); }
function openEditProduct(product){ fillForm(product); productDialogTitle.textContent=t().dialogEdit; productDialog.showModal(); nameSv.focus(); }
function fillForm(product={}){
  productId.value=product.productId||''; nameEn.value=product.nameEn||''; nameSv.value=product.nameSv||''; nameFi.value=product.nameFi||''; price.value=product.price==null?'':Number(product.price).toFixed(2); icon.value=product.icon||''; productActive.checked=product.active!==false;
  legacyImageUrl.value=product.legacyImageUrl||(!product.imageAssetId?product.imageUrl||'':'');
  selectedImage=product.imageAssetId?{imageAssetId:product.imageAssetId,displayName:product.imageDisplayName||product.nameEn||t().productImage,originalFileName:product.imageOriginalFileName||'',contentUrl:product.imageUrl}:null;
  imageAssetId.value=selectedImage?.imageAssetId||''; renderSelectedImage(); updatePreview();
}
function payload(){ return {nameEn:nameEn.value.trim(),nameSv:nameSv.value.trim()||null,nameFi:nameFi.value.trim()||null,price:Number(price.value),icon:icon.value.trim()||null,imageUrl:legacyImageUrl.value||null,imageAssetId:selectedImage?.imageAssetId||null,active:productActive.checked}; }
function currentImageUrl(){ return selectedImage?.contentUrl || selectedImage?.imageUrl || legacyImageUrl.value || ''; }
function renderSelectedImage(){
  const x=t(), url=currentImageUrl(), fallback=icon.value.trim()||'📦';
  selectedImagePreview.innerHTML=url?`<img src="${escapeHtml(url)}" alt=""><span hidden>${escapeHtml(fallback)}</span>`:`<span>${escapeHtml(fallback)}</span>`;
  const img=selectedImagePreview.querySelector('img'); if(img) img.addEventListener('error',()=>{img.hidden=true;img.nextElementSibling.hidden=false;});
  selectedImageName.textContent=selectedImage?.displayName||x.noImageSelected; selectedImageFile.textContent=selectedImage?.originalFileName||''; removeImageButton.hidden=!url;
}
function updatePreview(){
  const previewName=language==='sv'?(nameSv.value.trim()||nameEn.value.trim()):language==='fi'?(nameFi.value.trim()||nameEn.value.trim()):nameEn.value.trim(); const image=currentImageUrl(), fallback=icon.value.trim()||'📦';
  productPreview.innerHTML=`<div class="product-preview-visual">${image?`<img src="${escapeHtml(image)}" alt=""><span hidden>${escapeHtml(fallback)}</span>`:`<span>${escapeHtml(fallback)}</span>`}</div><div><strong>${escapeHtml(previewName||t().fallbackName)}</strong><span>${formatPrice(price.value||0)}</span></div>`;
  const img=productPreview.querySelector('img'); if(img) img.addEventListener('error',()=>{img.hidden=true;img.nextElementSibling.hidden=false;});
}
async function saveProduct(event){ event.preventDefault(); const id=productId.value; saveButton.disabled=true; try{ await api(id?`${PRODUCT_API}/${id}`:PRODUCT_API,{method:id?'PUT':'POST',body:JSON.stringify(payload())}); productDialog.close(); toast(t().saved); await loadProducts(); }catch(error){toast(error.message);}finally{saveButton.disabled=false;} }
async function deactivateProduct(id){ if(!confirm(t().confirmDeactivate))return; try{await api(`${PRODUCT_API}/${id}`,{method:'DELETE'});toast(t().deactivated);await loadProducts();}catch(error){toast(error.message);} }

async function openImagePicker(){ imagePickerDialog.showModal(); await loadImages(); imageSearchInput.focus(); }
async function loadImages(){ setPickerStatus(t().loadingImages,'loading'); try{images=await api(IMAGE_API); clearPickerStatus(); renderImageLibrary();}catch(error){setPickerStatus(error.message,'error');} }
function renderImageLibrary(){
  if(!$('#imageLibraryGrid')) return; const q=imageSearchInput.value.trim().toLowerCase(); const filtered=images.filter(i=>!q||[i.displayName,i.originalFileName].join(' ').toLowerCase().includes(q));
  imageLibraryGrid.innerHTML=filtered.length?filtered.map(i=>`<button class="image-library-item ${Number(selectedImage?.imageAssetId)===Number(i.imageAssetId)?'selected':''}" type="button" data-image-id="${i.imageAssetId}"><img src="${escapeHtml(i.contentUrl)}" alt="" loading="lazy"><span><strong>${escapeHtml(i.displayName||i.originalFileName)}</strong><small>${escapeHtml(i.originalFileName||'')}</small></span></button>`).join(''):`<div class="empty">${t().noImages}</div>`;
}
function selectLibraryImage(id){ selectedImage=images.find(i=>Number(i.imageAssetId)===Number(id))||null; imageAssetId.value=selectedImage?.imageAssetId||''; imagePickerDialog.close(); renderSelectedImage(); updatePreview(); }
function removeSelectedImage(){ selectedImage=null; imageAssetId.value=''; legacyImageUrl.value=''; renderSelectedImage(); updatePreview(); }

function chooseLocalImage(){ imageFileInput.value=''; imageFileInput.click(); }
async function fileChosen(){ const file=imageFileInput.files?.[0]; if(!file)return; if(!['image/jpeg','image/png','image/webp','image/gif'].includes(file.type)){toast('Unsupported image type.');return;} if(file.size>10*1024*1024){toast('Source image exceeds 10 MB.');return;} await openCropper(file); }
function openCropper(file){
  cleanupCropObjectUrl(); cropFile=file; cropObjectUrl=URL.createObjectURL(file); cropImage=new Image();
  cropImage.onload=()=>{ const canvas=cropCanvas; const fit=Math.max(canvas.width/cropImage.naturalWidth,canvas.height/cropImage.naturalHeight); cropScale=fit; cropOffsetX=(canvas.width-cropImage.naturalWidth*fit)/2; cropOffsetY=(canvas.height-cropImage.naturalHeight*fit)/2; cropZoom.value='1'; cropZoomValue.textContent='100%'; drawCrop(); if (!imageCropDialog.open) imageCropDialog.showModal(); };
  cropImage.onerror=()=>toast('The selected image could not be opened.'); cropImage.src=cropObjectUrl;
}
function drawCrop(){ if(!cropImage)return; const ctx=cropCanvas.getContext('2d'); ctx.clearRect(0,0,cropCanvas.width,cropCanvas.height); ctx.fillStyle='#fff'; ctx.fillRect(0,0,cropCanvas.width,cropCanvas.height); ctx.drawImage(cropImage,cropOffsetX,cropOffsetY,cropImage.naturalWidth*cropScale,cropImage.naturalHeight*cropScale); }
function clampCrop(){ if(!cropImage)return; const w=cropImage.naturalWidth*cropScale,h=cropImage.naturalHeight*cropScale; cropOffsetX=Math.min(0,Math.max(cropCanvas.width-w,cropOffsetX)); cropOffsetY=Math.min(0,Math.max(cropCanvas.height-h,cropOffsetY)); }
function updateCropZoom(){ if(!cropImage)return; const multiplier=Number(cropZoom.value); const oldW=cropImage.naturalWidth*cropScale,oldH=cropImage.naturalHeight*cropScale; const centerX=(cropCanvas.width/2-cropOffsetX)/oldW,centerY=(cropCanvas.height/2-cropOffsetY)/oldH; const fit=Math.max(cropCanvas.width/cropImage.naturalWidth,cropCanvas.height/cropImage.naturalHeight); cropScale=fit*multiplier; const newW=cropImage.naturalWidth*cropScale,newH=cropImage.naturalHeight*cropScale; cropOffsetX=cropCanvas.width/2-centerX*newW; cropOffsetY=cropCanvas.height/2-centerY*newH; clampCrop(); cropZoomValue.textContent=`${Math.round(multiplier*100)}%`; drawCrop(); }
function cropPointerDown(e){ cropDragging=true; cropCanvas.setPointerCapture(e.pointerId); cropPointerX=e.clientX; cropPointerY=e.clientY; cropCanvas.classList.add('dragging'); }
function cropPointerMove(e){ if(!cropDragging)return; const rect=cropCanvas.getBoundingClientRect(),ratio=cropCanvas.width/rect.width; cropOffsetX+=(e.clientX-cropPointerX)*ratio; cropOffsetY+=(e.clientY-cropPointerY)*ratio; cropPointerX=e.clientX; cropPointerY=e.clientY; clampCrop(); drawCrop(); }
function cropPointerUp(e){ cropDragging=false; if(cropCanvas.hasPointerCapture(e.pointerId))cropCanvas.releasePointerCapture(e.pointerId); cropCanvas.classList.remove('dragging'); }
function canvasBlob(){ return new Promise((resolve,reject)=>cropCanvas.toBlob(blob=>blob?resolve(blob):reject(new Error('Could not create cropped image.')),'image/jpeg',0.9)); }
async function useCroppedImage(){
  useCroppedImageButton.disabled=true; setCropStatus(t().uploading,'loading');
  try{ const blob=await canvasBlob(); const base=(nameEn.value.trim()||cropFile?.name?.replace(/\.[^.]+$/,'')||'product').slice(0,80); const file=new File([blob],`${safeFilePart(base)}.jpg`,{type:'image/jpeg'}); const form=new FormData(); form.append('file',file); form.append('displayName',base); form.append('createdBy','Product library'); const uploaded=await api(`${IMAGE_API}/upload`,{method:'POST',body:form}); selectedImage=uploaded; imageAssetId.value=uploaded.imageAssetId; legacyImageUrl.value=''; images.unshift(uploaded); clearCropStatus(); imageCropDialog.close(); renderSelectedImage(); updatePreview(); toast(t().imageReady); cleanupCropObjectUrl(); }
  catch(error){setCropStatus(`${t().uploadFailed}: ${error.message}`,'error');} finally{useCroppedImageButton.disabled=false;}
}
function safeFilePart(value){ return value.normalize('NFKD').replace(/[^a-zA-Z0-9_-]+/g,'-').replace(/^-+|-+$/g,'')||'product'; }
function cleanupCropObjectUrl(){ if(cropObjectUrl){URL.revokeObjectURL(cropObjectUrl);cropObjectUrl=null;} }

function showStatus(message,type){statusElement.textContent=message;statusElement.className=`status show ${type}`;} function clearStatus(){statusElement.textContent='';statusElement.className='status';}
function setPickerStatus(message,type){imagePickerStatus.textContent=message;imagePickerStatus.className=`status show ${type}`;} function clearPickerStatus(){imagePickerStatus.textContent='';imagePickerStatus.className='status';}
function setCropStatus(message,type){cropStatus.textContent=message;cropStatus.className=`status show ${type}`;} function clearCropStatus(){cropStatus.textContent='';cropStatus.className='status';}
function toast(message){toastElement.textContent=message;toastElement.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toastElement.classList.remove('show'),3200);}

const statusElement=$('#status'),toastElement=$('#toast');
languageSelect.value=language; applyTranslations();
languageSelect.addEventListener('change',()=>{language=languageSelect.value;localStorage.setItem('lunch-poc-language-v5',language);applyTranslations();});
newProductButton.addEventListener('click',openNewProduct); searchInput.addEventListener('input',render); showInactive.addEventListener('change',loadProducts); productForm.addEventListener('submit',saveProduct);
[nameEn,nameSv,nameFi,price,icon].forEach(control=>control.addEventListener('input',()=>{renderSelectedImage();updatePreview();}));
uploadImageButton.addEventListener('click',chooseLocalImage); chooseAnotherImageButton.addEventListener('click',chooseLocalImage); chooseImageButton.addEventListener('click',openImagePicker); removeImageButton.addEventListener('click',removeSelectedImage); imageFileInput.addEventListener('change',fileChosen); imageSearchInput.addEventListener('input',renderImageLibrary); useCroppedImageButton.addEventListener('click',useCroppedImage); cropZoom.addEventListener('input',updateCropZoom);
cropCanvas.addEventListener('pointerdown',cropPointerDown); cropCanvas.addEventListener('pointermove',cropPointerMove); cropCanvas.addEventListener('pointerup',cropPointerUp); cropCanvas.addEventListener('pointercancel',cropPointerUp);
imageLibraryGrid.addEventListener('click',event=>{const item=event.target.closest('[data-image-id]');if(item)selectLibraryImage(item.dataset.imageId);});
document.addEventListener('click',event=>{const closeButton=event.target.closest('[data-close]');if(closeButton){document.getElementById(closeButton.dataset.close).close();return;} const actionButton=event.target.closest('[data-action]');if(!actionButton)return; const product=products.find(item=>item.productId===Number(actionButton.dataset.id));if(!product)return;if(actionButton.dataset.action==='edit')openEditProduct(product);if(actionButton.dataset.action==='deactivate')deactivateProduct(product.productId);});
imageCropDialog.addEventListener('close',()=>{cropDragging=false;clearCropStatus();});
loadProducts();

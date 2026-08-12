const modal = document.getElementById('registrationModal');
const steps = [...document.querySelectorAll('.form-step')];
const progress = [...document.querySelectorAll('.modal-progress span')];
const form = document.getElementById('registrationForm');

function showStep(n){
  steps.forEach((s,i)=>s.classList.toggle('active', i===n-1));
  progress.forEach((p,i)=>p.classList.toggle('active', i<=n-1));
}
function openModal(){
  modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden'; showStep(1);
}
function closeModal(){
  modal.classList.remove('open'); modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
document.querySelectorAll('.register-btn,.mini-register').forEach(btn=>btn.addEventListener('click',openModal));
document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',closeModal));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

form.addEventListener('submit', e=>{e.preventDefault();showStep(2)});
document.querySelectorAll('.payment-option').forEach(opt=>opt.addEventListener('click',()=>{
  document.querySelectorAll('.payment-option').forEach(o=>o.classList.remove('selected')); opt.classList.add('selected');
}));
document.getElementById('payDemo').addEventListener('click',()=>{
  const name=document.getElementById('fullName').value.trim()||'Guest';
  document.getElementById('ticketName').textContent=name;
  document.getElementById('ticketRef').textContent='HUD-'+Math.floor(100000+Math.random()*900000);
  showStep(3);
});

const countries = [
  'All countries','Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia','Cameroon','Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros','Costa Rica','Croatia','Cuba','Cyprus','Czechia','Democratic Republic of the Congo','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia','Fiji','Finland','France','Gabon','Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Ivory Coast','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar','Namibia','Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway','Oman','Pakistan','Palau','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Republic of the Congo','Romania','Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe'
];
const countrySelect = document.getElementById('countrySelect');
const headerCountry = document.getElementById('headerCountry');
const summary = document.getElementById('countrySummary');
const heroCountryLabel = document.getElementById('heroCountryLabel');
const eventEmpty = document.getElementById('eventEmpty');
let activeStatus = 'all';
let activeCountry = 'Sierra Leone';

[countrySelect, headerCountry].forEach(select=>{
  countries.forEach(country=>{
    const option=document.createElement('option');
    option.value=country; option.textContent=country;
    if(country==='Sierra Leone') option.selected=true;
    select.appendChild(option);
  });
});

function applyEventFilters(){
  let visible=0;
  document.querySelectorAll('.event-card').forEach(card=>{
    const statusMatches = activeStatus==='all' || card.dataset.status===activeStatus;
    const countryMatches = activeCountry==='All countries' || card.dataset.country===activeCountry;
    const show=statusMatches && countryMatches;
    card.classList.toggle('hidden',!show);
    if(show) visible++;
  });
  const countryText=activeCountry==='All countries'?'all countries':activeCountry;
  const statusText=activeStatus==='all'?'events':activeStatus+' events';
  summary.textContent=`Showing ${statusText} in ${countryText}`;
  heroCountryLabel.textContent=`HuD Events · ${activeCountry==='All countries'?'Global':activeCountry}`;
  eventEmpty.hidden=visible>0;
}

function setCountry(country){
  activeCountry=country;
  countrySelect.value=country;
  headerCountry.value=country;
  applyEventFilters();
}
countrySelect.addEventListener('change',()=>setCountry(countrySelect.value));
headerCountry.addEventListener('change',()=>{setCountry(headerCountry.value);document.getElementById('events').scrollIntoView({behavior:'smooth'});});
document.getElementById('viewSierraLeone').addEventListener('click',()=>setCountry('Sierra Leone'));

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  activeStatus=btn.dataset.filter;
  applyEventFilters();
}));
applyEventFilters();

const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav-links');
menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

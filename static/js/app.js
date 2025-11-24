
document.addEventListener('DOMContentLoaded', function(){
  // Simple client-side "router" using data-section attributes
  document.querySelectorAll('[data-link]').forEach(el=>{
    el.addEventListener('click', (e)=>{
      e.preventDefault();
      const target = el.getAttribute('data-link');
      document.querySelectorAll('[data-section]').forEach(s=>s.style.display='none');
      document.querySelector('[data-section="'+target+'"]').style.display='block';
      if(target==='map') initMap(); 
    });
  });

  // EJEMPLO OFERTAS
  window.offers = [
    {id:1, title:'Bananas maduras', qty:'20 kg', exp:'2 días', location:'Valledupar', lat:5.030, lng:-73.786},
    {id:2, title:'Pan del día', qty:'50 unidades', exp:'1 día', location:'Gachetá', lat:4.966, lng:-73.784},
    {id:3, title:'Verduras mixtas', qty:'15 kg', exp:'3 días', location:'Bogota', lat:5.032, lng:-73.790}
  ];
  renderOffers();

  // Nueva Oferta (Simulacion)
  const form = document.getElementById('newOfferForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const title = form.title.value || 'Oferta anónima';
      const qty = form.qty.value || '1';
      const loc = form.location.value || 'Sin ubicación';
      const id = window.offers.length+1;
      window.offers.push({id:id,title:title,qty:qty,exp:'por definir',location:loc,lat:5.03+Math.random()*0.02,lng:-73.786+Math.random()*0.02});
      renderOffers();
      alert('Oferta creada (simulada). Aparecerá en la lista.');
      form.reset();
      document.querySelectorAll('[data-section]').forEach(s=>s.style.display='none');
      document.querySelector('[data-section="offers"]').style.display='block';
    });
  }
});

function renderOffers(){
  const list = document.getElementById('offersList');
  if(!list) return;
  list.innerHTML = '';
  window.offers.forEach(o=>{
    const div = document.createElement('div');
    div.className='offer-card';
    div.innerHTML = `<div style="width:56px;height:56px;border-radius:10px;background:linear-gradient(180deg,#2fae4a,#1f7a2e);display:flex;align-items:center;justify-content:center;color:white;font-weight:700">FO</div>
      <div class="offer-meta">
        <div class="offer-title">${o.title}</div>
        <div class="offer-sub">${o.qty} • ${o.location} • Vence: ${o.exp}</div>
      </div>
      <div><a class="btn-sm" href="#" onclick="viewOffer(${o.id});return false;">Ver</a></div>`;
    list.appendChild(div);
  });
}

function viewOffer(id){
  const o = window.offers.find(x=>x.id===id);
  if(!o) return alert('Oferta no encontrada');
  document.getElementById('offerDetailTitle').innerText = o.title;
  document.getElementById('offerDetailMeta').innerText = `${o.qty} • ${o.location} • Vence: ${o.exp}`;
  document.querySelectorAll('[data-section]').forEach(s=>s.style.display='none');
  document.querySelector('[data-section="offerDetail"]').style.display='block';
}

var mapInitialized = false;
function initMap(){
  if(mapInitialized) return;
  mapInitialized = true;
  var map = L.map('mapid').setView([5.03, -73.79], 11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap'
  }).addTo(map);
  window.offers.forEach(o=>{
    L.marker([o.lat, o.lng]).addTo(map).bindPopup(`<b>${o.title}</b><br>${o.qty}<br>${o.location}`);
  });
}

document.addEventListener('DOMContentLoaded',()=>{
 const reg=document.getElementById('registerForm');
 if(reg){
  reg.addEventListener('submit',e=>{
    e.preventDefault();
    alert('Registro exitoso (simulado)');
    document.querySelectorAll('[data-section]').forEach(s=>s.style.display='none');
    document.querySelector('[data-section="login"]').style.display='block';
  });
 }
});

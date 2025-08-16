
// Paradise Nursery - carrito con localStorage
const PRODUCTS = [
  {
    "id": "albahaca",
    "name": "Albahaca",
    "description": "Hierba aromática ideal para pastas y pestos. Maceta 12 cm.",
    "price": 12000,
    "section": "aromaticas",
    "image": "assets/albahaca.png"
  },
  {
    "id": "menta",
    "name": "Menta",
    "description": "Aromática refrescante para infusiones y postres. Maceta 12 cm.",
    "price": 11000,
    "section": "aromaticas",
    "image": "assets/menta.png"
  },
  {
    "id": "romero",
    "name": "Romero",
    "description": "Aromática resistente para carnes y asados. Maceta 15 cm.",
    "price": 15000,
    "section": "aromaticas",
    "image": "assets/romero.png"
  },
  {
    "id": "manzanilla",
    "name": "Manzanilla",
    "description": "Planta medicinal calmante para infusiones. Maceta 12 cm.",
    "price": 13000,
    "section": "medicinales",
    "image": "assets/manzanilla.png"
  },
  {
    "id": "aloe",
    "name": "Aloe Vera",
    "description": "Suculenta medicinal para cuidados de la piel. Maceta 15 cm.",
    "price": 18000,
    "section": "medicinales",
    "image": "assets/aloe.png"
  },
  {
    "id": "lavanda",
    "name": "Lavanda",
    "description": "Planta relajante y ornamental, gran aroma. Maceta 15 cm.",
    "price": 16000,
    "section": "medicinales",
    "image": "assets/lavanda.png"
  }
];

function formatCOP(value) { 
  return value.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }); 
}

function getCart() { 
  const raw = localStorage.getItem('pn_cart'); 
  return raw ? JSON.parse(raw) : {}; 
}
function setCart(cart) { localStorage.setItem('pn_cart', JSON.stringify(cart)); updateCartBadge(); }

function addToCart(id, qty=1) { 
  const cart = getCart(); 
  cart[id] = (cart[id] || 0) + qty; 
  setCart(cart);
  toast('Agregado al carrito');
}
function removeFromCart(id) { const cart = getCart(); delete cart[id]; setCart(cart); }
function setQty(id, qty) { const cart = getCart(); if(qty<=0) delete cart[id]; else cart[id]=qty; setCart(cart); }

function updateCartBadge() { 
  const cart = getCart(); 
  const count = Object.values(cart).reduce((a,b)=>a+b,0); 
  const badge = document.getElementById('cart-count'); 
  if (badge) badge.textContent = count; 
}

function productById(id) { return PRODUCTS.find(p=>p.id===id); }

function renderProducts(sectionId, filterSection) { 
  const container = document.getElementById(sectionId);
  if (!container) return;
  container.innerHTML = '';
  PRODUCTS.filter(p=>p.section===filterSection).forEach(p=>{
    const card = document.createElement('div');
    card.className='card';
    card.innerHTML = `
      <img src="${p.image}" alt="Foto de ${p.name}">
      <div class="content">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="price">${formatCOP(p.price)}</div>
        <button class="btn" data-id="${p.id}">Agregar al carrito</button>
      </div>
    `;
    container.appendChild(card);
  });
  container.querySelectorAll('button[data-id]').forEach(btn=>{
    btn.addEventListener('click', e=> addToCart(e.target.getAttribute('data-id'), 1));
  });
}

function renderAllProducts(gridId) { 
  const container = document.getElementById(gridId);
  if (!container) return;
  container.innerHTML = '';
  PRODUCTS.forEach(p=>{
    const card = document.createElement('div');
    card.className='card';
    card.innerHTML = `
      <img src="${p.image}" alt="Foto de ${p.name}">
      <div class="content">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="price">${formatCOP(p.price)}</div>
        <button class="btn" data-id="${p.id}">Agregar al carrito</button>
      </div>
    `;
    container.appendChild(card);
  });
  container.querySelectorAll('button[data-id]').forEach(btn=>{
    btn.addEventListener('click', e=> addToCart(e.target.getAttribute('data-id'), 1));
  });
}

function renderCart(listId, totalId) { 
  const list = document.getElementById(listId);
  const totalEl = document.getElementById(totalId);
  if (!list || !totalEl) return;
  const cart = getCart();
  list.innerHTML = '';
  let total = 0;

  Object.entries(cart).forEach(([id, qty])=>{
    const p = productById(id);
    const itemTotal = p.price * qty;
    total += itemTotal;
    const row = document.createElement('div');
    row.className='cart-item';
    row.innerHTML = `
      <img src="${p.image}" alt="Miniatura de ${p.name}">
      <div>
        <h3>${p.name}</h3>
        <p>${p.description}</p>
      </div>
      <div class="price">${formatCOP(p.price)}<br><small>Subtotal: ${formatCOP(itemTotal)}</small></div>
      <div class="controls">
        <div class="qty-control">
          <button aria-label="Disminuir" data-action="dec" data-id="${id}">-</button>
          <span aria-live="polite">${qty}</span>
          <button aria-label="Aumentar" data-action="inc" data-id="${id}">+</button>
        </div>
        <button class="remove" data-action="remove" data-id="${id}">Eliminar</button>
      </div>
    `;
    list.appendChild(row);
  });

  totalEl.textContent = formatCOP(total);

  list.querySelectorAll('button[data-action]').forEach(btn=>{
    const id = btn.getAttribute('data-id');
    const action = btn.getAttribute('data-action');
    btn.addEventListener('click', ()=>{
      const cart = getCart();
      const qty = cart[id] || 0;
      if (action==='inc') setQty(id, qty+1);
      if (action==='dec') setQty(id, qty-1);
      if (action==='remove') removeFromCart(id);
      renderCart(listId, totalId);
    });
  });
}

function clearCart() { localStorage.removeItem('pn_cart'); updateCartBadge(); }

function toast(msg) {
  let t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(()=> t.classList.add('show'), 10);
  setTimeout(()=> { t.classList.remove('show'); setTimeout(()=> t.remove(), 300); }, 2000);
}
document.addEventListener('DOMContentLoaded', updateCartBadge);

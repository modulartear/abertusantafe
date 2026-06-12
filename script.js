const products = [
  {
    id: "puerta-placa-madera",
    name: "Puerta placa madera cedro 080",
    categories: ["puertas", "madera"],
    badge: "Nuevo",
    price: 315000,
    description: "Puerta interior de madera para dormitorios, pasillos y espacios de uso diario.",
    features: ["Modelo liso para pintar", "Medida comercial 080", "Herrajes compatibles disponibles"],
    images: [
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=900&q=82"
    ]
  },
  {
    id: "puerta-aluminio-frente",
    name: "Puerta aluminio blanco reforzada",
    categories: ["puertas", "aluminio"],
    price: 392000,
    description: "Puerta de aluminio para frente o acceso secundario, practica y de bajo mantenimiento.",
    features: ["Terminacion blanca", "Hoja reforzada", "Consulta por variantes de vidrio"],
    images: [
      "https://images.unsplash.com/photo-1600566752734-2a0c785aa2f9?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=82"
    ]
  },
  {
    id: "plegadiza-pvc",
    name: "Puerta plegadiza PVC ciega blanca",
    categories: ["puertas", "pvc", "outlet"],
    badge: "Promo",
    oldPrice: 108800,
    price: 81177,
    description: "Puerta plegadiza de PVC para interiores, ideal para separar espacios con poco radio de apertura.",
    features: ["Color blanco", "Liviana y lavable", "Disponible por medida comercial"],
    images: [
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=82"
    ]
  },
  {
    id: "ventana-modena",
    name: "Ventana aluminio Modena 120x110",
    categories: ["ventanas", "aluminio", "outlet"],
    badge: "Oferta",
    oldPrice: 343332,
    price: 308999,
    description: "Ventana corrediza de aluminio Modena con excelente entrada de luz para ambientes principales.",
    features: ["Aluminio blanco", "Vidrio y mosquitero segun disponibilidad", "Medida comercial 120x110"],
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=82"
    ]
  },
  {
    id: "ventana-pvc-dvh",
    name: "Ventana PVC corrediza con DVH",
    categories: ["ventanas", "pvc"],
    price: 577940,
    description: "Abertura de PVC con doble vidrio para mejor aislacion termica y acustica.",
    features: ["Perfileria PVC", "Doble vidrio hermetico", "Consulta por colores disponibles"],
    images: [
      "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=900&q=82"
    ]
  },
  {
    id: "ventana-madera",
    name: "Ventana madera vidrio repartido",
    categories: ["ventanas", "madera"],
    price: 343793,
    description: "Ventana de madera para proyectos calidos, rusticos o clasicos.",
    features: ["Madera natural", "Vidrio repartido", "Consultar medidas y stock"],
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=82"
    ]
  },
  {
    id: "vanitory-bano",
    name: "Vanitory suspendido con bacha",
    categories: ["bano"],
    badge: "Stock",
    price: 149000,
    description: "Amoblamiento de bano moderno con guardado practico y estilo minimalista.",
    features: ["Modelos con bacha incluida", "Terminaciones claras y oscuras", "Medidas comerciales disponibles"],
    images: [
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=82"
    ]
  },
  {
    id: "espejo-bano",
    name: "Espejo botiquin para bano",
    categories: ["bano", "outlet"],
    badge: "Outlet",
    oldPrice: 92000,
    price: 69000,
    description: "Botiquin funcional con espejo para completar el amoblamiento del bano.",
    features: ["Guardado superior", "Frente espejado", "Consultar medidas disponibles"],
    images: [
      "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=900&q=82",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=82"
    ]
  }
];

const categoryLabels = {
  todos: "Productos destacados",
  puertas: "Puertas",
  ventanas: "Ventanas",
  aluminio: "Aberturas de aluminio",
  pvc: "Aberturas de PVC",
  madera: "Aberturas de madera",
  bano: "Muebles y accesorios de bano",
  outlet: "Outlet"
};

const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0
});

const state = {
  category: "todos",
  selectedId: products[0].id,
  cart: new Map()
};

const grid = document.querySelector("[data-product-grid]");
const tabs = document.querySelector("[data-category-tabs]");
const catalogTitle = document.querySelector("[data-catalog-title]");
const detailImage = document.querySelector("[data-detail-image]");
const detailThumbs = document.querySelector("[data-detail-thumbs]");
const detailCategory = document.querySelector("[data-detail-category]");
const detailName = document.querySelector("[data-detail-name]");
const detailDescription = document.querySelector("[data-detail-description]");
const detailFeatures = document.querySelector("[data-detail-features]");
const detailPrice = document.querySelector("[data-detail-price]");
const detailAdd = document.querySelector("[data-detail-add]");
const cartDrawer = document.querySelector("[data-cart-drawer]");
const cartItems = document.querySelector("[data-cart-items]");
const cartCount = document.querySelector("[data-cart-count]");
const cartSummary = document.querySelector("[data-cart-summary]");
const cartTotal = document.querySelector("[data-cart-total]");

function productMatches(product) {
  return state.category === "todos" || product.categories.includes(state.category);
}

function filteredProducts() {
  return products.filter(productMatches);
}

function renderProducts() {
  catalogTitle.textContent = categoryLabels[state.category] || "Productos destacados";
  grid.innerHTML = filteredProducts()
    .map(
      (product) => `
        <article class="product-card ${product.id === state.selectedId ? "active" : ""}" data-product-id="${product.id}">
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
          <img src="${product.images[0]}" alt="${product.name}">
          <div class="product-body">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
          </div>
          <div class="price-block">
            ${product.oldPrice ? `<span class="old-price">${currency.format(product.oldPrice)}</span>` : ""}
            <strong>${currency.format(product.price)}</strong>
          </div>
          <footer>
            <button class="view-button" type="button" data-view="${product.id}">Vista rapida</button>
            <button type="button" data-add="${product.id}" aria-label="Añadir ${product.name}">
              <i data-lucide="shopping-cart"></i>
            </button>
          </footer>
        </article>
      `
    )
    .join("");
  refreshIcons();
}

function selectProduct(productId, imageIndex = 0, scroll = false) {
  const product = products.find((item) => item.id === productId) || products[0];
  state.selectedId = product.id;
  detailImage.src = product.images[imageIndex];
  detailImage.alt = product.name;
  detailCategory.textContent = product.categories.join(" / ");
  detailName.textContent = product.name;
  detailDescription.textContent = product.description;
  detailPrice.textContent = currency.format(product.price);
  detailFeatures.innerHTML = product.features.map((feature) => `<li>${feature}</li>`).join("");
  detailThumbs.innerHTML = product.images
    .map(
      (image, index) => `
        <button class="${index === imageIndex ? "active" : ""}" type="button" data-thumb="${index}" aria-label="Ver foto ${index + 1}">
          <img src="${image}" alt="">
        </button>
      `
    )
    .join("");
  detailAdd.dataset.detailAdd = product.id;
  renderProducts();
  if (scroll) document.querySelector("[data-product-detail]").scrollIntoView({ behavior: "smooth", block: "center" });
}

function setCategory(category) {
  state.category = category;
  tabs.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item.dataset.category === category));
  const first = filteredProducts()[0] || products[0];
  selectProduct(first.id);
}

function addToCart(productId) {
  const current = state.cart.get(productId) || 0;
  state.cart.set(productId, current + 1);
  renderCart();
}

function removeFromCart(productId) {
  const current = state.cart.get(productId) || 0;
  if (current <= 1) {
    state.cart.delete(productId);
  } else {
    state.cart.set(productId, current - 1);
  }
  renderCart();
}

function renderCart() {
  const lines = [...state.cart.entries()].map(([id, qty]) => {
    const product = products.find((item) => item.id === id);
    return { product, qty, subtotal: product.price * qty };
  });

  const units = lines.reduce((sum, line) => sum + line.qty, 0);
  const total = lines.reduce((sum, line) => sum + line.subtotal, 0);

  cartCount.textContent = units;
  cartSummary.textContent = `${units} ${units === 1 ? "producto" : "productos"}`;
  cartTotal.textContent = currency.format(total);

  if (!lines.length) {
    cartItems.innerHTML = `<p class="empty-cart">Todavia no agregaste productos.</p>`;
    return;
  }

  cartItems.innerHTML = lines
    .map(
      ({ product, qty, subtotal }) => `
        <div class="cart-line">
          <div>
            <strong>${product.name}</strong>
            <small>${qty} x ${currency.format(product.price)}</small>
          </div>
          <strong>${currency.format(subtotal)}</strong>
          <button type="button" data-remove="${product.id}" aria-label="Quitar ${product.name}">
            <i data-lucide="minus"></i>
          </button>
        </div>
      `
    )
    .join("");
  refreshIcons();
}

function openCart() {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

document.addEventListener("click", (event) => {
  const categoryTarget = event.target.closest("[data-category-shortcut], [data-nav-category]");
  if (categoryTarget) {
    setCategory(categoryTarget.dataset.categoryShortcut || categoryTarget.dataset.navCategory);
  }
});

tabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  setCategory(button.dataset.category);
});

grid.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  if (addButton) {
    addToCart(addButton.dataset.add);
    openCart();
    return;
  }

  const viewButton = event.target.closest("[data-view]");
  if (viewButton) {
    selectProduct(viewButton.dataset.view, 0, true);
    return;
  }

  const card = event.target.closest("[data-product-id]");
  if (card) {
    selectProduct(card.dataset.productId);
  }
});

detailThumbs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-thumb]");
  if (!button) return;
  selectProduct(state.selectedId, Number(button.dataset.thumb));
});

detailAdd.addEventListener("click", () => {
  addToCart(detailAdd.dataset.detailAdd);
  openCart();
});

document.querySelector("[data-cart-open]").addEventListener("click", openCart);
document.querySelector("[data-cart-close]").addEventListener("click", closeCart);

cartDrawer.addEventListener("click", (event) => {
  if (event.target === cartDrawer) closeCart();
  const removeButton = event.target.closest("[data-remove]");
  if (removeButton) removeFromCart(removeButton.dataset.remove);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeCart();
});

window.addEventListener("load", refreshIcons);

selectProduct(products[0].id);
renderCart();

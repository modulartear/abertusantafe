import { useEffect } from "react";
import "./bicicleteria_laprida.css";

/* Animaciones de entrada al hacer scroll (IntersectionObserver nativo, sin librerías) */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]:not(.is-visible)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

const normalizeCategory = (c) =>
  typeof c === "string"
    ? { value: c, label: c }
    : {
        value: c.value ?? c.id ?? c.slug ?? c.name,
        label: c.label ?? c.name ?? String(c.value ?? c.id ?? ""),
      };

export default function BicicleteriaLaprida(props) {
  const {
    Header,
    ProductCard,
    WhatsAppButton,
    BrandsStrip,
    BusinessMap,
    Cart,
    cart,
    cartOpen,
    setCartOpen,
    search,
    setSearch,
    settings = {},
    navigation = [],
    category,
    setCategory,
    catalogCategories = [],
    visible = [],
    brands = [],
  } = props;

  useReveal();

  const s = settings;
  const categories = catalogCategories.map(normalizeCategory);

  const cartCount = cart?.count ?? 0;

  const digits = String(s.whatsapp || "").replace(/\D/g, "");
  const waHref = digits ? `https://wa.me/${digits}` : undefined;
  const mapHref = s.map_query
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.map_query)}`
    : undefined;

  const themeStyle = {
    "--bl-primary": s.primary_color || "#0b1f2a",
    "--bl-secondary": s.secondary_color || "#e9f1ee",
    "--bl-accent": s.accent_color || "#ff5a1f",
    "--bl-danger": s.danger_color || "#e11d48",
  };

  return (
    <div className="bl-theme" style={themeStyle}>
      <a className="bl-skip" href="#catalogo">Ir al catálogo</a>

      <Header
        settings={s}
        count={cartCount}
        navigation={navigation}
        search={search}
        setSearch={setSearch}
        cart={cart}
        onCart={() => setCartOpen(true)}
        setCartOpen={setCartOpen}
        category={category}
        setCategory={setCategory}
        catalogCategories={catalogCategories}
      />

      {/* Navegación secundaria con anclas */}
      <nav className="bl-nav" aria-label="Navegación principal">
        <div className="bl-container bl-nav__inner">
          {navigation.map((item) => (
            <a key={item.id || item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <main>
        {/* 2. HERO */}
        <section className="bl-hero" id="inicio" aria-labelledby="bl-hero-title">
          <div className="bl-hero__blob bl-hero__blob--a" aria-hidden="true" />
          <div className="bl-hero__blob bl-hero__blob--b" aria-hidden="true" />
          <div className="bl-container bl-hero__grid">
            <div className="bl-hero__copy" data-reveal>
              {s.hero_badge && <span className="bl-badge">{s.hero_badge}</span>}
              <h1 id="bl-hero-title" className="bl-hero__title">
                {s.hero_title || s.business_name}
              </h1>
              {s.hero_subtitle && (
                <p className="bl-hero__subtitle">{s.hero_subtitle}</p>
              )}
              <div className="bl-hero__actions">
                <a className="bl-btn bl-btn--primary" href="#catalogo">
                  Ver catálogo
                </a>
                {waHref && (
                  <a
                    className="bl-btn bl-btn--ghost"
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Escribinos por WhatsApp
                  </a>
                )}
              </div>
            </div>

            <div className="bl-hero__media" data-reveal>
              {s.hero_image_url ? (
                <img
                  src={s.hero_image_url}
                  alt={s.hero_title || s.business_name || "Imagen principal"}
                  loading="eager"
                  decoding="async"
                />
              ) : (
                <div className="bl-placeholder" role="img" aria-label="Imagen no disponible">
                  <span>{s.business_name}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 3 y 4. CATEGORÍAS + CATÁLOGO */}
        <section className="bl-catalog" id="catalogo" aria-labelledby="bl-catalog-title">
          <div className="bl-container">
            <header className="bl-section-head" data-reveal>
              <span className="bl-eyebrow">Catálogo</span>
              <h2 id="bl-catalog-title">Encontrá tu próxima bici</h2>
            </header>

            <div className="bl-toolbar" data-reveal>
              <div className="bl-chips" role="group" aria-label="Filtrar por categoría">
                <button
                  type="button"
                  className="bl-chip"
                  aria-pressed={category === "todos" || !category}
                  onClick={() => setCategory("todos")}
                >
                  Todas
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    className="bl-chip"
                    aria-pressed={category === cat.value}
                    onClick={() => setCategory(cat.value)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <label className="bl-search">
                <span className="visually-hidden">Buscar productos</span>
                <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
                  <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                  type="search"
                  placeholder="Buscar bicicletas, marcas, accesorios…"
                  value={search ?? ""}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
            </div>

            {visible.length > 0 ? (
              <div className="bl-grid">
                {visible.map((product, index) => (
                  <div
                    key={product.id}
                    className="bl-card-wrap"
                    data-reveal
                    style={{ "--i": index % 8 }}
                  >
                    <ProductCard
                      product={product}
                      logo={settings.logo_url}
                      onAdd={() => {
                        cart.add(product);
                        setCartOpen(true);
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="bl-empty" role="status">
                No hay productos para mostrar con los filtros actuales.
              </p>
            )}
          </div>
        </section>

        {/* 6. MARCAS (opcional) */}
        {s.brands_enabled && (
          <section className="bl-brands" aria-label="Marcas">
            <div className="bl-container" data-reveal>
              <BrandsStrip brands={brands} />
            </div>
          </section>
        )}

        {/* 7. MAPA (opcional) */}
        {s.map_enabled && (
          <section className="bl-map" id="ubicacion" aria-labelledby="bl-map-title">
            <div className="bl-container">
              <header className="bl-section-head" data-reveal>
                <span className="bl-eyebrow">Ubicación</span>
                <h2 id="bl-map-title">Visitanos en el local</h2>
              </header>
              <div className="bl-map__frame" data-reveal>
                <BusinessMap settings={s} />
              </div>
            </div>
          </section>
        )}

        {/* 8. CONTACTO */}
        <section className="bl-contact" id="contacto" aria-labelledby="bl-contact-title">
          <div className="bl-container bl-contact__grid">
            <div data-reveal>
              <span className="bl-eyebrow">Contacto</span>
              <h2 id="bl-contact-title">{s.contact_title || "Hablemos"}</h2>
              {s.contact_subtitle && <p className="bl-contact__subtitle">{s.contact_subtitle}</p>}
            </div>

            <ul className="bl-contact__list" data-reveal>
              {s.phone && (
                <li>
                  <span>Teléfono</span>
                  <a href={`tel:${s.phone}`}>{s.phone}</a>
                </li>
              )}
              {s.whatsapp && (
                <li>
                  <span>WhatsApp</span>
                  <a href={waHref} target="_blank" rel="noopener noreferrer">{s.whatsapp}</a>
                </li>
              )}
              {s.email && (
                <li>
                  <span>Email</span>
                  <a href={`mailto:${s.email}`}>{s.email}</a>
                </li>
              )}
              {s.address && (
                <li>
                  <span>Dirección</span>
                  {mapHref ? (
                    <a href={mapHref} target="_blank" rel="noopener noreferrer">{s.address}</a>
                  ) : (
                    <p>{s.address}</p>
                  )}
                </li>
              )}
              {s.schedule && (
                <li>
                  <span>Horario</span>
                  <p>{s.schedule}</p>
                </li>
              )}
            </ul>
          </div>
        </section>
      </main>

      <footer className="bl-footer">
        <div className="bl-container bl-footer__inner">
          {s.logo_url && <img src={s.logo_url} alt="" className="bl-footer__logo" />}
          <p>
            © {new Date().getFullYear()} {s.business_name}
          </p>
        </div>
      </footer>

      {/* 5. CARRITO (flotante + componente del sistema) */}
      <button
        type="button"
        className="bl-cart-fab"
        onClick={() => setCartOpen(true)}
        aria-label={`Abrir carrito, ${cartCount} productos`}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" width="22" height="22">
          <path d="M3 4h2l2.4 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="10" cy="20" r="1.5" fill="currentColor" />
          <circle cx="17" cy="20" r="1.5" fill="currentColor" />
        </svg>
        {cartCount > 0 && <span className="bl-cart-fab__count">{cartCount}</span>}
      </button>

      {cartOpen && <Cart cart={cart} close={() => setCartOpen(false)} />}

      {/* 9. WHATSAPP */}
      <WhatsAppButton number={s.whatsapp} />
    </div>
  );
}

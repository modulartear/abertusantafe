import './Mercato.css';

/* Las categorías pueden llegar como texto o como objeto: se aceptan ambos formatos. */
const categoryLabel = (c) =>
  typeof c === 'string' ? c : c?.label || c?.name || c?.title || String(c?.id ?? '');
const categoryValue = (c) =>
  typeof c === 'string' ? c : c?.value ?? c?.id ?? c?.slug ?? c?.name ?? c?.label ?? '';

export default function Mercato(props) {
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

  const whatsappDigits = String(settings.whatsapp || '').replace(/\D/g, '');
  const phoneDigits = String(settings.phone || '').replace(/[^\d+]/g, '');
  const initial = String(settings.business_name || '').trim().charAt(0).toUpperCase();

  const themeVars = {
    '--mc-primary': settings.primary_color || undefined,
    '--mc-secondary': settings.secondary_color || undefined,
    '--mc-accent': settings.accent_color || undefined,
    '--mc-danger': settings.danger_color || undefined,
  };

  const hasContactData =
    settings.phone || settings.whatsapp || settings.email || settings.address || settings.schedule;

  return (
    <div className="mercato" style={themeVars}>
      <a className="mercato-skip" href="#catalogo">
        Saltar al catálogo
      </a>

      {/* 1. Header del sistema */}
      <Header
        settings={settings}
        cart={cart}
        search={search}
        setSearch={setSearch}
        navigation={navigation}
        onCart={() => setCartOpen(true)}
      />

      {/* Navegación del sitio */}
      {navigation.length > 0 && (
        <nav className="mercato-nav" aria-label="Secciones del sitio">
          <div className="mercato-container mercato-nav__inner">
            {navigation.map((item) => (
              <a key={item.id || item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}

      <main>
        {/* 2. Hero configurable */}
        <section className="mercato-hero" id="inicio" aria-labelledby="mercato-hero-title">
          <div className="mercato-container mercato-hero__inner">
            <div className="mercato-hero__copy">
              {settings.hero_badge && <p className="mercato-badge">{settings.hero_badge}</p>}
              <h1 id="mercato-hero-title">{settings.hero_title || settings.business_name}</h1>
              {settings.hero_subtitle && (
                <p className="mercato-hero__subtitle">{settings.hero_subtitle}</p>
              )}
              <div className="mercato-hero__actions">
                <a className="mercato-btn mercato-btn--primary" href="#catalogo">
                  Ver productos
                </a>
                {hasContactData && (
                  <a className="mercato-btn mercato-btn--ghost" href="#contacto">
                    Contactar
                  </a>
                )}
              </div>
            </div>

            <div className="mercato-hero__media">
              <div className="mercato-hero__frame">
                <div className="mercato-hero__placeholder" aria-hidden="true">
                  {initial}
                </div>
                {settings.hero_image_url && (
                  <img
                    src={settings.hero_image_url}
                    alt={settings.business_name || ''}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 3 y 4. Categorías + catálogo */}
        <section className="mercato-catalog" id="catalogo" aria-labelledby="mercato-catalog-title">
          <div className="mercato-container">
            <div className="mercato-catalog__head">
              <h2 id="mercato-catalog-title">Catálogo</h2>
              <label className="mercato-search">
                <span className="mercato-sr">Buscar productos</span>
                <input
                  type="search"
                  value={search || ''}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar productos"
                />
              </label>
            </div>

            {catalogCategories.length > 0 && (
              <div className="mercato-categories" role="group" aria-label="Filtrar por categoría">
                {catalogCategories.map((c) => {
                  const value = categoryValue(c);
                  const active = value === category;
                  return (
                    <button
                      key={value || categoryLabel(c)}
                      type="button"
                      className={`mercato-chip${active ? ' is-active' : ''}`}
                      aria-pressed={active}
                      onClick={() => setCategory(value)}
                    >
                      {categoryLabel(c)}
                    </button>
                  );
                })}
              </div>
            )}

            {visible.length > 0 ? (
              <div className="mercato-grid">
                {visible.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    logo={settings.logo_url}
                    onAdd={() => {
                      cart.add(product);
                      setCartOpen(true);
                    }}
                  />
                ))}
              </div>
            ) : (
              <p className="mercato-empty" role="status">
                No encontramos productos con esos filtros. Probá con otra categoría o borrá la búsqueda.
              </p>
            )}
          </div>
        </section>

        {/* 6. Marcas (opcional) */}
        {settings.brands_enabled && (
          <section className="mercato-section mercato-brands" id="marcas" aria-label="Marcas">
            <div className="mercato-container">
              <BrandsStrip brands={brands} />
            </div>
          </section>
        )}

        {/* 7. Mapa (opcional) */}
        {settings.map_enabled && (
          <section className="mercato-section mercato-map" id="ubicacion" aria-label="Ubicación">
            <div className="mercato-container">
              <BusinessMap settings={settings} />
            </div>
          </section>
        )}

        {/* 8. Contacto */}
        <section className="mercato-contact" id="contacto" aria-labelledby="mercato-contact-title">
          <div className="mercato-container mercato-contact__inner">
            <div className="mercato-contact__intro">
              <h2 id="mercato-contact-title">{settings.contact_title || 'Contacto'}</h2>
              {settings.contact_subtitle && <p>{settings.contact_subtitle}</p>}
              {whatsappDigits && (
                <a
                  className="mercato-btn mercato-btn--accent"
                  href={`https://wa.me/${whatsappDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Escribir por WhatsApp
                </a>
              )}
            </div>

            {hasContactData && (
              <dl className="mercato-contact__list">
                {settings.phone && (
                  <div>
                    <dt>Teléfono</dt>
                    <dd>
                      <a href={`tel:${phoneDigits}`}>{settings.phone}</a>
                    </dd>
                  </div>
                )}
                {settings.email && (
                  <div>
                    <dt>Email</dt>
                    <dd>
                      <a href={`mailto:${settings.email}`}>{settings.email}</a>
                    </dd>
                  </div>
                )}
                {settings.address && (
                  <div>
                    <dt>Dirección</dt>
                    <dd>
                      {settings.map_query ? (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            settings.map_query
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {settings.address}
                        </a>
                      ) : (
                        settings.address
                      )}
                    </dd>
                  </div>
                )}
                {settings.schedule && (
                  <div>
                    <dt>Horarios</dt>
                    <dd className="mercato-schedule">{settings.schedule}</dd>
                  </div>
                )}
              </dl>
            )}
          </div>
        </section>
      </main>

      <footer className="mercato-footer">
        <div className="mercato-container mercato-footer__inner">
          {settings.logo_url && (
            <img src={settings.logo_url} alt="" className="mercato-footer__logo" />
          )}
          <p>
            © {new Date().getFullYear()} {settings.business_name}
          </p>
        </div>
      </footer>

      {/* 5. Carrito del sistema */}
      <Cart
        cart={cart}
        close={() => setCartOpen(false)}
        settings={settings}
      />

      {/* 9. WhatsApp */}
      <WhatsAppButton number={settings.whatsapp} />
    </div>
  );
}

export default function BrandsStrip({ brands = [] }) {
  if (!brands.length) return null;
  const items = [...brands, ...brands];
  return <section className="brands-strip" aria-label="Marcas con las que trabajamos"><div className="brands-heading"><span className="section-kicker">Trabajamos con</span><span>Calidad que se reconoce</span></div><div className="brands-marquee"><div className="brands-track">{items.map((brand, index) => <div className="brand-item" key={`${brand.id || brand.name}-${index}`}>{brand.logo_url ? <img src={brand.logo_url} alt={brand.name} /> : <strong>{brand.name}</strong>}</div>)}</div></div></section>;
}

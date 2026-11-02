export default function BusinessMap({ settings }) {
  const query = settings.map_query || settings.address;
  if (!query) return null;
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  return <section className="business-map" aria-label="Ubicación del comercio"><div className="map-copy"><span className="section-kicker">Encontranos</span><h2>Visitá nuestro local.</h2><p>{settings.address}</p>{settings.phone && <a href={`tel:${settings.phone}`}>{settings.phone}</a>}</div><div className="map-frame"><iframe title="Ubicación de Aberturas Santa Fe" src={src} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></section>;
}

import { useEffect, useState } from "react";

export default function PromotionModule({ settings = {} }) {
  const available = Boolean(settings.promotion_enabled && settings.promotion_image_url);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!available || settings.promotion_modal_enabled === false) { setModalOpen(false); return undefined; }
    const intervalMinutes = Math.max(0, Number(settings.promotion_modal_interval) || 0);
    const storageKey = "santaFePromotionLastShown";
    const lastShown = Number(window.localStorage.getItem(storageKey) || 0);
    const wait = intervalMinutes > 0 && lastShown ? Math.max(0, intervalMinutes * 60000 - (Date.now() - lastShown)) : 0;
    const show = () => { window.localStorage.setItem(storageKey, String(Date.now())); setModalOpen(true); };
    const timer = wait > 0 ? window.setTimeout(show, wait) : show();
    return () => { if (timer) window.clearTimeout(timer); };
  }, [available, settings.promotion_modal_enabled, settings.promotion_modal_interval, settings.promotion_image_url]);

  if (!available) return null;
  const link = settings.promotion_link || "#productos";
  const content = (
    <>
      <img src={settings.promotion_image_url} alt={settings.promotion_title || "Promoción"} />
      <div className="promotion-module-copy">
        {settings.promotion_title && <h2>{settings.promotion_title}</h2>}
        {settings.promotion_text && <p>{settings.promotion_text}</p>}
        <a className="primary-link" href={link}>{settings.promotion_button_label || "Ver promoción"} →</a>
      </div>
    </>
  );

  return <>
    <section className="promotion-module" id="promociones" aria-label="Promociones">
      {content}
    </section>
    {modalOpen && <div className="promotion-modal-backdrop" role="presentation" onClick={() => setModalOpen(false)}><div className="promotion-modal" role="dialog" aria-modal="true" aria-label="Promoción" onClick={(event) => event.stopPropagation()}><button className="promotion-modal-close" onClick={() => setModalOpen(false)} aria-label="Cerrar promoción">×</button>{content}</div></div>}
  </>;
}

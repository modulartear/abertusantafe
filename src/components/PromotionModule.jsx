import { useEffect, useState } from "react";

export default function PromotionModule({ settings = {} }) {
  const available = Boolean(settings.promotion_enabled && settings.promotion_image_url);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setModalOpen(Boolean(available && settings.promotion_modal_enabled));
  }, [available, settings.promotion_modal_enabled, settings.promotion_image_url]);

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

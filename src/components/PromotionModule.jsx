import { useEffect, useMemo, useState } from "react";

export default function PromotionModule({ settings = {}, promotions = null }) {
  const activePromotions = useMemo(() => { const legacy = settings.promotion_enabled && settings.promotion_image_url ? [{ id: "legacy", title: settings.promotion_title, description: settings.promotion_text, image_url: settings.promotion_image_url, button_label: settings.promotion_button_label, link: settings.promotion_link, active: true, modal_enabled: true, modal_interval: settings.promotion_modal_interval }] : []; return (promotions === null ? legacy : promotions).filter((promotion) => promotion.active !== false && promotion.image_url); }, [promotions, settings.promotion_enabled, settings.promotion_image_url, settings.promotion_title, settings.promotion_text, settings.promotion_button_label, settings.promotion_link, settings.promotion_modal_interval]);
  const [modalPromotion, setModalPromotion] = useState(null);

  useEffect(() => {
    const promotion = activePromotions.find((item) => item.modal_enabled !== false);
    if (!promotion) { setModalPromotion(null); return undefined; }
    const intervalMinutes = Math.max(0, Number(promotion.modal_interval) || 0);
    const storageKey = `santaFePromotionLastShown_${promotion.id}`;
    const lastShown = Number(window.localStorage.getItem(storageKey) || 0);
    const wait = intervalMinutes > 0 && lastShown ? Math.max(0, intervalMinutes * 60000 - (Date.now() - lastShown)) : 0;
    const show = () => { window.localStorage.setItem(storageKey, String(Date.now())); setModalPromotion(promotion); };
    const timer = wait > 0 ? window.setTimeout(show, wait) : show();
    return () => { if (timer) window.clearTimeout(timer); };
  }, [activePromotions]);

  if (!activePromotions.length) return null;
  const card = (promotion) => <><img src={promotion.image_url} alt={promotion.title || "Promoción"} /><div className="promotion-module-copy">{promotion.title && <h2>{promotion.title}</h2>}{promotion.description && <p>{promotion.description}</p>}<a className="primary-link" href={promotion.link || "#productos"}>{promotion.button_label || "Ver promoción"} →</a></div></>;
  return <>{settings.promotions_enabled !== false && <section className="promotion-module-list" id="promociones" aria-label="Promociones">{activePromotions.map((promotion) => <article className="promotion-module" key={promotion.id}>{card(promotion)}</article>)}</section>}{modalPromotion && <div className="promotion-modal-backdrop" role="presentation" onClick={() => setModalPromotion(null)}><div className="promotion-modal" role="dialog" aria-modal="true" aria-label="Promoción" onClick={(event) => event.stopPropagation()}><button className="promotion-modal-close" onClick={() => setModalPromotion(null)} aria-label="Cerrar promoción">×</button>{card(modalPromotion)}</div></div>}</>;
}

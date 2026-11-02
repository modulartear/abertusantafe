export function safePublicUrl(value, fallback = "#productos") {
  const href = String(value || "").trim();
  if (!href) return fallback;
  if (/^(javascript|data|vbscript):/i.test(href)) return fallback;
  if (/^(https:\/\/|mailto:|tel:|\/|#)/i.test(href)) return href;
  return fallback;
}

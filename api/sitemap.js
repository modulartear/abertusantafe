import { createClient } from "@supabase/supabase-js";

function escapeXml(value) {
  return String(value).replace(/[<>&'\"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[character]));
}

export default async function handler(request, response) {
  const configuredUrl = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || request.headers.host || "localhost";
  const baseUrl = `${configuredUrl.startsWith("http") ? "" : "https://"}${configuredUrl}`.replace(/\/$/, "");
  const urls = [{ loc: `${baseUrl}/`, priority: "1.0" }];
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data } = await supabase.from("products").select("slug, updated_at").eq("published", true);
    (data || []).forEach((product) => urls.push({ loc: `${baseUrl}/producto/${encodeURIComponent(product.slug)}`, lastmod: product.updated_at, priority: "0.8" }));
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${escapeXml(url.loc)}</loc>${url.lastmod ? `<lastmod>${escapeXml(url.lastmod)}</lastmod>` : ""}<priority>${url.priority}</priority></url>`).join("")}</urlset>`;
  response.setHeader("Content-Type", "application/xml; charset=utf-8"); response.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600"); return response.status(200).send(xml);
}

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
const windowMs = 10 * 60 * 1000;
const maxRequests = 5;

async function hash(value: string) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const body = await request.json();
    const customerName = String(body.customer_name || "").trim();
    const customerPhone = String(body.customer_phone || "").trim();
    const items = Array.isArray(body.items) ? body.items : [];
    if (!customerName || customerName.length > 120 || !customerPhone || customerPhone.length > 60 || !items.length || items.length > 50) throw new Error("Completá los datos y seleccioná al menos un producto.");
    if (String(body.website || "").trim()) throw new Error("Solicitud inválida.");
    const safeItems = items.map((item) => ({ product_id: String(item.product_id || "").slice(0, 80), product_name: String(item.product_name || "").slice(0, 200), quantity: Math.max(1, Math.min(99, Number(item.quantity) || 1)), unit_price: Math.max(0, Number(item.unit_price) || 0) }));
    if (safeItems.some((item) => !item.product_name)) throw new Error("Hay un producto inválido en la consulta.");
    const forwarded = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const clientHash = await hash(forwarded.split(",")[0].trim());
    const adminClient = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: current } = await adminClient.from("quote_rate_limits").select("window_started, request_count").eq("client_hash", clientHash).maybeSingle();
    const now = Date.now(); const started = current ? new Date(current.window_started).getTime() : 0; const count = started && now - started < windowMs ? current.request_count : 0;
    if (count >= maxRequests) return new Response(JSON.stringify({ error: "Demasiadas consultas. Intentá nuevamente en unos minutos." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    await adminClient.from("quote_rate_limits").upsert({ client_hash: clientHash, window_started: count ? current.window_started : new Date().toISOString(), request_count: count + 1, updated_at: new Date().toISOString() });
    const { data: quote, error: quoteError } = await adminClient.from("quotes").insert({ customer_name: customerName, customer_phone: customerPhone, customer_email: body.customer_email ? String(body.customer_email).slice(0, 180) : null, customer_address: body.customer_address ? String(body.customer_address).slice(0, 300) : null, delivery_method: String(body.delivery_method || "A coordinar").slice(0, 80), notes: body.notes ? String(body.notes).slice(0, 2000) : null, total: Math.max(0, Number(body.total) || 0) }).select().single();
    if (quoteError || !quote) throw quoteError || new Error("No se pudo crear la consulta.");
    const { error: itemError } = await adminClient.from("quote_items").insert(safeItems.map((item) => ({ ...item, quote_id: quote.id })));
    if (itemError) { await adminClient.from("quotes").delete().eq("id", quote.id); throw itemError; }
    return new Response(JSON.stringify({ quote: { id: quote.id } }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Error inesperado" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

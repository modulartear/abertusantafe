import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) throw new Error("No autorizado");
    const adminClient = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: { user }, error: authError } = await adminClient.auth.getUser(authHeader.replace("Bearer ", ""));
    if (authError || !user) throw new Error("Sesión inválida");
    const { data: profile } = await adminClient.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "admin") throw new Error("Solo un administrador puede crear usuarios");
    const { email, password, full_name, role } = await request.json();
    if (!email || !password || !full_name || !["admin", "editor"].includes(role)) throw new Error("Faltan datos obligatorios");
    if (password.length < 8) throw new Error("La contraseña debe tener al menos 8 caracteres");
    const { data: created, error: createError } = await adminClient.auth.admin.createUser({ email: email.trim().toLowerCase(), password, email_confirm: true, user_metadata: { full_name } });
    if (createError || !created.user) throw createError || new Error("No se pudo crear el usuario");
    const { error: profileError } = await adminClient.from("profiles").update({ email: created.user.email, full_name, role }).eq("id", created.user.id);
    if (profileError) throw profileError;
    return new Response(JSON.stringify({ user: { id: created.user.id, email: created.user.email, full_name, role } }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Error inesperado" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

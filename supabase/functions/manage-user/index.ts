import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) throw new Error("No autorizado");
    const adminClient = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: { user: requester }, error: authError } = await adminClient.auth.getUser(authHeader.replace("Bearer ", ""));
    if (authError || !requester) throw new Error("Sesión inválida");
    const { data: profile } = await adminClient.from("profiles").select("role").eq("id", requester.id).single();
    if (profile?.role !== "admin") throw new Error("Solo un administrador puede gestionar usuarios");
    const { action, user_id, full_name, role, redirect_to } = await request.json();
    if (!user_id || !["update", "delete", "reset"].includes(action)) throw new Error("Solicitud inválida");
    if (action === "delete") {
      if (user_id === requester.id) throw new Error("No podés eliminar tu propio usuario");
      const { error } = await adminClient.auth.admin.deleteUser(user_id);
      if (error) throw error;
    } else if (action === "reset") {
      const { data: authUser, error: userError } = await adminClient.auth.admin.getUserById(user_id);
      if (userError || !authUser.user?.email) throw userError || new Error("El usuario no tiene un email válido");
      const { data: linkData, error: linkError } = await adminClient.auth.admin.generateLink({ type: "recovery", email: authUser.user.email, options: { redirectTo: redirect_to } });
      if (linkError) throw linkError;
      return new Response(JSON.stringify({ ok: true, action_link: linkData.properties.action_link }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    } else {
      if (!full_name || !["admin", "editor"].includes(role)) throw new Error("Faltan datos del usuario");
      const { error: authUpdateError } = await adminClient.auth.admin.updateUserById(user_id, { user_metadata: { full_name } });
      if (authUpdateError) throw authUpdateError;
      const { error: profileUpdateError } = await adminClient.from("profiles").update({ full_name, role }).eq("id", user_id);
      if (profileUpdateError) throw profileUpdateError;
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Error inesperado" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

import { createClient } from "@supabase/supabase-js";

const rawUrl = import.meta.env.VITE_SUPABASE_URL || "";
const url = rawUrl
  .trim()
  .replace(/^['"]|['"]$/g, "")
  .replace(/\/(auth|rest|storage|functions)\/v1.*$/i, "")
  .replace(/\/+$/, "");
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || "").trim().replace(/^['"]|['"]$/g, "");

export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export const supabaseConfigured = Boolean(supabase);

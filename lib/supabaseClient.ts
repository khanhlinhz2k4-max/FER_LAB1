import { createClient } from "@supabase/supabase-js";

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const rawKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "";

const isValidUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

export const isSupabaseConfigured = isValidUrl(rawUrl) && Boolean(rawKey && rawKey !== "your-supabase-anon-key");

if (!isSupabaseConfigured) {
  console.warn(
    "[Supabase] Missing or invalid Supabase environment variables in .env.local. Using fallback client."
  );
}

// Fallback dummy URL so createClient does not crash the entire app during module evaluation
const supabaseUrl = isValidUrl(rawUrl) ? rawUrl : "https://placeholder.supabase.co";
const supabaseAnonKey = rawKey || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


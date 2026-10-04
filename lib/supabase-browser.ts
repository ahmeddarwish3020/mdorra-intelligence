import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

let browserSupabaseClient: SupabaseClient | null = null;
let clientInitialized = false;

function isValidSupabaseConfig(url: string | undefined, key: string | undefined): boolean {
  if (!url || !key) {
    return false;
  }
  const urlLower = url.toLowerCase();
  const keyLower = key.toLowerCase();
  if (urlLower === 'your_supabase_url_here' || keyLower === 'your_anon_key_here' || keyLower === 'your_supabase_anon_key_here') {
    return false;
  }
  if (!url.startsWith('https://') || !url.includes('.supabase.co')) {
    return false;
  }
  if (key.length < 20) {
    return false;
  }
  return true;
}

export function createBrowserSupabaseClient(): SupabaseClient | null {
  if (clientInitialized) return browserSupabaseClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!isValidSupabaseConfig(supabaseUrl, supabaseAnonKey)) {
    browserSupabaseClient = null;
    clientInitialized = true;
    return null;
  }

  try {
    const client = createBrowserClient(supabaseUrl!, supabaseAnonKey!);
    browserSupabaseClient = client;
    clientInitialized = true;
    return browserSupabaseClient;
  } catch {
    browserSupabaseClient = null;
    clientInitialized = true;
    return null;
  }
}
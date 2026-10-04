import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { SupabaseClient } from '@supabase/supabase-js';

let serverSupabaseClient: SupabaseClient | null = null;
let clientInitialized = false;

function isValidSupabaseConfig(url: string | undefined, key: string | undefined): boolean {
  if (!url || !key) {
    console.log('[Supabase] Config validation failed: url or key is missing', { url: !!url, key: !!key });
    return false;
  }
  const urlLower = url.toLowerCase();
  const keyLower = key.toLowerCase();
  if (urlLower === 'your_supabase_url_here' || keyLower === 'your_anon_key_here' || keyLower === 'your_supabase_anon_key_here') {
    console.log('[Supabase] Config validation failed: placeholder values detected', { url: urlLower, key: keyLower });
    return false;
  }
  if (!url.startsWith('https://') || !url.includes('.supabase.co')) {
    console.log('[Supabase] Config validation failed: invalid URL format', { url });
    return false;
  }
  if (key.length < 20) {
    console.log('[Supabase] Config validation failed: key too short', { keyLength: key.length });
    return false;
  }
  return true;
}

export function createServerSupabaseClient(): SupabaseClient | null {
  if (clientInitialized) return serverSupabaseClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log('[Supabase] Config check:', { 
    hasUrl: !!supabaseUrl, 
    hasKey: !!supabaseAnonKey,
    urlPrefix: supabaseUrl?.substring(0, 30),
    keyLength: supabaseAnonKey?.length,
    urlValue: supabaseUrl,
    keyValue: supabaseAnonKey
  });

  if (!isValidSupabaseConfig(supabaseUrl, supabaseAnonKey)) {
    console.log('[Supabase] Skipping client initialization - invalid config');
    serverSupabaseClient = null;
    clientInitialized = true;
    return null;
  }

  try {
    const cookieStore = cookies();
    const client = createServerClient(supabaseUrl!, supabaseAnonKey!, {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); } catch {}
        }
      }
    });
    serverSupabaseClient = client;
    clientInitialized = true;
    console.log('[Supabase] Client initialized successfully');
    return serverSupabaseClient;
  } catch (error) {
    console.warn('[Supabase] Client init failed:', error);
    serverSupabaseClient = null;
    clientInitialized = true;
    return null;
  }
}

export async function getUser(): Promise<{ user: any } | null> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  return user ? { user } : null;
}

export async function getSession(): Promise<{ session: any } | null> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return null;
  const { data: { session } } = await supabase.auth.getSession();
  return session ? { session } : null;
}

export async function getUserRole(): Promise<string | null> {
  const user = await getUser();
  if (!user?.user) return null;
  const supabase = createServerSupabaseClient();
  if (!supabase) return null;
  const { data: member } = await supabase.from('team_members').select('role').eq('user_id', user.user.id).single();
  return member?.role ?? null;
}
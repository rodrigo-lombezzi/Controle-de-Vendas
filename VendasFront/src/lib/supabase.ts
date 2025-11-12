import { createClient, SupabaseClient } from '@supabase/supabase-js';

const env = (import.meta as any).env ?? (globalThis as any).process?.env ?? {};

const SUPABASE_URL = env.VITE_SUPABASE_URL ?? env.REACT_APP_SUPABASE_URL ?? env.SUPABASE_URL;
const SUPABASE_ANON_KEY =
  env.VITE_SUPABASE_ANON_KEY ?? env.REACT_APP_SUPABASE_ANON_KEY ?? env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // remove the throw in production if you prefer runtime fallback
  throw new Error(
    'Missing Supabase env vars. Set VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY (or REACT_APP_*/SUPABASE_*)'
  );
}

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Adjust the fields below to match your DB schema.
 */
export type Customer = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  created_at?: string | null;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  stock?: number;
  created_at?: string | null;
};

export type CartItem = {
  product_id: string;
  quantity: number;
  price?: number;
};

export default supabase;
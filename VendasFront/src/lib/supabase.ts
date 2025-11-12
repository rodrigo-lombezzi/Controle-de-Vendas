// Supabase client stub for development.
// If you add @supabase/supabase-js, replace this stub with a real client.
export const supabase: any = {};
export default supabase;
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const env = (import.meta as any).env ?? (globalThis as any).process?.env ?? {};

const SUPABASE_URL =
  env.VITE_SUPABASE_URL ?? env.REACT_APP_SUPABASE_URL ?? env.SUPABASE_URL;
const SUPABASE_ANON_KEY =
  env.VITE_SUPABASE_ANON_KEY ?? env.REACT_APP_SUPABASE_ANON_KEY ?? env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    'Missing Supabase env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or REACT_APP_*)'
  );
}

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type Customer = {
  address: string;
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  created_at?: string | null;
};

export type Product = {
  description: string;
  id: string;
  name: string;
  price: number;
  stock?: number | null;
  created_at?: string | null;
};

export type CartItem = {
  product_id: string;
  quantity: number;
  price?: number;
};

export default supabase;
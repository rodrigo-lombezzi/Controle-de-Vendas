// Este arquivo é um stub temporário que substitui a integração com Supabase
// para evitar que a aplicação lance erro em tempo de execução quando
// as variáveis de ambiente não estiverem presentes.
//
// Ele fornece métodos mínimos (promessas que retornam { data, error })
// usados pelo frontend. Quando você quiser re-integrar Supabase, substitua
// este arquivo pela implementação real que usa `createClient`.

type Result = Promise<{ data: any; error: any }>;

function makeQuery(): Record<string, any> {
  return {
    select: async (..._args: any[]) => ({ data: null, error: null }),
    insert: async (..._args: any[]) => ({ data: null, error: null }),
    update: async (..._args: any[]) => ({ data: null, error: null }),
    delete: async (..._args: any[]) => ({ data: null, error: null }),
    eq: () => makeQuery(),
    order: () => makeQuery(),
    range: () => makeQuery(),
    limit: () => makeQuery(),
  };
}

const supabase = {
  from: (_table: string) => makeQuery(),
  rpc: async (_fn: string, _opts?: any) => ({ data: null, error: null }),
  auth: {
    signInWithPassword: async (_creds: any) => ({ data: null, error: null }),
    signIn: async (_opts: any) => ({ data: null, error: null }),
    signOut: async () => ({ error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    onAuthStateChange: (_cb: any) => ({ data: null }),
  },
  // helper: indica que não há supabase configurado no runtime
  isConfigured: false,
};

export default supabase;
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const env = (import.meta as any).env ?? (globalThis as any).process?.env ?? {};

const SUPABASE_URL = env.VITE_SUPABASE_URL ?? env.REACT_APP_SUPABASE_URL ?? env.SUPABASE_URL;
const SUPABASE_ANON_KEY =
  env.VITE_SUPABASE_ANON_KEY ?? env.REACT_APP_SUPABASE_ANON_KEY ?? env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase env vars.');
}

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type CustomerMap = {
  [k: string]: string | null | undefined;
  id: string;
  name: string;
  phone?: string | null;
  email?: string | null;
};

export type Product = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export default supabase;
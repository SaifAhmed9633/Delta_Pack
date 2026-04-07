import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

// Lazy singleton — only throws at request time, not at build time (safe for Vercel)
let _client = null;

function getClient() {
  if (_client) return _client;
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY');
  }
  _client = createClient(supabaseUrl, supabaseKey);
  return _client;
}

export const supabase = new Proxy({}, {
  get(_, prop) {
    return getClient()[prop];
  }
});

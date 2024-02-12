import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_PUBLIC_ANON_KEY;

console.log(supabaseUrl)
console.log(supabaseKey)
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or Supabase Key is missing. Make sure to set them in your environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

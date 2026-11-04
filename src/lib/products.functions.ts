import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export const getPublicProducts = createServerFn({ method: "GET" }).handler(async () => {
  const url =
    process.env['SUPABASE_URL'] ||
    process.env['VITE_SUPABASE_URL'] ||
    import.meta.env['VITE_SUPABASE_URL'] ||
    'https://rviradasgcgrlrzeohaa.supabase.co';

  const key =
    process.env['SUPABASE_PUBLISHABLE_KEY'] ||
    process.env['VITE_SUPABASE_PUBLISHABLE_KEY'] ||
    import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY'] ||
    'sb_publishable_3PB4dt6afeg3wUyubNoL9Q_CJzTsJ5B';

  if (!url || !key) throw new Error("Catalog unavailable");
  const client = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
      headers.set('apikey', key);
      return fetch(input, { ...init, headers });
    } },
  });
  const [{ data, error }, { data: settings, error: settingsError }] = await Promise.all([
    client.from('products').select('*').eq('is_hidden', false).order('created_at', { ascending: false }),
    client.from('site_settings').select('hide_sold').eq('id', 1).maybeSingle(),
  ]);
  if (error) {
    console.error('[Catalog] Error fetching products from Supabase:', error);
    throw new Error("Catalog unavailable");
  }
  if (settingsError) {
    console.warn('[Catalog] Error fetching site settings, defaulting hide_sold to false:', settingsError);
  }
  return (data ?? []).filter(p => !(settings?.hide_sold && p.is_sold));
});
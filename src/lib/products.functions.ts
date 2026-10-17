import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export const getPublicProducts = createServerFn({ method: "GET" }).handler(async () => {
  const url = process.env['SUPABASE_URL'];
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
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
  if (error || settingsError) throw new Error("Catalog unavailable");
  return (data ?? []).filter(p => !(settings?.hide_sold && p.is_sold));
});
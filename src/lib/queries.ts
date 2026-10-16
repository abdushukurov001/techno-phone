import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const productsQuery = queryOptions({
  queryKey: ["products", "public"],
  queryFn: async () => {
    const [{ data, error }, { data: settings }] = await Promise.all([
      supabase.from("products").select("*").eq("is_hidden", false).order("created_at", { ascending: false }),
      supabase.from("site_settings").select("hide_sold").eq("id", 1).maybeSingle(),
    ]);
    if (error) throw error;
    const hideSold = settings?.hide_sold ?? false;
    return (data ?? []).filter((p) => !(hideSold && p.is_sold));
  },
  staleTime: 30_000,
});

export const productQuery = (slug: string) =>
  queryOptions({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").eq("slug", slug).eq("is_hidden", false).maybeSingle();
      if (error) throw error;
      return data;
    },
    staleTime: 30_000,
  });

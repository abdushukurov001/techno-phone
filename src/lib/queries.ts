import { queryOptions } from "@tanstack/react-query";
import { getPublicProducts } from "./products.functions";

export const productsQuery = queryOptions({
  queryKey: ["products", "public"],
  queryFn: () => getPublicProducts(),
  staleTime: 30_000,
});

export const productQuery = (slug: string) =>
  queryOptions({
    queryKey: ["product", slug],
    queryFn: async () => {
      return (await getPublicProducts()).find(p => p.slug === slug) ?? null;
    },
    staleTime: 30_000,
  });

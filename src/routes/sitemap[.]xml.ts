import { createFileRoute } from '@tanstack/react-router';
import { getPublicProducts } from '@/lib/products.functions';
import { buildSitemap } from '@/lib/sitemap';

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const products = await getPublicProducts();
        return new Response(buildSitemap(new URL(request.url).origin, products), {
          headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=300' },
        });
      },
    },
  },
});
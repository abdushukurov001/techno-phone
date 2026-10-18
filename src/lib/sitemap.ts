type SitemapProduct = { slug: string; updated_at?: string; is_hidden: boolean; is_sold: boolean };
const xml = (value: string) => value.replace(/[<>&"']/g, character => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[character] ?? character);

export function buildSitemap(origin: string, products: SitemapProduct[]) {
  const entries = [
    `<url><loc>${xml(new URL('/', origin).href)}</loc></url>`,
    `<url><loc>${xml(new URL('/katalog', origin).href)}</loc></url>`,
    ...products.filter(product => !product.is_hidden).map(product => {
      const location = new URL(`/katalog/${encodeURIComponent(product.slug)}`, origin).href;
      const lastmod = product.updated_at && Number.isFinite(Date.parse(product.updated_at))
        ? `<lastmod>${xml(product.updated_at)}</lastmod>` : '';
      return `<url><loc>${xml(location)}</loc>${lastmod}</url>`;
    }),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join('')}</urlset>`;
}
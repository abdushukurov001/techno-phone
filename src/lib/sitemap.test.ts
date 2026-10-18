import { describe, expect, it } from 'vitest';
import { buildSitemap } from './sitemap';

describe('public sitemap', () => {
  it('omits hidden products', () => {
    const result = buildSitemap('https://example.com', [
      { slug: 'visible-phone', is_hidden: false, is_sold: false },
      { slug: 'hidden-phone', is_hidden: true, is_sold: false },
    ]);
    expect(result).toContain('https://example.com/katalog/visible-phone');
    expect(result).not.toContain('hidden-phone');
  });
  it('uses only a product content timestamp, never a generated date', () => {
    const result = buildSitemap('https://example.com', [
      { slug: 'dated', is_hidden: false, is_sold: false, updated_at: '2026-10-01T12:00:00Z' },
      { slug: 'undated', is_hidden: false, is_sold: false },
    ]);
    expect(result.match(/<lastmod>/g)).toHaveLength(1);
    expect(result).toContain('<lastmod>2026-10-01T12:00:00Z</lastmod>');
  });
});
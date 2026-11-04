import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { AdminPanel } from '@/components/shop/admin-panel';
import { createDemoProducts } from '@/lib/admin-demo';
import { useI18n } from '@/lib/i18n';

export const Route = createFileRoute('/admin-demo')({
  head: () => ({ meta: [
    { title: 'Admin namuna — Texnikalar' },
    { name: 'description', content: 'Texnikalar admin panelining mustaqil namuna sahifasi.' },
    { property: 'og:title', content: 'Admin namuna — Texnikalar' },
    { property: 'og:description', content: 'Mahsulot boshqaruvi namuna ko‘rinishi.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'robots', content: 'noindex' },
  ] }),
  component: DemoAdmin,
});

function DemoAdmin() {
  const [products, setProducts] = useState(createDemoProducts);
  const [hideSold, setHideSold] = useState(false);
  const { lang } = useI18n();
  return <>
    <div role="status" className="border-b border-border bg-secondary px-5 py-3 text-center text-sm text-secondary-foreground">
      {lang === 'uz' ? 'Namuna admin · O‘zgarishlar faqat shu oynada. Yangilaganda tiklanadi.' : 'Демо администратор · Изменения только в этом окне. Обновление сбрасывает их.'}
    </div>
    <AdminPanel products={products} hideSold={hideSold} demo={{ setProducts, setHideSold }} />
  </>;
}
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from '@tanstack/react-query';
import { productsQuery } from '@/lib/queries';
import { parseCatalogSearch } from '@/lib/catalog';
import { CatalogView } from '@/components/shop/catalog-view';
export const Route = createFileRoute("/")({
  validateSearch: parseCatalogSearch,
  loader: ({context}) => context.queryClient.ensureQueryData(productsQuery),
  head: () => ({meta:[{title:'Texnikalar — Tekshirilgan texnika. Halol narx.'},{name:'description',content:'Toshkentda ishlatilgan va qayta tiklangan telefon, noutbuk va gadjetlar. 1 oy kafolat va nasiya.'},{property:'og:title',content:'Texnikalar — Tekshirilgan texnika'},{property:'og:description',content:'Halol narxlar. Tekshirilgan qurilmalar. Toshkent.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
  component: Index,
});
function Index() {
  const {data}=useSuspenseQuery(productsQuery);
  const search=Route.useSearch(); const navigate=Route.useNavigate();
  return <CatalogView home products={data} search={search} onChange={s=>navigate({search:parseCatalogSearch(s),replace:true})}/>;
}

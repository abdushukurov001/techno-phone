import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { productsQuery } from '@/lib/queries';
import { parseCatalogSearch } from '@/lib/catalog';
import { CatalogView } from '@/components/shop/catalog-view';
export const Route=createFileRoute('/katalog/')({validateSearch:parseCatalogSearch,loader:({context})=>context.queryClient.ensureQueryData(productsQuery),head:()=>({meta:[{title:'Katalog — Texnikalar'},{name:'description',content:'Toshkentda tekshirilgan telefonlar, noutbuklar va gadjetlar. Narx va holat bo‘yicha tanlang.'},{property:'og:title',content:'Katalog — Texnikalar'},{property:'og:description',content:'Tekshirilgan texnika katalogi. Halol narxlar, ochiq holat.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:Catalog});
function Catalog(){const {data}=useSuspenseQuery(productsQuery);const search=Route.useSearch();const navigate=Route.useNavigate();return <CatalogView products={data} search={search} onChange={s=>navigate({search:parseCatalogSearch(s),replace:true})}/>}

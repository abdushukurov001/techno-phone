import { createFileRoute } from '@tanstack/react-router';
import { getAdminProducts } from '@/lib/admin.functions';
import { AdminPanel } from '@/components/shop/admin-panel';
export const Route=createFileRoute('/_authenticated/admin')({loader:()=>getAdminProducts(),head:()=>({meta:[{title:'Mahsulot boshqaruvi — Texnikalar'},{name:'description',content:'Texnikalar mahsulotlarini boshqarish.'},{property:'og:title',content:'Mahsulot boshqaruvi — Texnikalar'},{property:'og:description',content:'Mahsulotlar, rasmlar va sotuv holati.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'},{name:'robots',content:'noindex'}]}),component:Admin});
function Admin(){const data=Route.useLoaderData();return <AdminPanel {...data}/>}

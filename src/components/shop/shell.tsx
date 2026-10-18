import { Link } from '@tanstack/react-router';
import { Phone, Send, ShieldCheck, CheckCircle2, Eye, Wallet, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';
import { BRAND_NAME, TELEGRAM_URL, PHONE } from '@/lib/config';

export function ShopHeader() {
  const { lang, setLang } = useI18n();
  return <><header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background"><div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-2 px-4 sm:px-5 lg:px-10"><Link to="/" className="shrink-0 font-display text-2xl sm:text-3xl">{BRAND_NAME}<span className="text-primary">.</span></Link><nav className="flex items-center gap-1 sm:gap-5"><div className="flex items-center text-xs"><Button variant="ghost" size="sm" aria-pressed={lang === 'uz'} onClick={() => setLang('uz')} className={`px-2 ${lang === 'uz' ? 'text-foreground' : 'text-muted-foreground'}`}>UZ</Button><span className="text-border">/</span><Button variant="ghost" size="sm" aria-pressed={lang === 'ru'} onClick={() => setLang('ru')} className={`px-2 ${lang === 'ru' ? 'text-foreground' : 'text-muted-foreground'}`}>RU</Button></div><Button asChild variant="ghost" className="h-auto px-1 py-2 text-xs sm:px-3 sm:text-sm"><a href={`tel:${PHONE.replace(/\s/g, '')}`} aria-label={`${lang === 'uz' ? 'Qo‘ng‘iroq qilish' : 'Позвонить'}: ${PHONE}`} className="flex items-center gap-2 whitespace-nowrap"><Phone className="hidden size-4 sm:block"/>{PHONE}</a></Button></nav></div></header><div className="h-20" aria-hidden="true"/></>;
}
export function TrustStrip() {
 const { t } = useI18n();
 return <div className="border-y border-border"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-5 py-6 text-xs sm:text-sm lg:grid-cols-4 lg:px-10">{[[ShieldCheck,t.trust1],[CheckCircle2,t.trust2],[Eye,t.trust3],[Wallet,t.trust4]].map(([Icon,text],i) => { const I = Icon as typeof ShieldCheck; return <div key={i} className="flex items-center justify-center gap-3"><I className="size-5 shrink-0 text-primary"/><span>{text as string}</span></div> })}</div></div>;
}
export function ShopFooter() {
 const { t, lang } = useI18n();
 return <><section className="border-t border-border bg-secondary/50"><div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-2 lg:px-10"><h2 className="max-w-md text-4xl">{t.why}</h2><div className="space-y-4 text-sm">{[t.why1,t.why2,t.why3].map((text,i)=><p key={text} className="flex gap-4"><span className="text-primary">0{i+1}</span>{text}</p>)}</div></div></section><footer className="mx-auto flex max-w-7xl flex-wrap justify-between gap-8 px-5 py-10 lg:px-10"><div><Link to="/" className="font-display text-3xl">{BRAND_NAME}.</Link><p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="size-3"/>{lang==='uz'?'Toshkent, O‘zbekiston':'Ташкент, Узбекистан'}</p></div><div className="flex items-center gap-6 text-sm"><a href={TELEGRAM_URL} target="_blank" rel="noreferrer">Telegram ↗</a><Link to="/admin">Admin</Link></div><p className="w-full border-t border-border pt-6 text-xs text-muted-foreground">© {new Date().getFullYear()} {BRAND_NAME}</p></footer><Button asChild className="fixed bottom-6 right-5 z-30 size-12 rounded-full shadow-sm md:right-8"><a href={TELEGRAM_URL} target="_blank" rel="noreferrer" aria-label="Telegram"><Send className="size-5"/></a></Button></>;
}

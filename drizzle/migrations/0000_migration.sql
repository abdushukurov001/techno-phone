CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.handle_first_admin()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER on_auth_user_created_admin AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_first_admin();

CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  category text NOT NULL,
  brand text NOT NULL,
  model text NOT NULL,
  color text NOT NULL DEFAULT '',
  condition_score int NOT NULL DEFAULT 9,
  condition_label text NOT NULL DEFAULT 'Yaxshi',
  has_box boolean NOT NULL DEFAULT false,
  price numeric(10,2) NOT NULL,
  images text[] NOT NULL DEFAULT '{}',
  notes text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  specs jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_new boolean NOT NULL DEFAULT false,
  is_sold boolean NOT NULL DEFAULT false,
  is_hidden boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads visible" ON public.products FOR SELECT TO anon, authenticated USING (NOT is_hidden OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin insert" ON public.products FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update" ON public.products FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete" ON public.products FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.site_settings (
  id int PRIMARY KEY DEFAULT 1,
  hide_sold boolean NOT NULL DEFAULT false
);
GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin update settings" ON public.site_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
INSERT INTO public.site_settings (id) VALUES (1);

CREATE POLICY "Read product images" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'product-images');
CREATE POLICY "Admin upload product images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin delete product images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));

INSERT INTO public.products (slug, category, brand, model, color, condition_score, condition_label, has_box, price, notes, description, specs, is_new, created_at) VALUES
('iphone-13-128-midnight','phones','Apple','iPhone 13','Midnight',9,'Juda yaxshi',true,435,'Ramkada kichik chiziq bor.','Original, hech qachon ochilmagan. Face ID ishlaydi.','{"storage":128,"ram":4,"battery":87}',false, now()-interval '10 days'),
('iphone-15-pro-256-natural','phones','Apple','iPhone 15 Pro','Natural Titanium',10,'Ideal',true,895,'Nuqsonsiz.','Titan korpus, A17 Pro protsessor.','{"storage":256,"ram":8,"battery":96}',true, now()-interval '1 days'),
('samsung-s22-ultra-256','phones','Samsung','Galaxy S22 Ultra','Phantom Black',8,'Yaxshi',false,480,'Ekran chetida mayda tirnalish.','S Pen bilan, 108MP kamera.','{"storage":256,"ram":12,"battery":84}',false, now()-interval '12 days'),
('samsung-s24-ultra-512','phones','Samsung','Galaxy S24 Ultra','Titanium Gray',10,'Ideal',true,1090,'Nuqsonsiz.','Galaxy AI, 200MP kamera.','{"storage":512,"ram":12,"battery":99}',true, now()-interval '2 days'),
('honor-magic-6-pro-512','phones','Honor','Magic 6 Pro','Epi Green',9,'Juda yaxshi',true,690,'Orqa qopqoqda mayda iz.','Kuchli kamera va batareya.','{"storage":512,"ram":12,"battery":95}',false, now()-interval '5 days'),
('xiaomi-13t-256','phones','Xiaomi','13T','Alpine Blue',9,'Juda yaxshi',false,365,'Ekranda himoya plyonkasi.','Leica kamera, 144Hz ekran.','{"storage":256,"ram":12,"battery":92}',false, now()-interval '8 days'),
('iphone-13-256-blue','phones','Apple','iPhone 13','Blue',7,'O''rtacha',false,399,'Orqa oynada chiziqlar, batareya almashtirilgan.','Hamma funksiyalar ishlaydi.','{"storage":256,"ram":4,"battery":100}',false, now()-interval '20 days'),
('macbook-air-m1-256','laptops','Apple','MacBook Air M1','Space Gray',9,'Juda yaxshi',true,620,'Qopqoqda kichik dog''.','Yengil va jim, 18 soatgacha batareya.','{"processor":"Apple M1","ram":8,"ssd":256,"screen":13.3,"gpu":"Integrated","battery_health":"89%, 210 sikl","keyboard":"EN/RU","charger":true}',false, now()-interval '6 days'),
('lenovo-thinkpad-t14','laptops','Lenovo','ThinkPad T14 Gen 2','Black',8,'Yaxshi',false,540,'Klaviaturada yaltirash.','Biznes uchun ishonchli noutbuk.','{"processor":"Intel Core i5","ram":16,"ssd":512,"screen":14,"gpu":"Integrated","battery_health":"82%","keyboard":"EN","charger":true}',false, now()-interval '9 days'),
('hp-pavilion-15','laptops','HP','Pavilion 15','Silver',8,'Yaxshi',false,470,'Korpusda mayda chiziqlar.','Kundalik ish va o''qish uchun.','{"processor":"Intel Core i7","ram":16,"ssd":512,"screen":15.6,"gpu":"Discrete","battery_health":"78%","keyboard":"EN/RU","charger":true}',false, now()-interval '15 days'),
('asus-vivobook-15','laptops','Asus','Vivobook 15','Quiet Blue',9,'Juda yaxshi',true,395,'Nuqsonsiz.','Yupqa va yengil.','{"processor":"AMD Ryzen 5","ram":8,"ssd":512,"screen":15.6,"gpu":"Integrated","battery_health":"91%","keyboard":"EN/RU","charger":true}',true, now()-interval '3 days'),
('honor-magicbook-14','laptops','Honor','MagicBook 14','Space Gray',9,'Juda yaxshi',true,560,'Nuqsonsiz.','Metall korpus, 2.5K ekran.','{"processor":"Intel Core i5","ram":16,"ssd":512,"screen":14,"gpu":"Integrated","battery_health":"94%","keyboard":"EN","charger":true}',false, now()-interval '7 days'),
('ipad-9-64','tablets','Apple','iPad 9','Silver',9,'Juda yaxshi',true,265,'Nuqsonsiz.','O''qish va kino uchun ideal.','{"storage":64,"ram":3,"battery":90}',false, now()-interval '11 days'),
('apple-watch-s8-45','watches','Apple','Watch Series 8 45mm','Midnight',9,'Juda yaxshi',true,240,'Ekranda ko''rinmas chiziq.','GPS, sog''liq sensorlari.','{"battery":91}',false, now()-interval '4 days'),
('airpods-pro-2','headphones','Apple','AirPods Pro 2','White',10,'Ideal',true,175,'Nuqsonsiz.','Faol shovqin bostirish.','{"battery":100}',true, now()-interval '1 days'),
('galaxy-buds-2-pro','headphones','Samsung','Galaxy Buds2 Pro','Graphite',8,'Yaxshi',false,85,'G''ilofda mayda izlar.','Hi-Fi 24bit ovoz.','{"battery":88}',false, now()-interval '14 days');
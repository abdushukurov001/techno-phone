DROP POLICY IF EXISTS "Read settings" ON public.site_settings;
CREATE POLICY "Read settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (id = 1);
DROP POLICY IF EXISTS "Read product images" ON storage.objects;
CREATE POLICY "Admins read product images" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Categories
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL DEFAULT '',
  image_url text,
  position integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.categories TO authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads active categories" ON public.categories FOR SELECT TO anon USING (active);
CREATE POLICY "Signed-in reads categories" ON public.categories FOR SELECT TO authenticated USING (active OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert categories" ON public.categories FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update categories" ON public.categories FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete categories" ON public.categories FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Products
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  reference text NOT NULL DEFAULT '',
  summary text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  price numeric(12,2) NOT NULL DEFAULT 0 CHECK (price >= 0),
  old_price numeric(12,2) CHECK (old_price IS NULL OR old_price >= 0),
  stock integer NOT NULL DEFAULT 0,
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  image_url text,
  badge text,
  featured boolean NOT NULL DEFAULT false,
  active boolean NOT NULL DEFAULT true,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX products_category_idx ON public.products(category_id);
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads active products" ON public.products FOR SELECT TO anon USING (active);
CREATE POLICY "Signed-in reads products" ON public.products FOR SELECT TO authenticated USING (active OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert products" ON public.products FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update products" ON public.products FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete products" ON public.products FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- CMS pages
CREATE TABLE public.cms_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text NOT NULL DEFAULT '',
  meta_title text NOT NULL DEFAULT '',
  meta_description text NOT NULL DEFAULT '',
  show_in_footer boolean NOT NULL DEFAULT true,
  position integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.cms_pages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cms_pages TO authenticated;
GRANT ALL ON public.cms_pages TO service_role;
ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads active pages" ON public.cms_pages FOR SELECT TO anon USING (active);
CREATE POLICY "Signed-in reads pages" ON public.cms_pages FOR SELECT TO authenticated USING (active OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert pages" ON public.cms_pages FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update pages" ON public.cms_pages FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete pages" ON public.cms_pages FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER cms_pages_updated_at BEFORE UPDATE ON public.cms_pages FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Carts (also become orders once checked out)
CREATE TABLE public.carts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number bigint GENERATED ALWAYS AS IDENTITY,
  token text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open','ordered','confirmed','shipped','delivered','cancelled')),
  customer_name text NOT NULL DEFAULT '',
  customer_phone text NOT NULL DEFAULT '',
  customer_email text NOT NULL DEFAULT '',
  customer_city text NOT NULL DEFAULT '',
  customer_address text NOT NULL DEFAULT '',
  note text NOT NULL DEFAULT '',
  total numeric(12,2) NOT NULL DEFAULT 0,
  ordered_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE, DELETE ON public.carts TO authenticated;
GRANT ALL ON public.carts TO service_role;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read carts" ON public.carts FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update carts" ON public.carts FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete carts" ON public.carts FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER carts_updated_at BEFORE UPDATE ON public.carts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id uuid NOT NULL REFERENCES public.carts(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  product_reference text NOT NULL DEFAULT '',
  image_url text,
  unit_price numeric(12,2) NOT NULL,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (cart_id, product_id)
);
CREATE INDEX cart_items_cart_idx ON public.cart_items(cart_id);
GRANT SELECT, UPDATE, DELETE ON public.cart_items TO authenticated;
GRANT ALL ON public.cart_items TO service_role;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read cart items" ON public.cart_items FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update cart items" ON public.cart_items FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete cart items" ON public.cart_items FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Media bucket: admins manage files; the shop reads them through the server
CREATE POLICY "Admins read media" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins upload media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));

-- Seed data
INSERT INTO public.categories (name, slug, description, image_url, position) VALUES
('Sanitaire', 'sanitaire', 'WC intelligents, bidets et abattants lavants.', '/__l5e/assets-v1/f533232a-b524-4ee4-ae14-0fb9ffbc1608/seed-toilet-a.png', 1),
('Miroirs', 'miroirs', 'Miroirs LED anti-buée et lumineux.', '/__l5e/assets-v1/b645e525-bfad-4721-8afe-2057113a0918/seed-mirror-a.png', 2),
('Douche & Colonne', 'douche-colonne', 'Colonnes de douche thermostatiques.', '/__l5e/assets-v1/3568203d-e793-4d65-97c5-9b3216f91aa7/seed-shower-a.png', 3),
('Smart Locks', 'smart-locks', 'Serrures intelligentes à empreinte et reconnaissance faciale.', '/__l5e/assets-v1/a24385d2-8a39-46c6-8167-df2f7a5adaf5/seed-lock-a.png', 4),
('Maison connectée', 'maison-connectee', 'Domotique, sécurité et confort connecté.', '/__l5e/assets-v1/5585a0eb-c66a-4985-b92d-6397c82f20c4/seed-home-a.png', 5),
('Meubles', 'meubles', 'Meubles vasques et rangements de salle de bain.', '/__l5e/assets-v1/0b9cba19-593c-4886-aff7-0d96feceefd1/seed-vanity.jpg', 6);

INSERT INTO public.products (name, slug, reference, summary, price, old_price, stock, category_id, image_url, badge, featured, position) VALUES
('Série S1', 'serie-s1', 'DB-WC-S1', 'Ouverture automatique · Lavage tiède', 1290, NULL, 25, (SELECT id FROM public.categories WHERE slug = 'sanitaire'), '/__l5e/assets-v1/f533232a-b524-4ee4-ae14-0fb9ffbc1608/seed-toilet-a.png', NULL, true, 1),
('Série Brume', 'serie-brume', 'DB-WC-BRU', 'Compact · Couvercle gris perle', 990, NULL, 12, (SELECT id FROM public.categories WHERE slug = 'sanitaire'), '/__l5e/assets-v1/045b289e-0153-4031-a9ac-c32120f8d2a7/seed-toilet-b.png', 'Nouveau', true, 2),
('Série Aurore', 'serie-aurore', 'DB-WC-AUR', 'Finition champagne · Séchage à air', 1690, NULL, 8, (SELECT id FROM public.categories WHERE slug = 'sanitaire'), '/__l5e/assets-v1/f2787e78-5a7c-4f2f-b520-2512f4bbbcc7/seed-toilet-c.png', NULL, true, 3),
('Miroir Halo', 'miroir-halo', 'DB-MIR-HAL', 'LED circulaire · Anti-buée · Horloge', 390, NULL, 30, (SELECT id FROM public.categories WHERE slug = 'miroirs'), '/__l5e/assets-v1/b645e525-bfad-4721-8afe-2057113a0918/seed-mirror-a.png', NULL, true, 4),
('Miroir Lumen', 'miroir-lumen', 'DB-MIR-LUM', 'Sans cadre · Éclairage réglable', 450, NULL, 18, (SELECT id FROM public.categories WHERE slug = 'miroirs'), '/__l5e/assets-v1/ac7b9242-99fb-442f-9f87-45e1c8741879/seed-mirror-b.png', NULL, true, 5),
('Colonne Or', 'colonne-or', 'DB-COL-OR', 'Thermostatique · Pluie carrée', 690, NULL, 15, (SELECT id FROM public.categories WHERE slug = 'douche-colonne'), '/__l5e/assets-v1/3568203d-e793-4d65-97c5-9b3216f91aa7/seed-shower-a.png', NULL, true, 6),
('Colonne Noir mat', 'colonne-noir-mat', 'DB-COL-NM', 'Thermostatique · Pluie ronde', 590, NULL, 20, (SELECT id FROM public.categories WHERE slug = 'douche-colonne'), '/__l5e/assets-v1/085f5d87-5e8c-4895-99e3-d4dfec4a4a6b/seed-shower-b.png', NULL, true, 7),
('Serrure Empreinte', 'serrure-empreinte', 'DB-LCK-EMP', 'Empreinte digitale · Code', 249, NULL, 40, (SELECT id FROM public.categories WHERE slug = 'smart-locks'), '/__l5e/assets-v1/a24385d2-8a39-46c6-8167-df2f7a5adaf5/seed-lock-a.png', NULL, true, 8),
('Serrure Visage', 'serrure-visage', 'DB-LCK-VIS', 'Reconnaissance faciale · Caméra', 459, NULL, 22, (SELECT id FROM public.categories WHERE slug = 'smart-locks'), '/__l5e/assets-v1/98818f85-8a8b-4de1-84c2-48a612566236/seed-lock-b.png', 'Nouveau', true, 9),
('Pack Domotique', 'pack-domotique', 'DB-HOM-DOM', 'Écran de contrôle · Enceinte · Capteur', 520, NULL, 10, (SELECT id FROM public.categories WHERE slug = 'maison-connectee'), '/__l5e/assets-v1/5585a0eb-c66a-4985-b92d-6397c82f20c4/seed-home-a.png', NULL, true, 10),
('Pack Sécurité', 'pack-securite', 'DB-HOM-SEC', 'Caméra · Interrupteur connecté', 210, NULL, 35, (SELECT id FROM public.categories WHERE slug = 'maison-connectee'), '/__l5e/assets-v1/5e4c53ea-d22e-4982-9779-e1a9d196b42e/seed-home-b.png', NULL, true, 11),
('WC intelligent Série S1 Premium', 'wc-intelligent-serie-s1-premium', 'DB-WC-S1P', 'Lavage tiède, siège chauffant et ouverture automatique.', 1290, 1590, 6, (SELECT id FROM public.categories WHERE slug = 'sanitaire'), '/__l5e/assets-v1/f4dfcb80-dbc3-4f1a-aefd-4e83cdb96dde/seed-smart-toilet.jpg', '-19 %', false, 12),
('WC suspendu Nocturne', 'wc-suspendu-nocturne', 'DB-WC-NOC', 'WC suspendu noir mat, chasse silencieuse.', 1890, NULL, 5, (SELECT id FROM public.categories WHERE slug = 'sanitaire'), '/__l5e/assets-v1/6dc48dcd-2324-40cf-8bf5-7e36d00613ac/seed-banner-dark.jpg', 'Nouveau', false, 13),
('Abattant lavant Douceur', 'abattant-lavant-douceur', 'DB-ABT-DOU', 'Abattant lavant à eau tiède et séchage.', 449, 529, 14, (SELECT id FROM public.categories WHERE slug = 'sanitaire'), '/__l5e/assets-v1/55f36430-2120-40c5-851d-7b9a184faa85/seed-bidet-seat.jpg', NULL, false, 14),
('Abattant lavant Essentiel', 'abattant-lavant-essentiel', 'DB-ABT-ESS', 'Abattant lavant simple, sans électricité.', 299, NULL, 28, (SELECT id FROM public.categories WHERE slug = 'sanitaire'), '/__l5e/assets-v1/55f36430-2120-40c5-851d-7b9a184faa85/seed-bidet-seat.jpg', NULL, false, 15),
('Meuble vasque Pierre', 'meuble-vasque-pierre', 'DB-MEU-PIE', 'Vasque en pierre sur meuble bois.', 1150, NULL, 4, (SELECT id FROM public.categories WHERE slug = 'meubles'), '/__l5e/assets-v1/0b9cba19-593c-4886-aff7-0d96feceefd1/seed-vanity.jpg', NULL, false, 16),
('Ensemble Harmonie', 'ensemble-harmonie', 'DB-MEU-HAR', 'Meuble, vasque et miroir assortis.', 2490, 2890, 3, (SELECT id FROM public.categories WHERE slug = 'meubles'), '/__l5e/assets-v1/4a5a49c7-256e-4d35-aba7-c01616e04432/seed-hero-bathroom.jpg', 'Best-seller', false, 17);

INSERT INTO public.cms_pages (title, slug, content, meta_title, meta_description, position) VALUES
('À propos', 'a-propos', E'## Qui sommes-nous ?\n\nDeco best accompagne particuliers et professionnels dans l''aménagement de leur salle de bain, de leur cuisine et de leurs espaces en verre.\n\n## Nos engagements\n\n- Des produits certifiés et durables\n- Une livraison rapide partout au Maroc\n- Des conseils personnalisés avant et après l''achat', 'À propos — Deco best', 'Découvrez Deco best, spécialiste du sanitaire et des accessoires de verre au Maroc.', 1),
('Livraison', 'livraison', E'## Délais\n\nNous livrons partout au Maroc sous 2 à 5 jours ouvrés selon la ville.\n\n## Frais\n\nLes frais de livraison sont confirmés par téléphone lors de la validation de votre commande.\n\n## Paiement\n\nPaiement à la livraison ou par virement.', 'Livraison — Deco best', 'Délais, frais et modes de paiement pour la livraison au Maroc.', 2),
('Conditions générales de vente', 'conditions-generales-de-vente', E'## Commandes\n\nToute commande passée sur le site est confirmée par notre équipe par téléphone.\n\n## Prix\n\nLes prix sont indiqués en dirhams (DH) toutes taxes comprises.\n\n## Retours\n\nVous disposez de 7 jours après réception pour nous signaler un problème.', 'CGV — Deco best', 'Conditions générales de vente de Deco best.', 3),
('Mentions légales', 'mentions-legales', E'## Éditeur\n\nDeco best — Maroc\n\nE-mail : contact@decobest.ma\n\n## Hébergement\n\nSite hébergé par Lovable.', 'Mentions légales — Deco best', 'Mentions légales du site Deco best.', 4);
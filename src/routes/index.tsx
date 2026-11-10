import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Bluetooth, ChevronLeft, ChevronRight, CreditCard, Fingerprint, Grid3x3, Headphones, ShieldCheck, ShoppingCart, Smartphone, Truck } from "lucide-react";
import showroom from "@/assets/showroom-night.jpg";
import hero from "@/assets/hero-bathroom.jpg";
import dark from "@/assets/banner-dark.jpg";
import vanity from "@/assets/vanity.jpg";
import toiletPng from "@/assets/toilet-a.png";
import showerPng from "@/assets/shower-a.png";
import mirrorPng from "@/assets/mirror-a.png";
import lockPng from "@/assets/lock-a.png";
import homePng from "@/assets/home-a.png";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { ProductCoverflow } from "@/components/ProductCoverflow";
import { BannerCarousel } from "@/components/BannerCarousel";
import { Reveal } from "@/components/Reveal";
import { products, formatPrice } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Deco best — Sanitaire & accessoires de verre au Maroc" },
      { name: "description", content: "Sanitaire, lavabos, douches, miroirs et serrures intelligentes. Livraison partout au Maroc." },
      { property: "og:title", content: "Deco best — Sanitaire & accessoires de verre" },
      { property: "og:description", content: "Solutions complètes pour votre salle de bain, cuisine et aménagement en verre." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const slides = [
  { img: showroom, a: "Sanitaire &", b: "Accessoire", c: "de Verre", text: "Solutions complètes pour votre salle de bain, cuisine et aménagement en verre." },
  { img: hero, a: "WC", b: "intelligents", c: "nouvelle génération", text: "Lavage tiède, siège chauffant et ouverture automatique." },
  { img: vanity, a: "Lavabos &", b: "Meubles", c: "sur mesure", text: "Pierre, bois et lumière pour une salle de bain qui vous ressemble." },
];

const univers = [
  { img: toiletPng, label: "Sanitaire" },
  { img: vanity, label: "Lavabos & Meubles", cover: true },
  { img: showerPng, label: "Douche & Colonne" },
  { img: mirrorPng, label: "Miroirs" },
  { img: lockPng, label: "Smart Locks" },
  { img: homePng, label: "Maison connectée" },
];

function SectionTitle({ a, b, sub }: { a: string; b: string; sub?: string }) {
  return (
    <Reveal className="mb-10 text-center">
      <div className="flex items-center justify-center gap-6">
        <span className="h-0.5 w-16 bg-primary" />
        <h2 className="text-4xl md:text-5xl">{a} <span className="text-primary">{b}</span></h2>
        <span className="h-0.5 w-16 bg-primary" />
      </div>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </Reveal>
  );
}

function CTA({ to, children }: { to: "/boutique" | "/produits-intelligents"; children: ReactNode }) {
  return (
    <Link to={to} className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground transition hover:gap-3 hover:shadow-[var(--glow)]">
      {children}<ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function Index() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % slides.length), 6000); return () => clearInterval(t); }, [i]);
  const s = slides[i]!;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="relative h-[560px] overflow-hidden bg-background">
        <div className="absolute inset-y-0 right-0 w-full md:w-[66%]" style={{ filter: "drop-shadow(0 0 30px oklch(0.86 0.175 95 / 0.45))" }}>
          <div className="absolute inset-0 bg-primary" style={{ clipPath: "polygon(22% 0, 100% 0, 100% 100%, 0 100%)" }} />
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: "polygon(23.2% 0, 100% 0, 100% 100%, 1.2% 100%)" }}>
            {slides.map((sl, k) => (
              <img key={k} src={sl.img} alt="" aria-hidden width={1600} height={900}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${k === i ? "animate-ken-burns opacity-100" : "opacity-0"}`} />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent md:hidden" />
          </div>
        </div>
        <div key={i} className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-6">
          <div className="max-w-md">
            <p className="animate-fade-up text-xl font-bold text-primary">Deco best</p>
            <h1 className="animate-fade-up mt-2 text-5xl leading-[1.05] md:text-6xl" style={{ animationDelay: "120ms" }}>
              <span className="text-primary">{s.a}</span><br />{s.b}<br /><span className="text-primary">{s.c}</span>
            </h1>
            <p className="animate-fade-up mt-5 text-muted-foreground" style={{ animationDelay: "240ms" }}>{s.text}</p>
            <div className="animate-fade-up mt-8" style={{ animationDelay: "360ms" }}><CTA to="/boutique">Découvrir nos produits</CTA></div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-3 md:left-[60%]">
          {slides.map((_, k) => <button key={k} aria-label={`Diapositive ${k + 1}`} onClick={() => setI(k)} className={`h-3 rounded-full transition-all duration-500 ${k === i ? "w-8 bg-primary" : "w-3 bg-foreground/70 hover:bg-foreground"}`} />)}
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-6 md:grid-cols-4">
          {[[Truck, "Livraison partout", "au Maroc"], [ShieldCheck, "Produits certifiés", "& de qualité"], [CreditCard, "Paiement sécurisé", "et facile"], [Headphones, "Conseils &", "accompagnement personnalisé"]].map(([Icon, a, b], k) => {
            const I = Icon as typeof Truck;
            return (
              <Reveal key={k} delay={k * 100} className="flex items-center gap-4">
                <I className="h-9 w-9 shrink-0 text-primary" strokeWidth={1.5} />
                <p className="text-sm leading-snug">{a as string}<br /><span className="text-muted-foreground">{b as string}</span></p>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Nos univers */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionTitle a="Nos" b="Univers" sub="Découvrez nos gammes de produits" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {univers.map((u, k) => (
            <Reveal key={u.label} delay={k * 80}>
              <Link to="/boutique" className="glow-border glow-border-hover group block overflow-hidden rounded-2xl bg-gradient-to-b from-muted to-card">
                <div className="flex aspect-[4/5] items-center justify-center overflow-hidden">
                  <img src={u.img} alt={u.label} loading="lazy"
                    className={`transition-transform duration-700 group-hover:scale-110 ${u.cover ? "h-full w-full object-cover" : "h-[85%] w-[85%] object-contain drop-shadow-2xl"}`} />
                </div>
                <p className="border-t border-border bg-card/80 px-3 py-3 text-center text-sm font-semibold">{u.label}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Smart locks banner */}
      <section className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="glow-border relative overflow-hidden rounded-3xl bg-card" style={{ clipPath: "polygon(3% 0, 100% 0, 97% 100%, 0 100%)" }}>
            <img src={dark} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40 blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-r from-card via-card/80 to-transparent" />
            <div className="relative grid items-center gap-6 px-12 py-10 md:grid-cols-[1fr_auto_220px] md:px-20">
              <div>
                <h2 className="text-4xl text-primary md:text-5xl">Smart Locks</h2>
                <p className="mt-3 max-w-xs text-lg">Serrures intelligentes pour plus de sécurité et de confort</p>
                <div className="mt-6"><CTA to="/produits-intelligents">Voir la gamme</CTA></div>
              </div>
              <div className="flex gap-3">
                {[Fingerprint, Grid3x3, Smartphone, Bluetooth].map((I, k) => (
                  <span key={k} className="flex h-14 w-14 items-center justify-center rounded-xl border border-foreground/30 bg-background/50 transition hover:border-primary hover:text-primary"><I className="h-6 w-6" /></span>
                ))}
              </div>
              <img src={lockPng} alt="Serrure intelligente" loading="lazy" className="mx-auto h-56 object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105" />
            </div>
          </div>
        </Reveal>
      </section>

      <FeaturedProducts />

      <BannerCarousel />

      <ProductCoverflow />

      {/* Inspiration */}
      <section className="relative grid overflow-hidden bg-card md:grid-cols-2">
        <div className="relative h-80 md:h-[420px]">
          <img src={hero} alt="Salle de bain moderne" loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: "polygon(0 0, 100% 0, 88% 100%, 0 100%)" }} />
          <div className="absolute inset-y-0 right-[6%] hidden w-1 -skew-x-[15deg] bg-primary shadow-[var(--glow)] md:block" />
        </div>
        <Reveal className="flex flex-col justify-center px-10 py-12">
          <h2 className="text-4xl md:text-5xl">Inspirez-vous<br />pour votre <span className="text-primary">salle de bain</span></h2>
          <p className="mt-4 max-w-sm text-muted-foreground">Des idées modernes et élégantes pour un espace qui vous ressemble.</p>
          <div className="mt-8"><CTA to="/produits-intelligents">Voir nos inspirations</CTA></div>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
}

const tabs = ["Nouveautés", "Promotions", "Meilleures ventes"] as const;

function FeaturedProducts() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Nouveautés");
  const [start, setStart] = useState(0);
  const list = tab === "Promotions" ? products.filter((p) => p.oldPrice) : tab === "Meilleures ventes" ? [...products].sort((a, b) => b.price - a.price) : products;
  const perView = 4;
  const max = Math.max(0, list.length - perView);
  const go = (d: number) => setStart((x) => Math.min(max, Math.max(0, x + d)));
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <SectionTitle a="Nos Produits" b="Vedettes" />
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {tabs.map((t) => (
          <button key={t} onClick={() => { setTab(t); setStart(0); }}
            className={`rounded-full border px-8 py-2 text-sm font-semibold transition ${tab === t ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary"}`}>{t}</button>
        ))}
      </div>
      <div className="relative">
        <button aria-label="Précédent" onClick={() => go(-1)} disabled={start === 0} className="absolute -left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-background text-primary transition hover:bg-primary hover:text-primary-foreground disabled:opacity-30 md:-left-6"><ChevronLeft className="h-5 w-5" /></button>
        <button aria-label="Suivant" onClick={() => go(1)} disabled={start >= max} className="absolute -right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-background text-primary transition hover:bg-primary hover:text-primary-foreground disabled:opacity-30 md:-right-6"><ChevronRight className="h-5 w-5" /></button>
        <div className="overflow-hidden">
          <div key={tab} className="animate-fade-up flex transition-transform duration-500" style={{ transform: `translateX(-${start * (100 / perView)}%)` }}>
            {list.map((p) => (
              <div key={p.id} className="w-1/2 shrink-0 p-2 md:w-1/4">
                <div className="glow-border-hover group overflow-hidden rounded-2xl border border-primary/40 bg-card">
                  <div className="relative aspect-square overflow-hidden">
                    {p.badge && <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">{p.badge}</span>}
                    <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-4">
                    <h3 className="truncate font-sans text-sm font-semibold">{p.name}</h3>
                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        {p.oldPrice && <p className="text-xs text-muted-foreground line-through">{formatPrice(p.oldPrice)}</p>}
                        <p className="font-display text-xl font-bold">{formatPrice(p.price)}</p>
                      </div>
                      <Link to="/boutique" aria-label={`Acheter ${p.name}`} className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition hover:scale-110"><ShoppingCart className="h-5 w-5" /></Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

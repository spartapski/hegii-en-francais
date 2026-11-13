import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, Bluetooth, ChevronLeft, ChevronRight, CreditCard, Fingerprint, Grid3x3, Headphones, ShieldCheck, ShoppingCart, Smartphone, Truck } from "lucide-react";
import showroom from "@/assets/showroom-night.jpg";
import hero from "@/assets/hero-bathroom.jpg";
import dark from "@/assets/banner-dark.jpg";
import lavabo from "@/assets/hero-lavabo-gold.jpg";
import lockPng from "@/assets/lock-a.png";
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
  { img: lavabo, a: "Lavabos &", b: "Meubles", c: "sur mesure", text: "Pierre, bois et lumière pour une salle de bain qui vous ressemble." },
  { img: showroom, a: "Sanitaire &", b: "Accessoire", c: "de Verre", text: "Solutions complètes pour votre salle de bain, cuisine et aménagement en verre." },
  { img: hero, a: "WC", b: "intelligents", c: "nouvelle génération", text: "Lavage tiède, siège chauffant et ouverture automatique." },
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
      <section className="relative h-[520px] overflow-hidden bg-background md:h-[560px]">
        <div className="absolute inset-y-0 right-0 w-full md:w-[78%]">
          {slides.map((sl, k) => (
            <img key={k} src={sl.img} alt="" aria-hidden width={1600} height={912}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${k === i ? "animate-ken-burns opacity-100" : "opacity-0"}`} />
          ))}
        </div>
        {/* Curved dark panel + glowing gold edge */}
        <svg className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="heroFade" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="var(--background)" />
              <stop offset="1" stopColor="var(--background)" stopOpacity="0.92" />
            </linearGradient>
          </defs>
          <path d="M0 0 H45 C39 25 37 60 27 100 H0 Z" fill="url(#heroFade)" />
        </svg>
        <svg className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" style={{ filter: "drop-shadow(0 0 10px var(--primary)) drop-shadow(0 0 24px var(--primary))" }} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          <path d="M45 0 C39 25 37 60 27 100" fill="none" stroke="var(--primary)" strokeWidth="5" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent md:hidden" />
        <div key={i} className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-6 md:px-10">
          <div className="max-w-md">
            <p className="animate-fade-up flex items-center gap-4 font-serif text-2xl font-bold text-primary">Deco best <span className="h-0.5 w-24 bg-primary" /></p>
            <h1 className="animate-fade-up mt-4 font-serif text-5xl font-extrabold leading-[1.02] md:text-6xl" style={{ animationDelay: "120ms" }}>
              {s.a}<br />{s.b}<br /><span className="italic text-primary">{s.c}</span>
            </h1>
            <span className="animate-fade-up mt-6 block h-0.5 w-24 bg-foreground" style={{ animationDelay: "200ms" }} />
            <p className="animate-fade-up mt-6 max-w-sm text-lg" style={{ animationDelay: "240ms" }}>{s.text}</p>
            <div className="animate-fade-up mt-8" style={{ animationDelay: "360ms" }}>
              <Link to="/boutique" className="inline-flex items-center gap-4 rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground transition hover:gap-6 hover:shadow-[var(--glow)]">
                Découvrir nos produits<ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-3">
          {slides.map((_, k) => <button key={k} aria-label={`Diapositive ${k + 1}`} onClick={() => setI(k)} className={`h-4 w-4 rounded-full transition-all duration-500 ${k === i ? "bg-primary shadow-[var(--glow)]" : "bg-foreground/80 hover:bg-foreground"}`} />)}
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-6 md:grid-cols-4 md:gap-0">
          {[[ShieldCheck, "Produits certifiés", "Qualité & durabilité"], [Truck, "Livraison rapide", "Partout au Maroc"], [CreditCard, "Paiement sécurisé", "100% garanti"], [Headphones, "Conseils &", "accompagnement personnalisé"]].map(([Icon, a, b], k) => {
            const I = Icon as typeof Truck;
            return (
              <Reveal key={k} delay={k * 100} className={`flex items-center justify-center gap-4 ${k > 0 ? "md:border-l md:border-border" : ""}`}>
                <I className="h-10 w-10 shrink-0 text-primary" strokeWidth={1.5} />
                <p className="text-sm leading-snug"><span className="text-base font-bold">{a as string}</span><br /><span className="text-muted-foreground">{b as string}</span></p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <BannerCarousel />

      <ProductCoverflow variant="services" />

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

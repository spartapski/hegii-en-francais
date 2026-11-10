import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import dark from "@/assets/banner-dark.jpg";
import toilet from "@/assets/smart-toilet.jpg";
import bidet from "@/assets/bidet-seat.jpg";
import hero from "@/assets/hero-bathroom.jpg";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { ProductCoverflow } from "@/components/ProductCoverflow";
import { Reveal } from "@/components/Reveal";
import { products, formatPrice } from "@/lib/products";

export const Route = createFileRoute("/produits-intelligents")({
  head: () => ({
    meta: [
      { title: "Produits intelligents — Deco best" },
      { name: "description", content: "WC intelligents et abattants lavants : fonctions, comparatif et prix." },
      { property: "og:title", content: "Produits intelligents — Deco best" },
      { property: "og:description", content: "Découvrez notre sélection de produits intelligents." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const features = [
  ["Siège chauffant", "4 niveaux de température"],
  ["Lavage tiède", "Buse auto-nettoyante"],
  ["Séchage à air", "Air chaud réglable"],
  ["Chasse automatique", "Détection à l'éloignement"],
  ["Désodorisation", "Filtre à charbon actif"],
  ["Veilleuse LED", "Éclairage doux la nuit"],
];

const series = [
  { img: toilet, tag: "Série S", title: "Le tout-en-un intelligent", text: "Ouverture automatique du couvercle, lavage à température constante et écran de contrôle tactile.", price: 1290 },
  { img: dark, tag: "Série Nocturne", title: "Suspendu, silencieux, élégant", text: "Un design flottant qui libère le sol, avec chasse puissante et silencieuse.", price: 1890 },
  { img: bidet, tag: "Abattants lavants", title: "Rendez votre WC intelligent", text: "S'installe en 30 minutes sur la plupart des cuvettes existantes.", price: 299 },
];

const tabs = ["WC intelligents", "Abattants"] as const;

function Page() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("WC intelligents");
  const list = products.filter((p) => p.category === tab);
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="relative h-[75vh] overflow-hidden bg-card">
        <img src={hero} alt="Produits intelligents" className="animate-ken-burns absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20 text-foreground">
          <p className="animate-fade-up text-xs uppercase tracking-[0.3em]">Sélection</p>
          <h1 className="animate-fade-up mt-3 text-5xl md:text-7xl" style={{ animationDelay: "150ms" }}>Produits intelligents</h1>
          <p className="animate-fade-up mt-4 max-w-lg opacity-90" style={{ animationDelay: "300ms" }}>Le confort d'une technologie pensée pour chaque instant.</p>
        </div>
      </section>

      <ProductCoverflow />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal><h2 className="mb-12 text-center text-4xl">Des fonctions qui changent tout</h2></Reveal>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {features.map(([t, d], k) => (
            <Reveal key={t} delay={k * 80}>
              <div className="h-full border border-border p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-accent">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary font-display text-xl text-accent">{k + 1}</div>
                <h3 className="text-lg">{t}</h3><p className="mt-1 text-xs text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {series.map((s, k) => (
        <section key={s.tag} className={k % 2 ? "bg-secondary" : ""}>
          <div className={`mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2`}>
            <Reveal className={k % 2 ? "md:order-2" : ""}><div className="overflow-hidden"><img src={s.img} alt={s.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-105" /></div></Reveal>
            <Reveal delay={150}>
              <p className="text-xs uppercase tracking-[0.3em] text-accent">{s.tag}</p>
              <h2 className="mt-3 text-4xl md:text-5xl">{s.title}</h2>
              <p className="mt-5 text-muted-foreground">{s.text}</p>
              <p className="mt-6 text-sm">À partir de <span className="font-display text-3xl">{formatPrice(s.price)}</span></p>
              <Link to="/boutique" className="mt-6 inline-block bg-primary px-8 py-3 text-sm uppercase tracking-wider text-primary-foreground transition hover:bg-accent">Découvrir</Link>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-4xl">Toute la sélection</h2>
          <div className="flex gap-2">{tabs.map((t) => <button key={t} onClick={() => setTab(t)} className={`border px-5 py-2 text-sm transition ${tab === t ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>{t}</button>)}</div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, k) => (
            <Reveal key={p.id} delay={k * 120}>
              <Link to="/boutique" className="group block">
                <div className="relative overflow-hidden bg-muted">
                  {p.badge && <span className="absolute left-3 top-3 z-10 bg-accent px-2 py-1 text-xs text-accent-foreground">{p.badge}</span>}
                  <img src={p.img} alt={p.name} loading="lazy" className="aspect-square w-full object-cover transition duration-700 group-hover:scale-110" />
                </div>
                <h3 className="mt-4 text-2xl">{p.name}</h3>
                <p className="mt-1"><span className="font-semibold">{formatPrice(p.price)}</span>{p.oldPrice && <span className="ml-2 text-sm text-muted-foreground line-through">{formatPrice(p.oldPrice)}</span>}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-4xl overflow-x-auto px-6">
          <Reveal><h2 className="mb-8 text-center text-4xl">Comparatif</h2></Reveal>
          <table className="w-full bg-card text-sm">
            <thead><tr className="border-b border-border">{["Fonction", "Série S", "Nocturne", "Abattant"].map((h) => <th key={h} className="p-4 text-left font-medium">{h}</th>)}</tr></thead>
            <tbody>
              {[["Siège chauffant", "✓", "✓", "✓"], ["Lavage tiède", "✓", "✓", "✓"], ["Séchage à air", "✓", "✓", "—"], ["Chasse automatique", "✓", "✓", "—"], ["Ouverture automatique", "✓", "—", "—"]].map((r) => (
                <tr key={r[0]} className="border-b border-border">{r.map((c, i) => <td key={i} className={`p-4 ${i ? "text-accent" : ""}`}>{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

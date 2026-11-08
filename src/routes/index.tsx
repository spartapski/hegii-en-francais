import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import hero from "@/assets/hero-bathroom.jpg";
import dark from "@/assets/banner-dark.jpg";
import vanity from "@/assets/vanity.jpg";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { ProductCoverflow } from "@/components/ProductCoverflow";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurélis — WC intelligents & salles de bain design" },
      { name: "description", content: "Découvrez nos WC intelligents, abattants lavants et meubles de salle de bain." },
      { property: "og:title", content: "Aurélis — WC intelligents & salles de bain design" },
      { property: "og:description", content: "Le confort intelligent pour votre salle de bain." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const slides = [
  { img: hero, kicker: "Nouvelle collection 2026", title: "L'intelligence au service de votre bien-être" },
  { img: dark, kicker: "Série Nocturne", title: "Le WC suspendu, réinventé" },
  { img: vanity, kicker: "Matières nobles", title: "La pierre et le bois, en harmonie" },
];

function Index() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % slides.length), 6000); return () => clearInterval(t); }, []);
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="relative h-[88vh] overflow-hidden bg-primary">
        {slides.map((s, k) => (
          <div key={k} className={`absolute inset-0 transition-opacity duration-1000 ${k === i ? "opacity-100" : "opacity-0"}`}>
            <img src={s.img} alt={s.title} className={`h-full w-full object-cover ${k === i ? "animate-ken-burns" : ""}`} />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/20 to-transparent" />
            {k === i && (
              <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-6 text-primary-foreground" style={{ marginTop: "-88vh" }}>
                <p className="animate-fade-up mb-4 text-xs uppercase tracking-[0.3em]">{s.kicker}</p>
                <h1 className="animate-fade-up max-w-2xl text-5xl leading-tight md:text-7xl" style={{ animationDelay: "150ms" }}>{s.title}</h1>
                <Link to="/boutique" className="animate-fade-up mt-8 w-fit border border-primary-foreground px-8 py-3 text-sm uppercase tracking-wider transition hover:bg-primary-foreground hover:text-primary" style={{ animationDelay: "300ms" }}>Acheter maintenant</Link>
              </div>
            )}
          </div>
        ))}
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3">
          {slides.map((_, k) => <button key={k} aria-label={`Diapositive ${k + 1}`} onClick={() => setI(k)} className={`h-0.5 transition-all duration-500 ${k === i ? "w-12 bg-primary-foreground" : "w-6 bg-primary-foreground/40"}`} />)}
        </div>
      </section>

      <ProductCoverflow />

      <section className="relative h-[70vh] overflow-hidden">
        <img src={dark} alt="WC suspendu Nocturne" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 text-primary-foreground">
          <Reveal className="max-w-md"><p className="text-xs uppercase tracking-[0.3em] opacity-80">Offre limitée</p><h2 className="mt-4 text-5xl">Jusqu'à -20 % sur la Série Nocturne</h2><Link to="/boutique" className="mt-8 inline-block bg-accent px-8 py-3 text-sm uppercase tracking-wider text-accent-foreground">J'en profite</Link></Reveal>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-4">
          {[["Hygiène", "Auto-nettoyage UV et buse antibactérienne."], ["Confort", "Eau et siège à température réglable."], ["Économie", "Jusqu'à 30 % d'eau en moins."], ["Connecté", "Télécommande et application mobile."]].map(([t, d], k) => (
            <Reveal key={t} delay={k * 120}><h3 className="text-3xl text-accent">{t}</h3><p className="mt-3 text-sm text-muted-foreground">{d}</p></Reveal>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

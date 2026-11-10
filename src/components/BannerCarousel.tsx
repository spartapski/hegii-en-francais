import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import hero from "@/assets/hero-bathroom.jpg";
import dark from "@/assets/banner-dark.jpg";
import vanity from "@/assets/vanity.jpg";
import toilet from "@/assets/smart-toilet.jpg";
import seat from "@/assets/bidet-seat.jpg";
import { Reveal } from "@/components/Reveal";

const slides = [
  { img: toilet, kicker: "WC intelligents", title: "Le confort, automatiquement" },
  { img: dark, kicker: "Série Nocturne", title: "L'élégance du noir mat" },
  { img: vanity, kicker: "Meubles de salle de bain", title: "Pierre, bois et lumière" },
  { img: seat, kicker: "Abattants lavants", title: "Une hygiène nouvelle génération" },
  { img: hero, kicker: "Salle de bain complète", title: "Votre espace, entièrement repensé" },
];

export function BannerCarousel() {
  const [i, setI] = useState(0);
  const n = slides.length;
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % n), 5500); return () => clearInterval(t); }, [i, n]);
  return (
    <section className="overflow-hidden bg-background py-20">
      <Reveal className="mx-auto mb-12 max-w-7xl px-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">Nos univers</p>
        <h2 className="mt-3 text-4xl md:text-6xl">Découvrez la salle de bain intelligente</h2>
      </Reveal>
      <div className="relative">
        <div className="flex gap-6 transition-transform duration-700 ease-out"
          style={{ transform: `translateX(calc(10vw - ${i} * (80vw + 1.5rem)))` }}>
          {slides.map((s, k) => {
            const active = k === i;
            return (
              <div key={s.title} onClick={() => setI(k)}
                className={`relative h-[55vh] min-h-[360px] w-[80vw] shrink-0 cursor-pointer overflow-hidden transition-opacity duration-700 ${active ? "opacity-100" : "opacity-50"}`}>
                <img src={s.img} alt={s.title} loading="lazy"
                  className={`h-full w-full object-cover transition-transform duration-[2000ms] ease-out ${active ? "scale-105" : "scale-100"}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                {active && (
                  <div key={i} className="absolute bottom-10 left-10 max-w-xl text-primary-foreground">
                    <p className="animate-fade-up text-xs uppercase tracking-[0.3em]">{s.kicker}</p>
                    <h3 className="animate-fade-up mt-3 text-4xl md:text-5xl" style={{ animationDelay: "150ms" }}>{s.title}</h3>
                    <Link to="/boutique" className="animate-fade-up mt-6 inline-block border border-primary-foreground px-6 py-2 text-xs uppercase tracking-wider transition hover:bg-primary-foreground hover:text-primary" style={{ animationDelay: "300ms" }}>Découvrir</Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-8 flex justify-center gap-3">
        {slides.map((_, k) => (
          <button key={k} aria-label={`Bannière ${k + 1}`} onClick={() => setI(k)}
            className={`h-2 rounded-full transition-all duration-500 ${k === i ? "w-8 bg-accent" : "w-2 bg-border hover:bg-accent/60"}`} />
        ))}
      </div>
    </section>
  );
}

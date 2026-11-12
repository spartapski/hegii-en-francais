import { useEffect, useState } from "react";
import bg from "@/assets/coverflow-dark-bg.jpg";
import a from "@/assets/toilet-a.png";
import b from "@/assets/toilet-b.png";
import c from "@/assets/toilet-c.png";
import m1 from "@/assets/mirror-a.png";
import m2 from "@/assets/mirror-b.png";
import d1 from "@/assets/shower-a.png";
import d2 from "@/assets/shower-b.png";
import l1 from "@/assets/lock-a.png";
import l2 from "@/assets/lock-b.png";
import h1 from "@/assets/home-a.png";
import h2 from "@/assets/home-b.png";
import { formatPrice } from "@/lib/products";
import { Reveal } from "@/components/Reveal";

type Item = { img: string; name: string; desc: string; price: number };
const categories: { label: string; card: string; items: Item[] }[] = [
  { label: "Toilettes", card: "Sanitaire", items: [
    { img: a, name: "Série S1", desc: "Ouverture automatique · Lavage tiède", price: 1290 },
    { img: b, name: "Série Brume", desc: "Compact · Couvercle gris perle", price: 990 },
    { img: c, name: "Série Aurore", desc: "Finition champagne · Séchage à air", price: 1690 },
  ] },
  { label: "Miroirs", card: "Miroirs", items: [
    { img: m1, name: "Miroir Halo", desc: "LED circulaire · Anti-buée · Horloge", price: 390 },
    { img: m2, name: "Miroir Lumen", desc: "Sans cadre · Éclairage réglable", price: 450 },
  ] },
  { label: "Douches", card: "Douche & Colonne", items: [
    { img: d1, name: "Colonne Or", desc: "Thermostatique · Pluie carrée", price: 690 },
    { img: d2, name: "Colonne Noir mat", desc: "Thermostatique · Pluie ronde", price: 590 },
  ] },
  { label: "Serrures", card: "Smart Locks", items: [
    { img: l1, name: "Serrure Empreinte", desc: "Empreinte digitale · Code", price: 249 },
    { img: l2, name: "Serrure Visage", desc: "Reconnaissance faciale · Caméra", price: 459 },
  ] },
  { label: "Maison connectée", card: "Maison connectée", items: [
    { img: h1, name: "Pack Domotique", desc: "Écran de contrôle · Enceinte · Capteur", price: 520 },
    { img: h2, name: "Pack Sécurité", desc: "Caméra · Interrupteur connecté", price: 210 },
  ] },
];

const cardImg = [a, m1, d1, l1, h1];

export function ProductCoverflow({ variant = "tabs" }: { variant?: "tabs" | "services" }) {
  const [cat, setCat] = useState(0);
  const [i, setI] = useState(0);
  const items = categories[cat]!.items;
  const n = items.length;
  const go = (d: number) => setI((x) => (x + d + n) % n);
  useEffect(() => { const t = setInterval(() => go(1), 5000); return () => clearInterval(t); }, [i, cat]);
  const cur = items[i % n]!;
  const pick = (k: number) => { setCat(k); setI(0); };
  return (
    <section className="relative overflow-hidden bg-background text-foreground">
      <img src={bg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
      {variant === "services" ? (
        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-16">
          <Reveal className="mb-10 text-center">
            <div className="flex items-center justify-center gap-6">
              <span className="h-0.5 w-16 bg-primary" />
              <h2 className="text-4xl md:text-5xl">Nos <span className="text-primary">Produits</span></h2>
              <span className="h-0.5 w-16 bg-primary" />
            </div>
            <p className="mt-3 text-muted-foreground">Choisissez un univers pour découvrir nos produits</p>
          </Reveal>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:gap-5">
            {categories.map((c, k) => (
              <Reveal key={c.label} delay={k * 80}>
                <button onClick={() => pick(k)} aria-pressed={k === cat}
                  className={`group block w-full overflow-hidden rounded-2xl bg-gradient-to-b from-muted/80 to-card/80 backdrop-blur transition duration-500 ${k === cat ? "glow-border -translate-y-2 shadow-[var(--glow)]" : "border border-border opacity-80 hover:-translate-y-1 hover:opacity-100 glow-border-hover"}`}>
                  <div className="flex aspect-square items-center justify-center overflow-hidden">
                    <img src={cardImg[k]} alt={c.card} loading="lazy" className="h-[80%] w-[80%] object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <p className={`border-t px-2 py-2.5 text-center text-xs font-semibold md:text-sm ${k === cat ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card/80"}`}>{c.card}</p>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex flex-wrap justify-center gap-2 px-4 pt-8">
          {categories.map((c, k) => (
            <button key={c.label} onClick={() => pick(k)}
              className={`rounded-full border px-5 py-2 text-xs uppercase tracking-widest transition ${k === cat ? "border-accent bg-accent text-accent-foreground" : "border-foreground/30 hover:border-accent"}`}>{c.label}</button>
          ))}
        </div>
      )}
      <div className="relative h-[560px]">
        <div key={cat} className="animate-fade-up absolute inset-0">
          {items.map((it, k) => {
            let off = k - i; if (off > n / 2) off -= n; if (off < -n / 2) off += n;
            if (n === 2 && off !== 0) off = k > i ? 1 : -1;
            const center = off === 0;
            return (
              <img key={it.name} src={it.img} alt={it.name} onClick={() => setI(k)}
                className="absolute left-1/2 top-[44%] w-[min(34vw,380px)] cursor-pointer drop-shadow-2xl transition-all duration-700 ease-out"
                style={{
                  transform: `translate(-50%, -50%) translateX(${off * 32}vw) scale(${center ? 1 : 0.6})`,
                  filter: center ? "none" : "blur(6px)",
                  opacity: Math.abs(off) > 1 ? 0 : center ? 1 : 0.6,
                  zIndex: center ? 2 : 1,
                }} />
            );
          })}
        </div>
        <div key={`${cat}-${i}`} className="animate-fade-up absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
          <h3 className="text-4xl">{cur.name}</h3>
          <p className="mt-1 text-sm opacity-70">{cur.desc}</p>
          <p className="mt-2 font-semibold text-accent">{formatPrice(cur.price)}</p>
        </div>
        <button aria-label="Précédent" onClick={() => go(-1)} className="absolute left-6 top-[44%] z-10 -translate-y-1/2 text-6xl font-thin transition hover:scale-110 hover:text-accent">‹</button>
        <button aria-label="Suivant" onClick={() => go(1)} className="absolute right-6 top-[44%] z-10 -translate-y-1/2 text-6xl font-thin transition hover:scale-110 hover:text-accent">›</button>
      </div>
    </section>
  );
}

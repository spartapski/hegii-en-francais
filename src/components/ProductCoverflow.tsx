import { useEffect, useState } from "react";
import sky from "@/assets/carousel-sky.jpg";
import a from "@/assets/toilet-a.png";
import b from "@/assets/toilet-b.png";
import c from "@/assets/toilet-c.png";
import { formatPrice } from "@/lib/products";

const items = [
  { img: a, name: "Série S1", desc: "Ouverture automatique · Lavage tiède", price: 1290 },
  { img: b, name: "Série Brume", desc: "Compact · Couvercle gris perle", price: 990 },
  { img: c, name: "Série Aurore", desc: "Finition champagne · Séchage à air", price: 1690 },
];

export function ProductCoverflow() {
  const [i, setI] = useState(0);
  const n = items.length;
  const go = (d: number) => setI((x) => (x + d + n) % n);
  useEffect(() => { const t = setInterval(() => go(1), 5000); return () => clearInterval(t); }, [i]);
  const cur = items[i]!;
  return (
    <section className="relative h-[560px] overflow-hidden">
      <img src={sky} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
      <div className="relative h-full">
        {items.map((it, k) => {
          let off = k - i; if (off > n / 2) off -= n; if (off < -n / 2) off += n;
          const center = off === 0;
          return (
            <img key={it.name} src={it.img} alt={it.name} onClick={() => setI(k)}
              className="absolute left-1/2 top-[42%] w-[min(42vw,460px)] cursor-pointer drop-shadow-2xl transition-all duration-700 ease-out"
              style={{
                transform: `translate(-50%, -50%) translateX(${off * 34}vw) scale(${center ? 1 : 0.62})`,
                filter: center ? "none" : "blur(6px)",
                opacity: Math.abs(off) > 1 ? 0 : center ? 1 : 0.75,
                zIndex: center ? 2 : 1,
              }} />
          );
        })}
        <div key={i} className="animate-fade-up absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-center">
          <h3 className="text-4xl">{cur.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{cur.desc}</p>
          <p className="mt-2 font-semibold">{formatPrice(cur.price)}</p>
        </div>
        <button aria-label="Précédent" onClick={() => go(-1)} className="absolute left-6 top-1/2 z-10 -translate-y-1/2 text-6xl font-thin text-primary-foreground transition hover:scale-110">‹</button>
        <button aria-label="Suivant" onClick={() => go(1)} className="absolute right-6 top-1/2 z-10 -translate-y-1/2 text-6xl font-thin text-primary-foreground transition hover:scale-110">›</button>
      </div>
    </section>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import vanity from "@/assets/vanity.jpg";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Reveal } from "@/components/Reveal";
import { products, formatPrice } from "@/lib/products";

export const Route = createFileRoute("/boutique")({
  head: () => ({
    meta: [
      { title: "Boutique — Deco best" },
      { name: "description", content: "WC intelligents, abattants lavants et meubles de salle de bain : prix et promotions." },
      { property: "og:title", content: "Boutique — Deco best" },
      { property: "og:description", content: "Tous nos produits et leurs prix." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Boutique,
});

const cats = ["Tout", "WC intelligents", "Abattants", "Meubles"];

function Boutique() {
  const [cat, setCat] = useState("Tout");
  const [cart, setCart] = useState<string[]>([]);
  const list = cat === "Tout" ? products : products.filter((p) => p.category === cat);
  const total = cart.reduce((s, id) => s + (products.find((p) => p.id === id)?.price ?? 0), 0);
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader cartCount={cart.length} />
      <section className="relative h-72 overflow-hidden">
        <img src={vanity} alt="Boutique Deco best" className="animate-ken-burns absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/60" />
        <div className="relative flex h-full items-center justify-center text-foreground"><h1 className="animate-fade-up text-6xl">Boutique</h1></div>
      </section>
      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex flex-wrap gap-3">
          {cats.map((c) => <button key={c} onClick={() => setCat(c)} className={`border px-5 py-2 text-sm transition ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`}>{c}</button>)}
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, k) => (
            <Reveal key={p.id} delay={(k % 3) * 120}>
              <div className="group">
                <div className="relative overflow-hidden bg-muted">
                  {p.badge && <span className="absolute left-3 top-3 z-10 bg-accent px-2 py-1 text-xs text-accent-foreground">{p.badge}</span>}
                  <img src={p.img} alt={p.name} loading="lazy" className="aspect-square w-full object-cover transition duration-700 group-hover:scale-110" />
                  <button onClick={() => setCart([...cart, p.id])} className="absolute inset-x-0 bottom-0 translate-y-full bg-primary py-3 text-sm uppercase tracking-wider text-primary-foreground transition duration-300 group-hover:translate-y-0">Ajouter au panier</button>
                </div>
                <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">{p.category}</p>
                <h3 className="mt-1 text-2xl">{p.name}</h3>
                <p className="mt-1"><span className="font-semibold">{formatPrice(p.price)}</span>{p.oldPrice && <span className="ml-2 text-sm text-muted-foreground line-through">{formatPrice(p.oldPrice)}</span>}</p>
              </div>
            </Reveal>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="animate-fade-up fixed bottom-6 right-6 z-40 bg-card p-5 shadow-lg">
            <p className="text-sm">{cart.length} article(s) · <span className="font-semibold">{formatPrice(total)}</span></p>
            <button onClick={() => setCart([])} className="mt-3 text-xs text-muted-foreground underline">Vider le panier</button>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

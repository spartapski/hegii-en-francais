import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Headphones, Search, ShoppingCart, User } from "lucide-react";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-foreground font-display text-lg font-extrabold text-destructive">
        D<span className="text-primary">B</span>
      </span>
      <span className="leading-none">
        <span className="font-display text-2xl font-extrabold text-destructive">Deco <span className="text-primary">best</span></span>
        {!compact && <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wider text-foreground">Sanitaire · Accessoire de verre</span>}
      </span>
    </Link>
  );
}

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/produits-intelligents", label: "Produits intelligents" },
  { to: "/boutique", label: "Boutique" },
] as const;

export function SiteHeader({ cartCount = 0 }: { cartCount?: number; overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  useEffect(() => { const f = () => setScrolled(window.scrollY > 40); f(); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  return (
    <header className={`sticky top-0 z-40 bg-background/95 backdrop-blur transition-shadow duration-500 ${scrolled ? "shadow-lg shadow-background/60" : ""}`}>
      <div className={`mx-auto flex max-w-7xl items-center gap-6 px-6 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
        <Logo compact={scrolled} />
        <form onSubmit={(e) => { e.preventDefault(); navigate({ to: "/boutique" }); }} className="mx-auto hidden w-full max-w-md items-center overflow-hidden rounded-full border border-border bg-card md:flex">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher un produit…" aria-label="Rechercher un produit"
            className="w-full bg-transparent px-5 py-2.5 text-sm outline-none placeholder:text-muted-foreground" />
          <button aria-label="Rechercher" className="bg-primary px-5 py-2.5 text-primary-foreground transition hover:brightness-110"><Search className="h-4 w-4" /></button>
        </form>
        <div className="ml-auto flex items-center gap-6 text-xs">
          <a href="#contact" className="hidden flex-col items-center gap-1 transition hover:text-primary lg:flex"><Headphones className="h-5 w-5" />Service client</a>
          <Link to="/connexion" className="flex flex-col items-center gap-1 transition hover:text-primary"><User className="h-5 w-5" />Backoffice</Link>
          <Link to="/boutique" className="relative flex flex-col items-center gap-1 transition hover:text-primary">
            <ShoppingCart className="h-5 w-5" />Panier
            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">{cartCount}</span>
          </Link>
        </div>
      </div>
      <nav className="border-y border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-6 text-sm font-medium">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }}
              className="whitespace-nowrap px-5 py-3 transition hover:text-primary"
              activeProps={{ className: "bg-primary text-primary-foreground hover:text-primary-foreground" }}>{n.label}</Link>
          ))}
          <Link to="/boutique" className="ml-auto my-2 whitespace-nowrap rounded-full bg-destructive px-4 py-1.5 text-destructive-foreground transition hover:brightness-110">Promotions</Link>
          <a href="#contact" className="whitespace-nowrap px-5 py-3 transition hover:text-primary">Contact</a>
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  const cols: [string, string[]][] = [
    ["Boutique", ["Sanitaire", "Lavabos & meubles", "Douches", "Smart locks"]],
    ["Service", ["Livraison partout au Maroc", "Garantie", "Installation", "SAV"]],
    ["Contact", ["contact@decobest.ma", "+212 5 00 00 00 00"]],
  ];
  return (
    <footer id="contact" className="border-t-2 border-primary bg-card py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-4">
        <div><Logo /><p className="mt-4 text-sm text-muted-foreground">Solutions complètes pour votre salle de bain, cuisine et aménagement en verre.</p></div>
        {cols.map(([t, items]) => (
          <div key={t}><h4 className="mb-4 text-sm font-bold text-primary">{t}</h4>{items.map((i) => <p key={i} className="mb-2 text-sm text-muted-foreground">{i}</p>)}</div>
        ))}
      </div>
      <p className="mx-auto mt-12 max-w-7xl px-6 text-xs text-muted-foreground">© 2026 Deco best. Tous droits réservés.</p>
    </footer>
  );
}

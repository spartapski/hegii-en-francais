import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType } from "react";
import { BadgePercent, ChevronDown, Cpu, Heart, Home, Layers, Mail, Search, ShoppingCart, Sofa, Sparkles, Star, User } from "lucide-react";
import logoWordmark from "@/assets/logo-decobest-wordmark.png.asset.json";

export const PHONE = "+212 6 70 16 40 56";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex shrink-0 flex-col items-center justify-center">
      <img
        src={logoWordmark.url}
        alt="Deco best"
        width={811}
        height={150}
        className={`w-auto object-contain transition-all duration-500 ${compact ? "h-8" : "h-12 md:h-14"}`}
      />
      {!compact && (
        <>
          <span className="mt-1.5 hidden items-center gap-1 text-[9px] font-bold uppercase tracking-wide text-foreground md:flex">
            Sanitaire <Star className="h-2 w-2 fill-primary text-primary" /> Décoration <Star className="h-2 w-2 fill-primary text-primary" /> Smart Home <Star className="h-2 w-2 fill-primary text-primary" /> Accessoires Inox
          </span>
          <svg viewBox="0 0 100 10" className="mt-0.5 hidden h-2.5 w-24 md:block" aria-hidden>
            <path d="M2 9 Q50 -3 98 7" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </>
      )}
    </Link>
  );
}

type NavItem = { to: "/" | "/produits-intelligents" | "/boutique"; label: string; icon: ComponentType<{ className?: string }>; sub?: string[]; exact?: boolean };
const nav: NavItem[] = [
  { to: "/", label: "Accueil", icon: Home, exact: true },
  { to: "/produits-intelligents", label: "Produits intelligents", icon: Cpu, sub: ["WC intelligents", "Abattants", "Miroirs LED", "Smart Locks", "Maison connectée"] },
  { to: "/boutique", label: "Sanitaire", icon: Layers, sub: ["WC & bidets", "Lavabos", "Douches & colonnes", "Robinetterie", "Accessoires inox"] },
  { to: "/boutique", label: "Meubles", icon: Sofa, sub: ["Meubles de salle de bain", "Colonnes de rangement", "Miroirs"] },
  { to: "/boutique", label: "Nouveautés", icon: Sparkles },
];

export function SiteHeader({ cartCount = 0 }: { cartCount?: number; overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  useEffect(() => { const f = () => setScrolled(window.scrollY > 60); f(); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  return (
    <header className={`sticky top-0 z-40 bg-background/95 backdrop-blur transition-shadow duration-500 ${scrolled ? "shadow-lg shadow-background/60" : ""}`}>
      {/* Main row */}
      <div className={`flex items-center gap-8 px-6 transition-all duration-500 md:px-14 lg:px-20 ${scrolled ? "py-2" : "py-5"}`}>
        <Logo compact={scrolled} />
        <form onSubmit={(e) => { e.preventDefault(); navigate({ to: "/boutique" }); }} className="mx-auto hidden w-full max-w-xl items-center rounded-full border border-border bg-card p-1 pl-6 transition focus-within:border-primary md:flex">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher un produit, une marque, une référence…" aria-label="Rechercher un produit"
            className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground" />
          <button aria-label="Rechercher" className="flex h-11 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:brightness-110"><Search className="h-5 w-5" /></button>
        </form>
        <div className="ml-auto flex items-center gap-8 text-sm">
          <Link to="/connexion" className="flex flex-col items-center gap-1 transition hover:text-primary"><User className="h-7 w-7" strokeWidth={1.5} />Se connecter</Link>
          <Link to="/boutique" className="hidden flex-col items-center gap-1 transition hover:text-primary sm:flex"><Heart className="h-7 w-7" strokeWidth={1.5} />Mes favoris</Link>
          <Link to="/boutique" className="relative flex flex-col items-center gap-1 transition hover:text-primary">
            <ShoppingCart className="h-7 w-7" strokeWidth={1.5} />Panier
            <span className="absolute -right-3 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-primary-foreground">{cartCount}</span>
          </Link>
        </div>
      </div>

      {/* Nav */}
      <nav className="border-y border-border bg-card/60">
        <div className="flex items-center justify-between gap-2 overflow-x-auto px-6 text-[15px] font-medium md:px-14 lg:px-20 lg:overflow-visible">
          {nav.map((n) => {
            const I = n.icon;
            return (
              <div key={n.label} className="group relative">
                <Link to={n.to} activeOptions={{ exact: true }}
                  className="relative flex items-center gap-2 whitespace-nowrap px-3 py-4 transition hover:text-primary"
                  activeProps={{ className: n.exact ? "text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:rounded-full after:bg-primary" : "" }}>
                  <I className="h-5 w-5" />{n.label}{n.sub && <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" />}
                </Link>
                {n.sub && (
                  <div className="invisible absolute left-0 top-full z-50 min-w-56 translate-y-2 rounded-xl border border-border bg-popover p-2 opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {n.sub.map((x) => (
                      <Link key={x} to={n.to} className="block rounded-lg px-4 py-2 text-sm text-popover-foreground transition hover:bg-primary hover:text-primary-foreground">{x}</Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <Link to="/boutique" className="flex items-center gap-2 whitespace-nowrap rounded-full bg-destructive px-6 py-2 text-destructive-foreground transition hover:brightness-110"><BadgePercent className="h-5 w-5" />Promotions</Link>
          <a href="#contact" className="flex items-center gap-2 whitespace-nowrap px-3 py-4 transition hover:text-primary"><Mail className="h-5 w-5" />Contact</a>
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  const cols: [string, string[]][] = [
    ["Boutique", ["Sanitaire", "Lavabos & meubles", "Douches", "Smart locks"]],
    ["Service", ["Livraison partout au Maroc", "Garantie", "Installation", "SAV"]],
    ["Contact", ["contact@decobest.ma", PHONE]],
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

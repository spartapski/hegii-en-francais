import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
export function SiteHeader({ cartCount = 0 }: { cartCount?: number }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const f = () => setScrolled(window.scrollY > 40); f(); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  return (
    <>
      <div className="overflow-hidden bg-primary py-2 text-xs uppercase tracking-widest text-primary-foreground">
        <div className="animate-marquee flex w-max gap-16 whitespace-nowrap">
          {Array.from({ length: 2 }).flatMap((_, i) => ["Livraison offerte dès 500 €", "Garantie 5 ans", "Installation par nos experts", "Paiement en 3× sans frais"].map((t) => <span key={i + t}>{t}</span>))}
        </div>
      </div>
      <header className={`sticky top-0 z-30 border-b transition-all duration-500 ${scrolled ? "border-border bg-background/95 py-2 shadow-sm backdrop-blur" : "border-transparent bg-background py-4"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <Link to="/" className="font-display text-2xl tracking-widest">AURÉLIS</Link>
          <nav className="hidden gap-8 text-sm md:flex">
            {[["/", "Accueil"], ["/boutique", "Boutique"]].map(([to, l]) => (
              <Link key={to} to={to} className="group relative py-1" activeOptions={{ exact: true }}>{l}<span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" /></Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/boutique" className="text-sm">Panier ({cartCount})</Link>
            <Link to="/connexion" className="rounded-sm bg-primary px-4 py-2 text-xs font-medium uppercase tracking-wider text-primary-foreground transition hover:bg-accent">Connexion Backoffice</Link>
          </div>
        </div>
      </header>
    </>
  );
}
export function SiteFooter() {
  return (
    <footer className="bg-primary py-16 text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-4">
        <div><span className="font-display text-2xl tracking-widest">AURÉLIS</span><p className="mt-4 text-sm opacity-70">Salles de bain intelligentes.</p></div>
        {[["Boutique", ["WC intelligents", "Abattants", "Meubles"]], ["Service", ["Livraison", "Garantie", "SAV"]], ["Contact", ["contact@aurelis.fr", "+33 1 00 00 00 00"]]].map(([t, items]) => (
          <div key={t as string}><h4 className="mb-4 text-xs uppercase tracking-widest opacity-70">{t as string}</h4>{(items as string[]).map((i) => <p key={i} className="mb-2 text-sm">{i}</p>)}</div>
        ))}
      </div>
      <p className="mx-auto mt-12 max-w-7xl px-6 text-xs opacity-60">© 2026 Aurélis. Tous droits réservés.</p>
    </footer>
  );
}

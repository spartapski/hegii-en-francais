import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-bathroom.jpg";
import toilet from "@/assets/smart-toilet.jpg";
import vanity from "@/assets/vanity.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurélis — WC intelligents & salles de bain design" },
      { name: "description", content: "Découvrez nos WC intelligents, meubles vasques et solutions de salle de bain connectées." },
      { property: "og:title", content: "Aurélis — WC intelligents & salles de bain design" },
      { property: "og:description", content: "Le confort intelligent pour votre salle de bain." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const products = [
  { img: toilet, name: "WC intelligent Série S", desc: "Siège chauffant, lavage tiède, séchage et chasse automatique." },
  { img: vanity, name: "Meuble vasque Pierre", desc: "Vasque en pierre naturelle et chêne massif, miroir rétroéclairé." },
  { img: hero, name: "Collection Harmonie", desc: "Un ensemble complet pour une salle de bain apaisante." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <span className="font-display text-2xl tracking-widest">AURÉLIS</span>
          <nav className="hidden gap-8 text-sm md:flex">
            <a href="#produits">Produits</a><a href="#technologie">Technologie</a><a href="#apropos">À propos</a><a href="#contact">Contact</a>
          </nav>
          <Link to="/connexion" className="rounded-sm bg-primary px-4 py-2 text-xs font-medium uppercase tracking-wider text-primary-foreground">Connexion Backoffice</Link>
        </div>
      </header>

      <section className="relative h-[85vh] overflow-hidden">
        <img src={hero} alt="Salle de bain moderne avec WC intelligent" width={1600} height={912} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-6 text-primary-foreground">
          <p className="mb-4 text-xs uppercase tracking-[0.3em]">Nouvelle collection 2026</p>
          <h1 className="max-w-2xl text-5xl leading-tight md:text-7xl">L'intelligence au service de votre bien-être</h1>
          <a href="#produits" className="mt-8 w-fit border border-primary-foreground px-8 py-3 text-sm uppercase tracking-wider">Découvrir</a>
        </div>
      </section>

      <section id="produits" className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="mb-12 text-center text-4xl md:text-5xl">Nos produits phares</h2>
        <div className="grid gap-10 md:grid-cols-3">
          {products.map((p) => (
            <article key={p.name} className="group">
              <div className="overflow-hidden bg-muted"><img src={p.img} alt={p.name} loading="lazy" width={1024} height={1024} className="aspect-square w-full object-cover transition duration-700 group-hover:scale-105" /></div>
              <h3 className="mt-5 text-2xl">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="technologie" className="bg-secondary py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-4">
          {[["Hygiène", "Auto-nettoyage UV et buse antibactérienne."], ["Confort", "Température de l'eau et du siège réglable."], ["Économie", "Chasse d'eau optimisée, jusqu'à 30 % d'eau en moins."], ["Connecté", "Pilotage par télécommande et application."]].map(([t, d]) => (
            <div key={t}><h3 className="text-3xl text-accent">{t}</h3><p className="mt-3 text-sm text-muted-foreground">{d}</p></div>
          ))}
        </div>
      </section>

      <section id="apropos" className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2">
        <img src={vanity} alt="Meuble vasque" loading="lazy" width={1024} height={1024} className="aspect-[4/5] w-full object-cover" />
        <div>
          <h2 className="text-4xl md:text-5xl">Un savoir-faire pensé pour chaque foyer</h2>
          <p className="mt-6 text-muted-foreground">Nous concevons des équipements de salle de bain qui allient design épuré, matériaux durables et technologies intelligentes, pour transformer un geste quotidien en un moment de confort.</p>
        </div>
      </section>

      <footer id="contact" className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 md:flex-row">
          <span className="font-display text-2xl tracking-widest">AURÉLIS</span>
          <p className="text-sm opacity-80">contact@aurelis.fr · © 2026 Aurélis. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

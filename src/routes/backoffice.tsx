import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/backoffice")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — Backoffice Aurélis" },
      { name: "description", content: "Espace d'administration Aurélis." },
      { property: "og:title", content: "Backoffice Aurélis" },
      { property: "og:description", content: "Tableau de bord d'administration." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Backoffice,
});

function Backoffice() {
  const nav = useNavigate();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) nav({ to: "/connexion" });
      else setEmail(data.session.user.email ?? "");
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => { if (!s) nav({ to: "/connexion" }); });
    return () => sub.subscription.unsubscribe();
  }, [nav]);

  if (email === null) return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Chargement…</div>;

  return (
    <div className="min-h-screen bg-secondary">
      <header className="flex items-center justify-between bg-primary px-8 py-4 text-primary-foreground">
        <span className="font-display text-xl tracking-widest">AURÉLIS · Backoffice</span>
        <div className="flex items-center gap-4 text-sm">
          <span className="opacity-80">{email}</span>
          <button onClick={() => supabase.auth.signOut()} className="border border-primary-foreground px-3 py-1">Déconnexion</button>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-8 py-12">
        <h1 className="text-4xl">Bienvenue</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {["Produits", "Commandes", "Clients"].map((t) => (
            <div key={t} className="bg-card p-6"><p className="text-xs uppercase tracking-wider text-muted-foreground">{t}</p><p className="mt-2 font-display text-4xl">0</p></div>
          ))}
        </div>
      </main>
    </div>
  );
}

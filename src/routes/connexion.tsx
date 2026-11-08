import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/connexion")({
  head: () => ({
    meta: [
      { title: "Connexion Backoffice — Aurélis" },
      { name: "description", content: "Accès sécurisé à l'espace d'administration Aurélis." },
      { property: "og:title", content: "Connexion Backoffice — Aurélis" },
      { property: "og:description", content: "Espace d'administration." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Connexion,
});

function Connexion() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setMsg(null);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) return setMsg("Identifiants incorrects.");
      nav({ to: "/backoffice" });
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/backoffice` } });
      setLoading(false);
      setMsg(error ? error.message : "Compte créé. Vérifiez votre e-mail pour confirmer.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-card p-10 shadow-sm">
        <Link to="/" className="font-display text-2xl tracking-widest">AURÉLIS</Link>
        <h1 className="mt-6 text-3xl">{mode === "in" ? "Connexion Backoffice" : "Créer un compte"}</h1>
        <label className="mt-8 block text-xs uppercase tracking-wider text-muted-foreground">E-mail</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full border border-input bg-background px-3 py-2 outline-none focus:border-ring" />
        <label className="mt-5 block text-xs uppercase tracking-wider text-muted-foreground">Mot de passe</label>
        <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full border border-input bg-background px-3 py-2 outline-none focus:border-ring" />
        {msg && <p className="mt-4 text-sm text-accent">{msg}</p>}
        <button disabled={loading} className="mt-8 w-full bg-primary py-3 text-sm uppercase tracking-wider text-primary-foreground disabled:opacity-60">
          {loading ? "Patientez…" : mode === "in" ? "Se connecter" : "Créer le compte"}
        </button>
        <button type="button" onClick={() => setMode(mode === "in" ? "up" : "in")} className="mt-4 w-full text-sm text-muted-foreground underline">
          {mode === "in" ? "Pas de compte ? Créer un compte" : "Déjà un compte ? Se connecter"}
        </button>
      </form>
    </div>
  );
}

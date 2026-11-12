import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/connexion")({
  head: () => ({
    meta: [
      { title: "Connexion Backoffice — Deco best" },
      { name: "description", content: "Accès sécurisé à l'espace d'administration Deco best." },
      { property: "og:title", content: "Connexion Backoffice — Deco best" },
      { property: "og:description", content: "Espace d'administration." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Connexion,
});

function Connexion() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setMsg(null);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) { setLoading(false); return setMsg("Identifiants incorrects."); }
    const { data: role } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id).eq("role", "admin").maybeSingle();
    if (!role) {
      await supabase.auth.signOut();
      setLoading(false);
      return setMsg("Accès réservé aux administrateurs.");
    }
    setLoading(false);
    nav({ to: "/backoffice" });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-card p-10 shadow-sm">
        <Link to="/" className="font-display text-2xl tracking-widest">DECO BEST</Link>
        <h1 className="mt-6 text-3xl">Connexion Backoffice</h1>
        <label className="mt-8 block text-xs uppercase tracking-wider text-muted-foreground">E-mail</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full border border-input bg-background px-3 py-2 outline-none focus:border-ring" />
        <label className="mt-5 block text-xs uppercase tracking-wider text-muted-foreground">Mot de passe</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full border border-input bg-background px-3 py-2 outline-none focus:border-ring" />
        {msg && <p className="mt-4 text-sm text-accent">{msg}</p>}
        <button disabled={loading} className="mt-8 w-full bg-primary py-3 text-sm uppercase tracking-wider text-primary-foreground disabled:opacity-60">
          {loading ? "Patientez…" : "Se connecter"}
        </button>
      </form>
    </div>
  );
}

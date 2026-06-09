import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Shield, UserPlus, Swords, Trash2, Crown, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Layout } from "@/components/Layout";
import { SignInGate } from "@/components/SignInGate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { DEFAULT_RATING, newRating, TIME_CONTROLS, type TimeControl, ratingField, gamesField, type Score } from "@/lib/elo";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const { user, loading, isAdmin, isSuperAdmin } = useAuth();
  if (loading) return <Layout><div className="text-muted-foreground">Loading…</div></Layout>;
  if (!user) return <Layout><SignInGate /></Layout>;
  if (!isAdmin) return <Navigate to="/" />;
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="w-7 h-7 text-primary" />
          <h1 className="font-display text-3xl">Admin Panel</h1>
        </div>
        <Tabs defaultValue="match">
          <TabsList>
            <TabsTrigger value="match"><Swords className="w-4 h-4 mr-2" />Add Match</TabsTrigger>
            <TabsTrigger value="player"><UserPlus className="w-4 h-4 mr-2" />Add Player</TabsTrigger>
            <TabsTrigger value="delete"><Users className="w-4 h-4 mr-2" />Delete Players</TabsTrigger>
            <TabsTrigger value="admins"><Crown className="w-4 h-4 mr-2" />Admins</TabsTrigger>
          </TabsList>
          <TabsContent value="match" className="mt-6"><AddMatch /></TabsContent>
          <TabsContent value="player" className="mt-6"><AddPlayer /></TabsContent>
          <TabsContent value="delete" className="mt-6"><DeletePlayers /></TabsContent>
          <TabsContent value="admins" className="mt-6"><Admins isSuperAdmin={isSuperAdmin} /></TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm p-6 max-w-2xl">{children}</div>;
}

function AddPlayer() {
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setBusy(true);
    const { error } = await supabase.from("players").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
    });
    setBusy(false);
    if (error) toast.error("Failed to add player", { description: error.message });
    else {
      toast.success("Player added");
      setName(""); setEmail("");
      qc.invalidateQueries({ queryKey: ["players"] });
    }
  };

  return (
    <Card>
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          <Label>Full name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label>Google email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="student@example.com" />
          <p className="text-xs text-muted-foreground">Used to link them to their profile when they sign in with Google.</p>
        </div>
        <Button type="submit" disabled={busy}>{busy ? "Adding…" : "Add player"}</Button>
      </form>
    </Card>
  );
}

type PlayerLite = {
  id: string; name: string; email: string;
  bullet_rating: number | null; blitz_rating: number | null; rapid_rating: number | null; classical_rating: number | null;
  bullet_games: number; blitz_games: number; rapid_games: number; classical_games: number;
};

function AddMatch() {
  const qc = useQueryClient();
  const [whiteName, setWhiteName] = useState("");
  const [blackName, setBlackName] = useState("");
  const [tc, setTc] = useState<TimeControl>("blitz");
  const [result, setResult] = useState<"white" | "black" | "draw">("white");
  const [busy, setBusy] = useState(false);

  const { data: players = [] } = useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      const { data, error } = await supabase.from("players").select("*");
      if (error) throw error;
      return data as PlayerLite[];
    },
  });

  const findPlayer = (q: string) => {
    const lower = q.trim().toLowerCase();
    if (!lower) return null;
    return players.find((p) => p.name.toLowerCase() === lower) ?? null;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const white = findPlayer(whiteName);
    const black = findPlayer(blackName);
    if (!white) return toast.error("White player not on leaderboard", { description: `"${whiteName}" was not found. Add them first.` });
    if (!black) return toast.error("Black player not on leaderboard", { description: `"${blackName}" was not found. Add them first.` });
    if (white.id === black.id) return toast.error("Players must be different");

    setBusy(true);
    const wField = ratingField(tc); const bField = ratingField(tc);
    const wGField = gamesField(tc); const bGField = gamesField(tc);
    const wBefore = (white[wField] ?? null);
    const bBefore = (black[bField] ?? null);
    const wCurrent = wBefore ?? DEFAULT_RATING;
    const bCurrent = bBefore ?? DEFAULT_RATING;
    const wGames = white[wGField] ?? 0;
    const bGames = black[bGField] ?? 0;
    const wScore: Score = result === "white" ? 1 : result === "draw" ? 0.5 : 0;
    const bScore: Score = result === "black" ? 1 : result === "draw" ? 0.5 : 0;
    const wAfter = newRating(wCurrent, bCurrent, wScore, wGames);
    const bAfter = newRating(bCurrent, wCurrent, bScore, bGames);

    const { error: mErr } = await supabase.from("matches").insert({
      white_id: white.id,
      black_id: black.id,
      time_control: tc,
      result,
      white_rating_before: wBefore,
      black_rating_before: bBefore,
      white_rating_after: wAfter,
      black_rating_after: bAfter,
    });
    if (mErr) {
      setBusy(false);
      return toast.error("Failed to save match", { description: mErr.message });
    }

    await supabase.from("players").update({
      [wField]: wAfter,
      [wGField]: wGames + 1,
    } as never).eq("id", white.id);
    await supabase.from("players").update({
      [bField]: bAfter,
      [bGField]: bGames + 1,
    } as never).eq("id", black.id);

    setBusy(false);
    toast.success("Match recorded", { description: `${white.name} ${wAfter} (${wAfter - wCurrent >= 0 ? "+" : ""}${wAfter - wCurrent}) · ${black.name} ${bAfter} (${bAfter - bCurrent >= 0 ? "+" : ""}${bAfter - bCurrent})` });
    setWhiteName(""); setBlackName("");
    qc.invalidateQueries({ queryKey: ["players"] });
    qc.invalidateQueries({ queryKey: ["matches"] });
  };

  return (
    <Card>
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>White</Label>
            <Input list="players-list" value={whiteName} onChange={(e) => setWhiteName(e.target.value)} placeholder="Player name" required />
          </div>
          <div className="space-y-2">
            <Label>Black</Label>
            <Input list="players-list" value={blackName} onChange={(e) => setBlackName(e.target.value)} placeholder="Player name" required />
          </div>
          <datalist id="players-list">
            {players.map((p) => <option key={p.id} value={p.name} />)}
          </datalist>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Time control</Label>
            <Select value={tc} onValueChange={(v) => setTc(v as TimeControl)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {TIME_CONTROLS.map((t) => <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Result</Label>
            <Select value={result} onValueChange={(v) => setResult(v as "white" | "black" | "draw")}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="white">White wins (1–0)</SelectItem>
                <SelectItem value="black">Black wins (0–1)</SelectItem>
                <SelectItem value="draw">Draw (½–½)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit" disabled={busy}>{busy ? "Recording…" : "Record match"}</Button>
      </form>
    </Card>
  );
}

const SUPER_ADMIN = "aarushsamanta@bernardsboe.com";

function DeletePlayers() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");

  const { data: players = [], isLoading } = useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      const { data, error } = await supabase.from("players").select("*").order("name");
      if (error) throw error;
      return data as PlayerLite[];
    },
  });

  const filtered = players.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const remove = async (id: string, name: string) => {
    if (!confirm(`Delete player "${name}"? This will remove them from the leaderboard.`)) return;
    const { error } = await supabase.from("players").delete().eq("id", id);
    if (error) toast.error("Failed to delete player", { description: error.message });
    else {
      toast.success("Player deleted");
      qc.invalidateQueries({ queryKey: ["players"] });
      qc.invalidateQueries({ queryKey: ["matches"] });
    }
  };

  return (
    <div className="space-y-4 max-w-2xl">
      <Card>
        <div className="space-y-2">
          <Label>Search players</Label>
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Filter by name…" />
        </div>
      </Card>
      <div className="rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border/60">
              <th className="px-4 py-3">Player</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr><td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">Loading…</td></tr>
            )}
            {!isLoading && filtered.length === 0 && (
              <tr><td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">No players found.</td></tr>
            )}
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-border/40 last:border-0">
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{p.email}</td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="icon" onClick={() => remove(p.id, p.name)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Admins({ isSuperAdmin }: { isSuperAdmin: boolean }) {
  const qc = useQueryClient();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const { data: admins = [] } = useQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      const { data } = await supabase.from("admins").select("*").order("created_at");
      return data ?? [];
    },
  });

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    const { error } = await supabase.from("admins").insert({ email: email.trim().toLowerCase() });
    setBusy(false);
    if (error) toast.error("Failed to add admin", { description: error.message });
    else {
      toast.success("Admin added");
      setEmail("");
      qc.invalidateQueries({ queryKey: ["admins"] });
    }
  };

  const remove = async (id: string, e: string) => {
    if (e.toLowerCase() === SUPER_ADMIN) return toast.error("Cannot remove the super admin");
    if (!confirm(`Remove admin ${e}?`)) return;
    const { error } = await supabase.from("admins").delete().eq("id", id);
    if (error) toast.error("Failed", { description: error.message });
    else {
      toast.success("Admin removed");
      qc.invalidateQueries({ queryKey: ["admins"] });
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <Card>
        <form onSubmit={add} className="space-y-4">
          <div className="space-y-2">
            <Label>Add admin by email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" required />
          </div>
          <Button type="submit" disabled={busy}>{busy ? "Adding…" : "Add admin"}</Button>
        </form>
      </Card>

      <div className="rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border/60">
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Added</th>
              <th className="px-4 py-3 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => {
              const isSuper = a.email.toLowerCase() === SUPER_ADMIN;
              return (
                <tr key={a.id} className="border-b border-border/40 last:border-0">
                  <td className="px-4 py-3 font-medium flex items-center gap-2">
                    {a.email}
                    {isSuper && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">Super</span>}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{new Date(a.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right">
                    {isSuperAdmin && !isSuper && (
                      <Button variant="ghost" size="icon" onClick={() => remove(a.id, a.email)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!isSuperAdmin && (
          <div className="px-4 py-3 text-xs text-muted-foreground border-t border-border/60">
            Only the super admin can remove admins.
          </div>
        )}
      </div>
    </div>
  );
}

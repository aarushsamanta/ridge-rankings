import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Search, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Layout } from "@/components/Layout";
import { SignInGate } from "@/components/SignInGate";
import { RatingCell } from "@/components/RatingCell";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TIME_CONTROLS, type TimeControl, ratingField, gamesField, overallRating } from "@/lib/elo";

export const Route = createFileRoute("/")({
  component: Index,
});

type Player = {
  id: string;
  name: string;
  email: string;
  bullet_rating: number | null;
  blitz_rating: number | null;
  rapid_rating: number | null;
  classical_rating: number | null;
  bullet_games: number;
  blitz_games: number;
  rapid_games: number;
  classical_games: number;
};

type Tab = "overall" | TimeControl;
const TABS: Tab[] = ["overall", ...TIME_CONTROLS];

function Index() {
  const { user, loading } = useAuth();
  if (loading) return <Layout><div className="text-muted-foreground">Loading…</div></Layout>;
  if (!user) return <Layout><SignInGate /></Layout>;
  return <Layout><Leaderboard /></Layout>;
}

function Leaderboard() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<Tab>("overall");

  const { data: players = [], isLoading } = useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      const { data, error } = await supabase.from("players").select("*");
      if (error) throw error;
      return data as Player[];
    },
  });

  const filtered = players.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const rows = filtered
    .map((p) => {
      if (tab === "overall") {
        const o = overallRating(p);
        return { player: p, rating: o.rating, games: o.games };
      }
      return { player: p, rating: p[ratingField(tab)], games: p[gamesField(tab)] };
    })
    .sort((a, b) => {
      if (a.rating == null && b.rating == null) return a.player.name.localeCompare(b.player.name);
      if (a.rating == null) return 1;
      if (b.rating == null) return -1;
      return b.rating - a.rating;
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Trophy className="w-7 h-7 text-primary" />
        <h1 className="font-display text-3xl">Leaderboard</h1>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search players…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-card/60"
        />
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
        <TabsList className="grid grid-cols-5 w-full max-w-xl">
          {TABS.map((t) => (
            <TabsTrigger key={t} value={t} className="capitalize">{t}</TabsTrigger>
          ))}
        </TabsList>
        {TABS.map((t) => (
          <TabsContent key={t} value={t} className="mt-4">
            <div className="rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border/60">
                    <th className="px-4 py-3 w-16">#</th>
                    <th className="px-4 py-3">Player</th>
                    <th className="px-4 py-3 text-right">Rating</th>
                    <th className="px-4 py-3 text-right">Games</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">Loading…</td></tr>
                  )}
                  {!isLoading && rows.length === 0 && (
                    <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No players yet.</td></tr>
                  )}
                  {rows.map((row, i) => (
                    <tr key={row.player.id} className="border-b border-border/40 last:border-0 hover:bg-secondary/30">
                      <td className="px-4 py-3 text-muted-foreground">{row.rating != null ? i + 1 : "—"}</td>
                      <td className="px-4 py-3 font-medium">
                        <Link to="/player/$id" params={{ id: row.player.id }} className="hover:text-primary">
                          {row.player.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-right font-mono">
                        <RatingCell rating={row.rating} games={row.games} />
                      </td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{row.games}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

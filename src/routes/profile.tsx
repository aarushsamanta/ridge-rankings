import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Layout } from "@/components/Layout";
import { SignInGate } from "@/components/SignInGate";
import { TIME_CONTROLS, ratingField, gamesField, overallRating, isProvisional, PROVISIONAL_GAMES } from "@/lib/elo";
import { MatchHistory } from "./matches";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return <Layout><div className="text-muted-foreground">Loading…</div></Layout>;
  if (!user) return <Layout><SignInGate /></Layout>;
  return <Layout><ProfileContent email={user.email!} isAdmin={isAdmin} /></Layout>;
}

function ProfileContent({ email, isAdmin }: { email: string; isAdmin: boolean }) {
  const { data: player, isLoading } = useQuery({
    queryKey: ["player-by-email", email],
    queryFn: async () => {
      const { data } = await supabase.from("players").select("*").ilike("email", email).maybeSingle();
      return data;
    },
  });

  if (isLoading) return <div className="text-muted-foreground">Loading…</div>;

  if (!player) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center">
          <User className="w-8 h-8 text-primary" />
        </div>
        <h1 className="font-display text-2xl">No player profile</h1>
        <p className="text-muted-foreground">
          You're signed in as <span className="text-foreground">{email}</span>, but you're not registered on the leaderboard yet. Ask an admin to add you.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center">
          <User className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-3xl">{player.name}</h1>
          <p className="text-sm text-muted-foreground">{player.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {(() => {
          const o = overallRating(player);
          return <RatingCard label="Overall" rating={o.rating} games={o.games} highlight />;
        })()}
        {TIME_CONTROLS.map((tc) => {
          const r = (player as Record<string, unknown>)[ratingField(tc)] as number | null;
          const g = (player as Record<string, unknown>)[gamesField(tc)] as number;
          return <RatingCard key={tc} label={tc} rating={r} games={g} />;
        })}
      </div>

      <div>
        <h2 className="font-display text-2xl mb-4">My Matches</h2>
        <MatchHistory isAdmin={isAdmin} playerId={player.id} />
      </div>
    </div>
  );
}

function RatingCard({ label, rating, games, highlight }: { label: string; rating: number | null; games: number; highlight?: boolean }) {
  const provisional = rating != null && isProvisional(games);
  return (
    <div className={`rounded-xl border p-5 backdrop-blur-sm ${highlight ? "border-primary/40 bg-primary/5" : "border-border/60 bg-card/60"}`}>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-2 text-3xl font-display text-primary flex items-baseline gap-1">
        {rating != null ? rating : <span className="italic text-muted-foreground text-xl">Unrated</span>}
        {provisional && (
          <span className="text-primary/70 text-xl" title={`Provisional · ${games}/${PROVISIONAL_GAMES} games`}>?</span>
        )}
      </div>
      <div className="text-xs text-muted-foreground mt-1">
        {games} games{provisional ? ` · provisional (${games}/${PROVISIONAL_GAMES})` : ""}
      </div>
    </div>
  );
}

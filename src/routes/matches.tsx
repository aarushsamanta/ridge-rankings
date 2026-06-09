import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { History, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Layout } from "@/components/Layout";
import { SignInGate } from "@/components/SignInGate";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/matches")({
  component: MatchesPage,
});

type MatchRow = {
  id: string;
  white_id: string;
  black_id: string;
  time_control: string;
  result: string;
  white_rating_before: number | null;
  black_rating_before: number | null;
  white_rating_after: number;
  black_rating_after: number;
  played_at: string;
  white: { name: string } | null;
  black: { name: string } | null;
};

function MatchesPage() {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return <Layout><div className="text-muted-foreground">Loading…</div></Layout>;
  if (!user) return <Layout><SignInGate /></Layout>;
  return <Layout><MatchHistory isAdmin={isAdmin} /></Layout>;
}

export function MatchHistory({ isAdmin, playerId }: { isAdmin: boolean; playerId?: string }) {
  const qc = useQueryClient();
  const [deleting, setDeleting] = useState<string | null>(null);

  const { data: matches = [], isLoading } = useQuery({
    queryKey: ["matches", playerId ?? "all"],
    queryFn: async () => {
      let q = supabase
        .from("matches")
        .select("*, white:players!matches_white_id_fkey(name), black:players!matches_black_id_fkey(name)")
        .order("played_at", { ascending: false })
        .limit(500);
      if (playerId) q = q.or(`white_id.eq.${playerId},black_id.eq.${playerId}`);
      const { data, error } = await q;
      if (error) throw error;
      return data as MatchRow[];
    },
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this match? Ratings will NOT be recalculated.")) return;
    setDeleting(id);
    const { error } = await supabase.from("matches").delete().eq("id", id);
    setDeleting(null);
    if (error) toast.error("Delete failed", { description: error.message });
    else {
      toast.success("Match deleted");
      qc.invalidateQueries({ queryKey: ["matches"] });
    }
  };

  return (
    <div className="space-y-6">
      {!playerId && (
        <div className="flex items-center gap-3">
          <History className="w-7 h-7 text-primary" />
          <h1 className="font-display text-3xl">Match History</h1>
        </div>
      )}

      <div className="rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border/60">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Mode</th>
              <th className="px-4 py-3">White</th>
              <th className="px-4 py-3">Black</th>
              <th className="px-4 py-3">Result</th>
              <th className="px-4 py-3 text-right">Rating Δ</th>
              {isAdmin && <th className="px-4 py-3 w-12"></th>}
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan={isAdmin ? 7 : 6} className="px-4 py-8 text-center text-muted-foreground">Loading…</td></tr>}
            {!isLoading && matches.length === 0 && <tr><td colSpan={isAdmin ? 7 : 6} className="px-4 py-8 text-center text-muted-foreground">No matches yet.</td></tr>}
            {matches.map((m) => {
              const wDelta = m.white_rating_before != null ? m.white_rating_after - m.white_rating_before : null;
              const bDelta = m.black_rating_before != null ? m.black_rating_after - m.black_rating_before : null;
              const resultLabel = m.result === "white" ? "1–0" : m.result === "black" ? "0–1" : "½–½";
              return (
                <tr key={m.id} className="border-b border-border/40 last:border-0 hover:bg-secondary/30">
                  <td className="px-4 py-3 text-sm text-muted-foreground">{new Date(m.played_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 capitalize text-sm">{m.time_control}</td>
                  <td className="px-4 py-3 font-medium">{m.white?.name ?? "?"}</td>
                  <td className="px-4 py-3 font-medium">{m.black?.name ?? "?"}</td>
                  <td className="px-4 py-3 font-mono text-primary">{resultLabel}</td>
                  <td className="px-4 py-3 text-right font-mono text-xs">
                    <span className={wDelta && wDelta > 0 ? "text-primary" : "text-destructive"}>{wDelta != null ? (wDelta > 0 ? `+${wDelta}` : wDelta) : "—"}</span>
                    {" / "}
                    <span className={bDelta && bDelta > 0 ? "text-primary" : "text-destructive"}>{bDelta != null ? (bDelta > 0 ? `+${bDelta}` : bDelta) : "—"}</span>
                  </td>
                  {isAdmin && (
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="icon" disabled={deleting === m.id} onClick={() => handleDelete(m.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { B as Button, u as useAuth, s as supabase } from "./router-C3q5itmJ.mjs";
import { L as Layout, S as SignInGate } from "./SignInGate-Q5trIvNb.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/lovable.dev__cloud-auth-js.mjs";
import { H as History, T as Trash2 } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function MatchesPage() {
  const {
    user,
    loading,
    isAdmin
  } = useAuth();
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Loading…" }) });
  if (!user) return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SignInGate, {}) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(MatchHistory, { isAdmin }) });
}
function MatchHistory({
  isAdmin,
  playerId
}) {
  const qc = useQueryClient();
  const [deleting, setDeleting] = reactExports.useState(null);
  const {
    data: matches = [],
    isLoading
  } = useQuery({
    queryKey: ["matches", playerId ?? "all"],
    queryFn: async () => {
      let q = supabase.from("matches").select("*, white:players!matches_white_id_fkey(name), black:players!matches_black_id_fkey(name)").order("played_at", {
        ascending: false
      }).limit(500);
      if (playerId) q = q.or(`white_id.eq.${playerId},black_id.eq.${playerId}`);
      const {
        data,
        error
      } = await q;
      if (error) throw error;
      return data;
    }
  });
  const handleDelete = async (id) => {
    if (!confirm("Delete this match? Ratings will NOT be recalculated.")) return;
    setDeleting(id);
    const {
      error
    } = await supabase.from("matches").delete().eq("id", id);
    setDeleting(null);
    if (error) toast.error("Delete failed", {
      description: error.message
    });
    else {
      toast.success("Match deleted");
      qc.invalidateQueries({
        queryKey: ["matches"]
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    !playerId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-7 h-7 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "Match History" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Mode" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "White" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Black" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Result" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "Rating Δ" }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 w-12" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: isAdmin ? 7 : 6, className: "px-4 py-8 text-center text-muted-foreground", children: "Loading…" }) }),
        !isLoading && matches.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: isAdmin ? 7 : 6, className: "px-4 py-8 text-center text-muted-foreground", children: "No matches yet." }) }),
        matches.map((m) => {
          const wDelta = m.white_rating_before != null ? m.white_rating_after - m.white_rating_before : null;
          const bDelta = m.black_rating_before != null ? m.black_rating_after - m.black_rating_before : null;
          const resultLabel = m.result === "white" ? "1–0" : m.result === "black" ? "0–1" : "½–½";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/40 last:border-0 hover:bg-secondary/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-muted-foreground", children: new Date(m.played_at).toLocaleDateString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 capitalize text-sm", children: m.time_control }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: m.white?.name ?? "?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: m.black?.name ?? "?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-primary", children: resultLabel }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-mono text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: wDelta && wDelta > 0 ? "text-primary" : "text-destructive", children: wDelta != null ? wDelta > 0 ? `+${wDelta}` : wDelta : "—" }),
              " / ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: bDelta && bDelta > 0 ? "text-primary" : "text-destructive", children: bDelta != null ? bDelta > 0 ? `+${bDelta}` : bDelta : "—" })
            ] }),
            isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", disabled: deleting === m.id, onClick: () => handleDelete(m.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 text-destructive" }) }) })
          ] }, m.id);
        })
      ] })
    ] }) })
  ] });
}
export {
  MatchHistory,
  MatchesPage as component
};

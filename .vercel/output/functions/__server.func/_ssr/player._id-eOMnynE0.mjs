import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth, R as Route, M as MatchHistory, s as supabase } from "./router-C3q5itmJ.mjs";
import { L as Layout, S as SignInGate } from "./SignInGate-Q5trIvNb.mjs";
import { o as overallRating, T as TIME_CONTROLS, r as ratingField, g as gamesField, P as PROVISIONAL_GAMES, i as isProvisional } from "./elo-Dc6Hk_fF.mjs";
import "../_libs/sonner.mjs";
import "../_libs/lovable.dev__cloud-auth-js.mjs";
import { A as ArrowLeft, U as User } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
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
function PlayerPage() {
  const {
    user,
    loading,
    isAdmin
  } = useAuth();
  const {
    id
  } = Route.useParams();
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Loading…" }) });
  if (!user) return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SignInGate, {}) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlayerView, { id, isAdmin }) });
}
function PlayerView({
  id,
  isAdmin
}) {
  const {
    data: player,
    isLoading
  } = useQuery({
    queryKey: ["player", id],
    queryFn: async () => {
      const {
        data
      } = await supabase.from("players").select("*").eq("id", id).maybeSingle();
      return data;
    }
  });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Loading…" });
  if (!player) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Player not found." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
      " Back to leaderboard"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-7 h-7 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: player.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: player.email })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4", children: [
      (() => {
        const o = overallRating(player);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(RatingCard, { label: "Overall", rating: o.rating, games: o.games, highlight: true });
      })(),
      TIME_CONTROLS.map((tc) => {
        const r = player[ratingField(tc)];
        const g = player[gamesField(tc)];
        return /* @__PURE__ */ jsxRuntimeExports.jsx(RatingCard, { label: tc, rating: r, games: g }, tc);
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl mb-4", children: "Match History" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MatchHistory, { isAdmin, playerId: player.id })
    ] })
  ] });
}
function RatingCard({
  label,
  rating,
  games,
  highlight
}) {
  const provisional = rating != null && isProvisional(games);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-xl border p-5 backdrop-blur-sm ${highlight ? "border-primary/40 bg-primary/5" : "border-border/60 bg-card/60"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-3xl font-display text-primary flex items-baseline gap-1", children: [
      rating != null ? rating : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-muted-foreground text-xl", children: "Unrated" }),
      provisional && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary/70 text-xl", title: `Provisional · ${games}/${PROVISIONAL_GAMES} games`, children: "?" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: [
      games,
      " games",
      provisional ? ` · provisional (${games}/${PROVISIONAL_GAMES})` : ""
    ] })
  ] });
}
export {
  PlayerPage as component
};

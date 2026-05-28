import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth, c as cn, s as supabase } from "./router-C3q5itmJ.mjs";
import { L as Layout, S as SignInGate } from "./SignInGate-Q5trIvNb.mjs";
import { a as Provider, R as Root3, T as Trigger, P as Portal, C as Content2 } from "../_libs/radix-ui__react-tooltip.mjs";
import { o as overallRating, g as gamesField, r as ratingField, T as TIME_CONTROLS, P as PROVISIONAL_GAMES, i as isProvisional } from "./elo-Dc6Hk_fF.mjs";
import { I as Input, T as Tabs, b as TabsList, c as TabsTrigger, a as TabsContent } from "./tabs-B7swy5t9.mjs";
import "../_libs/sonner.mjs";
import "../_libs/lovable.dev__cloud-auth-js.mjs";
import { g as Trophy, S as Search } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
const TooltipProvider = Provider;
const Tooltip = Root3;
const TooltipTrigger = Trigger;
const TooltipContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
TooltipContent.displayName = Content2.displayName;
function RatingCell({
  rating,
  games,
  className
}) {
  if (rating == null) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "Unrated" });
  }
  const provisional = isProvisional(games);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: rating }),
    provisional && /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { delayDuration: 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-primary/80 cursor-help select-none", children: "?" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs", children: [
        "Provisional rating · ",
        games,
        "/",
        PROVISIONAL_GAMES,
        " games completed"
      ] }) })
    ] }) })
  ] });
}
const TABS = ["overall", ...TIME_CONTROLS];
function Index() {
  const {
    user,
    loading
  } = useAuth();
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Loading…" }) });
  if (!user) return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SignInGate, {}) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaderboard, {}) });
}
function Leaderboard() {
  const [search, setSearch] = reactExports.useState("");
  const [tab, setTab] = reactExports.useState("overall");
  const {
    data: players = [],
    isLoading
  } = useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("players").select("*");
      if (error) throw error;
      return data;
    }
  });
  const filtered = players.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  const rows = filtered.map((p) => {
    if (tab === "overall") {
      const o = overallRating(p);
      return {
        player: p,
        rating: o.rating,
        games: o.games
      };
    }
    return {
      player: p,
      rating: p[ratingField(tab)],
      games: p[gamesField(tab)]
    };
  }).sort((a, b) => {
    if (a.rating == null && b.rating == null) return a.player.name.localeCompare(b.player.name);
    if (a.rating == null) return 1;
    if (b.rating == null) return -1;
    return b.rating - a.rating;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-7 h-7 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "Leaderboard" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search players…", value: search, onChange: (e) => setSearch(e.target.value), className: "pl-9 bg-card/60" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: tab, onValueChange: (v) => setTab(v), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "grid grid-cols-5 w-full max-w-xl", children: TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: t, className: "capitalize", children: t }, t)) }),
      TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: t, className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 w-16", children: "#" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Player" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "Rating" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "Games" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "px-4 py-8 text-center text-muted-foreground", children: "Loading…" }) }),
          !isLoading && rows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "px-4 py-8 text-center text-muted-foreground", children: "No players yet." }) }),
          rows.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/40 last:border-0 hover:bg-secondary/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: row.rating != null ? i + 1 : "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/player/$id", params: {
              id: row.player.id
            }, className: "hover:text-primary", children: row.player.name }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RatingCell, { rating: row.rating, games: row.games }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-muted-foreground", children: row.games })
          ] }, row.player.id))
        ] })
      ] }) }) }, t))
    ] })
  ] });
}
export {
  Index as component
};

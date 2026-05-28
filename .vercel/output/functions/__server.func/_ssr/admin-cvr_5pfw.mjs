import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { N as Navigate } from "../_libs/tanstack__react-router.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth, B as Button, s as supabase, c as cn } from "./router-C3q5itmJ.mjs";
import { L as Layout, S as SignInGate } from "./SignInGate-Q5trIvNb.mjs";
import { T as Tabs, b as TabsList, c as TabsTrigger, a as TabsContent, I as Input } from "./tabs-B7swy5t9.mjs";
import { R as Root } from "../_libs/radix-ui__react-label.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { R as Root2, V as Value, T as Trigger, I as Icon, P as Portal, C as Content2, f as Viewport, a as Item, b as ItemIndicator, c as ItemText, d as ScrollUpButton, S as ScrollDownButton, L as Label$1, e as Separator } from "../_libs/radix-ui__react-select.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { T as TIME_CONTROLS, r as ratingField, g as gamesField, n as newRating, D as DEFAULT_RATING } from "./elo-Dc6Hk_fF.mjs";
import "../_libs/lovable.dev__cloud-auth-js.mjs";
import { e as Shield, f as Swords, h as UserPlus, i as Users, c as Crown, T as Trash2, a as ChevronDown, C as Check, b as ChevronUp } from "../_libs/lucide-react.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = Root.displayName;
const Select = Root2;
const SelectValue = Value;
const SelectTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = Trigger.displayName;
const SelectScrollUpButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = ScrollUpButton.displayName;
const SelectScrollDownButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = ScrollDownButton.displayName;
const SelectContent = reactExports.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Content2,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = Content2.displayName;
const SelectLabel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label$1,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = Label$1.displayName;
const SelectItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ItemText, { children })
    ]
  }
));
SelectItem.displayName = Item.displayName;
const SelectSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = Separator.displayName;
function AdminPage() {
  const {
    user,
    loading,
    isAdmin,
    isSuperAdmin
  } = useAuth();
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: "Loading…" }) });
  if (!user) return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SignInGate, {}) });
  if (!isAdmin) return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-7 h-7 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "Admin Panel" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "match", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "match", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Swords, { className: "w-4 h-4 mr-2" }),
          "Add Match"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "player", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4 mr-2" }),
          "Add Player"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "delete", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 mr-2" }),
          "Delete Players"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "admins", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-4 h-4 mr-2" }),
          "Admins"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "match", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AddMatch, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "player", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AddPlayer, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "delete", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DeletePlayers, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "admins", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Admins, { isSuperAdmin }) })
    ] })
  ] }) });
}
function Card({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm p-6 max-w-2xl", children });
}
function AddPlayer() {
  const qc = useQueryClient();
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setBusy(true);
    const {
      error
    } = await supabase.from("players").insert({
      name: name.trim(),
      email: email.trim().toLowerCase()
    });
    setBusy(false);
    if (error) toast.error("Failed to add player", {
      description: error.message
    });
    else {
      toast.success("Player added");
      setName("");
      setEmail("");
      qc.invalidateQueries({
        queryKey: ["players"]
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value), required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Google email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, placeholder: "student@example.com" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Used to link them to their profile when they sign in with Google." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: busy, children: busy ? "Adding…" : "Add player" })
  ] }) });
}
function AddMatch() {
  const qc = useQueryClient();
  const [whiteName, setWhiteName] = reactExports.useState("");
  const [blackName, setBlackName] = reactExports.useState("");
  const [tc, setTc] = reactExports.useState("blitz");
  const [result, setResult] = reactExports.useState("white");
  const [busy, setBusy] = reactExports.useState(false);
  const {
    data: players = []
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
  const findPlayer = (q) => {
    const lower = q.trim().toLowerCase();
    if (!lower) return null;
    return players.find((p) => p.name.toLowerCase() === lower) ?? null;
  };
  const submit = async (e) => {
    e.preventDefault();
    const white = findPlayer(whiteName);
    const black = findPlayer(blackName);
    if (!white) return toast.error("White player not on leaderboard", {
      description: `"${whiteName}" was not found. Add them first.`
    });
    if (!black) return toast.error("Black player not on leaderboard", {
      description: `"${blackName}" was not found. Add them first.`
    });
    if (white.id === black.id) return toast.error("Players must be different");
    setBusy(true);
    const wField = ratingField(tc);
    const bField = ratingField(tc);
    const wGField = gamesField(tc);
    const bGField = gamesField(tc);
    const wBefore = white[wField] ?? null;
    const bBefore = black[bField] ?? null;
    const wCurrent = wBefore ?? DEFAULT_RATING;
    const bCurrent = bBefore ?? DEFAULT_RATING;
    const wGames = white[wGField] ?? 0;
    const bGames = black[bGField] ?? 0;
    const wScore = result === "white" ? 1 : result === "draw" ? 0.5 : 0;
    const bScore = result === "black" ? 1 : result === "draw" ? 0.5 : 0;
    const wAfter = newRating(wCurrent, bCurrent, wScore, wGames);
    const bAfter = newRating(bCurrent, wCurrent, bScore, bGames);
    const {
      error: mErr
    } = await supabase.from("matches").insert({
      white_id: white.id,
      black_id: black.id,
      time_control: tc,
      result,
      white_rating_before: wBefore,
      black_rating_before: bBefore,
      white_rating_after: wAfter,
      black_rating_after: bAfter
    });
    if (mErr) {
      setBusy(false);
      return toast.error("Failed to save match", {
        description: mErr.message
      });
    }
    await supabase.from("players").update({
      [wField]: wAfter,
      [wGField]: wGames + 1
    }).eq("id", white.id);
    await supabase.from("players").update({
      [bField]: bAfter,
      [bGField]: bGames + 1
    }).eq("id", black.id);
    setBusy(false);
    toast.success("Match recorded", {
      description: `${white.name} ${wAfter} (${wAfter - wCurrent >= 0 ? "+" : ""}${wAfter - wCurrent}) · ${black.name} ${bAfter} (${bAfter - bCurrent >= 0 ? "+" : ""}${bAfter - bCurrent})`
    });
    setWhiteName("");
    setBlackName("");
    qc.invalidateQueries({
      queryKey: ["players"]
    });
    qc.invalidateQueries({
      queryKey: ["matches"]
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "White" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { list: "players-list", value: whiteName, onChange: (e) => setWhiteName(e.target.value), placeholder: "Player name", required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Black" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { list: "players-list", value: blackName, onChange: (e) => setBlackName(e.target.value), placeholder: "Player name", required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("datalist", { id: "players-list", children: players.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.name }, p.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Time control" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: tc, onValueChange: (v) => setTc(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: TIME_CONTROLS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, className: "capitalize", children: t }, t)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Result" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: result, onValueChange: (v) => setResult(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "white", children: "White wins (1–0)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "black", children: "Black wins (0–1)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "draw", children: "Draw (½–½)" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: busy, children: busy ? "Recording…" : "Record match" })
  ] }) });
}
const SUPER_ADMIN = "aarushsamanta@bernardsboe.com";
function DeletePlayers() {
  const qc = useQueryClient();
  const [search, setSearch] = reactExports.useState("");
  const {
    data: players = [],
    isLoading
  } = useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("players").select("*").order("name");
      if (error) throw error;
      return data;
    }
  });
  const filtered = players.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  const remove = async (id, name) => {
    if (!confirm(`Delete player "${name}"? This will remove them from the leaderboard.`)) return;
    const {
      error
    } = await supabase.from("players").delete().eq("id", id);
    if (error) toast.error("Failed to delete player", {
      description: error.message
    });
    else {
      toast.success("Player deleted");
      qc.invalidateQueries({
        queryKey: ["players"]
      });
      qc.invalidateQueries({
        queryKey: ["matches"]
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Search players" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Filter by name…" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Player" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 w-12" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 3, className: "px-4 py-8 text-center text-muted-foreground", children: "Loading…" }) }),
        !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 3, className: "px-4 py-8 text-center text-muted-foreground", children: "No players found." }) }),
        filtered.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/40 last:border-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-muted-foreground", children: p.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => remove(p.id, p.name), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 text-destructive" }) }) })
        ] }, p.id))
      ] })
    ] }) })
  ] });
}
function Admins({
  isSuperAdmin
}) {
  const qc = useQueryClient();
  const [email, setEmail] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const {
    data: admins = []
  } = useQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      const {
        data
      } = await supabase.from("admins").select("*").order("created_at");
      return data ?? [];
    }
  });
  const add = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    const {
      error
    } = await supabase.from("admins").insert({
      email: email.trim().toLowerCase()
    });
    setBusy(false);
    if (error) toast.error("Failed to add admin", {
      description: error.message
    });
    else {
      toast.success("Admin added");
      setEmail("");
      qc.invalidateQueries({
        queryKey: ["admins"]
      });
    }
  };
  const remove = async (id, e) => {
    if (e.toLowerCase() === SUPER_ADMIN) return toast.error("Cannot remove the super admin");
    if (!confirm(`Remove admin ${e}?`)) return;
    const {
      error
    } = await supabase.from("admins").delete().eq("id", id);
    if (error) toast.error("Failed", {
      description: error.message
    });
    else {
      toast.success("Admin removed");
      qc.invalidateQueries({
        queryKey: ["admins"]
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: add, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Add admin by email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "admin@example.com", required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: busy, children: busy ? "Adding…" : "Add admin" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Added" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 w-12" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: admins.map((a) => {
          const isSuper = a.email.toLowerCase() === SUPER_ADMIN;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/40 last:border-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-medium flex items-center gap-2", children: [
              a.email,
              isSuper && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30", children: "Super" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-muted-foreground", children: new Date(a.created_at).toLocaleDateString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: isSuperAdmin && !isSuper && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => remove(a.id, a.email), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 text-destructive" }) }) })
          ] }, a.id);
        }) })
      ] }),
      !isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 text-xs text-muted-foreground border-t border-border/60", children: "Only the super admin can remove admins." })
    ] })
  ] });
}
export {
  AdminPage as component
};

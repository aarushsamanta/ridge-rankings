import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, O as Outlet, H as HeadContent, S as Scripts, c as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster$1, t as toast } from "../_libs/sonner.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { H as History, T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function createSupabaseClient() {
  const SUPABASE_URL = "https://zznqlvxwuiwprblnmytw.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_KIIJ6rTonWoTl4rCn_-BUw_-nrhLEiQ";
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
    }
  });
}
let _supabase;
const supabase = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  }
});
const Ctx = reactExports.createContext({
  session: null,
  user: null,
  isAdmin: false,
  isSuperAdmin: false,
  loading: true,
  signOut: async () => {
  }
});
const SUPER_ADMIN = "aarushsamanta@bernardsboe.com";
function AuthProvider({ children }) {
  const [session, setSession] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [adminEmails, setAdminEmails] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  reactExports.useEffect(() => {
    if (!session) {
      setAdminEmails([]);
      return;
    }
    supabase.from("admins").select("email").then(({ data }) => {
      setAdminEmails((data ?? []).map((r) => r.email.toLowerCase()));
    });
  }, [session]);
  const email = session?.user?.email?.toLowerCase() ?? "";
  const isSuperAdmin = email === SUPER_ADMIN;
  const isAdmin = !!email && (adminEmails.includes(email) || isSuperAdmin);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Ctx.Provider,
    {
      value: {
        session,
        user: session?.user ?? null,
        isAdmin,
        isSuperAdmin,
        loading,
        signOut: async () => {
          await supabase.auth.signOut();
        }
      },
      children
    }
  );
}
const useAuth = () => reactExports.useContext(Ctx);
const appCss = "/assets/styles-Bx5015VS.css";
const Route$5 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ridge High School Chess Club — Rating Leaderboard" },
      { name: "description", content: "Official rating leaderboard for the Ridge High School Chess Club." }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootShell,
  component: RootComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$5.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, theme: "dark" })
  ] }) });
}
const $$splitComponentImporter$4 = () => import("./profile-CfzK7ouP.mjs");
const Route$4 = createFileRoute("/profile")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const $$splitComponentImporter$3 = () => import("./matches-DEvCYldi.mjs");
const Route$3 = createFileRoute("/matches")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
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
const $$splitComponentImporter$2 = () => import("./admin-cvr_5pfw.mjs");
const Route$2 = createFileRoute("/admin")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-C6g1UgMH.mjs");
const Route$1 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./player._id-eOMnynE0.mjs");
const Route = createFileRoute("/player/$id")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ProfileRoute = Route$4.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => Route$5
});
const MatchesRoute = Route$3.update({
  id: "/matches",
  path: "/matches",
  getParentRoute: () => Route$5
});
const AdminRoute = Route$2.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$5
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$5
});
const PlayerIdRoute = Route.update({
  id: "/player/$id",
  path: "/player/$id",
  getParentRoute: () => Route$5
});
const rootRouteChildren = {
  IndexRoute,
  AdminRoute,
  MatchesRoute,
  ProfileRoute,
  PlayerIdRoute
};
const routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Button as B,
  MatchHistory as M,
  Route as R,
  cn as c,
  router as r,
  supabase as s,
  useAuth as u
};

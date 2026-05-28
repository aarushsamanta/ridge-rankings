import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useRouter, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, B as Button, s as supabase } from "./router-C3q5itmJ.mjs";
import { c as createLovableAuth } from "../_libs/lovable.dev__cloud-auth-js.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { g as Trophy, H as History, U as User, e as Shield, d as LogOut, L as LogIn } from "../_libs/lucide-react.mjs";
function PawnIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.6,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "5.5", r: "2.6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 9.5h6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9.5 9.5c-.4 1.6-1.4 2.7-2.6 3.5h10.2c-1.2-.8-2.2-1.9-2.6-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7.5 13c-.4 2.3-.9 4.4-2 6h13c-1.1-1.6-1.6-3.7-2-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4.5 19h15" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 21h16" })
      ]
    }
  );
}
function Layout({ children }) {
  const { user, isAdmin, signOut } = useAuth();
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut();
    router.navigate({ to: "/" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-border/60 backdrop-blur-sm bg-background/70 sticky top-0 z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PawnIcon, { className: "w-6 h-6 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg leading-tight", children: "Ridge High School" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground tracking-wide uppercase", children: "Chess Club" })
        ] })
      ] }),
      user && /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4" }), label: "Leaderboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/matches", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-4 h-4" }), label: "Matches" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/profile", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }), label: "Profile" }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(NavLink, { to: "/admin", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }), label: "Admin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: handleSignOut, className: "ml-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 max-w-6xl w-full mx-auto px-6 py-8", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border/60 py-4 text-center text-xs text-muted-foreground", children: "Ridge High School Chess Club · Rating Leaderboard" })
  ] });
}
function NavLink({ to, icon, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to,
      className: "px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors flex items-center gap-2",
      activeProps: { className: "px-3 py-2 rounded-md text-sm font-medium text-primary bg-primary/10 flex items-center gap-2" },
      children: [
        icon,
        label
      ]
    }
  );
}
const lovableAuth = createLovableAuth();
const lovable = {
  auth: {
    signInWithOAuth: async (provider, opts) => {
      const result = await lovableAuth.signInWithOAuth(provider, {
        redirect_uri: opts?.redirect_uri,
        extraParams: {
          ...opts?.extraParams
        }
      });
      if (result.redirected) {
        return result;
      }
      if (result.error) {
        return result;
      }
      try {
        await supabase.auth.setSession(result.tokens);
      } catch (e) {
        return { error: e instanceof Error ? e : new Error(String(e)) };
      }
      return result;
    }
  }
};
function SignInGate() {
  const handleSignIn = async () => {
    await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin
    });
    if (error) {
      toast.error("Sign-in failed", { description: error.message });
      return;
    }
    if (data?.url) {
      window.location.assign(data.url);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[70vh] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md w-full text-center space-y-6 p-8 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 mx-auto rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PawnIcon, { className: "w-9 h-9 text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "Ridge High School Chess Club" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2", children: "Sign in with Google to view the rating leaderboard." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleSignIn, size: "lg", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4 mr-2" }),
      "Continue with Google"
    ] })
  ] }) });
}
export {
  Layout as L,
  SignInGate as S
};

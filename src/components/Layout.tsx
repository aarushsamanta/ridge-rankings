import { Link, useRouter } from "@tanstack/react-router";
import { History, Trophy, LogOut, Shield, User } from "lucide-react";
import { PawnIcon } from "@/components/PawnIcon";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  const { user, isAdmin, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border/60 backdrop-blur-sm bg-background/70 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
              <PawnIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="font-display text-lg leading-tight">Ridge High School</div>
              <div className="text-xs text-muted-foreground tracking-wide uppercase">Chess Club</div>
            </div>
          </Link>
          {user && (
            <nav className="flex items-center gap-1">
              <NavLink to="/" icon={<Trophy className="w-4 h-4" />} label="Leaderboard" />
              <NavLink to="/matches" icon={<History className="w-4 h-4" />} label="Matches" />
              <NavLink to="/profile" icon={<User className="w-4 h-4" />} label="Profile" />
              {isAdmin && <NavLink to="/admin" icon={<Shield className="w-4 h-4" />} label="Admin" />}
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="ml-2">
                <LogOut className="w-4 h-4" />
              </Button>
            </nav>
          )}
        </div>
      </header>
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">{children}</main>
      <footer className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        Ridge High School Chess Club · Rating Leaderboard
      </footer>
    </div>
  );
}

function NavLink({ to, icon, label }: { to: string; icon: ReactNode; label: string }) {
  return (
    <Link
      to={to}
      className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors flex items-center gap-2"
      activeProps={{ className: "px-3 py-2 rounded-md text-sm font-medium text-primary bg-primary/10 flex items-center gap-2" }}
    >
      {icon}
      {label}
    </Link>
  );
}

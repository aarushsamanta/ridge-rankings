import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PawnIcon } from "@/components/PawnIcon";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function SignInGate() {
  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://ridge-rankings.vercel.app",
      },
    });

    if (error) {
      toast.error("Sign-in failed", { description: error.message });
      return;
    }

    if (data?.url) {
      window.location.assign(data.url);
    }
  };


  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center">
          <PawnIcon className="w-9 h-9 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-3xl">Ridge High School Chess Club</h1>
          <p className="text-muted-foreground mt-2">Sign in with Google to view the rating leaderboard.</p>
        </div>
        <Button onClick={handleSignIn} size="lg" className="w-full">
          <LogIn className="w-4 h-4 mr-2" />
          Continue with Google
        </Button>
      </div>
    </div>
  );
}

// Authentication integration.

import { createLovableAuth as createAuthClient } from "@lovable.dev/cloud-auth-js";
import { supabase } from "../supabase/client";
const authClient = createAuthClient();

type OAuthSignInOptions = {
  redirect_uri?: string;
  extraParams?: Record<string, string>;
};

export const auth = {
  signInWithOAuth: async (provider: "google" | "apple" | "microsoft", opts?: OAuthSignInOptions) => {
      const result = await authClient.signInWithOAuth(provider, {
        redirect_uri: opts?.redirect_uri,
        extraParams: {
          ...opts?.extraParams,
        },
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
    },
  },
};

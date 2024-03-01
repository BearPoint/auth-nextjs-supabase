"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { Provider } from "@supabase/supabase-js";

const SUPABASE_REDIRECT = process.env.SUPABASE_CALLBACK_URL;

export default function Providerbuttons() {
  const supabase = createClientComponentClient();
  const signInWithProvider = async (provider: Provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };
  return (
    <div className="grid grid-cols-2 gap-6">
      <Button variant="outline" onClick={() => signInWithProvider("github")}>
        <Icons.gitHub className="mr-2 h-4 w-4" />
        Github
      </Button>
      <Button variant="outline" onClick={() => signInWithProvider("google")}>
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </Button>
    </div>
  );
}

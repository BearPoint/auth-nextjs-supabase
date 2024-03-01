"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const supabase = createClientComponentClient();
  const route = useRouter();
  const clickHandler = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      route.push("/");
    }
  };
  return <Button onClick={clickHandler}> Log out</Button>;
}

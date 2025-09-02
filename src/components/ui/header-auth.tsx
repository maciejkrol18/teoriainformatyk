import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "./button";
import HeaderAuthDropdown from "./header-auth-dropdown";

interface HeaderAuthProps {
  user: User | null;
}

export default async function HeaderAuth({ user }: HeaderAuthProps) {
  if (user) {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("profiles")
      .select("email, display_name, avatar_url")
      .eq("user_id", user.id)
      .single();

    if (!data || error) {
      return (
        <Button variant="primary" size="sm" asChild>
          <Link href="/login">Zaloguj</Link>
        </Button>
      );
    }
    return (
      <HeaderAuthDropdown display_name={data.display_name} avatar_url={data.avatar_url} />
    );
  }
  return (
    <Button variant="primary" asChild>
      <Link href="/login">Zaloguj</Link>
    </Button>
  );
}

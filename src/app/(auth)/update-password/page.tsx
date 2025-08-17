import UpdatePasswordForm from "@/components/auth/update-password-form";
import { createClient } from "@/lib/supabase/server";
import getUser from "@/lib/supabase/get-user";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Aktualizacja hasła",
};

export default async function UpdatePasswordPage() {
  const supabase = await createClient();

  const { user } = await getUser();

  if (!user?.email) redirect("/");

  const { data } = await supabase.rpc("check_password_change_validity", {
    email_to_check: user.email,
  });

  if (user && data) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Zaktualizuj hasło</h1>
        <p className="text-muted">
          Aktualizujesz hasło dla konta z adresem email &quot;{user.email}&quot;
        </p>
        <UpdatePasswordForm />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Wystąpił błąd</h1>
        <p className="text-muted">
          Twoje konto nie posiada aktywnego żądania resetu hasła
        </p>
      </div>
      <Button variant="primary">
        <Link href="/password-recovery">Resetuj hasło</Link>
      </Button>
      <Button>
        <Link href="/">Wróć na stronę główną</Link>
      </Button>
    </div>
  );
}

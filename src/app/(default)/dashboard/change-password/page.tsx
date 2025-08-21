import { ArrowUpLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ChangePasswordForm from "@/components/dashboard/change-password-form";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export default async function ChangePasswordPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-8">
      <Button asChild variant="outline" className="max-w-fit">
        <Link href="/dashboard">
          <ArrowUpLeft /> Wróć na stronę główną panelu
        </Link>
      </Button>
      <div className="space-y-2">
        <h1 className="text-4xl font-display">Zmień hasło</h1>
        <p>
          Poniższy formularz pozwoli ci zmienić hasło z którego korzystasz podczas
          logowania przy użyciu adresu email
        </p>
      </div>
      <ChangePasswordForm />
      <p className="text-muted">
        Po pomyślnej zmianie hasła nastąpi przekierowanie na stronę logowania
      </p>
    </div>
  );
}

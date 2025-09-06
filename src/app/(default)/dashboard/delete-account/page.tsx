import { ArrowUpLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteAccountForm from "@/components/dashboard/delete-account-form";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export default async function DeleteAccountPage() {
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
        <h1 className="text-4xl font-display">Usuń konto</h1>
        <p>
          <strong className="text-red-500">
            <span className="uppercase">Uwaga!</span> Ta akcja jest nieodwracalna
          </strong>
        </p>
        <p>
          Usunięcie konta skutkuje usunięciem wszystkich danych związanych z twoim kontem
          w naszej bazie danych, w tym statystyki i kolekcje pytań
        </p>
      </div>
      <DeleteAccountForm />
      <p className="text-muted">
        Po pomyślnym usunięciu konta nastąpi przekierowanie na stronę główną
      </p>
    </div>
  );
}

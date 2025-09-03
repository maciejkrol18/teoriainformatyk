import type { User } from "@supabase/supabase-js";
import { KeyRound, LifeBuoy, RotateCcw, Trash2 } from "lucide-react";
import Link from "next/link";
import type { Database } from "@/types/database";
import { Button } from "../ui/button";
import DashboardBlock from "./dashboard-block";

interface DashboardAccountProps {
  profileData: Database["public"]["Tables"]["profiles"]["Row"] | null;
  accountData: User;
}

const DataParagraph = ({ label, value }: { label: string; value: string }) => {
  return (
    <p>
      <span className="text-lg font-medium">{label}</span>{" "}
      <span className="text-muted">{value}</span>
    </p>
  );
};

const getLoginMethods = (user: User) => {
  const methods = user.identities?.map((value) => value.provider) ?? [];
  const didUseEmail = user.email_confirmed_at !== undefined;
  if (didUseEmail) methods.unshift("Email i hasło");

  return methods
    .map((method) => method.charAt(0).toUpperCase() + method.substring(1))
    .join(", ");
};

export default async function DashboardAccount({
  profileData,
  accountData,
}: DashboardAccountProps) {
  const dateJoined = profileData?.created_at
    ? new Date(profileData.created_at).toLocaleDateString()
    : "Nieznana data dołączenia";

  return profileData === null ? (
    <p className="text-muted">Wystąpił błąd w trakcie pobierania danych</p>
  ) : (
    <DashboardBlock blockTitle="Twoje konto">
      <div className="flex flex-col sm:flex-row flex-wrap gap-4">
        <Button asChild variant="outline">
          <Link href="/dashboard/change-password">
            <KeyRound /> Zmień hasło
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard/reset-stats">
            <RotateCcw /> Zresetuj statystyki
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard/delete-account">
            <Trash2 /> Usuń konto
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contact?type=help">
            <LifeBuoy /> Pomoc
          </Link>
        </Button>
      </div>
      <DataParagraph label="Nazwa użytkownika" value={profileData.display_name} />
      <DataParagraph
        label="Aktywne metody logowania"
        value={getLoginMethods(accountData)}
      />
      <DataParagraph
        label="Adres email"
        value={profileData.email.replace(
          /([^\s@])([^\s@]*)(?=@)/g,
          (_, a) => a + "*".repeat(_.length - 1)
        )}
      />
      <DataParagraph label="Data dołączenia" value={dateJoined} />
      <DataParagraph label="Identyfikator" value={profileData.user_id} />
    </DashboardBlock>
  );
}

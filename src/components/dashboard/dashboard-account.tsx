import { KeyRound, LifeBuoy, RotateCcw, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import DashboardBlock from "./dashboard-block";

interface DashboardAccountProps {
  accountData: {
    avatar_url: string;
    created_at: string;
    display_name: string;
    email: string;
    id: number;
    user_id: string;
  } | null;
}

const DataParagraph = ({ label, value }: { label: string; value: string }) => {
  return (
    <p>
      <span className="text-lg font-medium">{label}</span>{" "}
      <span className="text-muted">{value}</span>
    </p>
  );
};

export default async function DashboardAccount({ accountData }: DashboardAccountProps) {
  const dateJoined = accountData?.created_at
    ? new Date(accountData.created_at).toLocaleDateString()
    : "Nieznana data dołączenia";

  return accountData === null ? (
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
      <DataParagraph label="Nazwa użytkownika" value={accountData.display_name} />
      <DataParagraph
        label="Adres email"
        value={accountData.email.replace(
          /([^\s@])([^\s@]*)(?=@)/g,
          (_, a) => a + "*".repeat(_.length - 1)
        )}
      />
      <DataParagraph label="Data dołączenia" value={dateJoined} />
      <DataParagraph label="Identyfikator" value={accountData.user_id} />
    </DashboardBlock>
  );
}

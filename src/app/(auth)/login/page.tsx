import Link from "next/link";
import AuthForms from "@/components/auth/auth-forms";
import OAuthButtons from "@/components/auth/oauth-buttons";

export const metadata = {
  title: "Logowanie",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 text-center sm:text-left">
        <h1 className="text-4xl font-bold">Witamy ponownie</h1>
        <p className="text-muted">Wprowadź swoje dane aby kontynuować</p>
      </div>
      <AuthForms />
      <div className="flex items-center w-full gap-4">
        <div className="h-[1px] bg-background-bright grow" />
        <p className="text-muted">lub kontynuuj przez</p>
        <div className="h-[1px] bg-background-bright grow" />
      </div>
      <OAuthButtons />
      <p className="text-sm text-muted text-center">
        Kontynuując zgadzasz się na warunki{" "}
        <Link className="underline" href="/privacy">
          polityki prywatności
        </Link>
      </p>
    </div>
  );
}

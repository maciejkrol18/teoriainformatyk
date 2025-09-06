import Link from "next/link";
import BrandLogo from "@/components/ui/brand-logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen">
      <BrandLogo size="big" />
      <h1 className="text-[256px] font-bold font-display">404</h1>
      <Button variant="primary" asChild>
        <Link href="/">Powrót do strony głównej</Link>
      </Button>
    </div>
  );
}

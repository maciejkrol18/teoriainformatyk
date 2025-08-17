import BrandLogo from "@/components/ui/brand-logo";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex grow">
      <div className="flex flex-col justify-center grow max-w-[640px] mx-auto xl:mx-0 px-8 py-4">
        {children}
      </div>
      <div className="bg-background-light flex-1 p-8 hidden xl:block">
        <div className="flex h-full flex-col items-end justify-end gap-4">
          <p className="text-6xl font-display font-semibold text-right">
            Najlepsza powtórka do egzaminu zawodowego
          </p>
          <Link href="/">
            <BrandLogo size="big" />
          </Link>
        </div>
      </div>
    </div>
  );
}

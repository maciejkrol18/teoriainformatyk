import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";

export default function HeroLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="grow py-8">{children}</div>
      <Footer />
    </>
  );
}

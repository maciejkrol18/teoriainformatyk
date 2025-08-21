import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="container mx-auto grow py-8">{children}</div>
      <Footer />
    </>
  );
}

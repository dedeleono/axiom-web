import Footer from "@/components/footer";
import Header from "@/components/header";
import ServiceHero from "@/components/services/Hero";
import ServiceTabs from "@/components/services/ServiceTabs";

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="w-full mx-auto">
        <ServiceHero />
        <section className="mask-overlap bg-white relative z-20 pt-10">
          <ServiceTabs />
          {children}
        </section>
      </main>

      <section className="mask-overlap bg-white mt-auto pt-10 relative z-20">
        <Footer />
      </section>
    </div>
  );
}

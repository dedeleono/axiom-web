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

      <main className="max-w-[1920px] mx-auto">
        <ServiceHero />
        <section className="mask-overlap bg-[#f6f6f6] pt-[2rem] mb-[-2rem]">
          <ServiceTabs />
          {children}
        </section>
      </main>

      <section className="mask-overlap bg-white mt-auto pt-[2rem] mb-[-2rem]">
        <Footer />
      </section>
    </div>
  );
}

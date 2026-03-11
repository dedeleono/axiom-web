import Footer from "@/components/footer";
import Hero from "@/components/innovation/Hero";
import Privilege from "@/components/innovation/privilege";
import Header from "@/components/header";

export default function InnovationPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="max-w-[1920px] mx-auto">
        <Hero />
        <section className="mask-overlap bg-[#f6f6f6] pt-[2rem] mb-[-2rem]">
          <Privilege />
        </section>
      </main>

      <section className="mask-overlap bg-white mt-auto pt-[2rem] mb-[-2rem]">
        <Footer />
      </section>
    </div>
  );
}

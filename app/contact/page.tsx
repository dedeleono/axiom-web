import Footer from "@/components/footer";
import Contact from "./_components/contact";
import Header from "@/components/header";

export const metadata = {
  title: "Contact",
  description:
    "Contact Axiom Renovation to book a consultation or ask a question. Bay Area kitchen and bath remodeling, ADUs, and home additions. 408-702-2022.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="max-w-[1920px] mx-auto">
        <Contact />
      </main>

      <section className="mask-overlap relative z-20 mt-auto bg-white pt-10 max-md:pt-8 max-md:shadow-[0_-16px_48px_-20px_rgba(0,0,0,0.14)]">
        <Footer />
      </section>
    </div>
  );
}

import Footer from "@/components/footer";
import Contact from "./_components/contact";
import Header from "@/components/header";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Axiom Renovation for a free consultation. Bay Area kitchen remodeling, bathroom renovation, ADUs, and home additions. 408-702-2022.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="max-w-[1920px] mx-auto">
        <Contact />
      </main>

      <section className="mask-overlap bg-white mt-auto pt-[2rem] mb-[-2rem]">
        <Footer />
      </section>
    </div>
  );
}

import Footer from "@/components/footer";
import Header from "@/components/header";

export default function FaqsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main className="w-full mx-auto">{children}</main>
      <section className="mask-overlap relative z-20 mt-auto bg-white pt-10">
        <Footer />
      </section>
    </div>
  );
}

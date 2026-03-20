import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/projects/Hero";
import ProjectsCarousel from "@/components/projects/projects-carousel";

export const metadata = {
  title: "Projects",
  description:
    "Explore Axiom Renovation's portfolio of Bay Area home remodeling projects. Kitchen remodels, bathroom renovations, ADUs, and full home renovations.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="w-full mx-auto">
        <Hero />

        <section className="mask-overlap bg-white relative z-20 pt-10">
          <ProjectsCarousel />
        </section>
      </main>

      <section className="mask-overlap bg-white mt-auto pt-10 relative z-20">
        <Footer />
      </section>
    </div>
  );
}

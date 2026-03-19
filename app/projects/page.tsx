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

      <main className="max-w-[1920px] mx-auto">
        <Hero />

        <section className="mask-overlap bg-[#f6f6f6] pt-[2rem] mb-[-2rem]">
          <ProjectsCarousel />
        </section>
      </main>

      <section className="mask-overlap bg-white mt-auto pt-[2rem] mb-[-2rem]">
        <Footer />
      </section>
    </div>
  );
}

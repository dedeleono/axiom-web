import { client } from "@/sanity/lib/client";
import Footer from "@/components/footer";
import Hero from "./_components/Hero";
import MiddleSection from "./_components/middle-section";
import type { ProjectData } from "@/lib/interfaces";
import Header from "@/components/header";

async function getProject(slug: string) {
  return client.fetch<ProjectData>(
    `*[_type == "project" && projectSlug.current == $slug][0]{
      title,
      location,
      year,
      projectType,
      description1,
      description2,
      image{
        asset->,
        hotspot
      },
      highlightImages[]{
        asset->,
        hotspot
      },
      projectCarouselImages[]{
        asset->,
        hotspot
      }
    }`,
    { slug }
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectsId: string }>;
}) {
  const { projectsId } = await params;
  const project = await getProject(projectsId);

  if (!project) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">
        <p>Project not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="max-w-[1920px] mx-auto">
        <Hero project={project} />

        <section className="mask-overlap bg-white pt-[2rem] mb-[-2rem]">
          <MiddleSection
            year={project.year}
            title={project.title}
            location={project.location}
            description1={project.description1}
            description2={project.description2}
            images={project.projectCarouselImages}
            highlghtImages={project.highlightImages}
            projectType={project.projectType}
          />
        </section>
      </main>

      <section className="mask-overlap bg-[#f6f6f6] mt-auto pt-[2rem] mb-[-2rem]">
        <Footer />
      </section>
    </div>
  );
}

export const revalidate = 0;

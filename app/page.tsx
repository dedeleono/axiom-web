import WhoWeAre from "@/components/home/who-we-are";
import Philosophy from "@/components/home/philosophy";
// import Projects from "@/components/home/projects";
// import Awards from "@/components/home/awards";
import Services from "@/components/home/services";
import ServicesIntro from "@/components/home/services-intro";
import InspirationCTA from "@/components/home/inspiration-cta";
import WhyChooseUs from "@/components/home/why-choose-us";
import Testimonials from "@/components/home/testimonials";
import Footer from "@/components/footer";
import Hero from "@/components/home/Hero";
import Header from "@/components/header";
import { client } from "@/sanity/lib/client";

// async function getProjects() {
//   const query = `*[_type == "project"] | order(order asc) {
//     _id,
//     title,
//     subtitle,
//     projectSlug,
//     image { _type, asset, "imgAlt": imgAlt, hotspot },
//     "imageUrl": image.asset->url
//   }`;
//   const projects = await client.fetch(query);
//   return (projects ?? []).filter(
//     (p: { image?: { asset?: unknown }; imageUrl?: string }) =>
//       p?.image?.asset != null && p?.imageUrl != null
//   );
// }

export default async function Home() {
  // const projects = await getProjects();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main className="w-full mx-auto">
        <Hero />

        <section className="mask-overlap bg-white relative z-30 pt-10">
          <ServicesIntro />
        </section>

        <section className="mask-overlap bg-[#f6f6f6] relative z-20 pt-10">
          <WhoWeAre />
        </section>

        <section className="mask-overlap bg-white relative z-10 pt-10">
          <Services />
        </section>

        <section className="mask-overlap bg-white relative z-10 pt-10">
          <InspirationCTA />
        </section>

        <section className="mask-overlap bg-[#f6f6f6] relative z-10 pt-10">
          <WhyChooseUs />
        </section>

        <section className="mask-overlap bg-white relative z-10 pt-10">
          <Testimonials />
        </section>

        <section className="mask-overlap bg-white relative z-10 pt-10">
          <Philosophy />
        </section>

        {/* <section>
          <Projects initialSlides={projects} />
        </section> */}

        {/* <section className="mask-overlap bg-black mt-auto pt-[2rem] mb-[-2rem]">
          <Awards />
        </section> */}
      </main>

      <section className="mask-overlap bg-white mt-auto pt-10">
        <Footer />
      </section>
    </div>
  );
}

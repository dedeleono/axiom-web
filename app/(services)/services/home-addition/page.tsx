import ServiceContent from "@/components/services/ServiceContent";
import JsonLd from "@/components/json-ld";
import { serviceJsonLd } from "@/lib/structured-data";

export const metadata = {
  title: "Home Addition",
  description:
    "Expand your home with Axiom Renovation. Bay Area home additions, ADUs, and room additions. Expert design and construction. Free consultations.",
};

const homeAdditionServiceJsonLd = serviceJsonLd({
  path: "/services/home-addition",
  name: "Home Addition",
  serviceType: "Home addition construction",
  description: metadata.description,
});

export default function HomeAdditionPage() {
  return (
    <>
      <JsonLd data={homeAdditionServiceJsonLd} />
      <ServiceContent slug="home-addition" />
    </>
  );
}

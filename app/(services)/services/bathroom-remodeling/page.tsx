import ServiceContent from "@/components/services/ServiceContent";
import JsonLd from "@/components/json-ld";
import { serviceJsonLd } from "@/lib/structured-data";

export const metadata = {
  title: "Bathroom Remodeling",
  description:
    "Transform your bathroom with Axiom Renovation. Expert Bay Area bathroom remodeling, renovation, and design. Free consultations.",
};

const bathroomServiceJsonLd = serviceJsonLd({
  path: "/services/bathroom-remodeling",
  name: "Bathroom Remodeling",
  serviceType: "Bathroom remodeling",
  description: metadata.description,
});

export default function BathroomRemodelingPage() {
  return (
    <>
      <JsonLd data={bathroomServiceJsonLd} />
      <ServiceContent slug="bathroom-remodeling" />
    </>
  );
}

import ServiceContent from "@/components/services/ServiceContent";
import JsonLd from "@/components/json-ld";
import { serviceJsonLd } from "@/lib/structured-data";

export const metadata = {
  title: "Outdoor Remodeling",
  description:
    "Transform your backyard with Axiom Renovation. Bay Area outdoor remodeling, patios, decks, outdoor kitchens, pergolas, and hardscaping. Free consultations.",
};

const outdoorServiceJsonLd = serviceJsonLd({
  path: "/services/outdoor-remodeling",
  name: "Outdoor Remodeling",
  serviceType: "Outdoor remodeling",
  description: metadata.description,
});

export default function OutdoorRemodelingPage() {
  return (
    <>
      <JsonLd data={outdoorServiceJsonLd} />
      <ServiceContent slug="outdoor-remodeling" />
    </>
  );
}

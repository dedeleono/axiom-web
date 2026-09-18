import ServiceContent from "@/components/services/ServiceContent";
import JsonLd from "@/components/json-ld";
import { serviceJsonLd } from "@/lib/structured-data";

export const metadata = {
  title: "Kitchen Remodeling",
  description:
    "Expert kitchen remodeling in the Bay Area. Axiom Renovation delivers custom kitchens, modern design, and quality craftsmanship. Free consultations.",
  alternates: { canonical: "/services/kitchen-remodeling" },
};

const kitchenServiceJsonLd = serviceJsonLd({
  path: "/services/kitchen-remodeling",
  name: "Kitchen Remodeling",
  serviceType: "Kitchen remodeling",
  description: metadata.description,
});

export default function KitchenRemodelingPage() {
  return (
    <>
      <JsonLd data={kitchenServiceJsonLd} />
      <ServiceContent slug="kitchen-remodeling" />
    </>
  );
}

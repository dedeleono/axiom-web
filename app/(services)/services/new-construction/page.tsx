import ServiceContent from "@/components/services/ServiceContent";
import JsonLd from "@/components/json-ld";
import { serviceJsonLd } from "@/lib/structured-data";

export const metadata = {
  title: "New Construction",
  description:
    "Bay Area new construction by Axiom Renovation. Ground-up custom homes, single-family builds, and major structural projects. Licensed, permitted, and built to last.",
};

const newConstructionServiceJsonLd = serviceJsonLd({
  path: "/services/new-construction",
  name: "New Construction",
  serviceType: "New home construction",
  description: metadata.description,
});

export default function NewConstructionPage() {
  return (
    <>
      <JsonLd data={newConstructionServiceJsonLd} />
      <ServiceContent slug="new-construction" />
    </>
  );
}

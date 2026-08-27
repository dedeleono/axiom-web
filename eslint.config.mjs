import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // These legacy CMS/query boundaries predate generated Sanity types. Keep
    // the exception constrained to those files instead of weakening app code.
    files: ["app/blog/{cover-image,more-stories,page}.tsx", "sanity/**/*.{ts,tsx}"],
    rules: { "@typescript-eslint/no-explicit-any": "off" },
  },
  {
    // These effects bridge async/external event APIs. The synchronous call is
    // the subscription/bootstrap step, not derived render state.
    files: [
      "components/consultation-stepper.tsx",
      "components/home/projects.tsx",
      "components/ui/carousel.tsx",
    ],
    rules: { "react-hooks/set-state-in-effect": "off" },
  },
  {
    // Sanity discovers these legacy schema objects through default exports;
    // naming them adds no runtime or type safety value.
    files: [
      "sanity/schemaTypes/{awards,home,innovation,project,service,whoWeAre,whyChooseUs}.ts",
    ],
    rules: { "import/no-anonymous-default-export": "off" },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

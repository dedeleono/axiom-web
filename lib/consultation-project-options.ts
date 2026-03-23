/** Shared labels for consultation project multi-select (ids match Sanity-free slugs). */
export const CONSULTATION_PROJECT_OPTIONS: { id: string; label: string }[] = [
  { id: "adu", label: "ADU / backyard home" },
  { id: "kitchen", label: "Kitchen renovation" },
  { id: "garage", label: "Garage conversion" },
  { id: "bathroom", label: "Bathroom renovation" },
  { id: "addition", label: "Home addition" },
  { id: "roof", label: "Roof replacement" },
  { id: "flooring", label: "Flooring" },
  { id: "painting", label: "Interior painting" },
];

export function projectTypeIdsToLabels(ids: string[]): string {
  const map = Object.fromEntries(
    CONSULTATION_PROJECT_OPTIONS.map((o) => [o.id, o.label])
  );
  return ids.map((id) => map[id] ?? id).join(", ");
}

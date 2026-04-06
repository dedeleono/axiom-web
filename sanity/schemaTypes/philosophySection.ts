import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "philosophySection",
  title: "Philosophy (homepage)",
  type: "document",
  icon: DocumentTextIcon,
  description: "Copy and imagery for the philosophy block on the homepage (light layout).",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "Philosophy",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      initialValue: "A beautiful room means a beautiful mind.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "paragraphOne",
      title: "Paragraph 1",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "paragraphTwo",
      title: "Paragraph 2",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "imageLeft",
      title: "Left image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "imgAlt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "imageRight",
      title: "Right image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "imgAlt",
          title: "Alt text",
          type: "string",
        }),
      ],
    }),
  ],
});

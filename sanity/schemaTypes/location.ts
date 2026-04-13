import { PinIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

const imageWithAltFields = [
  defineField({
    name: "imgAlt",
    title: "Alt text",
    type: "string",
  }),
];

export default defineType({
  name: "location",
  title: "Area / location page",
  type: "document",
  icon: PinIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'City or area name, e.g. "San Jose" (shown as "… in San Jose, CA").',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      fields: imageWithAltFields,
      description: "Full-bleed hero background (recommended 1920×1080+).",
    }),
    defineField({
      name: "county",
      title: "County",
      type: "string",
      description: 'e.g. "Santa Clara County"',
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 4,
      description: "Short 2–3 sentence localized intro (also used for meta description).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "neighborhoods",
      title: "Neighborhoods",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "services",
      title: "Services (optional override)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "If empty, default service labels are used on the page.",
    }),
    defineField({
      name: "projectHighlight",
      title: "Project highlight",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
        }),
        defineField({
          name: "beforeImage",
          title: "Before image",
          type: "image",
          options: { hotspot: true },
          fields: imageWithAltFields,
        }),
        defineField({
          name: "afterImage",
          title: "After image",
          type: "image",
          options: { hotspot: true },
          fields: imageWithAltFields,
        }),
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "quote",
              title: "Quote",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "author",
              title: "Author",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "location",
              title: "Location",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
});

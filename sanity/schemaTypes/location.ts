import { PinIcon } from "@sanity/icons/Pin";
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
      name: "body",
      title: "Body",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
      description:
        "Main page copy. Use the rich editor — headings, bold, italics, links, and lists are supported. The first ~160 characters are reused for the page meta description.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "neighborhoods",
      title: "Other cities we serve",
      type: "array",
      description:
        "Listed in the right column of the page. Reference an existing location to make the entry clickable, or leave the reference empty for plain text.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              description: 'City label, e.g. "Cupertino, CA"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "locationRef",
              title: "Linked location (optional)",
              type: "reference",
              to: [{ type: "location" }],
              description:
                "Pick an existing location page to make this entry clickable. Leave empty to render plain text.",
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "locationRef.slug.current" },
            prepare({ title, subtitle }) {
              return {
                title: typeof title === "string" ? title : "Untitled",
                subtitle:
                  typeof subtitle === "string" && subtitle.length > 0
                    ? `/areas/${subtitle}`
                    : "Plain text",
              };
            },
          },
        }),
      ],
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

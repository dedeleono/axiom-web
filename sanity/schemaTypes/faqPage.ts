import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "faqPage",
  title: "FAQ page",
  type: "document",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero image",
      description: "Full-width image behind the rounded mask (same role as Services page hero).",
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
      name: "heroText",
      title: "Hero headline (on image)",
      type: "text",
      rows: 3,
      description: "Large uppercase line over the image, e.g. services page style.",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero subcopy (on image)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "FAQs",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      initialValue: "Answers to common questions.",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Category title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "faqs",
              title: "Questions",
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
        }),
      ],
    }),
  ],
});

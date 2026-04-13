import { defineQuery } from "next-sanity";

export const blogSettingsQuery = defineQuery(`*[_type == "blogSettings"][0]`);

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{"name": coalesce(name, "Anonymous"), picture},
`;

export const heroQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
    content,
    ${postFields}
  }
`);

export const moreStoriesQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content,
    ${postFields}
  }
`);

export const postSlugsQuery = defineQuery(
  `*[_type == "post" && defined(slug.current)]{"slug": slug.current}`,
);

export const locationBySlugQuery = defineQuery(`
  *[_type == "location" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    county,
    intro,
    neighborhoods,
    services,
    projectHighlight {
      title,
      description,
      beforeImage,
      afterImage
    },
    testimonials,
    faqs
  }
`);

export const locationSlugsQuery = defineQuery(
  `*[_type == "location" && defined(slug.current)]{"slug": slug.current}`,
);

export const allLocationsForGridQuery = defineQuery(`
  *[_type == "location" && defined(slug.current)] | order(title asc) {
    title,
    "slug": slug.current,
    county
  }
`);

export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'projectSlug',
      title: 'URL Name',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule: { required: () => unknown }) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (Rule.required() as any).regex(/^\d{4}$/),
    },
    {
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'description1',
      title: 'Description 1',
      type: 'text',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'highlightImages',
      title: 'Highlight Images',
      type: 'array',
      of: [{ type: 'image' }],
      validation: (Rule: { required: () => unknown }) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (Rule.required() as any).min(1).max(2),
    },
    {
      name: 'description2',
      title: 'Description 2',
      type: 'text',
    },
    {
      name: 'projectCarouselImages',
      title: 'Project Carousel Images',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
    },
  ],
}

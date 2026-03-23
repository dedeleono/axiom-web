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
      name: 'services',
      title: 'Services',
      type: 'string',
      description:
        'Scope of work for this project (e.g. flooring, lighting, cabinetry, bathroom remodel).',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'lengthOfProject',
      title: 'Length of project',
      type: 'string',
      description: 'Timeline or duration (e.g. 6–8 weeks).',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'budget',
      title: 'Budget',
      type: 'string',
      description: 'Budget range or tier (e.g. $54k–$65k).',
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

export default {
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'img',
      title: 'Cover Image',
      type: 'image',
      fields: [
        {
          name: 'imgAlt',
          title: 'Alt image',
          type: 'string',
        },
      ],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'heroText',
      title: 'Hero Text',
      type: 'text',
    },
    {
      name: 'heroSubText1',
      title: 'Hero Sub Text 1',
      type: 'text',
    },
    {
      name: 'heroSubText2',
      title: 'Hero Sub Text 2',
      type: 'text',
    },
    {
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
    },
    {
      name: 'heroCtaLabel',
      title: 'Hero CTA Button Label',
      type: 'string',
      description: 'Primary call-to-action button text (e.g. "Start Your Project")',
      initialValue: 'Start Your Project',
    },
    {
      name: 'heroCtaUrl',
      title: 'Hero CTA Button URL',
      type: 'string',
      description: 'Where the CTA button links to (e.g. "/contact")',
      initialValue: '/contact',
    },
    {
      name: 'pageName',
      title: 'Page Name',
      type: 'string',
      description: 'Use "home" for the main homepage. Leave empty or set to "home". Only lowercase letters, numbers, hyphens.',
      initialValue: 'home',
      validation: (Rule: { optional: () => unknown }) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (Rule.optional() as any).regex(/^[a-z0-9-]*$/),
    },
    {
      name: 'highlightImages',
      title: 'Highlight Images',
      type: 'array',
      of: [{ type: 'image' }],
    },
  ],
}

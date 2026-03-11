export default {
  name: 'whoWeAre',
  title: 'Who We Are',
  type: 'document',
  fields: [
    {
      name: 'title', // Renamed back from 'heading' to preserve existing data
      title: 'Heading',
      type: 'string',
      description: 'e.g. "Custom Home Renovations"',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'The main text paragraph.',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Our Portfolio',
    },
    {
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
      initialValue: '/projects',
    },
    {
      name: 'yearsExperience',
      title: 'Years of Experience',
      type: 'string',
      initialValue: '10',
      description: 'The large number displayed (e.g., "10").',
    },
    {
      name: 'img', // Renamed back from 'mainImage' to preserve existing data
      title: 'Main Image (Large)',
      type: 'image',
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
      options: {
        hotspot: true,
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'secondaryImage',
      title: 'Secondary Image (Small Overlay)',
      type: 'image',
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
      options: {
        hotspot: true,
      },
    },
  ],
}

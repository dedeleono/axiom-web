export default {
  name: 'whyChooseUs',
  title: 'Why Choose Us',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Why Choose us',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      description: 'The descriptive text below the heading.',
    },
    {
      name: 'stat1',
      title: 'Stat 1 (Blue Box)',
      type: 'object',
      fields: [
        { name: 'value', type: 'string', title: 'Value (e.g. 95%)' },
        { name: 'label', type: 'string', title: 'Label (e.g. Client Satisfaction)' },
      ]
    },
    {
      name: 'stat2',
      title: 'Stat 2 (Top Middle)',
      type: 'object',
      fields: [
        { name: 'value', type: 'string', title: 'Value (e.g. 120+)' },
        { name: 'label', type: 'string', title: 'Label (e.g. Campaigns Delivered)' },
      ]
    },
    {
      name: 'stat3',
      title: 'Stat 3 (Bottom Left)',
      type: 'object',
      fields: [
        { name: 'value', type: 'string', title: 'Value (e.g. 24/7)' },
        { name: 'label', type: 'string', title: 'Label (e.g. Support Available)' },
      ]
    },
    {
      name: 'stat4',
      title: 'Stat 4 (Green Box)',
      type: 'object',
      fields: [
        { name: 'value', type: 'string', title: 'Value (e.g. 50%)' },
        { name: 'label', type: 'string', title: 'Label (e.g. Engagement Growth)' },
      ]
    },
    {
      name: 'textCard',
      title: 'Text Card (Middle)',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'description', type: 'text', title: 'Description' },
        { name: 'author', type: 'string', title: 'Author Name' },
      ]
    },
    {
      name: 'image',
      title: 'Right Side Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text' }
      ]
    },
  ],
}

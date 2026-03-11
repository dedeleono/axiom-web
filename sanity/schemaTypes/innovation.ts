export default {
  name: 'innovation',
  title: 'Innovation',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
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
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Add multiple images to showcase this service (e.g., Before/After, finished projects).'
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Optional: Link to a YouTube/Vimeo video showcasing this service.'
    },
    {
      name: 'aboutTitle',
      title: 'About Title',
      type: 'string',
      description: 'e.g. "Inspire your space through art and design."',
    },
    {
      name: 'aboutText',
      title: 'About Text',
      type: 'text',
    },
    {
      name: 'featuresTitle',
      title: 'Types of Jobs / Offerings Title',
      type: 'string',
      description: 'e.g. "Our Kitchen Remodeling Services"',
    },
    {
      name: 'features',
      title: 'Types of Jobs / Offerings',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Service Title' },
            { name: 'description', type: 'text', title: 'Service Description' },
            { name: 'image', type: 'image', title: 'Service Image (Optional)' }
          ]
        }
      ]
    },
    {
      name: 'processTitle',
      title: 'Process Section Title',
      type: 'string',
      description: 'e.g. "Our Bathroom Remodel Process"',
    },
    {
      name: 'process',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'step', type: 'string', title: 'Step Number/Label' },
            { name: 'title', type: 'string', title: 'Step Title' },
            { name: 'description', type: 'text', title: 'Step Description' }
          ]
        }
      ]
    },
    {
      name: 'historyTitle',
      title: 'History/Quality Title',
      type: 'string',
      description: 'e.g. "Quality Work, Great Rates"',
    },
    {
      name: 'historyText',
      title: 'History/Quality Text',
      type: 'text',
    }
  ],
}

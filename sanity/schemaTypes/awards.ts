export default {
  name: 'award',
  title: 'Award',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'description1',
      title: 'Description 1',
      type: 'string',
    },
    {
      name: 'description2',
      title: 'Description 2',
      type: 'string',
    },
    {
      name: 'refProject',
      title: 'Reference Project',
      type: 'reference',
      to: [{ type: 'project' }],
    },
    {
      name: 'awardImage',
      title: 'Award Image',
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
      name: 'logoImage',
      title: 'Logo Image',
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
  ],
}

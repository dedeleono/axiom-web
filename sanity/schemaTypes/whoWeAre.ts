export default {
  name: 'whoWeAre',
  title: 'Who We Are',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'img',
      title: 'Image',
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
      name: 'isValues',
      title: 'Is Values Section',
      type: 'boolean',
    },
  ],
}

export default {
  name: 'philosophy',
  title: 'Philosophy',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'isValue',
      title: 'Is Value?',
      type: 'boolean',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
    },
  ],
}

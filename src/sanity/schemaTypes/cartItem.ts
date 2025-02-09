export default {
    name: 'cartItem',
    title: 'Cart Item',
    type: 'object',
    fields: [
      {
        name: 'product',
        title: 'Product',
        type: 'reference',
        to: [{ type: 'product' }],
      },
      {
        name: 'quantity',
        title: 'Quantity',
        type: 'number',
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
      },
      {
        name: 'image',
        title: 'Image',
        type: 'url',
      },
    ],
  }
  
export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'userId',
      title: 'User ID',
      type: 'string',
    },
    {
      name: 'orderId',
      title: 'Order ID',
      type: 'string',
    },
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'product',
              title: 'Product',
              type: 'reference', // Add a reference to the product document
              to: [{ type: 'product' }], // Reference the 'product' schema
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
          ],
        },
      ],
    },
    {
      name: 'shippingDetails',
      title: 'Shipping Details',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'string',
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
        },
        {
          name: 'state',
          title: 'State',
          type: 'string',
        },
        {
          name: 'postal',
          title: 'Postal Code',
          type: 'string',
        },
        {
          name: 'country',
          title: 'Country',
          type: 'string',
        },
      ],
    },
    {
      name: 'paymentDetails',
      title: 'Payment Details',
      type: 'object',
      fields: [
        {
          name: 'paymentMethod',
          title: 'Payment Method',
          type: 'string',
        },
        {
          name: 'amount',
          title: 'Amount',
          type: 'number',
        },
        {
          name: 'transactionId',
          title: 'Transaction ID',
          type: 'string',
        },
      ],
    },
  ],
};
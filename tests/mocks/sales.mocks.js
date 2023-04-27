const resultFromGetSales = [
  {
    "saleId": 1,
    "date": "2022-09-10T15:55:31.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-09-10T15:55:31.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-09-10T15:55:31.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const resultFromGetSalesIdOne = [
  {
    "date": "2022-09-10T15:55:31.000Z",
    "product_id": 1,
    "quantity": 5
  },
  {
    "date": "2022-09-10T15:55:31.000Z",
    "product_id": 2,
    "quantity": 10
  }
];

const bodyToAddSale = [
  {
    "productId": 3,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const resultFromAddSale = {
  "id": 5,
  "itemsSold": [
    {
      "productId": 3,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
};

module.exports = {
  resultFromGetSales,
  resultFromGetSalesIdOne,
  bodyToAddSale,
  resultFromAddSale,
};

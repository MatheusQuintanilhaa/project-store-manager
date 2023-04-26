const getProductsResult = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
];

const error = {
  type: 404,
  message: 'Error',
}

module.exports = {
  error,
  getProductsResult,
}

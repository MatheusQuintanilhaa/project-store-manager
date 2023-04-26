const sinon = require('sinon');
const { expect } = require('chai');
const productsService = require('../../../src/services/productService');
const productsModel = require('../../../src/models/productModel');
const mock = require('../../mocks/products.mocks');

describe('Testando a camada Service - products', () => {
  it('Testando a função getProducts', async () => {
    sinon.stub(productsModel, 'getProduct').resolves(mock.getProductsResult);

    const result = await productsService.getProduct();

    expect(result).to.be.deep.equal(mock.getProductsResult);
  });

  it('Testando a função getProductsById com dados válidos', async () => {
    sinon.stub(productsModel, 'getProductById').resolves([mock.getProductsResult[0]]);

    const result = await productsService.getProductById(1);

    expect(result).to.be.deep.equal(mock.getProductsResult[0]);

  });

  afterEach(() => sinon.restore());
})

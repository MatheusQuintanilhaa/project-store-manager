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

  it('Testando a função createProduct em caso de sucesso', async () => {
    sinon.stub(productsModel, 'createProduct').resolves({ id: 5, name: 'Biscoito Oreo' });

    const result = await productsService.createProduct('Biscoito Oreo');

    expect(result).to.be.deep.equal({ id: 5, name: 'Biscoito Oreo' });
  });

  afterEach(() => sinon.restore());
})

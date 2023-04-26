const sinon = require('sinon');
const { expect } = require('chai');
const chai = require('chai');
const productService = require('../../../src/services/productService');
const productController = require('../../../src/controllers/productController');
const sinonChai = require('sinon-chai');
const mock = require('../../mocks/products.mocks');
const connection = require('../../../src/models/connection');
chai.use(sinonChai);

describe('Testando  a camada Controller - products', () => {
  it('Testando a função getProducts', async () => {
    sinon.stub(productService, 'getProduct').resolves(mock.getProductsResult);

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mock.getProductsResult);
  })

  it('Testando a função getProductsById com dados válidos', async () => {
    sinon.stub(productService, 'getProductById').resolves(mock.getProductsResult[0]);

    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mock.getProductsResult[0]);
  });

  it('Testando a função getProductsById com dados inválidos', async () => {
    sinon.stub(productService, 'getProductById').resolves();

    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  afterEach(() => sinon.restore());
});

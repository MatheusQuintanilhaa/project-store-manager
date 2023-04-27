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
    sinon.stub(productService, 'getProduct').resolves(mock.resultsOfProducts);

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mock.resultsOfProducts);
  })

  it('Testando a função getProductsById com dados válidos', async () => {
    sinon.stub(productService, 'getProductById').resolves(mock.resultsOfProducts[0]);

    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mock.resultsOfProducts[0]);
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

  it('Testando a função createProduct com dados válidos', async () => {
    sinon.stub(productService, 'createProduct').resolves(['mockado']);

    const req = { body: { name: 'Havaiana de Pau' } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(['mockado']);
  })

  it('Testando a função createProduct com dados inválidos', async () => {
    sinon.stub(productService, 'createProduct').resolves(mock.error);

    const req = { body: { name: 'Havaiana de Pau' } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(mock.error.type);
    expect(res.json).to.have.been.calledWith({ message: mock.error.message });
  });

  it('Testando a função updateProduct com dados válidos', async () => {
  const mockProduct = { id: 1, name: 'Havaiana de Pau' };
  sinon.stub(productService, 'updateProduct').resolves(mockProduct);

  const req = { params: { id: 1 }, body: { name: 'Havaiana de Pau' } };
  const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

  await productController.updateProduct(req, res);

  expect(res.status).to.have.been.calledWith(200);
  expect(res.json).to.have.been.calledWith(mockProduct);

  productService.updateProduct.restore();
  });

  it('Testando a função updateProduct com dados inválidos', async () => {
  const mockProduct = { type: 422, message:'"name" length must be at least 5 characters long'  };
  sinon.stub(productService, 'updateProduct').resolves(mockProduct);

  const req = { params: { id: 1 }, body: { name: 'Pitu' } };
  const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

  await productController.updateProduct(req, res);

  expect(res.status).to.have.been.calledWith(422);
  expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });

  productService.updateProduct.restore();
  });

  it('Testando a função deleteProduct com um id válido', async () => {
  const mockResult = { type: 'success', message: 'Produto deletado com sucesso' };
  const req = { params: { id: 1 } };
    const res = {};
    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns();
  sinon.stub(productService, 'deleteProduct').resolves({ type: null });


  await productController.deleteProduct(req, res);

  expect(res.status).to.have.been.calledWith(204);

  productService.deleteProduct.restore();
  });

it('Testando a função deleteProduct com um id inválido', async () => {
  const req = { params: { id: 100 } };
  const res = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();
  res.send = sinon.stub().returns();
  sinon.stub(productService, 'deleteProduct').resolves({ type: 404, message: 'Product not found' });

  await productController.deleteProduct(req, res);

  expect(res.status).to.have.been.calledWith(404);
  expect(res.json).to.have.been.calledWith({ message: 'Product not found' });

  productService.deleteProduct.restore();
});









  afterEach(() => sinon.restore());
});

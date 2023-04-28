const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/productModel');
const productService = require('../../../src/services/productService');
const productController = require('../../../src/controllers/productController');
const sinon = require('sinon');
const { expect } = require('chai');
const mock = require('../../mocks/products.mocks');



describe('Testando camada Models - Products', () => {
  it('Testando o retorno de SELECT de todos os produtos', async () => {
    sinon.stub(connection, 'execute').resolves([mock.resultsOfProducts]);

    const result = await productModel.getProduct();

    expect(result).to.be.deep.equal(mock.resultsOfProducts);
  });



    it('deve retornar vazio para um produto inexistente', async () => {
      const productId = 999;

      const result = await productModel.getProductById(productId);

      expect(result).to.eql([]);
    });

  it('Testando o retorno de SELECT produto por id', async () => {
    sinon.stub(connection, 'execute').resolves([mock.resultsOfProducts]);

    const result = await productModel.getProductById(1);

    expect(result).to.be.deep.equal(mock.resultsOfProducts);
  })

  it('Testando o retorno de INSERT de novo product', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);

    const name = 'Biscoito Oreo';

    const result = await productModel.createProduct(name);

    expect(result).to.have.property('id');
    expect(result).to.have.property('name');
    expect(result.id).to.be.equal(5);
    expect(result.name).to.be.equal(name)
  });



   it('deve retornar uma lista de produtos', async () => {
    const req = { query: { q: 'test' } };
    const res = {  };
    const products = [{ name: 'Produto 1', id: 1 }, { name: 'Produto 2', id: 2  }];

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'lastEndPointService').resolves(products);

    await productController.lastEndPointController(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(products)).to.be.true;
  });

  it('deve retornar uma mensagem de erro se não houver produtos', async () => {
    const req = { query: { q: 'test' } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'lastEndPointService').resolves([]);

    await productController.lastEndPointController(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'product not found' })).to.be.true;
  });

  it('Testando atualizar o produto', async () => {
    sinon.stub(connection, 'execute').resolves([[{
	"id": 1,
	"name": "Biscoito Oreo"
}]]);
    // const functionGetProdut = await productModel.getProductById(1);
    const result = await productModel.updateProduct(1, 'Biscoito Oreo');
    expect(result).to.be.deep.equal({ id: 1, name: 'Biscoito Oreo' });
    // expect(functionGetProdut).to.be.deep.equal([{ id: 1, name: 'Biscoito Oreo' }]);
  })








  afterEach(() => sinon.restore());
});


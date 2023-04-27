const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/productModel');
const sinon = require('sinon');
const { expect } = require('chai');
const mock = require('../../mocks/products.mocks');



describe('Testando camada Models - Products', () => {
  it('Testando o retorno de SELECT de todos os produtos', async () => {
    sinon.stub(connection, 'execute').resolves([mock.resultsOfProducts]);

    const result = await productModel.getProduct();

    expect(result).to.be.deep.equal(mock.resultsOfProducts);
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


  afterEach(() => sinon.restore());
});


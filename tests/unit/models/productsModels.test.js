const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/productModel');
const sinon = require('sinon');
const { expect } = require('chai');
const mock = require('../../mocks/products.mocks');

describe('Testando camada Models - Products', () => {
  it('Testando o retorno de SELECT de todos os produtos', async () => {
    sinon.stub(connection, 'execute').resolves([mock.getProductsResult]);

    const result = await productModel.getProduct();

    expect(result).to.be.deep.equal(mock.getProductsResult);
  });


  it('Testando o retorno de SELECT produto por id', async () => {
    sinon.stub(connection, 'execute').resolves([mock.getProductsResult]);

    const result = await productModel.getProductById(1);

    expect(result).to.be.deep.equal(mock.getProductsResult);
  })

  it('Testando o retorno de INSERT de novo product', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);
    
  })

 afterEach(() => sinon.restore());
})


const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/salesModel');
const productModel = require('../../../src/models/productModel');
const mock = require('../../mocks/sales.mocks');
const sinon = require('sinon');
const { expect } = require('chai');



describe('Testando camada Models - Sales', () => {
  it('Testando o retorno de SELECT todas as vendas', async () => {
    sinon.stub(connection, 'execute').resolves([mock.resultsOfSales]);

    const result = await salesModel.getSales();

    expect(result[0]).to.have.property('saleId');
    expect(result[0]).to.have.property('date');
    expect(result[0]).to.have.property('productId');
    expect(result[0]).to.have.property('quantity');
  });

  it('Testando retorno do SELECT para um id de vendas', async () => {
    sinon.stub(connection, 'execute').resolves([mock.resultsSalesIdOne]);

    const result = await salesModel.getSalesById(1);

    expect(result).to.be.deep.equal([mock.resultsSalesIdOne]);
  });

  it('Testando o retorno do INSERT quando retorna com sucesso', async () => {
    sinon.stub(productModel, 'getProduct').resolves([1, 2, 3]);
    sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);

    const result = await salesModel.addSale([mock.addSale]);

    expect(result).to.be.equal(5);
  })

  afterEach(() => sinon.restore());
})

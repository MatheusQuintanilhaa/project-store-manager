const sinon = require('sinon');
const { expect } = require('chai');
const salesService = require('../../../src/services/salesService');
const salesModel = require('../../../src/models/salesModel');
const mock = require('../../mocks/sales.mocks');



describe('Testando  da camada Service - sales', () => {
  it('Testando se  a função addSale se funciona corretamente', async () => {
    sinon.stub(salesModel, 'addSale').resolves(5);

    const result = await salesService.addSale(mock.addSale);

    expect(result).to.be.deep.equal(mock.resultsFromSale);
  });

  it('Testando  a função getSales', async () => {
    sinon.stub(salesModel, 'getSales').resolves([mock.resultsOfSales]);

    const result = await salesService.getSales();

    expect(result).to.be.deep.equal([mock.resultsOfSales]);
  });

  it('Testando  a função getSalesById', async () => {
    sinon.stub(salesModel, 'getSalesById').resolves([mock.resultsSalesIdOne]);
    const result = await salesService.getSalesById(1);

    expect(result).to.be.equal(mock.resultsSalesIdOne);
  });

  afterEach(() => sinon.restore());
});

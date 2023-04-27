const sinon = require('sinon');
const { expect } = require('chai');
const chai = require('chai');
const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');
const mock = require('../../mocks/sales.mocks');
const sinonChai = require('sinon-chai');
const camelize = require('camelize');

chai.use(sinonChai);

describe('Testes da camada Controller - sales', () => {
  it('Testando a função addSale com dados válidos', async () => {
    sinon.stub(salesService, 'addSale').resolves(mock.resultsFromSale);

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.addSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(mock.resultsFromSale);
  });




it('deve retornar uma venda específica com um ID válido', async () => {
      const saleId = '123'; // ID válido para o teste
      const mockResult = { /* Dados fictícios da venda */ };

      sinon.stub(salesService, 'getSalesById').withArgs(saleId).resolves(mockResult);

      const req = {
        params: { id: saleId },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getSalesById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockResult);

      salesService.getSalesById.restore(); // Limpa o stub depois do teste
    });


  it('deve retornar um erro 404 para um ID inválido', async () => {
  const invalidSaleId = 'invalidId';

  sinon.stub(salesService, 'getSalesById').withArgs(invalidSaleId).resolves([]);

  const req = {
    params: { id: invalidSaleId },
  };
  const res = {};

  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();

  await salesController.getSalesById(req, res);

  expect(res.status).to.have.been.calledWith(404);
  expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
});



  it('Testando se a função getSales está funcionando corretamente', async () => {
    sinon.stub(salesService, 'getSales').resolves(mock.resultsOfSales);

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mock.resultsOfSales);
  });

  it('Testando se a função getSalesById está funcionando corretamente', async () => {
    sinon.stub(salesService, 'getSalesById').resolves(mock.resultsSalesIdOne
);

    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(camelize(mock.resultsSalesIdOne
));
  });

  it('Testando se  a função deleteSale está funcionando', async () => {
    sinon.stub(salesService, 'deleteSale').resolves({ type: null });

    const req = { params: { id: 1 } };
    const res = {};

    res.sendStatus = sinon.stub().returns(res);

    await salesController.deleteSale(req, res);

    expect(res.sendStatus).to.have.been.calledWith(204);
  });

  afterEach(() => sinon.restore());
});


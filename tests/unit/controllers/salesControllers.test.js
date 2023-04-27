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
  it('Testa a função addSale em caso de sucesso', async () => {
    sinon.stub(salesService, 'addSale').resolves(mock.resultFromAddSale);

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.addSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(mock.resultFromAddSale);
  });

  it('Testa a função addSale em caso de erro', async () => {
    sinon.stub(salesService, 'addSale').resolves({ type: 400, message: 'Deu erro' });

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.addSale(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: 'Deu erro' });
  });

  it('Testa a função getSales', async () => {
    sinon.stub(salesService, 'getSales').resolves(mock.resultFromGetSales);

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mock.resultFromGetSales);
  });

  it('Testa a função getSalesById', async () => {
    sinon.stub(salesService, 'getSalesById').resolves(mock.resultFromGetSalesIdOne);

    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(camelize(mock.resultFromGetSalesIdOne));
  });

  afterEach(() => sinon.restore());
});


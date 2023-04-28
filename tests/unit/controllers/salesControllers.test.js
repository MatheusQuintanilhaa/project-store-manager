const sinon = require('sinon');
const { expect } = require('chai');
const chai = require('chai');
const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');
const productService = require('../../../src/services/productService');
const mock = require('../../mocks/sales.mocks');
const sinonChai = require('sinon-chai');
const camelize = require('camelize');

chai.use(sinonChai);

describe('Testes da camada Controller - sales', () => {
  it('Testando a função addSale com dados válidos', async () => {
  const mockValidResult = {
    id: 1,
    product: 'Product 1',
    quantity: 10,
    total: 100.0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  sinon.stub(salesService, 'addSale').resolves(mockValidResult);

  const req = {
    body: {
      product: 'Product 1',
      quantity: 10,
      total: 100.0,
    },
  };
  const res = {};

  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();

  await salesController.addSale(req, res);

  expect(res.status).to.have.been.calledWith(201);
  expect(res.json).to.have.been.calledWith(mockValidResult);
});

it('deve retornar um erro 400 para uma requisição inválida', async () => {
  const mockInvalidResult = {
    type: 400,
    message: 'Bad Request',
  };

  sinon.stub(salesService, 'addSale').resolves(mockInvalidResult);

  const req = {
    body: {
      product: 'Product 1',
      quantity: -1,
      total: 100.0,
    },
  };
  const res = {};

  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns();

  await salesController.addSale(req, res);

  expect(res.status).to.have.been.calledWith(400);
  expect(res.json).to.have.been.calledWith({ message: 'Bad Request' });
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


  it('deve atualizar uma venda com sucesso', async () => {
  const req = {
    params: { id: 1 },
    body: {
      items: [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 1 },
      ]
    }
  };
  const res = { status: sinon.stub(), json: sinon.stub() };
  const expectedResult = { saleId: 1, itemsUpdated: req.body };

  sinon.stub(salesService, 'updateSale').resolves(expectedResult);
  res.status.returns(res);

  await salesController.updateSale(req, res);

  expect(res.status.calledWith(200)).to.be.true;
  expect(res.json.calledWith(expectedResult)).to.be.true;
  });





it('deve retornar status 204', async () => {
      const req = { params: { id: '123' } };
      const res = { sendStatus: sinon.spy() };

      salesService.deleteSale = sinon.stub().resolves({ type: null });

      await salesController.deleteSale(req, res);

      expect(res.sendStatus.calledWithExactly(204)).to.be.true;
    });

    it('deve retornar status 404 caso a venda não seja encontrada', async () => {
      const req = { params: { id: '123' } };
      const res = { status: sinon.stub().returns({ json: sinon.spy() }) };

      salesService.deleteSale = sinon.stub().resolves({ type: 404, message: 'Sale not found' });

      await salesController.deleteSale(req, res);

      expect(res.status.calledWithExactly(404)).to.be.true;
      expect(res.status().json.calledWithExactly({ message: 'Sale not found' })).to.be.true;
    });


  it('deve retornar status 200 e o objeto atualizado', async () => {
      const req = { params: { id: '123' }, body: [{ productId: '456', quantity: 2 }] };
      const res = { status: sinon.stub().returns({ json: sinon.spy() }) };

      salesService.updateSale = sinon.stub().resolves({ type: null });

      await salesController.updateSale(req, res);

      expect(res.status.calledWithExactly(200)).to.be.true;
      expect(res.status().json.calledWithExactly({ saleId: '123', itemsUpdated: req.body })).to.be.true;
    });

    it('deve retornar status 404 caso a venda não seja encontrada', async () => {
      const req = { params: { id: '123' }, body: [{ productId: '456', quantity: 2 }] };
      const res = { status: sinon.stub().returns({ json: sinon.spy() }) };

      salesService.updateSale = sinon.stub().resolves({ type: 404, message: 'Sale not found' });

      await salesController.updateSale(req, res);

      expect(res.status.calledWithExactly(404)).to.be.true;
      expect(res.status().json.calledWithExactly({ message: 'Sale not found' })).to.be.true;
    });

  afterEach(() => sinon.restore());
});


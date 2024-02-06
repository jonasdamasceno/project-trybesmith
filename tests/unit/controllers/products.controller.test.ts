import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productsMock from '../../mocks/products.mock';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import { ProductWithOutOrder } from '../../../src/types/Product';
import productsService from '../../../src/services/products.service';
import productsController from '../../../src/controller/products.controller'


chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  it('Testa a função createProductHandler da camada controller ', async function() {
    req.body = productsMock.ProductSuccesDB;
    const serviceResponse: ServiceResponse<ProductWithOutOrder> = {
      status: 'SUCCESFUL',
      data: productsMock.ProductSuccesCreated,
    }
    sinon.stub(productsService, 'createProductWithOrder').resolves(serviceResponse);
    await productsController.createProductHandler(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productsMock.ProductSuccesCreated);
  })
});
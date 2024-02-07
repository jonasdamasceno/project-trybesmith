import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import { OrderSequelizeModel } from '../../../src/database/models/order.model';
import ordersMock from '../../mocks/orders.mock';
import ordersService from '../../../src/services/orders.service';
import orderController from '../../../src/controller/order.controller';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Verifica se o controller Order retorna com sucesso', async function () {
    const successfulOrdersResponsee: ServiceResponse<
      OrderSequelizeModel[]
    > = {
      status: 'SUCCESFUL',
      data: ordersMock.AllOrdersMock,
    };
    sinon.stub(ordersService, "getOrderService").resolves(successfulOrdersResponsee);
    await orderController.getAllOrdersController  (req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(ordersMock.AllOrdersMock);
  });

});

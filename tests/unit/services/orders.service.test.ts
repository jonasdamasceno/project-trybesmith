import { expect } from 'chai';
import sinon from 'sinon';
import ordersMock from '../../mocks/orders.mock';
import OrderModel from '../../../src/database/models/order.model';
import OrderService from '../../../src/services/orders.service'

describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });
  it('testa o retorno da função getOrderService', async function () {
    sinon.stub(OrderModel, 'findAll').resolves(ordersMock.AllOrdersMock);
    const serviceResponse = await OrderService.getOrderService();
    expect(serviceResponse.status).to.deep.equal('SUCCESFUL');
  });
});

import { expect } from 'chai';
import sinon from 'sinon';
import ordersMock from '../../mocks/orders.mock';
import OrderModel from '../../../src/database/models/order.model';
import OrderService from '../../../src/services/orders.service'
import ProductModel from '../../../src/database/models/product.model';
import UserModel from '../../../src/database/models/user.model';
import ordersService from '../../../src/services/orders.service';

describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });
  it('testa o retorno da função getOrderService', async function () {
    sinon.stub(OrderModel, 'findAll').resolves(ordersMock.AllOrdersMock);
    const serviceResponse = await OrderService.getOrderService();
    expect(serviceResponse.status).to.deep.equal('SUCCESFUL');
  });
    it('should create a new order', async function () {
      sinon.stub(UserModel, 'findByPk').resolves({ id: 1 } as any);
      sinon
        .stub(OrderModel, 'create')
        .resolves({ get: () => ({ id: 99, userId: 1 }) } as any);
      sinon.stub(ProductModel, 'update').resolves({ id: 1 } as any);
      const order = await ordersService.newOrder([1, 2], 1);
      expect(order).to.be.deep.equal({ userId: 1, productIds: [1, 2] });
      expect(OrderModel.create).to.have.been.calledOnce;
      expect(ProductModel.update).to.have.been.calledTwice;
      expect(ProductModel.update).to.have.been.calledWith(
        { orderId: 99 },
        { where: { id: 1 } }
      );
      expect(UserModel.findByPk).to.have.been.calledOnce;
    });
});

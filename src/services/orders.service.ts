import { literal } from 'sequelize';
import OrderModel, {
  OrderSequelizeModel,
} from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';

const getOrderService = async (): Promise<ServiceResponse<OrderSequelizeModel[]>> => {
  const responseOrderModel = await OrderModel.findAll({
    attributes: [
      'id',
      'userId',
      [literal('JSON_ARRAYAGG(productIds.id)'), 'productIds'],
    ],
    include: [{ model: ProductModel, as: 'productIds', attributes: [] }],
    group: ['Order.id'],
    raw: true,
  });
  return { status: 'SUCCESFUL', data: responseOrderModel };
};

export default {
  getOrderService,
};

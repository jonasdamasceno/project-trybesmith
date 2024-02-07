import { literal } from 'sequelize';
import OrderModel, {
  OrderSequelizeModel,
} from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { OrderSchema } from '../utils/orderSchema';
import UserModel from '../database/models/user.model';

const getOrderService = async (): Promise<
ServiceResponse<OrderSequelizeModel[]>
> => {
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

const newOrder = async (
  productIds: Array<number>,
  userId: number,
): Promise<OrderSchema> => {
  const user = await UserModel.findByPk(userId);
  if (!user) throw new Error('404|"userId" not found');

  const { id } = (await OrderModel.create({ userId })).get();
  Promise.all(
    productIds.map(async (productId) =>
      ProductModel.update({ orderId: id }, { where: { id: productId } })),
  
  );

  return {
    userId,
    productIds,
  };
};

export default {
  getOrderService,
  newOrder,
};

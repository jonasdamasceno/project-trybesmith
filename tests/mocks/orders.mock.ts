import OrderModel from '../../src/database/models/order.model';

const AllOrdersMock = [
  OrderModel.build({
    id: 1,
    userId: 2,
    productIds: [1, 2],
  }),
];

const OrdersSerice = [
  {
    id: 1,
    userId: 2,
    productIds: [1, 2],
  },
];

export default {
  AllOrdersMock,
  OrdersSerice,
};

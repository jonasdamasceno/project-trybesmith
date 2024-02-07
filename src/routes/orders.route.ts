import { Router } from 'express';
import orderController from '../controller/order.controller';
import authMiddleware from '../middlewares/auth.middleware';
import ordersMiddleware from '../middlewares/orders.middleware';

const ordersRoute = Router();

ordersRoute.get('/', orderController.getAllOrdersController);
ordersRoute.post(
  '/',
  authMiddleware.authToken,
  ordersMiddleware.orderProductsValidate,
  ordersMiddleware.orderUserIdValidate,
  orderController.newOrder,
);

export default ordersRoute;

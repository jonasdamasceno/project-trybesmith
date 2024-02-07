import { Router } from 'express';
import orderController from '../controller/order.controller';

const ordersRoute = Router();

ordersRoute.get('/', orderController.getAllOrdersController);

export default ordersRoute;

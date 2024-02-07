import { Request, Response } from 'express';
import ordersService from '../services/orders.service';
import mapStatusHTTP from '../utils/statushttp';

const getAllOrdersController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const serviceResponse = await ordersService.getOrderService();
  const responseData = serviceResponse.data;
  const responseStatus = serviceResponse.status;
  res.status(mapStatusHTTP(responseStatus)).json(responseData);
};

const newOrder = async (req: Request, res: Response): Promise<void> => {
  const { productIds, userId } = req.body;
  const order = await ordersService.newOrder(productIds, userId);
  res.status(201).json(order);
};

export default {
  getAllOrdersController,
  newOrder,
};

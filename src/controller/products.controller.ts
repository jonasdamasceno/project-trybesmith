import { Request, Response } from 'express';
import productsService from '../services/products.service';
import mapStatusHTTP from '../utils/statushttp';

const createProductHandler = async (req: Request, res: Response): Promise<void> => {
  const createdProductResponse = await productsService.createProductWithOrder(req.body);
  const responseData = createdProductResponse.data;
  const responseStatus = createdProductResponse.status;
  res.status(mapStatusHTTP(responseStatus)).json(responseData);
};

const getAllProductsController = async (req: Request, res: Response): Promise<void> => {
  const serviceResponse = await productsService.getAllProducts();
  const responseData = serviceResponse.data;
  const responseStatus = serviceResponse.status;
  res.status(mapStatusHTTP(responseStatus)).json(responseData);
};

export { createProductHandler };

export default {
  createProductHandler,
  getAllProductsController,
};
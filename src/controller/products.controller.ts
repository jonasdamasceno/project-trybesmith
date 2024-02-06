import { Request, Response } from 'express';
import productsService from '../services/products.service';

const createProductHandler = async (req: Request, res: Response): Promise<void> => {
  const createdProductResponse = await productsService.createProductWithOrder(req.body);
  const responseData = createdProductResponse.data;

  res.status(201).json(responseData);
};

export { createProductHandler };

export default {
  createProductHandler,
};
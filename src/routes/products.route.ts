import { Router } from 'express';
import productsController, { createProductHandler } from '../controller/products.controller';
import validadeProductName from '../middlewares/validateProductName';
import validateProductPrice from '../middlewares/validateProductPrice';

const productsRoute = Router();

productsRoute.post('/', validadeProductName, validateProductPrice, createProductHandler);
productsRoute.get('/', productsController.getAllProductsController);

export default productsRoute;
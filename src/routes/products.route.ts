import { Router } from 'express';
import productsController, { createProductHandler } from '../controller/products.controller';

const productsRoute = Router();

productsRoute.post('/', createProductHandler);
productsRoute.get('/', productsController.getAllProductsController);

export default productsRoute;
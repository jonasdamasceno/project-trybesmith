import { Router } from 'express';
import { createProductHandler } from '../controller/products.controller';

const productsRoute = Router();

productsRoute.post('/', createProductHandler);

export default productsRoute;
// import { Optional } from 'sequelize';
import { ServiceResponse } from '../types/ServiceResponse';
import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
// import { Product } from '../types/Product';

type ProductWithOrder = {
  id: number,
  price: string,
  name: string
};
const createProductWithOrder = async (product: 
ProductInputtableTypes): Promise<ServiceResponse<ProductWithOrder>> => {
  const { dataValues: { id, name, price } } = await ProductModel.create(product);
  return { status: 'SUCCESFUL', data: { id, name, price } };
};

export default {
  createProductWithOrder,
};
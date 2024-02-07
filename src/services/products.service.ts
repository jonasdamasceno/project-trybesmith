import { ServiceResponse } from '../types/ServiceResponse';
import ProductModel, { 
  ProductInputtableTypes, 
  ProductSequelizeModel, 
} from '../database/models/product.model';
import { ProductWithOutOrder } from '../types/Product';

const createProductWithOrder = async (product: 
ProductInputtableTypes): Promise<ServiceResponse<ProductWithOutOrder>> => {
  const { dataValues: { id, name, price } } = await ProductModel.create(product);
  return { status: 'CREATED', data: { id, name, price } };
};

const getAllProducts = async (): Promise<ServiceResponse<ProductSequelizeModel[]>> => {
  const servicerResponse = await ProductModel.findAll();
  return { status: 'SUCCESFUL', data: servicerResponse };
};

export default {
  createProductWithOrder,
  getAllProducts,
};
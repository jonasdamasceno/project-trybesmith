import ProductModel from "../../src/database/models/product.model";
import { Product } from "../../src/types/Product";

const ProductSuccesDB: Product = {
  id: 6,
  name: "Martelo de Thor",
  price: "30 peças de ouro",
  orderId: 4,
};

const ProductSuccesCreated = {
  id: 6,
  name: "Martelo de Thor",
  price: "30 peças de ouro",
  orderId: 4,
};

const allProductsMock = [
  ProductModel.build( 
  {
    "id": 1,
    "name": "Excalibur",
    "price": "10 peças de ouro",
    "orderId": 1
  },
  )
]

export default {
  ProductSuccesDB,
  ProductSuccesCreated,
  allProductsMock
}
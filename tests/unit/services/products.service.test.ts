import { expect } from 'chai';
import sinon from 'sinon';
import productsService from '../../../src/services/products.service';
import productsMock from '../../mocks/products.mock';
import ProductModel from '../../../src/database/models/product.model';


describe('ProductsService', function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('Testa se é possivel cadastrar um produto com sucesso', async function () {
    const exampleProductData = productsMock.ProductSuccesDB;
    const mockCreate = ProductModel.build(exampleProductData);
    sinon.stub(ProductModel, 'create').resolves(mockCreate);
    const serviceResponse = await productsService.createProductWithOrder(
      exampleProductData
    );
    expect(serviceResponse.status).to.deep.equal('CREATED');
  });
  it('testa se é possivel listar todos produtos', async function () {
    sinon.stub(ProductModel, 'findAll').resolves(productsMock.allProductsMock);
    const serviceResponse = await productsService.getAllProducts();
    expect(serviceResponse.status).to.deep.equal('SUCCESFUL');
  });
});

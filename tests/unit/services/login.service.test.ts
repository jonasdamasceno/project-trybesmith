import { expect } from 'chai';
import sinon from 'sinon';
import loginMock from '../../mocks/login.mock';
import UserModel from '../../../src/database/models/user.model';
import loginService from '../../../src/services/login.service';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });
it('testa se ao nao receber um username retorna um erro', async function () {
  const parameters = loginMock.LoginWithOutUsername;
  const serviceResponse = await loginService.validateLoginService(parameters);
  expect(serviceResponse.status).to.deep.equal('INVALID_DATA');
  expect(serviceResponse.data).to.deep.equal({
    message: '"username" and "password" are required',
  });
});
it('testa a messagem de erro se o passaword nao for fornecido', async function () {
  const parameters = loginMock.LoginWithOutPassword;
  const serviceResponse = await loginService.validateLoginService(parameters);
  expect(serviceResponse.status).to.deep.equal('INVALID_DATA');
  expect(serviceResponse.data).to.deep.equal({
    message: '"username" and "password" are required',
  });
});
it('testa a messagem de erro ao receber um usuario invalido', async function () {
  const parameters = loginMock.BodyLoginUsernameNotExist;
  sinon.stub(UserModel, 'findAll').resolves([]);
  const serviceResponse = await loginService.validateLoginService(parameters);
  expect(serviceResponse.status).to.deep.equal('UNAUTHORIZED');
  expect(serviceResponse.data).to.deep.equal({
    message: 'Username or password invalid',
  });
});
it('testa a messagem de erro se for fornecido um password incorreto', async function () {
  const parameters = loginMock.BodyLoginWrongPassword;
  const user = UserModel.build(loginMock.userExist);
  sinon.stub(UserModel, 'findAll').resolves([user]);
  const serviceResponse = await loginService.validateLoginService(parameters);
  expect(serviceResponse.status).to.deep.equal('UNAUTHORIZED');
  expect(serviceResponse.data).to.deep.equal({
    message: 'Username or password invalid',
  });
});
it('testa se o login é efetuado se forem fornecidos usuario e senha corretas', async function () {
  //arrange
  const parameters = loginMock.validLoginBody;
  const user = UserModel.build(loginMock.userExist);
  sinon.stub(UserModel, 'findAll').resolves([user]);
  //act
  const serviceResponse = await loginService.validateLoginService(parameters);
  //assert  
  expect(serviceResponse.status).to.deep.equal('SUCCESFUL');
  expect(serviceResponse.data).to.have.key('token');
});
});

import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginMock from '../../mocks/login.mock';
import loginService from '../../../src/services/login.service';
import loginController from '../../../src/controller/login.controller';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import { Token } from '../../../src/types/Token';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;
    const emptyPasswordOrUsername = {
      message: '"username" and "password" are required',
    };
    const wrongPasswordOrUsername = { message: 'Username or password invalid' };

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
it('testa se retorna um erro ao nao receber o name', async function () {
  req.body = loginMock.LoginWithOutUsername;
  const serviceResponse: ServiceResponse<Token> = {
    status: 'INVALID_DATA',
    data: emptyPasswordOrUsername,
  };
  sinon.stub(loginService, 'validateLoginService').resolves(serviceResponse);
  await loginController.loginUser(req, res);
  expect(res.status).to.have.been.calledWith(400);
  expect(res.json).to.have.been.calledWith(emptyPasswordOrUsername);
});
it('teste de ao nao receber o passaword retorna um erro', async function () {
  req.body = loginMock.LoginWithOutPassword;
  const serviceResponse: ServiceResponse<Token> = {
    status: 'INVALID_DATA',
    data: emptyPasswordOrUsername,
  };
  sinon.stub(loginService, 'validateLoginService').resolves(serviceResponse);
  await loginController.loginUser(req, res);
  expect(res.status).to.have.been.calledWith(400);
  expect(res.json).to.have.been.calledWith(emptyPasswordOrUsername);
});
it('testa se ao receber um username invalido retorna um erro', async function () {
  req.body = loginMock.BodyLoginUsernameNotExist;
  const serviceResponse: ServiceResponse<Token> = {
    status: 'UNAUTHORIZED',
    data: wrongPasswordOrUsername,
  };
  sinon.stub(loginService, 'validateLoginService').resolves(serviceResponse);
  await loginController.loginUser(req, res);
  expect(res.status).to.have.been.calledWith(401);
  expect(res.json).to.have.been.calledWith(wrongPasswordOrUsername);
});
it('Ao nao receber um username invalido retorna um erro', async function () {
  //arrange
  req.body = loginMock.BodyLoginUsernameNotExist;
  const serviceResponse: ServiceResponse<Token> = {
    status: 'UNAUTHORIZED',
    data: wrongPasswordOrUsername,
  };
  sinon.stub(loginService, 'validateLoginService').resolves(serviceResponse);
  //act
  await loginController.loginUser(req, res);
  //assert
  expect(res.status).to.have.been.calledWith(401);
  expect(res.json).to.have.been.calledWith(wrongPasswordOrUsername);
});

it('testa se ao receber uma senha invaalida retorna um erro', async function () {
  req.body = loginMock.BodyLoginWrongPassword;
  const serviceResponse: ServiceResponse<Token> = {
    status: 'UNAUTHORIZED',
    data: wrongPasswordOrUsername,
  };
  sinon.stub(loginService, 'validateLoginService').resolves(serviceResponse);
  await loginController.loginUser(req, res);
  expect(res.status).to.have.been.calledWith(401);
  expect(res.json).to.have.been.calledWith(wrongPasswordOrUsername);
});
it('Ao nao receber uma senha invalida retorna um erro', async function () {
  req.body = loginMock.validLoginBody;
  const serviceResponse: ServiceResponse<Token> = {
    status: 'SUCCESFUL',
    data: { token: '1234123124123' },
  };
  sinon.stub(loginService,  'validateLoginService').resolves(serviceResponse);
  await loginController.loginUser(req, res);
  expect(res.status).to.have.been.calledWith(200);
  expect(res.json).to.have.been.calledWith({ token: '1234123124123' });
});
});

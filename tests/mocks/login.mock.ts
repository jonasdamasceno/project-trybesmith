import { User } from "../../src/types/User";

const LoginWithOutUsername = {
  username: '',
  password: 'terrível',
};

const LoginWithOutPassword = {
  username: 'Hagar',
  password: '',
};

const BodyLoginUsernameNotExist = { username: 'Leonardo', password: '1234' };

const BodyLoginWrongPassword = {
  username: 'Hagar',
  password: '1234',
};

const passwordCrypt =
  '$2a$10$6kO2/X2Caw6EXZUV/4x60.88HjNX/TPshlF7ITt06EoDU824tkVbS';

const userExist: User = {
  id: 1,
  username: 'Hagar',
  vocation: 'Guerreiro',
  level: 10,
  password: passwordCrypt,
};

const validLoginBody = {
  username: 'Hagar',
  password: 'terrível',
};

export default {
  LoginWithOutUsername,
  LoginWithOutPassword,
  BodyLoginUsernameNotExist,
  BodyLoginWrongPassword,
  userExist,
  validLoginBody,
};

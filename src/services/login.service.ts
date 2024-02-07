import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { Token } from '../types/Token';
import { Login } from '../types/User';
import jwtService from '../utils/token';

const validateLoginService = async ({ username, password }: Login):
Promise<ServiceResponse<Token>> => {
  if (!username || !password) {
    return {
      status: 'INVALID_DATA',
      data: { message: '"username" and "password" are required' },
    };
  }
  const [userExist] = await UserModel.findAll({ where: { username } });

  if (
    !userExist || !bcrypt.compareSync(password, userExist.dataValues.password)
  ) {
    return {
      status: 'UNAUTHORIZED',
      data: { message: 'Username or password invalid' },
    };
  }
  const token = jwtService.sign({ username, id: userExist.dataValues.id });
  return { status: 'SUCCESFUL', data: { token } };
};

export default {
  validateLoginService,
};

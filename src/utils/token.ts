import jwt from 'jsonwebtoken';
import { TokenPayload } from '../types/login';

const secret = process.env.JWT_SECRET || 'secret';

const sign = (payload: TokenPayload): string => {
  const token = jwt.sign(payload, secret);
  return token;
};

const verify = (token: string): TokenPayload => {
  const data = jwt.verify(token, secret) as TokenPayload;
  return data;
};

export default {
  sign,
  verify,
};

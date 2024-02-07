import { RequestHandler } from 'express';
import tokenUtils from '../utils/token';

const extractToken = (baererToken: string) => baererToken.split(' ')[1];

const authToken: RequestHandler = (req, res, next) => {
  const baererToken = req.header('Authorization');
  if (!baererToken) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const token = extractToken(baererToken);
  try {
    tokenUtils.verify(token);
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default {
  authToken,
};

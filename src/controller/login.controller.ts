import { Request, Response } from 'express';
import loginService from '../services/login.service';
import mapStatusHTTP from '../utils/statushttp';

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const validationResponse = await loginService.validateLoginService(req.body);
  const statusCode = mapStatusHTTP(validationResponse.status);

  res.status(statusCode).json(validationResponse.data);
};

export default {
  loginUser,
};

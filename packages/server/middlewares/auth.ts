import type { Request, Response } from 'express';
import { errorMessage } from '../utils/messageHelper';
import { COOKIE_AUTH_NAME } from '../config/contants';

const verifyUser = (req: Request, res: Response, next: () => void): any => {
  const cookie = req.cookies[COOKIE_AUTH_NAME];

  if (!cookie) {
    return res.status(403).send(errorMessage('Пользователь не авторизован'));
  }

  next();
};

export {
  verifyUser
}

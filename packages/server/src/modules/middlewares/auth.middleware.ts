import type { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import { COOKIE_AUTH_NAME, UUID } from '../../constants/cookie';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authCookie = req.cookies[COOKIE_AUTH_NAME];
    const uuid = req.cookies?.uuid;

    if (!authCookie || !uuid) {
      res.status(401).clearCookie(COOKIE_AUTH_NAME).clearCookie(UUID).json({ error: 'authenticate error' });
      return;
    }

    const result = await axios.get('https://ya-praktikum.tech/api/v2/auth/user', {
      headers: {
        Cookie: `${COOKIE_AUTH_NAME}=${authCookie};${UUID}=${uuid}`,
        withCredentials: true,
      },
    });

    req.body.userId = result.data.id;

    next();
  } catch (error) {
    console.error('[Error] authMiddleware:', error);
    next(error);
  }
};

export default authMiddleware;

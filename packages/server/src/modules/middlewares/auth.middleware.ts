import type { NextFunction, Request, Response } from 'express';
import axios from 'axios';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authCookie = req.cookies?.authCookie;
    const uuid = req.cookies?.uuid;

    if (!authCookie || !uuid) {
      res.status(401).clearCookie('authCookie').clearCookie('uuid').json({ error: 'authenticate error' });
      return;
    }

    const result = await axios.get('https://ya-praktikum.tech/api/v2/auth/user', {
      headers: {
        Cookie: `authCookie=${authCookie};uuid=${uuid}`,
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

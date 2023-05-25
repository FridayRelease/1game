import type { Request, Response } from 'express';
import { User } from '../models/user';

/**
 * Пример запроса
 * curl -X POST -H "Content-Type: application/json" -d '{"first_name":"John","last_name":"Doe","email":"johndoe@email.com"}' http://localhost:3001/api/v1/users
 */
export const userCreate = async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(200).send(user.id);
};

/*
export const userGet = async (req: Request, res: Response) => {
  console.log('userGet: get all users');
};

export const userRead = async (req: Request, res: Response) => {
  console.log('userRead: get user by PK');
  console.log('req.params.id: ', req.params.id);
};

export const userUpdate = async (req: Request, res: Response) => {
  console.log('userUpdate');
};

export const userDelete = async (req: Request, res: Response) => {
  console.log('userDelete');
};
*/

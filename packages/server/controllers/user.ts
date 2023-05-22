import type { Request, Response } from 'express';
import { User } from '../models/user';

export const userCreate = async (req: Request, res: Response) => {
  console.log('userInsert req.body: ', req.body);

  const user = await User.create(req.body);
  console.log('user.id: ', user.id);

  res.status(200).send(req.body); // вместо req.body возвращать user.id
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

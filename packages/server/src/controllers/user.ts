import type { Request, Response } from 'express';
import { User } from '../models/user';
import type { RequestWithId } from 'request';

/**
 * Пример запроса
 * curl -X POST -H "Content-Type: application/json" -d '{"first_name":"John","last_name":"Doe","email":"johndoe@email.com"}' http://localhost:3001/api/v1/users
 */
export const userCreate = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json({ id: user.dataValues.id.toString() });
  } catch (error) {
    return res.status(200).json({ message: 'error' });
  }
};

export const userGet = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    // TODO: сделать пагинацию
    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).json({ message: 'error', error: e });
  }
};

export const userRead = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'error', error: 'User not found' });
    }

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).json({ message: 'error', error: error });
  }
};

export const userUpdate = async (req: Request<RequestWithId>, res: Response) => {
  try {
    const { id } = req.params;
    const userUpdated = await User.update(req.body, {
      where: { id },
    });

    if (userUpdated) {
      const user = await User.findByPk(id);
      return res.status(200).json(user);
    }

    return res.status(404).json({ message: 'error', error: 'User not found' });
  } catch (error) {
    return res.status(500).json({ message: 'error', error: error });
  }
};

export const userDelete = async (req: Request<RequestWithId>, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.destroy({
      where: { id },
    });

    if (user) {
      return res.status(200).json({ message: 'User deleted' });
    }

    return res.status(404).json({ message: 'error', error: 'User not found' });
  } catch (error) {
    return res.status(500).json({ message: 'error', error: error });
  }
};

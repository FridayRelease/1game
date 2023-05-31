import type { Request, Response } from 'express';
import { UserConfig } from '../models/user-config';
import type { RequestWithId } from 'request';
import { User } from '../models/user';

/**
 * Пример запроса
 * curl -X POST -H "Content-Type: application/json" -d '{"current_theme":"ligth","user_id":2}' http://localhost:3001/api/v1/user-configs
 */
export const userConfigCreate = async (req: Request, res: Response) => {
  try {
    let userConfig = await UserConfig.findOne({ where: { user_id: req.body.user_id } });

    // Если для пользоватля существует когнфиг то обновляем его.
    if (userConfig) {
      await UserConfig.update(req.body, { where: { id: userConfig.id } });
      userConfig = await UserConfig.findOne({ where: { user_id: req.body.user_id } });
      return res.status(200).json(userConfig);
    }

    const userConfigCreate = await UserConfig.create(req.body);
    return res.status(201).json({ id: userConfigCreate.dataValues.id.toString() });
  } catch (error) {
    return res.status(200).json({ message: 'error' });
  }
};

export const userConfigGet = async (_req: Request, res: Response) => {
  try {
    const userConfigs = await UserConfig.findAll({
      include: {
        model: User,
        attributes: ['id', 'first_name', 'last_name', 'display_name', 'email', 'avatar'],
      },
    });
    return res.status(200).json(userConfigs);
  } catch (e) {
    return res.status(500).json({ message: 'error', error: e });
  }
};

export const userConfigRead = async (req: Request, res: Response) => {
  try {
    const userConfig = await UserConfig.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: ['id', 'first_name', 'last_name', 'display_name', 'email', 'avatar'],
      },
    });

    if (!userConfig) {
      return res.status(404).json({ message: 'error', error: 'UserConfig not found' });
    }

    return res.status(200).send(userConfig);
  } catch (error) {
    return res.status(500).json({ message: 'error', error: error });
  }
};

export const userConfigUpdate = async (req: Request<RequestWithId>, res: Response) => {
  try {
    const { id } = req.params;
    const userConfigUpdated = await UserConfig.update(req.body, {
      where: { id },
    });

    if (userConfigUpdated) {
      const userConfig = await UserConfig.findByPk(id, {
        include: {
          model: User,
          attributes: ['id', 'first_name', 'last_name', 'display_name', 'email', 'avatar'],
        },
      });
      return res.status(200).json(userConfig);
    }

    return res.status(404).json({ message: 'error', error: 'UserConfig not found' });
  } catch (error) {
    return res.status(500).json({ message: 'error', error: error });
  }
};

export const userConfigDelete = async (req: Request<RequestWithId>, res: Response) => {
  try {
    const { id } = req.params;
    const userConfig = await UserConfig.destroy({
      where: { id },
    });

    if (userConfig) {
      return res.status(200).json({ message: 'UserConfig deleted' });
    }

    return res.status(404).json({ message: 'error', error: 'UserConfig not found' });
  } catch (error) {
    return res.status(500).json({ message: 'error', error: error });
  }
};

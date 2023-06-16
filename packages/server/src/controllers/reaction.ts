import type { Request, Response } from 'express';
import { Reaction } from '../models/reaction';
import { errorMessage } from '../../utils/messageHelper';
import { MESSAGE } from '../constants/message';

export const reactionCreate = async (req: Request, res: Response) => {
  try {
    const topic = await Reaction.create(req.body);
    return res.status(201).json(topic.dataValues);
  } catch (error) {
    return res.status(500).json(errorMessage(error));
  }
};

export const reactionUpdate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const topicUpdated = await Reaction.update(req.body, {
      where: { id },
    });

    if (topicUpdated) {
      const topic = await Reaction.findByPk(id);
      return res.status(200).json(topic);
    }

    return res.status(500).json(errorMessage(MESSAGE.FAILED_UPDATE));
  } catch (error) {
    return res.status(500).json(errorMessage(error));
  }
};

export const reactionDelete = async (req: Request, res: Response) => {
  try {
    const topic = await Reaction.destroy();

    console.log(req.body);
    return res.status(201).json(topic);
  } catch (error) {
    return res.status(500).json(errorMessage(error));
  }
};

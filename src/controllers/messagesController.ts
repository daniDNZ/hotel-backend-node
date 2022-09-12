import { delay } from '../assets/functions';
import IMessage from '../interfaces/IMessage';
import { Request, Response, NextFunction } from 'express';
import messageDataJSON from '../data/messages.json';

const messagesData: any = messageDataJSON;

const messagesController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const messages: IMessage[] = await delay(messagesData, 500);
      return messages
        ? res.json(messages)
        : res.status(404).json({ status: res.statusCode, message: 'Not Found' });

    } catch (error) {
      next(error);
    }
  },
  show: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const message: IMessage = await delay(
        messagesData.find((r: IMessage) => r.id === Number(req.params.id)),
        500);

      return message
        ? res.json(message)
        : res.status(404).json({ status: res.statusCode, message: 'Not Found' });

    } catch (error) {
      next(error);
    }
  },
  store: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      return Object.keys(data).length > 0
        ? res.status(201).json({ status: res.statusCode, message: 'Success' })
        : res.status(400).json({ status: res.statusCode, message: 'No body' })
    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body
      const message: IMessage = await delay(
        messagesData.find((r: IMessage) => r.id === Number(req.params.id)),
        500);

      if (Object.keys(data).length === 0) {
        return res.status(400).json({ status: res.statusCode, message: 'No body' })
      }
      return message
        ? res.sendStatus(204)
        : res.status(404).json({ status: res.statusCode, message: 'Not Found' });


    } catch (error) {
      next(error);
    }
  },
  destroy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const message: IMessage = await delay(
        messagesData.find((r: IMessage) => r.id === Number(req.params.id)),
        500);

      return message
        ? res.sendStatus(204)
        : res.status(404).json({ status: res.statusCode, message: 'Not Found' });

    } catch (error) {
      next(error);
    }
  }
}

export default messagesController;

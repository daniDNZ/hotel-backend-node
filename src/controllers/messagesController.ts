import { Request, Response, NextFunction } from 'express';
import { Message } from '../db/schemas';

const messagesController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const messages = await Message.find().exec();

      if (messages.length > 0) {
        return res.json({ messages });
      } else {
        return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
      }
    } catch (error) {
      next(error);
    }
  },
  show: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const message = await Message.find()
        .where("_id")
        .equals(req.params.id)
        .exec();

      if (message.length > 0) {
        return res.json({ message });
      } else {
        return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
      }
    } catch (error) {
      next(error);
    }
  },
  store: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newMessage = new Message(req.body);
      const message = [await newMessage.save()];
      if (message.length > 0) {
        return res.json({ message });
      } else {
        return res.status(400).json({ status: res.statusCode, message: 'Wrong Data' });
      }

    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const message = await Message.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
      if (message) return res.json({ message });
      return res.status(404).json({ status: res.statusCode, message: 'Not Found' });

    } catch (error) {
      next(error);
    }
  },
  destroy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bdResponse = await Message.deleteOne({ _id: req.params.id });
      if (bdResponse.deletedCount > 0) return res.status(204).json({ status: res.statusCode, message: 'Deleted' });
      return res.status(404).json({ status: res.statusCode, message: 'Not Found' });

    } catch (error) {
      next(error);
    }
  }
}

export default messagesController;

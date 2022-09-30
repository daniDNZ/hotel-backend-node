import { Request, Response, NextFunction } from 'express';
import { Room } from '../db/schemas';

const roomsController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rooms = await Room.find().exec();

      if (rooms.length > 0) {
        return res.json({ rooms });
      } else {
        return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
      }
    } catch (error) {
      next(error);
    }
  },
  show: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const room = await Room.find()
        .where("_id")
        .equals(req.params.id)
        .exec();

      if (room.length > 0) {
        return res.json({ room });
      } else {
        return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
      }
    } catch (error) {
      next(error);
    }
  },
  store: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newRoom = new Room(req.body);
      const room = [await newRoom.save()];
      if (room.length > 0) {
        return res.json({ room });
      } else {
        return res.status(400).json({ status: res.statusCode, message: 'Wrong Data' });
      }

    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const room = await Room.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
      if (room) return res.json({ room });
      return res.status(404).json({ status: res.statusCode, message: 'Not Found' });

    } catch (error) {
      next(error);
    }
  },
  destroy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bdResponse = await Room.deleteOne({ _id: req.params.id });
      if (bdResponse.deletedCount > 0) return res.status(204).json({ status: res.statusCode, message: 'Deleted' });
      return res.status(404).json({ status: res.statusCode, message: 'Not Found' });

    } catch (error) {
      next(error);
    }
  }
}

export default roomsController;

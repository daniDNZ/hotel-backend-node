import { Request, Response, NextFunction } from 'express';
import { Room } from '../db/schemas';

const roomsController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = Room.find();
      query.exec((err, rooms) => {
        if (err) {
          return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
        }
        return res.json({ rooms });
      })
    } catch (error) {
      next(error);
    }
  },
  show: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = Room.find()
        .where("_id")
        .equals(req.params.id);

      query.exec((err, room) => {
        if (err) {
          return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
        }
        return res.json({ room });
      })

    } catch (error) {
      next(error);
    }
  },
  store: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newRoom = new Room(req.body);
      newRoom.save((err, room) => {
        if (err) {
          res.status(400).json({ status: res.statusCode, message: 'Wrong Data' })
        }
        return res.json({ room });
      });
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

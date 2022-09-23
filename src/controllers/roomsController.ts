import { Request, Response, NextFunction } from 'express';
import { dbQuery } from '../database/mysqlConnection';
import Joi from 'joi';
import { Console } from 'console';

const roomSchema = Joi.object({
  type: Joi.string().max(255).required(),
  number: Joi.string().max(255).required(),
  price: Joi.number().required(),
  amenities: Joi.array().items(Joi.string()).required(),
  description: Joi.string().max(512),
  offer: Joi.boolean(),
  discount: Joi.number(),
  cancellation: Joi.string().max(512)
});

const roomsController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query: string = `SELECT * FROM rooms;`;
      const results: Array<any> = await dbQuery(query);
      if (results.length === 0) {
        return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
      }
      return res.json({ results })
    } catch (error) {
      next(error);
    }
  },
  show: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId: Number = Number(req.params.id);
      const results: Array<any> = await dbQuery('SELECT * FROM rooms WHERE id = ? ;', [roomId]);
      if (results.length === 0) {
        return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
      }
      return res.json({ results: results[0] });

    } catch (error) {
      next(error);
    }
  },
  store: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const booking = [
        req.body.type,
        req.body.number,
        req.body.price,
        JSON.stringify(req.body.amenities),
        req.body.description,
        req.body.offer,
        req.body.discount,
        req.body.cancellation
      ];
      const rooms = req.body.rooms
      const { error } = roomSchema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({ status: res.statusCode, message: error });
      }
      const query: string = 'INSERT INTO rooms (type, number, price, amenities, description, offer, discount, cancellation) VALUES (?);';
      const results: any = await dbQuery(query, [booking]);

      return res.status(201).json({ status: res.statusCode, message: 'Success' });
    } catch (error) {
      console.log(error)
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const room = req.body;
      const roomId: Number = Number(req.params.id);
      const { error } = roomSchema.validate(room, { abortEarly: false });
      if (error) {
        return res.status(400).json({ status: res.statusCode, message: 'Bad data' });
      }
      const query: string = `UPDATE rooms 
        SET type = ?, number = ?, price = ?, amenities = ?, description = ?, offer = ?, discount = ?, cancellation = ?
        WHERE id = ? ;`;
      const results: any = await dbQuery(query,
        [
          room.type,
          room.number,
          room.price,
          JSON.stringify(room.amenities),
          room.description,
          room.offer,
          room.discount,
          room.cancellation,
          roomId
        ]);

      return res.status(201).json({ status: res.statusCode, message: 'Success' });
    } catch (error) {
      console.error(error)
      next(error);
    }
  },
  destroy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId: Number = Number(req.params.id);
      const results: Array<any> = await dbQuery('DELETE FROM rooms WHERE id = ?', [roomId]);

      return res.status(204).json({ status: res.statusCode, message: 'Success' });
    } catch (error) {
      next(error);
    }
  }
}

export default roomsController;

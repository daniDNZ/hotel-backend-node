import { Request, Response, NextFunction } from 'express';
import connection, { dbQuery } from '../database/mysqlConnection';
import Joi from 'joi';

const bookingSchema = Joi.object({
  fullName: Joi.string().max(255).required(),
  checkIn: Joi.date().required(),
  checkOut: Joi.date().required(),
  orderDate: Joi.date().required(),
  specialRequest: Joi.string().max(511),
  status: Joi.string().valid("checkin", "checkout", "inprogress"),
  price: Joi.number().required(),
  rooms: Joi.array().items(Joi.number())
});

const bookingsController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query: string =
        `SELECT b.*, r.type AS room FROM bookings b 
        INNER JOIN bookings_rooms br ON b.id = br.bookingId 
        INNER JOIN rooms r ON br.roomId = r.id
      ;`
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
      const bookingId: Number = Number(req.params.id);
      const results: Array<any> = await dbQuery('SELECT * FROM bookings WHERE id = ?', [bookingId]);
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
        req.body.fullName,
        req.body.checkIn,
        req.body.checkOut,
        req.body.orderDate,
        req.body.specialRequest,
        req.body.status,
        req.body.price,
      ];
      const rooms = req.body.rooms
      const { error } = bookingSchema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({ status: res.statusCode, message: 'Bad data' });
      }
      const results: any = await dbQuery('INSERT INTO bookings (fullName, checkIn, checkOut, orderDate, specialRequest, status, price) VALUES (?)', [booking]);
      rooms.forEach(async (room: Number) => {
        const bookingsRoomsResults = await dbQuery('INSERT INTO bookings_rooms (roomId, bookingId) VALUES (?, ?)', [room, results.insertId]);
      });

      return res.status(201).json({ status: res.statusCode, message: 'Success' });
    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const booking = req.body;
      const { error } = bookingSchema.validate(booking, { abortEarly: false });
      if (error) {
        return res.status(400).json({ status: res.statusCode, message: 'Bad data' });
      }
      const results: any = await dbQuery('UPDATE bookings SET fullName = ?, checkIn = ?, checkOut = ?, orderDate = ?, specialRequest = ?, status = ?, price = ? WHERE id = ?',
        [
          booking.fullName,
          booking.checkIn,
          booking.checkOut,
          booking.orderDate,
          booking.specialRequest,
          booking.status,
          booking.price,
          req.params.id
        ]);

      return res.status(201).json({ status: res.statusCode, message: 'Success' });
    } catch (error) {
      next(error);
    }
  },
  destroy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookingId: Number = Number(req.params.id);
      const results: Array<any> = await dbQuery('DELETE FROM bookings WHERE id = ?', [bookingId]);

      return res.status(204).json({ status: res.statusCode, message: 'Success' });
    } catch (error) {
      next(error);
    }
  }
}


export default bookingsController;

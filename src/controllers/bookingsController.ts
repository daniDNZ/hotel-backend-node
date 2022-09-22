import { delay } from '../assets/functions';
import IBooking from '../interfaces/IBooking';
import { Request, Response, NextFunction } from 'express';
import bookingsDataJSON from '../data/bookings.json';
import connection from '../database/mysqlConnection';

const bookingsData: any = bookingsDataJSON;

const bookingsController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      connection.query('SELECT * FROM bookings', (error, rows, fields) => {

        res.json(rows);
      })

    } catch (error) {
      next(error);
    }
  },
  show: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const booking: IBooking = await delay(
        bookingsData.find((r: IBooking) => r.id === Number(req.params.id)),
        500);

      return booking
        ? res.json(booking)
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
      const booking: IBooking = await delay(
        bookingsData.find((r: IBooking) => r.id === Number(req.params.id)),
        500);

      if (Object.keys(data).length === 0) {
        return res.status(400).json({ status: res.statusCode, message: 'No body' })
      }
      return booking
        ? res.sendStatus(204)
        : res.status(404).json({ status: res.statusCode, message: 'Not Found' });


    } catch (error) {
      next(error);
    }
  },
  destroy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const booking: IBooking = await delay(
        bookingsData.find((r: IBooking) => r.id === Number(req.params.id)),
        500);

      return booking
        ? res.sendStatus(204)
        : res.status(404).json({ status: res.statusCode, message: 'Not Found' });

    } catch (error) {
      next(error);
    }
  }
}

export default bookingsController;

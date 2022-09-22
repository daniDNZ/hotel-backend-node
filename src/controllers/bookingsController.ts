import { Request, Response, NextFunction } from 'express';
import connection from '../database/mysqlConnection';

const bookingsController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      connection.query('SELECT * FROM bookings', (error, rows, fields) => {
        if (rows.length === 0) {
          return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
        }

        return res.json(rows);
      });

    } catch (error) {
      next(error);
    }
  },
  show: async (req: Request, res: Response, next: NextFunction) => {
    try {
      connection.query('SELECT * FROM bookings WHERE id = ?', [req.params.id], (error, rows, fields) => {
        if (rows.length === 0) {
          return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
        }

        return res.json(rows);
      });

    } catch (error) {
      next(error);
    }
  },
  store: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const booking = req.body;
      if (Object.keys(booking).length === 0) {
        return res.status(400).json({ status: res.statusCode, message: 'No body' });
      }
      connection.query('INSERT INTO bookings (fullName, checkIn, checkOut, orderDate, specialRequest, status, price) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [booking.fullName, booking.checkIn, booking.checkOut, booking.orderDate, booking.specialRequest, booking.status, booking.price],
        (error, results, fields) => {
          if (error) {
            return res.status(400).json({ status: res.statusCode, message: 'Bad Data' });
          };
          return res.status(201).json({ status: res.statusCode, message: 'Success' });
        });

    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const booking = req.body;
      console.log(booking)
      if (Object.keys(booking).length === 0) {
        return res.status(400).json({ status: res.statusCode, message: 'No body' });
      }
      connection.query('UPDATE bookings SET fullName = ?, checkIn = ?, checkOut = ?, orderDate = ?, specialRequest = ?, status = ?, price = ? WHERE id = ?',
        [
          booking.fullName,
          booking.checkIn,
          booking.checkOut,
          booking.orderDate,
          booking.specialRequest,
          booking.status,
          booking.price,
          req.params.id
        ],
        (error, results, fields) => {
          if (error) {
            return res.status(400).json({ status: res.statusCode, message: 'Bad Data' });
          };
          return res.status(201).json({ status: res.statusCode, message: 'Success' });
        });
    } catch (error) {
      next(error);
    }
  },
  destroy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      connection.query('DELETE FROM bookings WHERE id = ?', [req.params.id], (error, rows, fields) => {
        if (error) {
          return res.status(500).json({ status: res.statusCode, message: error });
        };
        return res.status(204).json({ status: res.statusCode, message: 'Success' });
      });
    } catch (error) {
      next(error);
    }
  }
}

export default bookingsController;

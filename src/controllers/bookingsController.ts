import { Request, Response, NextFunction } from 'express';
import { Booking } from '../db/schemas';

const bookingsController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = Booking.find();
      query.exec((err, bookings) => {
        if (err) {
          return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
        }
        return res.json({ bookings });
      })
    } catch (error) {
      next(error);
    }
  },
  show: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = Booking.find()
        .where("_id")
        .equals(req.params.id);

      query.exec((err, booking) => {
        if (err) {
          return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
        }
        return res.json({ booking });
      })

    } catch (error) {
      next(error);
    }
  },
  store: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newBooking = new Booking(req.body);
      newBooking.save((err, booking) => {
        if (err) {
          res.status(400).json({ status: res.statusCode, message: 'Wrong Data' })
        }
        return res.json({ booking });
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await Booking.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
      if (response) return res.json({ response });
      return res.status(404).json({ status: res.statusCode, message: 'Not Found' });

    } catch (error) {
      next(error);
    }
  },
  destroy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bdResponse = await Booking.deleteOne({ _id: req.params.id });
      if (bdResponse.deletedCount > 0) return res.status(204).json({ status: res.statusCode, message: 'Deleted' });
      return res.status(404).json({ status: res.statusCode, message: 'Not Found' });

    } catch (error) {
      next(error);
    }
  }
}

export default bookingsController;

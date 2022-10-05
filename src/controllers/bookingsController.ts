import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { Booking } from '../db/schemas';

const bookingsController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookings = await Booking.find().exec();

      if (bookings.length > 0) {
        return res.json({ bookings });
      } else {
        return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
      }
    } catch (err) {
      next(err);
    }
  },
  show: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const booking = await Booking.findOne()
        .where("_id")
        .equals(req.params.id)
        .exec();

      if (booking) {
        return res.json({ booking });
      } else {
        return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
      }
    } catch (error) {
      next(error);
    }
  },
  store: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newBooking = new Booking(req.body);
      const booking = [await newBooking.save()];
      if (booking.length > 0) {
        return res.json({ booking });
      } else {
        return res.status(400).json({ status: res.statusCode, message: 'Wrong Data' });
      }

    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const booking = await Booking.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
      if (booking) return res.json({ booking });
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

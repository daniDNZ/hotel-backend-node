import { Request, Response, NextFunction } from 'express';
import { User } from '../db/schemas';

const usersController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = User.find();
      query.exec((err, users) => {
        if (err) {
          return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
        }
        return res.json({ users });
      })
    } catch (error) {
      next(error);
    }
  },
  show: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = User.find()
        .where("_id")
        .equals(req.params.id);

      query.exec((err, user) => {
        if (err) {
          return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
        }
        return res.json({ user });
      })

    } catch (error) {
      next(error);
    }
  },
  store: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = new User(req.body);
      newUser.save((err, user) => {
        if (err) {
          res.status(400).json({ status: res.statusCode, message: 'Wrong Data' })
        }
        return res.json({ user });
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
      if (user) return res.json({ user });
      return res.status(404).json({ status: res.statusCode, message: 'Not Found' });

    } catch (error) {
      next(error);
    }
  },
  destroy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bdResponse = await User.deleteOne({ _id: req.params.id });
      if (bdResponse.deletedCount > 0) return res.status(204).json({ status: res.statusCode, message: 'Deleted' });
      return res.status(404).json({ status: res.statusCode, message: 'Not Found' });

    } catch (error) {
      next(error);
    }
  }
}

export default usersController;

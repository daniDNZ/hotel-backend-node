import { delay } from '../assets/functions';
import IUser from '../interfaces/IUser';
import { Request, Response, NextFunction } from 'express';
import usersDataJSON from '../data/users.json';

const usersData: any = usersDataJSON;

const usersController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users: IUser[] = await delay(usersData, 500);
      return users
        ? res.json(users)
        : res.status(404).json({ status: res.statusCode, message: 'Not Found' });

    } catch (error) {
      next(error);
    }
  },
  show: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: IUser = await delay(
        usersData.find((r: IUser) => r.id === Number(req.params.id)),
        500);

      return user
        ? res.json(user)
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
      const user: IUser = await delay(
        usersData.find((r: IUser) => r.id === Number(req.params.id)),
        500);

      if (Object.keys(data).length === 0) {
        return res.status(400).json({ status: res.statusCode, message: 'No body' })
      }
      return user
        ? res.sendStatus(204)
        : res.status(404).json({ status: res.statusCode, message: 'Not Found' });


    } catch (error) {
      next(error);
    }
  },
  destroy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: IUser = await delay(
        usersData.find((r: IUser) => r.id === Number(req.params.id)),
        500);

      return user
        ? res.sendStatus(204)
        : res.status(404).json({ status: res.statusCode, message: 'Not Found' });

    } catch (error) {
      next(error);
    }
  }
}

export default usersController;

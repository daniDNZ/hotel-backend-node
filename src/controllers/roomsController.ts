import { delay } from '../assets/functions';
import IRoom from "../interfaces/IRoom";
import { Request, Response, NextFunction } from 'express';

var roomsData = require('../data/rooms.json');

const roomsController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let rooms: IRoom[] = await delay(roomsData, 500);
      return rooms
        ? res.json(rooms)
        : res.status(404).json({ status: res.statusCode, message: 'Not Found' });

    } catch (error) {
      next(error);
    }
  },
  show: async (req: Request, res: Response, next: NextFunction) => {
    try {
      let room: IRoom = await delay(
        roomsData.find((r: IRoom) => r.id === Number(req.params.id)),
        500);

      return room
        ? res.json(room)
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
      const room: IRoom = await delay(
        roomsData.find((r: IRoom) => r.id === Number(req.params.id)),
        500);

      if (Object.keys(data).length === 0) {
        return res.status(400).json({ status: res.statusCode, message: 'No body' })
      }
      return room
        ? res.sendStatus(204)
        : res.status(404).json({ status: res.statusCode, message: 'Not Found' });


    } catch (error) {
      next(error);
    }
  },
  destroy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const room: IRoom = await delay(
        roomsData.find((r: IRoom) => r.id === Number(req.params.id)),
        500);

      return room
        ? res.sendStatus(204)
        : res.status(404).json({ status: res.statusCode, message: 'Not Found' });

    } catch (error) {
      next(error);
    }
  }
}

export default roomsController;

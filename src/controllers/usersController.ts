import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { dbQuery } from '../database/mysqlConnection';

const userSchema = Joi.object({
  fullName: Joi.string().max(255).required(),
  job: Joi.string().max(255).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().max(255),
  startDate: Joi.date(),
  functions: Joi.string().max(255).required(),
  state: Joi.string().valid('active', 'inactive'),
  password: Joi.string().max(255).required(),
  photoId: Joi.number()
});

const usersController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query: string = `SELECT * FROM users;`;
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
      const userId: Number = Number(req.params.id);
      const results: Array<any> = await dbQuery('SELECT * FROM users WHERE id = ? ;', [userId]);
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
      const user = [
        req.body.fullName,
        req.body.job,
        req.body.email,
        req.body.phone,
        req.body.startDate,
        req.body.functions,
        req.body.state,
        req.body.password,
        req.body.photoId
      ];
      const { error } = userSchema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({ status: res.statusCode, user: error });
      }
      const query: string = 'INSERT INTO users (fullName, job, email, phone, startDate, functions, state, password, photoId) VALUES (?);';
      const results: any = await dbQuery(query, [user]);

      return res.status(201).json({ status: res.statusCode, message: 'Success' });
    } catch (error) {
      console.log(error)
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body;
      const userId: Number = Number(req.params.id);
      const { error } = userSchema.validate(user, { abortEarly: false });
      if (error) {
        return res.status(400).json({ status: res.statusCode, message: 'Bad data' });
      }
      const query: string = `UPDATE users 
        SET fullName = ?, job = ?, email = ?, phone = ?, startDate = ?, functions = ?, state = ?, password = ?, photoId = ?
        WHERE id = ? ;`;
      const results: any = await dbQuery(query,
        [
          user.fullName,
          user.job,
          user.email,
          user.phone,
          user.startDate,
          user.functions,
          user.state,
          user.password,
          user.photoId,
          userId
        ]);

      return res.status(201).json({ status: res.statusCode, message: 'Success' });
    } catch (error) {
      console.error(error)
      next(error);
    }
  },
  destroy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: Number = Number(req.params.id);
      const results: Array<any> = await dbQuery('DELETE FROM users WHERE id = ?', [userId]);

      return res.status(204).json({ status: res.statusCode, message: 'Success' });
    } catch (error) {
      next(error);
    }
  }
}

export default usersController;

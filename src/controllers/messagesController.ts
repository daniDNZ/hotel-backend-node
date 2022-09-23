import { Request, Response, NextFunction } from 'express';
import { dbQuery } from '../database/mysqlConnection';
import Joi from 'joi';

const messageSchema = Joi.object({
  date: Joi.date().required(),
  customer: Joi.string().max(255).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().max(255),
  subject: Joi.string().max(255).required(),
  comment: Joi.string().max(512).required(),
  status: Joi.string().valid('active', 'archived')
});

const messagesController = {
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
      const messageId: Number = Number(req.params.id);
      const results: Array<any> = await dbQuery('SELECT * FROM messages WHERE id = ? ;', [messageId]);
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
      const message = [
        req.body.date,
        req.body.customer,
        req.body.email,
        req.body.phone,
        req.body.subject,
        req.body.comment,
        req.body.status
      ];
      const { error } = messageSchema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({ status: res.statusCode, message: error });
      }
      const query: string = 'INSERT INTO messages (date, customer, email, phone, subject, comment, status) VALUES (?);';
      const results: any = await dbQuery(query, [message]);

      return res.status(201).json({ status: res.statusCode, message: 'Success' });
    } catch (error) {
      console.log(error)
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const message = req.body;
      const messageId: Number = Number(req.params.id);
      const { error } = messageSchema.validate(message, { abortEarly: false });
      if (error) {
        return res.status(400).json({ status: res.statusCode, message: 'Bad data' });
      }
      const query: string = `UPDATE messages 
        SET date = ?, customer = ?, email = ?, phone = ?, subject = ?, comment = ?, status = ?
        WHERE id = ? ;`;
      const results: any = await dbQuery(query,
        [
          message.date,
          message.customer,
          message.email,
          message.phone,
          message.subject,
          message.comment,
          message.status,
          messageId
        ]);

      return res.status(201).json({ status: res.statusCode, message: 'Success' });
    } catch (error) {
      console.error(error)
      next(error);
    }
  },
  destroy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const messageId: Number = Number(req.params.id);
      const results: Array<any> = await dbQuery('DELETE FROM messages WHERE id = ?', [messageId]);

      return res.status(204).json({ status: res.statusCode, message: 'Success' });
    } catch (error) {
      next(error);
    }
  }
}

export default messagesController;

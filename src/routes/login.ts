import { Request, Response, NextFunction, Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { IUserData } from '../interfaces/IUser';
import config from '../env';

const router = Router();

router.route('/')
  .post(
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      passport.authenticate(
        'login',
        async (err: Error, user: IUserData, info) => {
          try {
            if (err || !user) {
              return res.status(401).json({ status: res.statusCode, message: 'Unauthorized' })
            }
            req.login(
              user,
              { session: false },
              async (error) => {
                if (error) return next(error);

                const body = { email: user.email };
                const expiresIn = 1000 * 60 * 60 * 24 * 30;
                const token = jwt.sign({ user: body }, config.SECRET_KEY, { expiresIn: expiresIn });

                return res.json({ token });
              }
            )
          } catch (error) {
            return next(error)
          }
        }
      )(req, res, next);
    }
  )

export default router;
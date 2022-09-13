import { Request, Response, NextFunction, Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import IUser from 'interfaces/IUser';

const router = Router();

router.route('/login')
  .post(
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      passport.authenticate(
        'login',
        async (err: Error, user: IUser) => {
          try {
            if (err || !user) {
              const error: Error = new Error('An error ocurred.');
              return next(error);
            }
            req.login(
              user,
              { session: false },
              async (error) => {
                if (error) return next(error);

                const body = { id: user.id, email: user.email };
                const token = jwt.sign({ user: body }, 'TOP_SECRET');

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
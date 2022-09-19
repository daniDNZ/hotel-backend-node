import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { IUserData } from '../interfaces/IUser';
import config from '../env';

const userData: IUserData = {
  email: 'admin@admin.com',
  password: 'admin'
};

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email: string, password: string, done: Function): Promise<any> => {
      try {
        if (userData.email !== email || userData.password !== password) {
          return done(null, false, { message: 'User not found or wrong password' });
        }

        return done(null, userData, { message: 'Logged in Successfully' });

      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.use(
  new JWTStrategy(
    {
      secretOrKey: config.SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (token: any, done: VerifiedCallback) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
)
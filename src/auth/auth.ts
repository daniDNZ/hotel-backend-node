import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import bcrypt from 'bcrypt';
import config from '../env';
import { User } from '../db/schemas';

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email: string, password: string, done: Function): Promise<any> => {
      try {
        const userData = await User.findOne({ email: email }).exec();
        if (userData && bcrypt.compareSync(password, userData.password)) {
          return done(null, userData, { message: 'Logged in Successfully' });
        }
        return done(null, false, { message: 'User not found or wrong password' });

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
import IUser from 'interfaces/IUser';
import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import usersDataJSON from '../assets/data/users.json'

const usersData: any = usersDataJSON;

const isValidPassword = (user: IUser, password: string): boolean => {
  return user.password === password;
}

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email: string, password: string, done: Function): Promise<any> => {
      try {
        const user: IUser = usersData.find((u: IUser) => u.email === email);
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const validate = await isValidPassword(user, password);

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });

      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.use(
  new JWTStrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
)
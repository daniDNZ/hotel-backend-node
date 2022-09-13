import IUser from 'interfaces/IUser';
import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
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
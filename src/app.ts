import createError from 'http-errors';
import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path';
import roomsRouter from './routes/rooms';
import bookingsRouter from './routes/bookings';
import usersRouter from './routes/users';
import messagesRouter from './routes/users';
import loginRouter from './routes/login';
import indexRouter from './routes/index';
import passport from 'passport';
import cookieParser from 'cookie-parser';
require('./auth/auth');

const app: Express = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/rooms', passport.authenticate('jwt', { session: false }), roomsRouter);
app.use('/bookings', passport.authenticate('jwt', { session: false }), bookingsRouter);
app.use('/users', passport.authenticate('jwt', { session: false }), usersRouter);
app.use('/messages', passport.authenticate('jwt', { session: false }), messagesRouter);
app.use('/login', loginRouter);


// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ success: false, message: `Error ${err.status}` });
});

export default app;

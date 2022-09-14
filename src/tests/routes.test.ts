import request, { Response } from "supertest";
import app from '../app';

interface IAuth {
  token: string;
}

let auth: IAuth = { token: '' };

describe('Bookings Endpoints', () => {
  it('should return 401 (No Token)', async () => {
    const res: Response = await request(app)
      .post('/bookings')
      .send({
        message: 'esto es una prueba'
      })
    expect(res.statusCode).toEqual(401);
  });

  beforeAll(loginUser(auth));
  it('should return all bookings', async () => {
    const res: Response = await request(app)
      .get('/bookings')
      .set('Authorization', 'bearer ' + auth.token)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toBeInstanceOf(Array);
  })

  it('should create a new booking', async () => {
    const res: Response = await request(app)
      .post('/bookings')
      .set('Authorization', 'bearer ' + auth.token)
      .send({
        message: 'esto es una prueba'
      });
    expect(res.statusCode).toEqual(201);
  })
})

function loginUser(auth: IAuth): any {
  return function (done: Function): any {
    request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'admin'
      })
      .expect(200)
      .end(onResponse);

    function onResponse(err: Error, res: Response) {
      auth.token = res.body.token;
      return done();
    }
  };
}
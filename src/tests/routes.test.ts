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

  it('should return one booking', async () => {
    const res: Response = await request(app)
      .get('/bookings/1')
      .set('Authorization', 'bearer ' + auth.token)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toBeInstanceOf(Object);
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

  it('should delete a booking', async () => {
    const res: Response = await request(app)
      .delete('/bookings/1')
      .set('Authorization', 'bearer ' + auth.token)
      .send({
        message: 'esto es una prueba'
      });
    expect(res.statusCode).toEqual(204);
  })

  it('should update a booking', async () => {
    const res: Response = await request(app)
      .delete('/bookings/1')
      .set('Authorization', 'bearer ' + auth.token)
      .send({
        message: 'esto es una prueba'
      });
    expect(res.statusCode).toEqual(204);
  })
})

describe('Rooms Endpoints', () => {
  it('should return 401 (No Token)', async () => {
    const res: Response = await request(app)
      .post('/rooms')
      .send({
        message: 'esto es una prueba'
      })
    expect(res.statusCode).toEqual(401);
  });

  beforeAll(loginUser(auth));
  it('should return all rooms', async () => {
    const res: Response = await request(app)
      .get('/rooms')
      .set('Authorization', 'bearer ' + auth.token)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toBeInstanceOf(Array);
  })

  it('should return one room', async () => {
    const res: Response = await request(app)
      .get('/rooms/1')
      .set('Authorization', 'bearer ' + auth.token)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toBeInstanceOf(Object);
  })

  it('should create a new room', async () => {
    const res: Response = await request(app)
      .post('/rooms')
      .set('Authorization', 'bearer ' + auth.token)
      .send({
        message: 'esto es una prueba'
      });
    expect(res.statusCode).toEqual(201);
  })

  it('should delete a room', async () => {
    const res: Response = await request(app)
      .delete('/rooms/1')
      .set('Authorization', 'bearer ' + auth.token)
      .send({
        message: 'esto es una prueba'
      });
    expect(res.statusCode).toEqual(204);
  })

  it('should update a room', async () => {
    const res: Response = await request(app)
      .delete('/rooms/1')
      .set('Authorization', 'bearer ' + auth.token)
      .send({
        message: 'esto es una prueba'
      });
    expect(res.statusCode).toEqual(204);
  })
})

describe('Users Endpoints', () => {
  it('should return 401 (No Token)', async () => {
    const res: Response = await request(app)
      .post('/users')
      .send({
        message: 'esto es una prueba'
      })
    expect(res.statusCode).toEqual(401);
  });

  beforeAll(loginUser(auth));
  it('should return all users', async () => {
    const res: Response = await request(app)
      .get('/users')
      .set('Authorization', 'bearer ' + auth.token)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toBeInstanceOf(Array);
  })

  it('should return one user', async () => {
    const res: Response = await request(app)
      .get('/users/1')
      .set('Authorization', 'bearer ' + auth.token)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toBeInstanceOf(Object);
  })

  it('should create a new user', async () => {
    const res: Response = await request(app)
      .post('/users')
      .set('Authorization', 'bearer ' + auth.token)
      .send({
        message: 'esto es una prueba'
      });
    expect(res.statusCode).toEqual(201);
  })

  it('should delete a user', async () => {
    const res: Response = await request(app)
      .delete('/users/1')
      .set('Authorization', 'bearer ' + auth.token)
      .send({
        message: 'esto es una prueba'
      });
    expect(res.statusCode).toEqual(204);
  })

  it('should update a user', async () => {
    const res: Response = await request(app)
      .delete('/users/1')
      .set('Authorization', 'bearer ' + auth.token)
      .send({
        message: 'esto es una prueba'
      });
    expect(res.statusCode).toEqual(204);
  })
})

describe('Messages Endpoints', () => {
  it('should return 401 (No Token)', async () => {
    const res: Response = await request(app)
      .post('/messages')
      .send({
        message: 'esto es una prueba'
      })
    expect(res.statusCode).toEqual(401);
  });

  beforeAll(loginUser(auth));
  it('should return all messages', async () => {
    const res: Response = await request(app)
      .get('/messages')
      .set('Authorization', 'bearer ' + auth.token)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toBeInstanceOf(Array);
  })

  it('should return one message', async () => {
    const res: Response = await request(app)
      .get('/messages/1')
      .set('Authorization', 'bearer ' + auth.token)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).toBeInstanceOf(Object);
  })

  it('should create a new message', async () => {
    const res: Response = await request(app)
      .post('/messages')
      .set('Authorization', 'bearer ' + auth.token)
      .send({
        message: 'esto es una prueba'
      });
    expect(res.statusCode).toEqual(201);
  })

  it('should delete a message', async () => {
    const res: Response = await request(app)
      .delete('/messages/1')
      .set('Authorization', 'bearer ' + auth.token)
      .send({
        message: 'esto es una prueba'
      });
    expect(res.statusCode).toEqual(204);
  })

  it('should update a message', async () => {
    const res: Response = await request(app)
      .delete('/messages/1')
      .set('Authorization', 'bearer ' + auth.token)
      .send({
        message: 'esto es una prueba'
      });
    expect(res.statusCode).toEqual(204);
  })
})

describe('Login Endpoint', () => {

  it('should return an error', async () => {
    const res: Response = await request(app)
      .post('/login')
      .send({
        "email": "admin@admin.com",
        "password": "adin"
      })
    expect(res.statusCode).toEqual(401);
    expect(res.body).toMatchObject({ status: 401, message: /.*/ });
  });

  it('should return a token', async () => {
    const res: Response = await request(app)
      .post('/login')
      .send({
        "email": "admin@admin.com",
        "password": "admin"
      })
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({ token: /.*/ });
  });

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
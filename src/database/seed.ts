import { faker } from '@faker-js/faker';
import IBooking from '../interfaces/IBooking';
import IMessage from '../interfaces/IMessage';
import IRoom from '../interfaces/IRoom';
import IUser from '../interfaces/IUser';
import IPhoto from '../interfaces/IPhoto';
import connection from './mysqlConnection';
import { removeAllData, resetAutoIncrements } from './removeAllData';

export function createRandomUser(): IUser {
  return {
    fullName: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.number(),
    startDate: faker.date.past(),
    functions: faker.lorem.lines(1),
    photoId: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    state: faker.helpers.arrayElement(['active', 'inactive']),
    job: faker.helpers.arrayElement(['Manager', 'Servicio de habitaciones', 'Administración'])
  }
}
export function createRandomRoom(): IRoom {
  return {
    type: faker.helpers.arrayElement(['Single', 'Double', 'Excelsior']),
    number: faker.datatype.number({ min: 1, max: 20 }),
    price: faker.datatype.float({ max: 600 }),
    amenities: JSON.stringify(faker.helpers.arrayElements(['3 Bed Space', 'Television', '24 Hours Guard', 'Wi-Fi'])),
    description: faker.lorem.paragraph(),
    offer: faker.datatype.boolean(),
    discount: faker.datatype.number({ min: 0, max: 100 }),
    cancellation: faker.lorem.paragraph(),
  }
}
export function createRandomBooking(): IBooking {
  return {
    fullName: faker.name.fullName(),
    checkIn: faker.date.between('2022-09-01T00:00:00.000Z', '2022-12-20T00:00:00.000Z'),
    checkOut: faker.date.between('2022-09-02T00:00:00.000Z', '2022-12-31T00:00:00.000Z'),
    orderDate: faker.date.past(),
    specialRequest: faker.lorem.paragraph(),
    status: faker.helpers.arrayElement(['checkin', 'checkout', 'inprogress']),
    price: faker.datatype.float({ max: 5000 }),
  }
}
export function createRandomMessage(): IMessage {
  return {
    date: faker.date.past(),
    customer: faker.name.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    subject: faker.lorem.words(6),
    comment: faker.lorem.paragraph(),
    status: faker.helpers.arrayElement(['active', 'archived']),
  }
}
export function createRandomPhoto(): IPhoto {
  return {
    url: faker.image.cats()
  }
}

// Remove all data from all tables and reset ids
removeAllData();
resetAutoIncrements();

Array.from({ length: 20 }, (value, index) => {
  const photo: IPhoto = createRandomPhoto();
  connection.query('INSERT INTO photos (url) VALUES (?)',
    [photo.url],
    function (error, results, fields) {
      if (error) throw error;
    });
});

Array.from({ length: 10 }).forEach(() => {
  const user: IUser = createRandomUser();
  connection.query('INSERT INTO users (fullName, email, password, phone, startDate, functions, photoId, state, job) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [user.fullName, user.email, user.password, user.phone, user.startDate, user.functions, user.photoId, user.state, user.job],
    function (error, results, fields) {
      if (error) throw error;
    })
});

Array.from({ length: 10 }).forEach(() => {
  const room: IRoom = createRandomRoom();
  connection.query('INSERT INTO rooms (type, number, price, amenities, description, offer, discount, cancellation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [room.type, room.number, room.price, room.amenities, room.description, room.offer, room.discount, room.cancellation],
    function (error, results, fields) {
      if (error) throw error;
    })
});

Array.from({ length: 10 }).forEach(() => {
  const booking: IBooking = createRandomBooking();
  connection.query('INSERT INTO bookings (fullName, checkIn, checkOut, orderDate, specialRequest, status, price) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [booking.fullName, booking.checkIn, booking.checkOut, booking.orderDate, booking.specialRequest, booking.status, booking.price],
    function (error, results, fields) {
      if (error) throw error;
    })
});

Array.from({ length: 10 }).forEach(() => {
  const message: IMessage = createRandomMessage();
  connection.query('INSERT INTO messages (date, customer, email, phone, subject, comment, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [message.date, message.customer, message.email, message.phone, message.subject, message.comment, message.status],
    function (error, results, fields) {
      if (error) throw error;
    })
});

connection.end();



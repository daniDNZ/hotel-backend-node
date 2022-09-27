import { faker } from '@faker-js/faker';
import { Booking, IBooking, IMessage, IRoom, IUser, Message, Room, User } from './schemas';
import mongoConnection from './connection';
import mongoose from 'mongoose';

export const USERS: IUser[] = [];
export const ROOMS: IRoom[] = [];
export const BOOKINGS: any[] = [];
export const MESSAGES: IMessage[] = [];

export function createRandomUser() {
  return {
    fullName: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.number(),
    startDate: faker.date.past(),
    functions: faker.lorem.lines(),
    photo: faker.image.avatar(),
    status: faker.datatype.boolean(),
    job: faker.helpers.arrayElement(['Manager', 'Servicio de habitaciones', 'Administración'])
  }
}
export function createRandomRoom() {
  return {
    type: faker.helpers.arrayElement(['Single', 'Double', 'Excelsior']),
    number: String(faker.datatype.number({ min: 1, max: 20 })),
    price: faker.datatype.float({ max: 600 }),
    amenities: faker.helpers.arrayElements(['3 Bed Space', 'Television', '24 Hours Guard', 'Wi-Fi']),
    description: faker.lorem.paragraph(),
    offer: faker.datatype.boolean(),
    discount: faker.datatype.number({ min: 0, max: 100 }),
    cancellation: faker.lorem.paragraph(),
  }
}
export function createRandomBooking() {
  const checkin = faker.date.between('2022-09-01T00:00:00.000Z', '2022-12-20T00:00:00.000Z');
  return {
    fullName: faker.name.fullName(),
    checkIn: checkin,
    checkOut: faker.date.between(checkin, '2022-12-31T00:00:00.000Z'),
    orderDate: faker.date.between('2022-04-01T00:00:00.000Z', checkin),
    specialRequest: faker.lorem.paragraph(),
    status: faker.helpers.arrayElement(['checkIn', 'checkOut', 'inProgress']),
    price: faker.datatype.float({ max: 5000 }),
    rooms: []
  }
}
export function createRandomMessage() {
  return {
    date: faker.date.past(),
    customer: faker.name.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    subject: faker.lorem.lines(),
    comment: faker.lorem.paragraph(),
    status: faker.datatype.boolean(),
  }
}


Array.from({ length: 10 }).forEach(() => {
  USERS.push(createRandomUser());
});
Array.from({ length: 10 }).forEach(() => {
  ROOMS.push(createRandomRoom());
});
Array.from({ length: 10 }).forEach(() => {
  BOOKINGS.push(createRandomBooking());
});
Array.from({ length: 10 }).forEach(() => {
  MESSAGES.push(createRandomMessage());
});

seed();

async function seed() {

  await mongoConnection();

  Room.insertMany(ROOMS, (err) => {
    if (err) console.error(err)
    else console.info('Rooms created');
  });
  User.insertMany(USERS, (err) => {
    if (err) console.error(err)
    else console.info('Users created');
  });
  Booking.insertMany(BOOKINGS, (err) => {
    if (err) console.error(err)
    else console.info('Bookings created');
  });
  Message.insertMany(MESSAGES, (err) => {
    if (err) console.error(err)
    else console.info('Messages created');
  });
};
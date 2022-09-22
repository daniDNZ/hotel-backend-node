import { faker } from '@faker-js/faker';
import IBooking from './interfaces/IBooking';
import IMessage from './interfaces/IMessage';
import IRoom from './interfaces/IRoom';
import IUser from './interfaces/IUser';
import IPhoto from './interfaces/IPhoto';

export const USERS: IUser[] = [];
export const ROOMS: IRoom[] = [];
export const BOOKINGS: IBooking[] = [];
export const MESSAGES: IMessage[] = [];
export const PHOTOS: IPhoto[] = [];

export function createRandomUser(): IUser {
  return {
    fullName: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.number(),
    startDate: faker.date.past(),
    functions: faker.lorem.lines(),
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
    amenities: faker.helpers.arrayElements(['3 Bed Space', 'Television', '24 Hours Guard', 'Wi-Fi']),
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
    status: faker.helpers.arrayElement(['checkIn', 'checkOut', 'inProgress']),
    price: faker.datatype.float({ max: 5000 }),
  }
}
export function createRandomMessage(): IMessage {
  return {
    date: faker.date.past(),
    customer: faker.name.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    subject: faker.lorem.lines(),
    comment: faker.lorem.paragraph(),
    status: faker.helpers.arrayElement(['', 'archived']),
  }
}
export function createRandomPhoto(): IPhoto {
  return {
    url: faker.image.cats()
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
Array.from({ length: 20 }).forEach(() => {
  PHOTOS.push(createRandomPhoto());
});


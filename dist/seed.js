"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomPhoto = exports.createRandomMessage = exports.createRandomBooking = exports.createRandomRoom = exports.createRandomUser = void 0;
const faker_1 = require("@faker-js/faker");
const mysqlConnection_1 = __importDefault(require("./database/mysqlConnection"));
// export const USERS: IUser[] = [];
// export const ROOMS: IRoom[] = [];
// export const BOOKINGS: IBooking[] = [];
// export const MESSAGES: IMessage[] = [];
// export const PHOTOS: IPhoto[] = [];
function createRandomUser() {
    return {
        fullName: faker_1.faker.name.fullName(),
        email: faker_1.faker.internet.email(),
        password: faker_1.faker.internet.password(),
        phone: faker_1.faker.phone.number(),
        startDate: faker_1.faker.date.past(),
        functions: faker_1.faker.lorem.lines(),
        photoId: faker_1.faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
        state: faker_1.faker.helpers.arrayElement(['active', 'inactive']),
        job: faker_1.faker.helpers.arrayElement(['Manager', 'Servicio de habitaciones', 'Administración'])
    };
}
exports.createRandomUser = createRandomUser;
function createRandomRoom() {
    return {
        type: faker_1.faker.helpers.arrayElement(['Single', 'Double', 'Excelsior']),
        number: faker_1.faker.datatype.number({ min: 1, max: 20 }),
        price: faker_1.faker.datatype.float({ max: 600 }),
        amenities: faker_1.faker.helpers.arrayElements(['3 Bed Space', 'Television', '24 Hours Guard', 'Wi-Fi']),
        description: faker_1.faker.lorem.paragraph(),
        offer: faker_1.faker.datatype.boolean(),
        discount: faker_1.faker.datatype.number({ min: 0, max: 100 }),
        cancellation: faker_1.faker.lorem.paragraph(),
    };
}
exports.createRandomRoom = createRandomRoom;
function createRandomBooking() {
    return {
        fullName: faker_1.faker.name.fullName(),
        checkIn: faker_1.faker.date.between('2022-09-01T00:00:00.000Z', '2022-12-20T00:00:00.000Z'),
        checkOut: faker_1.faker.date.between('2022-09-02T00:00:00.000Z', '2022-12-31T00:00:00.000Z'),
        orderDate: faker_1.faker.date.past(),
        specialRequest: faker_1.faker.lorem.paragraph(),
        status: faker_1.faker.helpers.arrayElement(['checkIn', 'checkOut', 'inProgress']),
        price: faker_1.faker.datatype.float({ max: 5000 }),
    };
}
exports.createRandomBooking = createRandomBooking;
function createRandomMessage() {
    return {
        date: faker_1.faker.date.past(),
        customer: faker_1.faker.name.fullName(),
        email: faker_1.faker.internet.email(),
        phone: faker_1.faker.phone.number(),
        subject: faker_1.faker.lorem.lines(),
        comment: faker_1.faker.lorem.paragraph(),
        status: faker_1.faker.helpers.arrayElement(['', 'archived']),
    };
}
exports.createRandomMessage = createRandomMessage;
function createRandomPhoto() {
    return {
        url: faker_1.faker.image.cats()
    };
}
exports.createRandomPhoto = createRandomPhoto;
// Array.from({ length: 10 }).forEach(() => {
//   const user: IUser = createRandomUser();
//   connection.query('INSERT INTO users (fullName, email, password, phone, startDate, functions, photoId, state, job) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
//     [user.fullName, user.email, user.password, user.phone, user.startDate, user.functions, user.photoId, user.state, user.job],
//     function (error, results, fields) {
//       if (error) throw error;
//     })
// });
// Array.from({ length: 10 }).forEach(() => {
//   ROOMS.push(createRandomRoom());
// });
// Array.from({ length: 10 }).forEach(() => {
//   BOOKINGS.push(createRandomBooking());
// });
// Array.from({ length: 10 }).forEach(() => {
//   MESSAGES.push(createRandomMessage());
// });
mysqlConnection_1.default.query('ALTER TABLE photos AUTO_INCREMENT = 1', function (error, results, fields) {
    if (error)
        throw error;
});
Array.from({ length: 20 }, (value, index) => {
    const photo = createRandomPhoto();
    mysqlConnection_1.default.query('INSERT INTO photos (url) VALUES (?)', [photo.url], function (error, results, fields) {
        if (error)
            throw error;
    });
});
mysqlConnection_1.default.end();
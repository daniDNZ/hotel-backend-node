"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomMessage = exports.createRandomBooking = exports.createRandomRoom = exports.createRandomUser = exports.MESSAGES = exports.BOOKINGS = exports.ROOMS = exports.USERS = void 0;
const faker_1 = require("@faker-js/faker");
exports.USERS = [];
exports.ROOMS = [];
exports.BOOKINGS = [];
exports.MESSAGES = [];
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
Array.from({ length: 10 }).forEach(() => {
    exports.USERS.push(createRandomUser());
});
Array.from({ length: 10 }).forEach(() => {
    exports.ROOMS.push(createRandomRoom());
});
Array.from({ length: 10 }).forEach(() => {
    exports.BOOKINGS.push(createRandomBooking());
});
Array.from({ length: 10 }).forEach(() => {
    exports.MESSAGES.push(createRandomMessage());
});
console.log(exports.USERS);
console.log(exports.ROOMS);
console.log(exports.MESSAGES);
console.log(exports.BOOKINGS);

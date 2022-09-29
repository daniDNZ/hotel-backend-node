"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomMessage = exports.createRandomBooking = exports.createRandomRoom = exports.createRandomUser = exports.MESSAGES = exports.BOOKINGS = exports.ROOMS = exports.USERS = void 0;
const faker_1 = require("@faker-js/faker");
const schemas_1 = require("./schemas");
const connection_1 = __importDefault(require("./connection"));
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
        photo: faker_1.faker.image.avatar(),
        status: faker_1.faker.datatype.boolean(),
        job: faker_1.faker.helpers.arrayElement(['Manager', 'Servicio de habitaciones', 'Administración'])
    };
}
exports.createRandomUser = createRandomUser;
function createRandomRoom() {
    return {
        type: faker_1.faker.helpers.arrayElement(['Single', 'Double', 'Excelsior']),
        number: String(faker_1.faker.datatype.number({ min: 1, max: 20 })),
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
    const checkIn = faker_1.faker.date.between('2022-09-01T00:00:00.000Z', '2022-12-20T00:00:00.000Z');
    const statusStr = faker_1.faker.helpers.arrayElement(['checkIn', 'checkOut', 'inProgress']);
    const status = schemas_1.StatusEnum[statusStr];
    return {
        fullName: faker_1.faker.name.fullName(),
        checkIn,
        checkOut: faker_1.faker.date.between(checkIn, '2022-12-31T00:00:00.000Z'),
        orderDate: faker_1.faker.date.between('2022-04-01T00:00:00.000Z', checkIn),
        specialRequest: faker_1.faker.lorem.paragraph(),
        status,
        price: faker_1.faker.datatype.float({ max: 5000 }),
        rooms: []
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
        status: faker_1.faker.datatype.boolean(),
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
seed();
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, connection_1.default)();
        schemas_1.Room.insertMany(exports.ROOMS, (err) => {
            if (err)
                console.error(err);
            else
                console.info('Rooms created');
        });
        schemas_1.User.insertMany(exports.USERS, (err) => {
            if (err)
                console.error(err);
            else
                console.info('Users created');
        });
        schemas_1.Booking.insertMany(exports.BOOKINGS, (err) => {
            if (err)
                console.error(err);
            else
                console.info('Bookings created');
        });
        schemas_1.Message.insertMany(exports.MESSAGES, (err) => {
            if (err)
                console.error(err);
            else
                console.info('Messages created');
        });
    });
}
;

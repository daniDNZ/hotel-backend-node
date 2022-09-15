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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
let auth = { token: '' };
describe('Bookings Endpoints', () => {
    it('should return 401 (No Token)', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/bookings')
            .send({
            message: 'esto es una prueba'
        });
        expect(res.statusCode).toEqual(401);
    }));
    beforeAll(loginUser(auth));
    it('should return all bookings', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get('/bookings')
            .set('Authorization', 'bearer ' + auth.token)
            .expect(200)
            .expect('Content-Type', /json/);
        expect(res.body).toBeInstanceOf(Array);
    }));
    it('should return one booking', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get('/bookings/1')
            .set('Authorization', 'bearer ' + auth.token)
            .expect(200)
            .expect('Content-Type', /json/);
        expect(res.body).toBeInstanceOf(Object);
    }));
    it('should create a new booking', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/bookings')
            .set('Authorization', 'bearer ' + auth.token)
            .send({
            message: 'esto es una prueba'
        });
        expect(res.statusCode).toEqual(201);
    }));
    it('should delete a booking', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete('/bookings/1')
            .set('Authorization', 'bearer ' + auth.token)
            .send({
            message: 'esto es una prueba'
        });
        expect(res.statusCode).toEqual(204);
    }));
    it('should update a booking', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete('/bookings/1')
            .set('Authorization', 'bearer ' + auth.token)
            .send({
            message: 'esto es una prueba'
        });
        expect(res.statusCode).toEqual(204);
    }));
});
describe('Rooms Endpoints', () => {
    it('should return 401 (No Token)', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/rooms')
            .send({
            message: 'esto es una prueba'
        });
        expect(res.statusCode).toEqual(401);
    }));
    beforeAll(loginUser(auth));
    it('should return all rooms', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get('/rooms')
            .set('Authorization', 'bearer ' + auth.token)
            .expect(200)
            .expect('Content-Type', /json/);
        expect(res.body).toBeInstanceOf(Array);
    }));
    it('should return one room', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get('/rooms/1')
            .set('Authorization', 'bearer ' + auth.token)
            .expect(200)
            .expect('Content-Type', /json/);
        expect(res.body).toBeInstanceOf(Object);
    }));
    it('should create a new room', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/rooms')
            .set('Authorization', 'bearer ' + auth.token)
            .send({
            message: 'esto es una prueba'
        });
        expect(res.statusCode).toEqual(201);
    }));
    it('should delete a room', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete('/rooms/1')
            .set('Authorization', 'bearer ' + auth.token)
            .send({
            message: 'esto es una prueba'
        });
        expect(res.statusCode).toEqual(204);
    }));
    it('should update a room', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete('/rooms/1')
            .set('Authorization', 'bearer ' + auth.token)
            .send({
            message: 'esto es una prueba'
        });
        expect(res.statusCode).toEqual(204);
    }));
});
describe('Users Endpoints', () => {
    it('should return 401 (No Token)', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/users')
            .send({
            message: 'esto es una prueba'
        });
        expect(res.statusCode).toEqual(401);
    }));
    beforeAll(loginUser(auth));
    it('should return all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get('/users')
            .set('Authorization', 'bearer ' + auth.token)
            .expect(200)
            .expect('Content-Type', /json/);
        expect(res.body).toBeInstanceOf(Array);
    }));
    it('should return one user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get('/users/1')
            .set('Authorization', 'bearer ' + auth.token)
            .expect(200)
            .expect('Content-Type', /json/);
        expect(res.body).toBeInstanceOf(Object);
    }));
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/users')
            .set('Authorization', 'bearer ' + auth.token)
            .send({
            message: 'esto es una prueba'
        });
        expect(res.statusCode).toEqual(201);
    }));
    it('should delete a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete('/users/1')
            .set('Authorization', 'bearer ' + auth.token)
            .send({
            message: 'esto es una prueba'
        });
        expect(res.statusCode).toEqual(204);
    }));
    it('should update a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete('/users/1')
            .set('Authorization', 'bearer ' + auth.token)
            .send({
            message: 'esto es una prueba'
        });
        expect(res.statusCode).toEqual(204);
    }));
});
describe('Messages Endpoints', () => {
    it('should return 401 (No Token)', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/messages')
            .send({
            message: 'esto es una prueba'
        });
        expect(res.statusCode).toEqual(401);
    }));
    beforeAll(loginUser(auth));
    it('should return all messages', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get('/messages')
            .set('Authorization', 'bearer ' + auth.token)
            .expect(200)
            .expect('Content-Type', /json/);
        expect(res.body).toBeInstanceOf(Array);
    }));
    it('should return one message', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .get('/messages/1')
            .set('Authorization', 'bearer ' + auth.token)
            .expect(200)
            .expect('Content-Type', /json/);
        expect(res.body).toBeInstanceOf(Object);
    }));
    it('should create a new message', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/messages')
            .set('Authorization', 'bearer ' + auth.token)
            .send({
            message: 'esto es una prueba'
        });
        expect(res.statusCode).toEqual(201);
    }));
    it('should delete a message', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete('/messages/1')
            .set('Authorization', 'bearer ' + auth.token)
            .send({
            message: 'esto es una prueba'
        });
        expect(res.statusCode).toEqual(204);
    }));
    it('should update a message', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete('/messages/1')
            .set('Authorization', 'bearer ' + auth.token)
            .send({
            message: 'esto es una prueba'
        });
        expect(res.statusCode).toEqual(204);
    }));
});
describe('Login Endpoint', () => {
    it('should return an error', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/login')
            .send({
            "email": "admin@admin.com",
            "password": "adin"
        });
        expect(res.statusCode).toEqual(401);
        expect(res.body).toMatchObject({ status: 401, message: /.*/ });
    }));
    it('should return a token', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/login')
            .send({
            "email": "admin@admin.com",
            "password": "admin"
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toMatchObject({ token: /.*/ });
    }));
});
function loginUser(auth) {
    return function (done) {
        (0, supertest_1.default)(app_1.default)
            .post('/login')
            .send({
            email: 'admin@admin.com',
            password: 'admin'
        })
            .expect(200)
            .end(onResponse);
        function onResponse(err, res) {
            auth.token = res.body.token;
            return done();
        }
    };
}

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
const mysqlConnection_1 = require("../database/mysqlConnection");
const joi_1 = __importDefault(require("joi"));
const bookingSchema = joi_1.default.object({
    fullName: joi_1.default.string().max(255).required(),
    checkIn: joi_1.default.date().required(),
    checkOut: joi_1.default.date().required(),
    orderDate: joi_1.default.date().required(),
    specialRequest: joi_1.default.string().max(511),
    status: joi_1.default.string().valid("checkin", "checkout", "inprogress"),
    price: joi_1.default.number().required(),
    rooms: joi_1.default.array().items(joi_1.default.number())
});
const bookingsController = {
    index: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = `SELECT b.*, r.type AS room FROM bookings b 
        INNER JOIN bookings_rooms br ON b.id = br.bookingId 
        INNER JOIN rooms r ON br.roomId = r.id
      ;`;
            const results = yield (0, mysqlConnection_1.dbQuery)(query);
            if (results.length === 0) {
                return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
            }
            return res.json({ results });
        }
        catch (error) {
            next(error);
        }
    }),
    show: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bookingId = Number(req.params.id);
            const results = yield (0, mysqlConnection_1.dbQuery)('SELECT * FROM bookings WHERE id = ?', [bookingId]);
            if (results.length === 0) {
                return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
            }
            return res.json({ results: results[0] });
        }
        catch (error) {
            next(error);
        }
    }),
    store: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const booking = [
                req.body.fullName,
                req.body.checkIn,
                req.body.checkOut,
                req.body.orderDate,
                req.body.specialRequest,
                req.body.status,
                req.body.price,
            ];
            const rooms = req.body.rooms;
            const { error } = bookingSchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ status: res.statusCode, message: 'Bad data' });
            }
            const results = yield (0, mysqlConnection_1.dbQuery)('INSERT INTO bookings (fullName, checkIn, checkOut, orderDate, specialRequest, status, price) VALUES (?)', [booking]);
            rooms.forEach((room) => __awaiter(void 0, void 0, void 0, function* () {
                const bookingsRoomsResults = yield (0, mysqlConnection_1.dbQuery)('INSERT INTO bookings_rooms (roomId, bookingId) VALUES (?, ?)', [room, results.insertId]);
            }));
            return res.status(201).json({ status: res.statusCode, message: 'Success' });
        }
        catch (error) {
            next(error);
        }
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const booking = req.body;
            const bookingId = Number(req.params.id);
            const { error } = bookingSchema.validate(booking, { abortEarly: false });
            if (error) {
                return res.status(400).json({ status: res.statusCode, message: 'Bad data' });
            }
            const results = yield (0, mysqlConnection_1.dbQuery)('UPDATE bookings SET fullName = ?, checkIn = ?, checkOut = ?, orderDate = ?, specialRequest = ?, status = ?, price = ? WHERE id = ?', [
                booking.fullName,
                booking.checkIn,
                booking.checkOut,
                booking.orderDate,
                booking.specialRequest,
                booking.status,
                booking.price,
                bookingId
            ]);
            return res.status(201).json({ status: res.statusCode, message: 'Success' });
        }
        catch (error) {
            next(error);
        }
    }),
    destroy: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bookingId = Number(req.params.id);
            const results = yield (0, mysqlConnection_1.dbQuery)('DELETE FROM bookings WHERE id = ?', [bookingId]);
            return res.status(204).json({ status: res.statusCode, message: 'Success' });
        }
        catch (error) {
            next(error);
        }
    })
};
exports.default = bookingsController;

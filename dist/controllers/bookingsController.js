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
const mysqlConnection_1 = __importDefault(require("../database/mysqlConnection"));
const bookingsController = {
    index: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            mysqlConnection_1.default.query('SELECT * FROM bookings', (error, rows, fields) => {
                if (rows.length === 0) {
                    return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
                }
                return res.json(rows);
            });
        }
        catch (error) {
            next(error);
        }
    }),
    show: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            mysqlConnection_1.default.query('SELECT * FROM bookings WHERE id = ?', [req.params.id], (error, rows, fields) => {
                if (rows.length === 0) {
                    return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
                }
                return res.json(rows);
            });
        }
        catch (error) {
            next(error);
        }
    }),
    store: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const booking = req.body;
            if (Object.keys(booking).length === 0) {
                return res.status(400).json({ status: res.statusCode, message: 'No body' });
            }
            mysqlConnection_1.default.query('INSERT INTO bookings (fullName, checkIn, checkOut, orderDate, specialRequest, status, price) VALUES (?, ?, ?, ?, ?, ?, ?)', [booking.fullName, booking.checkIn, booking.checkOut, booking.orderDate, booking.specialRequest, booking.status, booking.price], (error, results, fields) => {
                if (error) {
                    return res.status(400).json({ status: res.statusCode, message: 'Bad Data' });
                }
                ;
                return res.status(201).json({ status: res.statusCode, message: 'Success' });
            });
        }
        catch (error) {
            next(error);
        }
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const booking = req.body;
            console.log(booking);
            if (Object.keys(booking).length === 0) {
                return res.status(400).json({ status: res.statusCode, message: 'No body' });
            }
            mysqlConnection_1.default.query('UPDATE bookings SET fullName = ?, checkIn = ?, checkOut = ?, orderDate = ?, specialRequest = ?, status = ?, price = ? WHERE id = ?', [
                booking.fullName,
                booking.checkIn,
                booking.checkOut,
                booking.orderDate,
                booking.specialRequest,
                booking.status,
                booking.price,
                req.params.id
            ], (error, results, fields) => {
                if (error) {
                    return res.status(400).json({ status: res.statusCode, message: 'Bad Data' });
                }
                ;
                return res.status(201).json({ status: res.statusCode, message: 'Success' });
            });
        }
        catch (error) {
            next(error);
        }
    }),
    destroy: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            mysqlConnection_1.default.query('DELETE FROM bookings WHERE id = ?', [req.params.id], (error, rows, fields) => {
                if (error) {
                    return res.status(500).json({ status: res.statusCode, message: error });
                }
                ;
                return res.status(204).json({ status: res.statusCode, message: 'Success' });
            });
        }
        catch (error) {
            next(error);
        }
    })
};
exports.default = bookingsController;

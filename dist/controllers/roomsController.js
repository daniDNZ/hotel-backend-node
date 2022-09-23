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
const roomSchema = joi_1.default.object({
    type: joi_1.default.string().max(255).required(),
    number: joi_1.default.string().max(255).required(),
    price: joi_1.default.number().required(),
    amenities: joi_1.default.array().items(joi_1.default.string()).required(),
    description: joi_1.default.string().max(512),
    offer: joi_1.default.boolean(),
    discount: joi_1.default.number(),
    cancellation: joi_1.default.string().max(512)
});
const roomsController = {
    index: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = `SELECT * FROM rooms;`;
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
            const roomId = Number(req.params.id);
            const results = yield (0, mysqlConnection_1.dbQuery)('SELECT * FROM rooms WHERE id = ? ;', [roomId]);
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
                req.body.type,
                req.body.number,
                req.body.price,
                JSON.stringify(req.body.amenities),
                req.body.description,
                req.body.offer,
                req.body.discount,
                req.body.cancellation
            ];
            const rooms = req.body.rooms;
            const { error } = roomSchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ status: res.statusCode, message: error });
            }
            const query = 'INSERT INTO rooms (type, number, price, amenities, description, offer, discount, cancellation) VALUES (?);';
            const results = yield (0, mysqlConnection_1.dbQuery)(query, [booking]);
            return res.status(201).json({ status: res.statusCode, message: 'Success' });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const room = req.body;
            const roomId = Number(req.params.id);
            const { error } = roomSchema.validate(room, { abortEarly: false });
            if (error) {
                return res.status(400).json({ status: res.statusCode, message: 'Bad data' });
            }
            const query = `UPDATE rooms 
        SET type = ?, number = ?, price = ?, amenities = ?, description = ?, offer = ?, discount = ?, cancellation = ?
        WHERE id = ? ;`;
            const results = yield (0, mysqlConnection_1.dbQuery)(query, [
                room.type,
                room.number,
                room.price,
                JSON.stringify(room.amenities),
                room.description,
                room.offer,
                room.discount,
                room.cancellation,
                roomId
            ]);
            return res.status(201).json({ status: res.statusCode, message: 'Success' });
        }
        catch (error) {
            console.error(error);
            next(error);
        }
    }),
    destroy: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const roomId = Number(req.params.id);
            const results = yield (0, mysqlConnection_1.dbQuery)('DELETE FROM rooms WHERE id = ?', [roomId]);
            return res.status(204).json({ status: res.statusCode, message: 'Success' });
        }
        catch (error) {
            next(error);
        }
    })
};
exports.default = roomsController;

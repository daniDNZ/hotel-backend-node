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
const joi_1 = __importDefault(require("joi"));
const mysqlConnection_1 = require("../database/mysqlConnection");
const userSchema = joi_1.default.object({
    fullName: joi_1.default.string().max(255).required(),
    job: joi_1.default.string().max(255).required(),
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().max(255),
    startDate: joi_1.default.date(),
    functions: joi_1.default.string().max(255).required(),
    state: joi_1.default.string().valid('active', 'inactive'),
    password: joi_1.default.string().max(255).required(),
    photoId: joi_1.default.number()
});
const usersController = {
    index: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = `SELECT * FROM users;`;
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
            const userId = Number(req.params.id);
            const results = yield (0, mysqlConnection_1.dbQuery)('SELECT * FROM users WHERE id = ? ;', [userId]);
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
            const user = [
                req.body.date,
                req.body.customer,
                req.body.email,
                req.body.phone,
                req.body.subject,
                req.body.comment,
                req.body.status
            ];
            const { error } = userSchema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(400).json({ status: res.statusCode, user: error });
            }
            const query = 'INSERT INTO users (date, customer, email, phone, subject, comment, status) VALUES (?);';
            const results = yield (0, mysqlConnection_1.dbQuery)(query, [user]);
            return res.status(201).json({ status: res.statusCode, message: 'Success' });
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = req.body;
            const userId = Number(req.params.id);
            const { error } = userSchema.validate(user, { abortEarly: false });
            if (error) {
                return res.status(400).json({ status: res.statusCode, message: 'Bad data' });
            }
            const query = `UPDATE users 
        SET date = ?, customer = ?, email = ?, phone = ?, subject = ?, comment = ?, status = ?
        WHERE id = ? ;`;
            const results = yield (0, mysqlConnection_1.dbQuery)(query, [
                user.date,
                user.customer,
                user.email,
                user.phone,
                user.subject,
                user.comment,
                user.status,
                userId
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
            const userId = Number(req.params.id);
            const results = yield (0, mysqlConnection_1.dbQuery)('DELETE FROM users WHERE id = ?', [userId]);
            return res.status(204).json({ status: res.statusCode, message: 'Success' });
        }
        catch (error) {
            next(error);
        }
    })
};
exports.default = usersController;

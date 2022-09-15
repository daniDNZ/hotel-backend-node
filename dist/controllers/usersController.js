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
const functions_1 = require("../assets/functions");
const users_json_1 = __importDefault(require("../data/users.json"));
const usersData = users_json_1.default;
const usersController = {
    index: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield (0, functions_1.delay)(usersData, 500);
            return users
                ? res.json(users)
                : res.status(404).json({ status: res.statusCode, message: 'Not Found' });
        }
        catch (error) {
            next(error);
        }
    }),
    show: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield (0, functions_1.delay)(usersData.find((r) => r.id === Number(req.params.id)), 500);
            return user
                ? res.json(user)
                : res.status(404).json({ status: res.statusCode, message: 'Not Found' });
        }
        catch (error) {
            next(error);
        }
    }),
    store: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            return Object.keys(data).length > 0
                ? res.status(201).json({ status: res.statusCode, message: 'Success' })
                : res.status(400).json({ status: res.statusCode, message: 'No body' });
        }
        catch (error) {
            next(error);
        }
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            const user = yield (0, functions_1.delay)(usersData.find((r) => r.id === Number(req.params.id)), 500);
            if (Object.keys(data).length === 0) {
                return res.status(400).json({ status: res.statusCode, message: 'No body' });
            }
            return user
                ? res.sendStatus(204)
                : res.status(404).json({ status: res.statusCode, message: 'Not Found' });
        }
        catch (error) {
            next(error);
        }
    }),
    destroy: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield (0, functions_1.delay)(usersData.find((r) => r.id === Number(req.params.id)), 500);
            return user
                ? res.sendStatus(204)
                : res.status(404).json({ status: res.statusCode, message: 'Not Found' });
        }
        catch (error) {
            next(error);
        }
    })
};
exports.default = usersController;

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
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../db/schemas");
const usersController = {
    index: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = schemas_1.User.find();
            query.exec((err, users) => {
                if (err) {
                    return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
                }
                return res.json({ users });
            });
        }
        catch (error) {
            next(error);
        }
    }),
    show: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = schemas_1.User.find()
                .where("_id")
                .equals(req.params.id);
            query.exec((err, user) => {
                if (err) {
                    return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
                }
                return res.json({ user });
            });
        }
        catch (error) {
            next(error);
        }
    }),
    store: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newUser = new schemas_1.User(req.body);
            newUser.save((err, user) => {
                if (err) {
                    res.status(400).json({ status: res.statusCode, message: 'Wrong Data' });
                }
                return res.json({ user });
            });
        }
        catch (error) {
            next(error);
        }
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield schemas_1.User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            if (user)
                return res.json({ user });
            return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
        }
        catch (error) {
            next(error);
        }
    }),
    destroy: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bdResponse = yield schemas_1.User.deleteOne({ _id: req.params.id });
            if (bdResponse.deletedCount > 0)
                return res.status(204).json({ status: res.statusCode, message: 'Deleted' });
            return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
        }
        catch (error) {
            next(error);
        }
    })
};
exports.default = usersController;

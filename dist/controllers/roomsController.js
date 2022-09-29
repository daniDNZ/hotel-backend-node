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
const roomsController = {
    index: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = schemas_1.Room.find();
            query.exec((err, rooms) => {
                if (err) {
                    return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
                }
                return res.json({ rooms });
            });
        }
        catch (error) {
            next(error);
        }
    }),
    show: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = schemas_1.Room.find()
                .where("_id")
                .equals(req.params.id);
            query.exec((err, room) => {
                if (err) {
                    return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
                }
                return res.json({ room });
            });
        }
        catch (error) {
            next(error);
        }
    }),
    store: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newRoom = new schemas_1.Room(req.body);
            newRoom.save((err, room) => {
                if (err) {
                    res.status(400).json({ status: res.statusCode, message: 'Wrong Data' });
                }
                return res.json({ room });
            });
        }
        catch (error) {
            next(error);
        }
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const room = yield schemas_1.Room.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            if (room)
                return res.json({ room });
            return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
        }
        catch (error) {
            next(error);
        }
    }),
    destroy: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bdResponse = yield schemas_1.Room.deleteOne({ _id: req.params.id });
            if (bdResponse.deletedCount > 0)
                return res.status(204).json({ status: res.statusCode, message: 'Deleted' });
            return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
        }
        catch (error) {
            next(error);
        }
    })
};
exports.default = roomsController;

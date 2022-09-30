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
const bookingsController = {
    index: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bookings = yield schemas_1.Booking.find().exec();
            if (bookings.length > 0) {
                return res.json({ bookings });
            }
            else {
                return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
            }
        }
        catch (err) {
            next(err);
        }
    }),
    show: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const booking = yield schemas_1.Booking.find()
                .where("_id")
                .equals(req.params.id)
                .exec();
            if (booking.length > 0) {
                return res.json({ booking });
            }
            else {
                return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    store: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newBooking = new schemas_1.Booking(req.body);
            const booking = [yield newBooking.save()];
            if (booking.length > 0) {
                return res.json({ booking });
            }
            else {
                return res.status(400).json({ status: res.statusCode, message: 'Wrong Data' });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const booking = yield schemas_1.Booking.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            if (booking)
                return res.json({ booking });
            return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
        }
        catch (error) {
            next(error);
        }
    }),
    destroy: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bdResponse = yield schemas_1.Booking.deleteOne({ _id: req.params.id });
            if (bdResponse.deletedCount > 0)
                return res.status(204).json({ status: res.statusCode, message: 'Deleted' });
            return res.status(404).json({ status: res.statusCode, message: 'Not Found' });
        }
        catch (error) {
            next(error);
        }
    })
};
exports.default = bookingsController;

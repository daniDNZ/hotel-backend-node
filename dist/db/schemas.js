"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const messageSchema = new Schema({
    date: Date,
    customer: String,
    email: String,
    phone: String,
    subject: String,
    comment: String,
    status: Boolean
});
const userSchema = new Schema({
    fullName: String,
    job: String,
    email: String,
    phone: String,
    startDate: Date,
    functions: String,
    status: Boolean,
    password: String,
    photo: String
});
const roomSchema = new Schema({
    type: String,
    number: String,
    price: Number,
    amenities: [String],
    description: String,
    offer: Boolean,
    discount: Number,
    cancellation: String
});
const BookingSchema = new Schema({
    fullName: String,
    checkIn: Date,
    checkOut: Date,
    orderDate: Date,
    specialRequest: String,
    status: {
        type: String,
        enum: ["checkin", "checkout", "inprogress"]
    },
    price: Number,
    rooms: [roomSchema]
});

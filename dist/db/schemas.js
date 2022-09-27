"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.Booking = exports.Room = exports.User = void 0;
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    date: Date,
    customer: String,
    email: String,
    phone: String,
    subject: String,
    comment: String,
    status: Boolean
});
const userSchema = new mongoose_1.Schema({
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
const roomSchema = new mongoose_1.Schema({
    type: String,
    number: String,
    price: Number,
    amenities: [String],
    description: String,
    offer: Boolean,
    discount: Number,
    cancellation: String
});
const bookingSchema = new mongoose_1.Schema({
    fullName: String,
    checkIn: Date,
    checkOut: Date,
    orderDate: Date,
    specialRequest: String,
    status: {
        type: String,
        enum: ["checkIn", "checkOut", "inProgress"],
        default: "checkIn"
    },
    price: Number,
    rooms: [
        {
            id: String,
            type: String,
            number: String
        }
    ]
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.User = User;
const Room = (0, mongoose_1.model)('Room', roomSchema);
exports.Room = Room;
const Booking = (0, mongoose_1.model)('Booking', bookingSchema);
exports.Booking = Booking;
const Message = (0, mongoose_1.model)('Message', messageSchema);
exports.Message = Message;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.Booking = exports.Room = exports.User = exports.StatusEnum = void 0;
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        required: true
    },
    customer: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
});
const userSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    functions: String,
    status: {
        type: Boolean,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo: String
});
const roomSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amenities: [String],
    description: String,
    offer: {
        type: Boolean,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    cancellation: String
});
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["checkIn"] = "checkIn";
    StatusEnum["checkOut"] = "checkOut";
    StatusEnum["inProgress"] = "inProgress";
})(StatusEnum = exports.StatusEnum || (exports.StatusEnum = {}));
const bookingSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    orderDate: {
        type: Date,
        required: true
    },
    specialRequest: String,
    status: {
        type: String,
        enum: ["checkIn", "checkOut", "inProgress"],
        default: "checkIn",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rooms: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Room"
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

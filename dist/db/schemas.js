"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.Booking = exports.Room = exports.User = exports.StatusEnum = void 0;
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
    password: {
        type: String,
        required: true
    },
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
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["checkIn"] = "checkIn";
    StatusEnum["checkOut"] = "checkOut";
    StatusEnum["inProgress"] = "inProgress";
})(StatusEnum = exports.StatusEnum || (exports.StatusEnum = {}));
const bookingSchema = new mongoose_1.Schema({
    fullName: String,
    checkIn: Date,
    checkOut: Date,
    orderDate: Date,
    specialRequest: String,
    status: {
        type: String,
        enum: ["checkIn", "checkOut", "inProgress"],
        default: "checkIn",
        required: true
    },
    price: Number,
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

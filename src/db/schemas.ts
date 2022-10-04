import mongoose, { model, Schema, InferSchemaType } from 'mongoose';

const messageSchema = new Schema({
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

const userSchema = new Schema({
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

const roomSchema = new Schema({
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

export enum StatusEnum {
  checkIn = 'checkIn',
  checkOut = 'checkOut',
  inProgress = 'inProgress'
}

const bookingSchema = new Schema({
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
      type: Schema.Types.ObjectId,
      ref: "Room"
    }
  ]
});

type IUser = InferSchemaType<typeof userSchema>;
type IBooking = InferSchemaType<typeof bookingSchema>;
type IRoom = InferSchemaType<typeof roomSchema>;
type IMessage = InferSchemaType<typeof messageSchema>;

const User = model('User', userSchema);
const Room = model('Room', roomSchema);
const Booking = model('Booking', bookingSchema);
const Message = model('Message', messageSchema);

export { User, Room, Booking, Message, IUser, IBooking, IRoom, IMessage };
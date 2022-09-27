import { model, Schema, InferSchemaType } from 'mongoose';

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

const bookingSchema = new Schema({
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

type IUser = InferSchemaType<typeof userSchema>;
type IBooking = InferSchemaType<typeof bookingSchema>;
type IRoom = InferSchemaType<typeof roomSchema>;
type IMessage = InferSchemaType<typeof messageSchema>;

const User = model('User', userSchema);
const Room = model('Room', roomSchema);
const Booking = model('Booking', bookingSchema);
const Message = model('Message', messageSchema);

export { User, Room, Booking, Message, IUser, IBooking, IRoom, IMessage };
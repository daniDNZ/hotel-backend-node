import mongoose from "mongoose";
import mongoConnection from "./connection";
import { Booking, Message, Room, User } from "./schemas";

deleteData();

async function deleteData() {

  await mongoConnection();

  User.deleteMany({}, (err) => {
    if (err) console.error(err)
    else console.info('Users deleted');
  });
  Room.deleteMany({}, (err) => {
    if (err) console.error(err)
    else console.info('Rooms deleted');
  });
  Booking.deleteMany({}, (err) => {
    if (err) console.error(err)
    else console.info('Bookings deleted');
  });
  Message.deleteMany({}, (err) => {
    if (err) console.error(err)
    else console.info('Messages deleted');
  });
}

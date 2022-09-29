import mongoose from 'mongoose';

async function mongoConnection() {
  await mongoose.connect('mongodb://127.0.0.1:27017/miranda_db');
  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
}

export default mongoConnection;
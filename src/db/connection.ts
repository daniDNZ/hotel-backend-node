import mongoose from 'mongoose';
import config from '../env';

async function mongoConnection() {
  await mongoose.connect(config.DB_URI);
  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
}

export default mongoConnection;
import mongoose from 'mongoose';

async function mongoConnection() {
  await mongoose.connect('mongodb://127.0.0.1:27017/miranda_db');
  console.info('Mongo connected!')
}

export default mongoConnection;
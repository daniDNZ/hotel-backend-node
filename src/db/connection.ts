import mongoose from 'mongoose';

async function mongoConnection() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  console.info('Mongo connected!')
}

export default mongoConnection;
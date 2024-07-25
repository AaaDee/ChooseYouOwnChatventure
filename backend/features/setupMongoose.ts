import mongoose from 'mongoose';

export function setupMongoose() {
  mongoose.set('strictQuery', false);

  const url = process.env.MONGODB_URI;

  console.log('connecting to', url);
  mongoose
    .connect(url || '') // todo validate and change to async
    .then((_result) => {
      console.log('connected to MongoDB');
    })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message);
    });
}

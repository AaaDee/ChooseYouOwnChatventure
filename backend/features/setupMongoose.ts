import mongoose from 'mongoose';

export async function setupMongoose() {
  mongoose.set('strictQuery', false);

  const url = process.env.MONGODB_URI;

  if (!url) {
    throw new Error('Mongodb url missing');
  }

  console.log('connecting to', url);

  try {
    await mongoose.connect(url);
    console.log('connected to MongoDB');
  } catch (error) {
    console.log('error connecting to MongoDB:', error);
  }
}

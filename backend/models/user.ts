import mongoose, { InferRawDocType } from 'mongoose';

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

const userSchemaDefinition = {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  passwordHash: { type: String, required: true }
};

const userSchema = new mongoose.Schema(userSchemaDefinition);

console.log('connecting to', url);
mongoose
  .connect(url || '') // todo validate and change to async
  .then((_result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // todo validation
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export const User = mongoose.model('User', userSchema);

export type UserSchema = InferRawDocType<typeof userSchemaDefinition>;

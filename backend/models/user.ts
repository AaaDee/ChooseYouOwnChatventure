import mongoose from 'mongoose';

const userSchemaDefinition = {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  passwordHash: { type: String, required: true }
};

const userSchema = new mongoose.Schema(userSchemaDefinition, { toObject: {} });

export const User = mongoose.model('User', userSchema);

export interface UserSchema {
  _id: string;
  username: string;
  passwordHash: string;
  toObject: () => object;
}

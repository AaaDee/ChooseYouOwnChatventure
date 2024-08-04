import mongoose, { InferRawDocType } from 'mongoose';

const userSchemaDefinition = {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  passwordHash: { type: String, required: true }
};

const userSchema = new mongoose.Schema(userSchemaDefinition);

export const User = mongoose.model('User', userSchema);

export type UserSchema = InferRawDocType<typeof userSchemaDefinition>;

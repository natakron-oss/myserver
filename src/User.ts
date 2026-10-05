import mongoose, { Document, Schema } from 'mongoose';
import { Utils } from './Utils';

export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
  password: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: { validator: Utils.isValidEmail, message: 'Invalid email format' },
  },
  age: {
    type: Number,
    required: true,
    validate: { validator: Utils.isValidAge, message: 'Age must be an integer between 0 and 120' },
  },
  password: {
    type: String,
    required: true,
    validate: { validator: Utils.isValidPassword, message: 'Password must contain digits only' },
  },
});

export default mongoose.model<IUser>('User', UserSchema);

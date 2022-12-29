import mongoose, { Schema } from 'mongoose';

import { IUser } from 'src/interfaces/user';

const userSchema: Schema = new Schema<IUser>(
  {
    email: { type: String, required: true },
    password: { type: String },
    token: { type: String },
    firebaseUid: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model<IUser>('User', userSchema);

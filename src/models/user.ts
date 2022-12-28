import mongoose, { Schema } from 'mongoose';

import { IUser } from 'src/interfaces/user';

const userSchema: Schema = new Schema<IUser>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, unique: true },
  },
  { timestamps: true },
);

export default mongoose.model<IUser>('User', userSchema);

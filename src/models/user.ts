import mongoose, { Schema } from 'mongoose';

import { IUser } from 'src/interfaces/user';

const userSchema: Schema = new Schema<IUser>(
  {
    password: { type: String, required: true },
    email: { type: String, required: true },
    token: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model<IUser>('User', userSchema);

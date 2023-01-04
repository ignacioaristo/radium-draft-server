import mongoose, { Schema } from 'mongoose';

import { PlayerPosition } from 'src/enums';
import { IPlayer } from 'src/interfaces/player';

const playerSchema: Schema = new Schema<IPlayer>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    skill: { type: Number, required: true },
    position: { type: String, enum: PlayerPosition, required: true },
    fidelity: { type: Number, default: 100 },
    matchesPlayed: { type: Number, default: 0 },
    firebaseUid: { type: String, required: true, unique: true },
    profileImage: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model<IPlayer>('Player', playerSchema);

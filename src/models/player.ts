import mongoose, { Schema } from 'mongoose';

import { PlayerPosition, PlayerStatus } from 'src/enums';
import { IPlayer } from 'src/interfaces/player';

const playerSchema: Schema = new Schema<IPlayer>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    skill: { type: Number, required: true },
    position: { type: String, enum: PlayerPosition, required: true },
    status: { type: String, enum: PlayerStatus, required: true },
    fidelity: { type: Number, default: 100, required: true },
    matchesPlayed: { type: Number },
    firebaseUid: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export default mongoose.model<IPlayer>('Player', playerSchema);

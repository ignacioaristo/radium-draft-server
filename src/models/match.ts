import mongoose, { Schema } from 'mongoose';

import { MatchStatus } from 'src/enums';
import { IMatch } from 'src/interfaces/match';

const matchSchema: Schema = new Schema<IMatch>(
  {
    teamA: [
      {
        ref: 'Player',
        type: Schema.Types.ObjectId,
      },
    ],
    teamB: [
      {
        ref: 'Player',
        type: Schema.Types.ObjectId,
      },
    ],
    date: { type: Date },
    status: { type: String, enum: MatchStatus, default: MatchStatus.toBePlayed },
    result: {
      score: { type: String },
      winner: { type: String },
    },
  },
  { timestamps: true },
);

export default mongoose.model<IMatch>('Match', matchSchema);

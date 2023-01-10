import { MatchStatus, Teams } from 'enums';
import { IMatch } from 'interfaces';
import mongoose, { Schema } from 'mongoose';

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
      teamA: { type: Number },
      teamB: { type: Number },
      winner: { type: String, enum: Teams },
    },
    field: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model<IMatch>('Match', matchSchema);

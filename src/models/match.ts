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
    date: { type: String },
    status: { type: String, enum: MatchStatus, default: MatchStatus.pending },
    result: {
      teamA: { type: Number },
      teamB: { type: Number },
      winner: { type: String, enum: Teams },
    },
    field: { type: String },
    skillAvgA: { type: Number },
    skillAvgB: { type: Number },
    time: { type: String },
    owner: {
      ref: 'Player',
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IMatch>('Match', matchSchema);

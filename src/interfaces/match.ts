import { MatchStatus } from 'enums';
import { Types } from 'mongoose';

export interface IMatch {
  teamA: Types.ObjectId[];
  teamB: Types.ObjectId[];
  date: Date;
  result?: Result;
  status: MatchStatus;
  field: string;
}

interface Result {
  teamA: number;
  teamB: number;
  winner: string;
}

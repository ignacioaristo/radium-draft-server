import { MatchStatus } from 'enums';
import { Types } from 'mongoose';

export interface IMatch {
  teamA: Types.ObjectId[];
  teamB: Types.ObjectId[];
  date?: string;
  result?: Result;
  status: MatchStatus;
  field?: string;
  skillAvgA: number;
  skillAvgB: number;
  time?: string;
  owner: Types.ObjectId;
}

interface Result {
  teamA: number;
  teamB: number;
  winner: string;
}

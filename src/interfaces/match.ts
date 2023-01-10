import { MatchStatus } from 'enums';
import { Types } from 'mongoose';

// import { IPlayer } from './player';

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

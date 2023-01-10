import { MatchStatus } from 'enums';
import { PopulatedDoc } from 'mongoose';

import { IPlayer } from './player';

export interface IMatch {
  teamA: PopulatedDoc<IPlayer>[];
  teamB: PopulatedDoc<IPlayer>[];
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

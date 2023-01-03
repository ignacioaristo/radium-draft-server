import { PopulatedDoc } from 'mongoose';

import { MatchStatus } from 'src/enums';

import { IPlayer } from './player';

export interface IMatch {
  teamA: PopulatedDoc<IPlayer>[];
  teamB: PopulatedDoc<IPlayer>[];
  date: Date;
  result: Result;
  status: MatchStatus;
}

interface Result {
  teamA: number;
  teamB: number;
  winner: string;
}

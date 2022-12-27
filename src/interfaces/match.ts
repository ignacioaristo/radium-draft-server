import { PopulatedDoc } from 'mongoose';

import { IPlayer } from './player';

export interface IMatch {
  teamA: PopulatedDoc<IPlayer>[];
  teamB: PopulatedDoc<IPlayer>[];
  date: Date;
  result: Result;
}

interface Result {
  score: string;
  winner: string;
}

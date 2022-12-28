import { PopulatedDoc } from 'mongoose';

import { PlayerPosition, PlayerStatus } from 'src/enums';

import { IUser } from './user';

export interface IPlayer {
  firstName: string;
  lastName: string;
  skill: number;
  position: PlayerPosition;
  status: PlayerStatus;
  fidelity: number;
  matchsPlayed: number;
  userID: PopulatedDoc<IUser>;
}

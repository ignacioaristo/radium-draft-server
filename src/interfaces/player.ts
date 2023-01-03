import { PlayerPosition } from 'src/enums';

export interface IPlayer {
  firstName: string;
  lastName: string;
  skill: number;
  position: PlayerPosition;
  fidelity: number;
  matchesPlayed: number;
  firebaseUid: string;
}

export type YUPPlayer = Pick<IPlayer, 'firstName' | 'lastName' | 'position' | 'skill'>;

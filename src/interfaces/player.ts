import { PlayerPosition, PlayerStatus } from 'src/enums';

export interface IPlayer {
  firstName: string;
  lastName: string;
  skill: number;
  position: PlayerPosition;
  status: PlayerStatus;
  fidelity: number;
  matchesPlayed: number;
  firebaseUid: string;
}

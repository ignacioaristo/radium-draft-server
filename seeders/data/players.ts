import { Types } from 'mongoose';

import { PlayerPosition, PlayerStatus } from '../../src/enums';
import { IPlayer } from '../../src/interfaces/player';

interface PLayerWithID extends IPlayer {
  _id: Types.ObjectId;
}

const players: PLayerWithID[] = [
  {
    _id: new Types.ObjectId('633352e770544e542a608f29'),
    firstName: 'Santiago',
    lastName: 'Gigli',
    skill: 70,
    position: PlayerPosition.goalkeeper,
    status: PlayerStatus.starter,
    fidelity: 100,
    matchsPlayed: 1,
  },
  {
    _id: new Types.ObjectId('633352e770544e542a608f2a'),
    firstName: 'Julian',
    lastName: 'Vicente',
    skill: 70,
    position: PlayerPosition.flex,
    status: PlayerStatus.starter,
    fidelity: 100,
    matchsPlayed: 1,
  },
  {
    _id: new Types.ObjectId('633352e770544e542a608f2b'),
    firstName: 'Ignacio',
    lastName: 'Aristo',
    skill: 70,
    position: PlayerPosition.defender,
    status: PlayerStatus.starter,
    fidelity: 100,
    matchsPlayed: 1,
  },
];

export default players;

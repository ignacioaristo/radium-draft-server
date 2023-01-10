import { Types } from 'mongoose';

import { MatchStatus } from '../../src/enums';
import { IMatch } from '../../src/interfaces/match';

interface MatchWithID extends IMatch {
  _id: Types.ObjectId;
}

const matches: MatchWithID[] = [
  {
    _id: new Types.ObjectId('633352e770544e542a608f22'),
    teamA: [
      new Types.ObjectId('633352e770544e542a608f29'),
      new Types.ObjectId('633352e770544e542a608f2a'),
      new Types.ObjectId('633352e770544e542a608f2b'),
      new Types.ObjectId('63b1ef2dc06030be7fb7b4cb'),
      new Types.ObjectId('63b1efd99726809eb2410704'),
    ],
    teamB: [
      new Types.ObjectId('63b1efd99726809eb2410705'),
      new Types.ObjectId('63b1efd99726809eb2410706'),
      new Types.ObjectId('63b1efd99726809eb2410707'),
      new Types.ObjectId('63b1efd99726809eb2410708'),
      new Types.ObjectId('63b1efd99726809eb2410709'),
    ],
    date: new Date(),
    result: {
      teamA: 5,
      teamB: 3,
      winner: 'teamA',
    },
    status: MatchStatus.finished,
    field: 'La previa',
  },
  {
    _id: new Types.ObjectId('633352e770544e542a618f22'),
    teamA: [
      new Types.ObjectId('633352e770544e542a608f29'),
      new Types.ObjectId('633352e770544e542a608f2a'),
      new Types.ObjectId('633352e770544e542a608f2b'),
      new Types.ObjectId('63b1ef2dc06030be7fb7b4cb'),
      new Types.ObjectId('63b1efd99726809eb2410704'),
    ],
    teamB: [
      new Types.ObjectId('63b1efd99726809eb2410705'),
      new Types.ObjectId('63b1efd99726809eb2410706'),
      new Types.ObjectId('63b1efd99726809eb2410707'),
      new Types.ObjectId('63b1efd99726809eb2410708'),
      new Types.ObjectId('63b1efd99726809eb2410709'),
    ],
    date: new Date(),
    result: {
      teamA: 5,
      teamB: 3,
      winner: 'teamA',
    },
    status: MatchStatus.finished,
    field: 'La previa',
  },
  {
    _id: new Types.ObjectId('633352e770544e542a608f42'),
    teamA: [
      new Types.ObjectId('633352e770544e542a608f29'),
      new Types.ObjectId('633352e770544e542a608f2a'),
      new Types.ObjectId('633352e770544e542a608f2b'),
      new Types.ObjectId('63b1ef2dc06030be7fb7b4cb'),
      new Types.ObjectId('63b1efd99726809eb2410704'),
    ],
    teamB: [
      new Types.ObjectId('63b1efd99726809eb2410705'),
      new Types.ObjectId('63b1efd99726809eb2410706'),
      new Types.ObjectId('63b1efd99726809eb2410707'),
      new Types.ObjectId('63b1efd99726809eb2410708'),
      new Types.ObjectId('63b1efd99726809eb2410709'),
    ],
    date: new Date(),
    status: MatchStatus.cancelled,
    field: 'La previa',
  },
  {
    _id: new Types.ObjectId('633352e770544e542a608f22'),
    teamA: [
      new Types.ObjectId('633352e770544e542a608f29'),
      new Types.ObjectId('633352e770544e542a608f2a'),
      new Types.ObjectId('633352e770544e542a608f2b'),
      new Types.ObjectId('63b1ef2dc06030be7fb7b4cb'),
      new Types.ObjectId('63b1efd99726809eb2410704'),
    ],
    teamB: [
      new Types.ObjectId('63b1efd99726809eb2410705'),
      new Types.ObjectId('63b1efd99726809eb2410706'),
      new Types.ObjectId('63b1efd99726809eb2410707'),
      new Types.ObjectId('63b1efd99726809eb2410708'),
      new Types.ObjectId('63b1efd99726809eb2410709'),
    ],
    date: new Date(),
    status: MatchStatus.toBePlayed,
    field: 'La previa',
  },
];

export default matches;

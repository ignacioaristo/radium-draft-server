import { Types } from 'mongoose';

import { IMatch } from '../../src/interfaces/match';

interface MatchWithID extends IMatch {
  _id: Types.ObjectId;
}

const matches: MatchWithID[] = [
  {
    _id: new Types.ObjectId('633352e770544e542a608f22'),
    teamA: [],
    teamB: [],
    date: new Date(),
    result: {
      teamA: 5,
      teamB: 3,
      winner: 'teamA',
    },
    status: 'Finished',
    field: 'La previa',
  },
];

export default matches;

import 'express';

import { UserTypes } from 'src/interfaces/userTypes';

interface locals {
  userType: UserTypes;
  firebaseUid: string;
}

declare module 'express' {
  export interface Response {
    locals: locals;
  }
}

import 'express';
import { UserTypes } from 'interfaces';

interface locals {
  userType: UserTypes;
  firebaseUid: string;
}

declare module 'express' {
  export interface Response {
    locals: locals;
  }
}

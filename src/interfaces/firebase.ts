import { UserTypes } from './userTypes';

export interface FirebaseUser {
  uid: string;
  email?: string;
  emailVerified?: boolean;
  password?: string;
  userType?: UserTypes;
}

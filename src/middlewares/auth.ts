import { NextFunction, Request, Response } from 'express';

import Firebase from 'src/config/firebase';

export interface RequestWithFirebase extends Request {
  firebaseUid?: string;
}

export const checkToken = async (req: RequestWithFirebase, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.boom.badRequest('Token is required');
  }
  return Firebase.auth()
    .verifyIdToken(req.headers.authorization)
    .then((decodedToken) => {
      req.firebaseUid = decodedToken.uid;
      return next();
    })
    .catch((error) => {
      console.log('error', error);
      return res.boom.unauthorized('Access not allowed');
    });
};

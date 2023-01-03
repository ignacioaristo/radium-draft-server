import { NextFunction, Request, Response } from 'express';

import Firebase from 'src/config/firebase';

export interface RequestWithFirebase extends Request {
  firebaseUid?: string;
}

export const checkToken = async (req: RequestWithFirebase, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.boom.badRequest('Token is required');
    }
    const decodedToken = await Firebase.auth().verifyIdToken(req.headers.authorization);
    res.locals.firebaseUid = decodedToken.uid;
    return next();
  } catch (error) {
    return res.boom.unauthorized('Access not allowed');
  }
};

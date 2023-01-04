import { NextFunction, Request, Response } from 'express';

import Firebase from 'src/config/firebase';
import { UserTypes } from 'src/interfaces/userTypes';
import Player from 'src/models/player';

export interface RequestWithFirebase extends Request {
  firebaseUid?: string;
}

export const isFirebaseTokenValid = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.boom.forbidden('Provide a token');

    const decodedToken = await Firebase.auth().verifyIdToken(authorization);
    res.locals.firebaseUid = decodedToken?.uid;
    return next();
  } catch (ex) {
    return res.boom.forbidden('Invalid token format');
  }
};

export const isPlayerAuthMiddleware = async (
  req: RequestWithFirebase,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.headers.authorization) {
      return res.boom.badRequest('Token is required');
    }
    const decodedToken = await Firebase.auth().verifyIdToken(req.headers.authorization);

    if (decodedToken.userType !== UserTypes.PLAYER) {
      throw new Error('Provide a valid player token');
    }

    const player = await Player.findOne({ firebaseUID: decodedToken.uid });
    if (!player) {
      return res.boom.unauthorized('Player does not exist.');
    }

    res.locals.firebaseUid = decodedToken.uid;
    res.locals.userType = decodedToken.userType;

    return next();
  } catch (error) {
    return res.boom.unauthorized('Access not allowed');
  }
};

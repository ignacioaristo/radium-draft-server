import { Request, Response } from 'express';

import Firebase from 'src/config/firebase';
import { UserTypes } from 'src/interfaces/userTypes';
import Player from 'src/models/player';

export const createPlayer = async (req: Request, res: Response) => {
  try {
    const { firebaseUid } = res.locals;
    const newPlayer = new Player({ ...req.body, firebaseUid });
    await newPlayer.save();

    await Firebase.auth().setCustomUserClaims(firebaseUid, {
      userType: UserTypes.PLAYER,
    });

    return res.status(200).json({
      statusCode: 200,
      message: 'Player Created',
      payload: newPlayer,
    });
  } catch (error) {
    if (error instanceof Error) return res.boom.internal(error.message);
    return res.boom.internal(String(error));
  }
};

export const getPlayers = async (req: Request, res: Response) => {
  try {
    const players = await Player.find();

    return res.status(200).json({
      statusCode: 200,
      message: 'Players Found',
      payload: players,
    });
  } catch (error) {
    if (error instanceof Error) return res.boom.internal(error.message);
    return res.boom.internal(String(error));
  }
};

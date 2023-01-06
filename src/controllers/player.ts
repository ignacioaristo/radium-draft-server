import { Request, Response } from 'express';

import Firebase from 'src/config/firebase';
import { UserTypes } from 'src/interfaces/userTypes';
import Player from 'src/models/player';

export const createPlayer = async (req: Request, res: Response) => {
  const { firebaseUid } = res.locals;
  try {
    const newPlayer = new Player({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      position: req.body.position,
      skill: req.body.skill,
      firebaseUid,
    });
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
    try {
      Firebase.auth().deleteUser(firebaseUid);
    } catch (error) {
      console.log('Remove Firebase Account Error - ', error);
    }
    if (error instanceof Error) return res.boom.internal(error.message);
    return res.boom.internal(String(error));
  }
};

export const getPlayer = async (req: Request, res: Response) => {
  try {
    const { firebaseUid } = res.locals;
    const player = await Player.findOne({ firebaseUid });

    if (!player) throw new Error('No player found');
    return res.status(200).json(player);
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

export const editPlayer = async (req: Request, res: Response) => {
  try {
    const { firebaseUid } = res.locals;
    const body = req.body;
    const player = await Player.findOneAndUpdate(
      { firebaseUid },
      {
        firstName: body.firstName,
        lastName: body.lastName,
        position: body.position,
        skill: body.skill,
        profileImage: body.profileImage,
      },
      { new: true },
    );
    if (!player) throw new Error('No player found');

    return res.status(200).json(player);
  } catch (error) {
    if (error instanceof Error) return res.boom.internal(error.message);
    return res.boom.internal(String(error));
  }
};

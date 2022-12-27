/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import Player from 'src/models/player';

export const createPlayer = async (req: Request, res: Response) => {
  try {
    const newPlayer = new Player(req.body);
    await newPlayer.save();

    return res.status(200).json({
      statusCode: 200,
      success: 'Player Created',
      data: newPlayer,
    });
  } catch (error: any) {
    return res.boom.internal(error.message);
  }
};

export const getPlayers = async (req: Request, res: Response) => {
  try {
    const players = await Player.find();

    return res.status(200).json({
      statusCode: 200,
      success: 'Players Found',
      data: players,
    });
  } catch (error: any) {
    return res.boom.internal(error.message);
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import Match from 'src/models/match';

export const createMatch = async (req: Request, res: Response) => {
  try {
    const newMatch = new Match(req.body);
    await newMatch.save();

    return res.status(200).json({
      statusCode: 200,
      success: 'Match Created',
      data: newMatch,
    });
  } catch (error: any) {
    return res.boom.internal(error.message);
  }
};

export const getMatchs = async (req: Request, res: Response) => {
  try {
    const matchs = await Match.find();

    return res.status(200).json({
      statusCode: 200,
      success: 'Matchs Found',
      data: matchs,
    });
  } catch (error: any) {
    return res.boom.internal(error.message);
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { MatchStatus } from 'src/enums';
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

export const getActiveMatchs = async (req: Request, res: Response) => {
  try {
    const matchs = await Match.find({ status: MatchStatus.toBePlayed }).populate('teamA teamB');

    if (!matchs || matchs.length === 0) {
      throw new Error('Matchs not found');
    }

    return res.status(200).json({
      statusCode: 200,
      success: 'Matchs Found',
      data: matchs,
    });
  } catch (error: any) {
    return res.boom.internal(error.message);
  }
};

export const getInactiveMatchs = async (req: Request, res: Response) => {
  try {
    const matchs = await Match.find({
      $or: [{ status: MatchStatus.cancelled }, { status: MatchStatus.finished }],
    }).populate('teamA teamB');

    if (!matchs || matchs.length === 0) {
      throw new Error('Matchs not found');
    }

    return res.status(200).json({
      statusCode: 200,
      success: 'Matchs Found',
      data: matchs,
    });
  } catch (error: any) {
    return res.boom.internal(error.message);
  }
};

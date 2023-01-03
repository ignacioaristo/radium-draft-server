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

export const getActiveMatches = async (req: Request, res: Response) => {
  try {
    const matches = await Match.find({ status: MatchStatus.toBePlayed }).populate('teamA teamB');

    if (!matches || matches.length === 0) {
      throw new Error('Matches not found');
    }

    return res.status(200).json({
      statusCode: 200,
      success: 'Matches Found',
      data: matches,
    });
  } catch (error: any) {
    return res.boom.internal(error.message);
  }
};

export const getInactiveMatches = async (req: Request, res: Response) => {
  try {
    const matches = await Match.find({
      $or: [{ status: MatchStatus.cancelled }, { status: MatchStatus.finished }],
    }).populate('teamA teamB');

    if (!matches || matches.length === 0) {
      throw new Error('Matches not found');
    }

    return res.status(200).json({
      statusCode: 200,
      success: 'Matches Found',
      data: matches,
    });
  } catch (error: any) {
    return res.boom.internal(error.message);
  }
};

export const getMatches = async (req: Request, res: Response) => {
  try {
    const matches = await Match.find();

    return res.status(200).json({
      statusCode: 200,
      success: 'Matches Found',
      data: matches,
    });
  } catch (error: any) {
    return res.boom.internal(error.message);
  }
};

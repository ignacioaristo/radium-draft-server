/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { MatchStatus } from 'src/enums';
import Match from 'src/models/match';

export const createMatch = async (req: Request, res: Response) => {
  try {
    const newMatch = new Match(req.body);
    await newMatch.save();

    return res.status(200).json(newMatch);
  } catch (error) {
    if (error instanceof Error) return res.boom.internal(error.message);
    return res.boom.internal(String(error));
  }
};

export const getMatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const match = await Match.findById(id).populate('teamA teamB');

    if (!match) throw new Error('Match not found');

    return res.status(200).json(match);
  } catch (error) {
    if (error instanceof Error) return res.boom.internal(error.message);
    return res.boom.internal(String(error));
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
      message: 'Matches Found',
      payload: matches,
    });
  } catch (error) {
    if (error instanceof Error) return res.boom.internal(error.message);
    return res.boom.internal(String(error));
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
      message: 'Matches Found',
      payload: matches,
    });
  } catch (error) {
    if (error instanceof Error) return res.boom.internal(error.message);
    return res.boom.internal(String(error));
  }
};

export const getMatches = async (req: Request, res: Response) => {
  try {
    const matches = await Match.find();

    return res.status(200).json({
      statusCode: 200,
      message: 'Matches Found',
      payload: matches,
    });
  } catch (error) {
    if (error instanceof Error) return res.boom.internal(error.message);
    return res.boom.internal(String(error));
  }
};
export const cancelMatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const match = await Match.findById({ _id: id });

    if (!match) {
      throw new Error('Match not found');
    }

    if (match.status !== MatchStatus.toBePlayed) {
      throw new Error(`Match status is not ${MatchStatus.toBePlayed}`);
    }

    match.status = MatchStatus.cancelled;
    await match.save();

    return res.status(200).json({
      statusCode: 200,
      success: 'Matchs Cancelled',
      payload: match,
    });
  } catch (error) {
    if (error instanceof Error) return res.boom.internal(error.message);
    return res.boom.internal(String(error));
  }
};

interface ResultBody {
  teamA: number;
  teamB: number;
}

export const finishMatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { teamA, teamB }: ResultBody = req.body.result;
    const match = await Match.findById({ _id: id });

    if (!match) {
      throw new Error('Match not found');
    }

    if (match.status !== MatchStatus.toBePlayed) {
      throw new Error(`Match status is not ${MatchStatus.toBePlayed}`);
    }

    match.status = MatchStatus.finished;
    match.result = {
      teamA,
      teamB,
      winner: teamA === teamB ? 'Draw' : teamA > teamB ? 'teamA' : 'teamB',
    };
    await match.save();

    return res.status(200).json({
      statusCode: 200,
      success: 'Match Finished',
      payload: match,
    });
  } catch (error) {
    if (error instanceof Error) return res.boom.internal(error.message);
    return res.boom.internal(String(error));
  }
};

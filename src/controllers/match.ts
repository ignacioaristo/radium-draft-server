/* eslint-disable @typescript-eslint/no-explicit-any */
import { MatchStatus } from 'enums';
import { Request, Response } from 'express';
import { IPlayer } from 'interfaces';
import { UserTypes } from 'interfaces/userTypes';
import Match from 'models/match';
import Player from 'models/player';

import { draftLogic } from 'src/utils';

interface Match {
  teamA: IPlayer[];
  teamB: IPlayer[];
  skillAvgA: number;
  skillAvgB: number;
  owner: string;
}

export const createMatch = async (req: Request, res: Response) => {
  try {
    const { players, firebaseUID } = req.body.payload;

    const foundPlayer = await Player.findOne({ firebaseUid: firebaseUID });

    if (!foundPlayer) {
      throw new Error('Player not found');
    }

    const draftedPlayers = draftLogic(players);

    const payload: Match = {
      owner: foundPlayer?.id,
      teamA: draftedPlayers?.teamA,
      teamB: draftedPlayers?.teamB,
      skillAvgA: draftedPlayers?.skillAvgA,
      skillAvgB: draftedPlayers?.skillAvgB,
    };

    const newMatch = new Match(payload);
    await newMatch.save();

    const matchFound = await Match.findOne({ _id: newMatch._id })
      .populate({
        path: 'teamA',
        select: ['firstName', 'lastName', 'position', 'skill'],
      })
      .populate({
        path: 'teamB',
        select: ['firstName', 'lastName', 'position', 'skill'],
      });

    return res.status(201).json(matchFound);
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

    return res.status(200).json(matches);
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

    return res.status(200).json(matches);
  } catch (error) {
    if (error instanceof Error) return res.boom.internal(error.message);
    return res.boom.internal(String(error));
  }
};

export const getMatches = async (req: Request, res: Response) => {
  try {
    const { userType, firebaseUid } = res.locals;

    if (userType !== UserTypes.PLAYER) {
      const matches = await Match.find();

      return res.status(200).json(matches);
    }

    const currentPlayer = await Player.findOne({ firebaseUid });
    const matches = await Match.find({
      $or: [{ teamA: currentPlayer?._id }, { teamB: currentPlayer?._id }],
    }).populate('teamA teamB');

    return res.status(200).json(matches);
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

    return res.status(200).json(match);
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

    return res.status(200).json(match);
  } catch (error) {
    if (error instanceof Error) return res.boom.internal(error.message);
    return res.boom.internal(String(error));
  }
};

export const reDraft = async (req: Request, res: Response) => {
  try {
    const { players } = req.body;
    const { id } = req.params;

    const draftedPlayers = draftLogic(players);

    const resUpdate = await Match.findOneAndUpdate(
      { _id: id },
      {
        teamA: draftedPlayers.teamA,
        teamB: draftedPlayers.teamB,
        skillAvgA: draftedPlayers.skillAvgA,
        skillAvgB: draftedPlayers.skillAvgB,
      },
      { new: true },
    )
      .populate({
        path: 'teamA',
        select: ['firstName', 'lastName', 'position', 'skill'],
      })
      .populate({
        path: 'teamB',
        select: ['firstName', 'lastName', 'position', 'skill'],
      });

    return res.status(200).json(resUpdate);
  } catch (error) {
    if (error instanceof Error) return res.boom.internal(error.message);
    return res.boom.internal(String(error));
  }
};

export const updateMatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { date, time, field } = req.body;

    const updatedMatch = await Match.findOneAndUpdate(
      { _id: id },
      {
        date,
        time,
        status: MatchStatus.toBePlayed,
        field,
      },
      { new: true },
    );

    return res.status(200).json(updatedMatch);
  } catch (error) {
    if (error instanceof Error) return res.boom.internal(error.message);
    return res.boom.internal(String(error));
  }
};

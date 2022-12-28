/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User from 'src/models/user';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = jwt.sign({ email }, '1234');
    const user = await User.findOneAndUpdate({ email }, { token }, { new: true });

    if (!user) {
      throw new Error('User not found');
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Login Completed',
      payload: user,
    });
  } catch (error: any) {
    return res.boom.internal(error.message);
  }
};

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = jwt.sign({ email }, '1234');
    const newUser = new User({ email, password, token });
    await newUser.save();

    return res.status(200).json({
      statusCode: 200,
      message: 'User Created',
    });
  } catch (error: any) {
    return res.boom.internal(error.message);
  }
};

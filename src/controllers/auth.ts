import { Request, Response } from 'express';

import { Firebase } from 'src/config/firebase';
import User from 'src/models/user';

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const newFirebaseUser = await Firebase.auth().createUser({
      email,
      password,
    });
    const newUser = new User({
      email,
      firebaseUid: newFirebaseUser.uid,
    });
    await newUser.save();

    return res.status(200).json({
      statusCode: 200,
      success: 'User Created',
      data: newUser,
    });
  } catch (error: any) {
    return res.boom.internal(error.message);
  }
};

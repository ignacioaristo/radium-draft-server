import { NextFunction, Request, Response } from 'express';

const checkAuth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(400).json({ message: 'Provide a token' });
    }

    return next();
  } catch (error: any) {
    return res.status(401).json({ message: error.toString() });
  }
};

export default checkAuth;

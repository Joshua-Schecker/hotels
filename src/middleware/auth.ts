import { NextFunction, Request, Response } from 'express';
import { pb } from '../pocketbase';

// Middleware to verify JWT token
const authHook = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  if (!token) {
    return res.status(401).send({ message: 'No token provided.' });
  }
  pb.authStore.save(token, null);

  try {
    await pb.collection("users").authRefresh()
  } catch (error) {
    console.error(error);
    res.status(403).send({ message: 'Invalid token.' });
  }
};

export default authHook;

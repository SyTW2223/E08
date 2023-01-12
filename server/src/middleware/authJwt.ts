require('dotenv').config();

import { Request, Response, NextFunction } from 'express';
import { Secret, JwtPayload, verify, sign } from 'jsonwebtoken';

/** Interface for a request */
export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

/** Interface for a user */
interface User {
  accountName: string;
}


/**
 * Function to generate JWT tokens
 */
export function generateAccessToken(user: User) {
  return sign(user, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '2h'});
}


/**
 * Function to verify JWT tokens
 */
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error();
    }
    
    const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET as Secret);
    (req as CustomRequest).token = decoded;
 
    next();
  } catch (err) {
    res.status(401).send('Please authenticate');
  }
}


export default {
  authenticateToken,
  generateAccessToken
}

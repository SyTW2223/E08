require('dotenv').config();

import { Request, Response, NextFunction } from 'express';
import { Secret, JwtPayload, verify } from 'jsonwebtoken';

/** Interface for a request */
export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

/**
 * Function to verify JWT tokens
 */
const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
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


export default authenticateToken;

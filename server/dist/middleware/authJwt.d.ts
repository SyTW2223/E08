/// <reference types="qs" />
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
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
export declare function generateAccessToken(user: User): string;
/**
 * Function to verify JWT tokens
 */
export declare const authenticateToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const _default: {
    authenticateToken: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;
    generateAccessToken: typeof generateAccessToken;
};
export default _default;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.generateAccessToken = void 0;
require('dotenv').config();
const jsonwebtoken_1 = require("jsonwebtoken");
/**
 * Function to generate JWT tokens
 */
function generateAccessToken(user) {
    return (0, jsonwebtoken_1.sign)(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
}
exports.generateAccessToken = generateAccessToken;
/**
 * Function to verify JWT tokens
 */
const authenticateToken = async (req, res, next) => {
    try {
        const token = req.header('authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error();
        }
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_TOKEN_SECRET);
        req.token = decoded;
        next();
    }
    catch (err) {
        res.status(401).send('Please authenticate');
    }
};
exports.authenticateToken = authenticateToken;
exports.default = {
    authenticateToken: exports.authenticateToken,
    generateAccessToken
};

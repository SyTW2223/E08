"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const mongoose_1 = require("mongoose");
const AccountSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, 'A username is required'],
        trim: true,
    },
    accountName: {
        type: String,
        required: [true, 'An account name is required'],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'An email is required'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'A password is required'],
        trim: true,
    },
    description: {
        type: String,
        default: "",
    },
    profilePicture: {
        type: String,
        default: "",
    },
    posts: [
        {
            type: mongoose_1.Schema.Types.ObjectId, ref: 'Post',
        },
    ],
    likedPosts: [
        {
            type: mongoose_1.Schema.Types.ObjectId, ref: 'Post',
        },
    ],
});
/**
 * The final model for the Account database
 */
exports.Account = (0, mongoose_1.model)('Account', AccountSchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    accountName: {
        type: String,
        required: true,
        trim: true,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    likesFromAccounts: [
        {
            type: String,
        },
    ],
    tags: [
        {
            type: String,
            trim: true,
            enum: [
                "Science", "Computers", "Gaming", "Sports", "Music",
            ],
        }
    ]
});
/**
 * The final model for the Post database
 */
exports.Post = (0, mongoose_1.model)('Post', PostSchema);

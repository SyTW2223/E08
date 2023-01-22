"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchRouter = void 0;
require('dotenv').config();
const express = require("express");
const post_1 = require("../models/post");
const account_1 = require("../models/account");
const jwt = require("../middleware/authJwt");
/**
 * Contains all the functionality to store items in the database
 */
exports.patchRouter = express.Router();
/**
 * Patch likes on a post
*/
exports.patchRouter.patch('/like', jwt.authenticateToken, async (req, res) => {
    try {
        if (!req.body.postID || !req.body.accountLike) {
            return res.status(400).json({
                error: 'A post ID and account name must be provided'
            });
        }
        const post = await post_1.Post.findById(req.body.postID);
        const account = await account_1.Account.findOne({ accountName: req.body.accountLike });
        if (!account || !post) {
            return res.status(404).json({
                error: 'Account or post not found'
            });
        }
        if (post.likesFromAccounts.includes(account.accountName) && account.likedPosts.includes(post._id)) {
            account.likedPosts = account.likedPosts.filter(postID => {
                return postID.toString() !== post._id.toString();
            });
            post.likesFromAccounts = post.likesFromAccounts.filter(acc => acc !== account.accountName);
        }
        else {
            post.likesFromAccounts.push(account.accountName);
            account.likedPosts.push(post._id);
        }
        await post.save();
        await account.save();
        return res.status(200).json(post);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
/**
 * Patches the editable information of an account
 */
exports.patchRouter.patch('/account', jwt.authenticateToken, async (req, res) => {
    if (!req.query.accountName) {
        return res.status(400).send({
            error: 'An account name must be provided',
        });
    }
    const allowedUpdates = ['username', 'description', 'profilePicture'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));
    if (!isValidUpdate) {
        return res.status(400).send({
            error: 'Update is not permitted',
        });
    }
    try {
        const account = await account_1.Account.findOneAndUpdate({ accountName: req.query.accountName.toString() }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!account) {
            return res.status(404).send();
        }
        if (req.body.profilePicture) {
            await post_1.Post.updateMany({ _id: { $in: account.posts } }, { $set: { profilePicture: account.profilePicture } }, { new: true });
        }
        return res.send(account);
    }
    catch (error) {
        return res.status(400).send(error);
    }
});

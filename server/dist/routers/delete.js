"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRouter = void 0;
const express = require("express");
const account_1 = require("../models/account");
const post_1 = require("../models/post");
const jwt = require("../middleware/authJwt");
/**
 * Contains all the functionability related to get post information
 */
exports.deleteRouter = express.Router();
/**
 * delete all the info from an account by its account name
 */
exports.deleteRouter.delete('/account', jwt.authenticateToken, (req, res) => {
    const filter = req.query.accountName ? { accountName: req.query.accountName.toString() } : undefined;
    if (!filter) {
        res.status(404).send("An account name needs to be provided");
    }
    else {
        account_1.Account.findOneAndDelete(filter)
            .then((account) => {
            if (!account) {
                res.status(404).send("Account not found");
            }
            else {
                res.send(account);
            }
        }).catch(() => {
            res.status(400).send();
        });
        post_1.Post.deleteMany(filter).then().catch(() => {
            res.status(400).send();
        });
    }
});
/**
 * delete all the info from an account by its id
 */
exports.deleteRouter.delete('/account/:id', jwt.authenticateToken, (req, res) => {
    account_1.Account.findById(req.params.id).then((account) => {
        if (!account) {
            res.status(404).send();
        }
        else {
            const filter = { accountName: account.accountName.toString() };
            account_1.Account.findOneAndDelete(filter)
                .then((account) => {
                if (!account) {
                    res.status(404).send();
                }
                else {
                    res.send(account);
                }
            }).catch(() => {
                res.status(400).send();
            });
            post_1.Post.deleteMany(filter).then().catch(() => {
                res.status(400).send();
            });
            ;
        }
        ;
    });
});
/**
 * delete a post by its id
 * */
exports.deleteRouter.delete('/post', jwt.authenticateToken, async (req, res) => {
    try {
        if (!req.body.postID || !req.body.accountName) {
            return res.status(400).json({
                error: 'A post ID and an account name must be provided',
            });
        }
        const post = await post_1.Post.findById(req.body.postID);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        if (post.accountName !== req.body.accountName) {
            return res.status(400).json({ error: 'Account name does not match post' });
        }
        const account = await account_1.Account.findOne({ accountName: post.accountName });
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        const deletedPost = await post_1.Post.findByIdAndDelete(req.body.postID);
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        else {
            account.posts = account.posts.filter(postID => {
                return postID.toString() !== deletedPost._id.toString();
            });
            await account.save();
            return res.json(deletedPost);
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
require('dotenv').config();
const express = require("express");
const account_1 = require("../models/account");
const post_1 = require("../models/post");
const jwt = require("../middleware/authJwt");
const bcryptjs = require('bcryptjs');
/**
 * Contains all the functionality to store items in the database
 */
exports.postRouter = express.Router();
/**
 * Stores an account with all its data in the database
 */
exports.postRouter.post('/signup', async (req, res) => {
    const filter = { accountName: req.body.accountName };
    account_1.Account.findOne(filter).then(async (account) => {
        if (account === null) {
            let password = req.body.password;
            if (password !== undefined) {
                password = await bcryptjs.hash(password, 10);
            }
            const account = new account_1.Account({
                username: req.body.username,
                accountName: req.body.accountName,
                email: req.body.email,
                password: password,
                description: req.body.description,
                posts: req.body.posts,
                likedPosts: req.body.likedPosts
            });
            account.save().then(() => {
                res.status(201).send({
                    message: "Account successfully created",
                });
            }).catch((error) => {
                res.status(400).send(error);
            });
        }
        else {
            res.status(409).send({
                error: 'The account name is already in use',
            });
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send();
    });
});
/**
 * Check if a user is registered
 */
exports.postRouter.post('/login', (req, res) => {
    if (!req.body.accountName || !req.body.password) {
        res.status(400).send({
            error: 'An account name and password must be provided',
        });
    }
    else {
        const filter = { accountName: req.body.accountName.toString() };
        account_1.Account.findOne(filter).then(async (account) => {
            const passwd = req.body.password.toString();
            if (account === null) {
                res.status(404).send({
                    error: "No account found",
                });
            }
            else {
                let compare = await bcryptjs.compare(passwd, account.password);
                if (compare) {
                    const accountName = account.accountName;
                    const user = { accountName: accountName };
                    const accessToken = jwt.generateAccessToken(user);
                    res.status(201).send({
                        id: account._id,
                        username: account.username,
                        accountName: account.accountName,
                        email: account.email,
                        accessToken: accessToken,
                    });
                }
                else {
                    res.status(404).send({
                        error: "Incorrect password",
                    });
                }
            }
        }).catch(() => {
            res.status(500).send();
        });
    }
});
/**
 * Stores a post with all its data in the database
 */
exports.postRouter.post('/post', jwt.authenticateToken, (req, res) => {
    if (!req.body.accountName) {
        res.status(400).send({
            error: 'An account name for the post must be provided',
        });
    }
    else {
        account_1.Account.findOne({ accountName: req.body.accountName.toString() }).then(async (account) => {
            if (account === null) {
                res.status(404).send({
                    error: 'Account not found',
                });
            }
            else {
                const newPost = new post_1.Post({
                    title: req.body.title,
                    content: req.body.content,
                    accountName: req.body.accountName,
                    profilePicture: req.body.profilePicture,
                    date: req.body.date,
                    tags: req.body.tags
                });
                newPost.save().then((post) => {
                    // Storing the new Post in the Account
                    account.posts.push(post._id);
                    account.save().then(() => {
                        res.status(201).send(post);
                    }).catch((error) => {
                        res.status(400).send(error);
                    });
                }).catch((error) => {
                    res.status(400).send(error);
                });
            }
        });
    }
});
/**
 * Returns all the posts from a list of ids
 */
exports.postRouter.post('/idposts', (req, res) => {
    post_1.Post.find({ '_id': { $in: req.body.idsPosts } })
        .then((posts) => {
        res.send(posts);
    })
        .catch(() => {
        res.status(500).send();
    });
});

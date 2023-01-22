"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRouter = void 0;
const express = require("express");
const account_1 = require("../models/account");
const post_1 = require("../models/post");
const jwt = require("../middleware/authJwt");
/**
 * Contains all the functionability related to get post information
 */
exports.getRouter = express.Router();
/**
 * Gets all the info from an account by its account name
 */
exports.getRouter.get('/account', jwt.authenticateToken, (req, res) => {
    const filter = req.query.accountName ? { accountName: req.query.accountName.toString() } : undefined;
    if (!filter) {
        res.status(404).send("An account name needs to be provided");
    }
    else {
        account_1.Account.findOne(filter).then((account) => {
            if (account === null) {
                res.status(404).send("No account found");
            }
            else {
                res.send({
                    username: account.username,
                    accountName: account.accountName,
                    email: account.email,
                    description: account.description,
                    profilePicture: account.profilePicture,
                    posts: account.posts,
                    likedPosts: account.likedPosts
                });
            }
        }).catch(() => {
            res.status(500).send();
        });
    }
});
/**
 * Gets all the info from an account by its id
 */
exports.getRouter.get('/account/:id', jwt.authenticateToken, (req, res) => {
    account_1.Account.findById(req.params.id).then((account) => {
        if (!account) {
            res.status(404).send("No account was found");
        }
        else {
            res.send({
                username: account.username,
                accountName: account.accountName,
                email: account.email,
                description: account.description,
                profilePicture: account.profilePicture,
                posts: account.posts,
                likedPosts: account.likedPosts
            });
        }
    }).catch(() => {
        res.status(500).send();
    });
});
/**
 * Returns posts from the database based on pagination system
 */
exports.getRouter.get('/postsByPage', (req, res) => {
    let perPage = 5;
    let page = Number(req.query.page) || 1;
    post_1.Post.countDocuments()
        .then((count) => {
        post_1.Post.find({})
            .sort({ date: -1 })
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .then((posts) => {
            res.send({
                posts: posts,
                current: page,
                pages: Math.ceil(count / perPage)
            });
        });
    })
        .catch(() => {
        res.status(500).send();
    });
});
/**
 * Gets all the info from posts by its title
 */
exports.getRouter.get('/post', jwt.authenticateToken, (req, res) => {
    const title = req.query.title ? req.query.title.toString() : undefined;
    if (!title) {
        res.status(404).send("A title needs to be provided");
    }
    else {
        post_1.Post.find({ title: new RegExp(title, "i") }).then((post) => {
            if (post.length !== 0) {
                res.send(post);
            }
            else {
                res.status(404).send("No post was found");
            }
        }).catch(() => {
            res.status(500).send();
        });
    }
});
/**
 * Gets all the info from a post by its id
 */
exports.getRouter.get('/post/:id', jwt.authenticateToken, (req, res) => {
    post_1.Post.findById(req.params.id).then((post) => {
        if (!post) {
            res.status(404).send("No post was found");
        }
        else {
            res.send(post);
        }
    }).catch(() => {
        res.status(500).send();
    });
});
/**
 * Gets all the posts
 */
exports.getRouter.get('/posts', (_, res) => {
    post_1.Post.find({}).then((posts) => {
        if (posts.length !== 0) {
            res.send(posts);
        }
        else {
            res.status(404).send("No posts were found");
        }
    }).catch(() => {
        res.status(500).send();
    });
});

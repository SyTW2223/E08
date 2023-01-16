require('dotenv').config();

import * as express from 'express';
import { Post } from '../models/post';
import * as jwt from '../middleware/authJwt';


/**
 * Contains all the functionality to store items in the database
 */
export const patchRouter = express.Router();

/**
 * Likes a post
 */
patchRouter.patch('/like', jwt.authenticateToken, (req, res) => {
    if (!req.body.postID || !req.body.accountLike) {
        res.status(400).send({
            error: 'A post ID and account name must be provided', 
        });
        return;
    }
    const filterID = { _id: req.body.postID };
    Post.findByIdAndUpdate(filterID, req.body, { new: true }).then((post) => {
        if (post === null) {
            res.status(404).send({
                error: 'Post not found',
            });
        } else {
            if (post.likesFromAccounts.length === 0) {
                post.likesFromAccounts.push(req.body.accountLike);
            } else{
                for (let i = 0; i < post.likesFromAccounts.length; i++) {
                    if (post.likesFromAccounts[i] === req.body.accountLike) {
                        post.likesFromAccounts.splice(i, 1);
                        break;
                    } else if (i === post.likesFromAccounts.length - 1) {
                        post.likesFromAccounts.push(req.body.accountLike);
                        break;
                    }
                }
            }
            post.save();
            res.status(200).send(post);
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send();
    });
});

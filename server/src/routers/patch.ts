require('dotenv').config();

import * as express from 'express';
import { Post } from '../models/post';
import { Account } from '../models/account';
import * as jwt from '../middleware/authJwt';


/**
 * Contains all the functionality to store items in the database
 */
export const patchRouter = express.Router();

/**
 * Patch likes on a post
*/
patchRouter.patch('/like', jwt.authenticateToken, async (req, res) => {
    try {
        if (!req.body.postID || !req.body.accountLike) {
            return res.status(400).json({
                error: 'A post ID and account name must be provided'
            });
        }
        const post = await Post.findById(req.body.postID);
        const account = await Account.findOne({ accountName: req.body.accountLike });
        if (!account || !post) {
            return res.status(404).json({
                error: 'Account or post not found'
            });
        }

        if (post.likesFromAccounts.includes(account.accountName) && account.likedPosts.includes(post._id)) {
            account.likedPosts = account.likedPosts.filter( postID => {
                return postID.toString() !== post._id.toString();
            })
            post.likesFromAccounts = post.likesFromAccounts.filter(acc => acc !== account.accountName);
        } else {
            post.likesFromAccounts.push(account.accountName);
            account.likedPosts.push(post._id);
        }

        await post.save();
        await account.save();
        return res.status(200).json(post);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
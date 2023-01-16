import * as express from 'express';
import { Account } from '../models/account';
import { Post } from '../models/post';

import * as jwt from '../middleware/authJwt';

/**
 * Contains all the functionability related to get post information
 */
export const deleteRouter = express.Router();

/**
 * delete all the info from an account by its account name
 */
deleteRouter.delete('/account', jwt.authenticateToken, (req, res) => {
    const filter = req.query.accountName ? { accountName: req.query.accountName.toString() } : undefined;
    if (!filter) {
        res.status(404).send("An account name needs to be provided");
    } else {
        Account.findOneAndDelete(filter)
            .then((account) => {
                if (!account) {
                    res.status(404).send();
                } else {
                    res.send(account);
                }
            }).catch(() => {
                res.status(400).send();
            });
        Post.deleteMany(filter).then().catch(() => {
            res.status(400).send();
        });
    }
  });

/**
 * delete all the info from an account by its id
 */
deleteRouter.delete('/account/:id', jwt.authenticateToken, (req, res) => {
    Account.findById(req.params.id).then((account) => {
        if (!account) {
            res.status(404).send();
        } else {
            const filter = { accountName: account.accountName.toString() }
            Account.findOneAndDelete(filter)
                .then((account) => {
                    if (!account) {
                        res.status(404).send();
                    } else {
                        res.send(account);
                    }
                }).catch(() => {
                    res.status(400).send();
                });
            Post.deleteMany(filter).then().catch(() => {
                res.status(400).send();
            });;
        };
    });

});

/**
 * delete a post by its id  
 * */
deleteRouter.delete('/post', jwt.authenticateToken, (req, res) => {
    if(!req.body.postID || !req.body.accountName){
        res.status(400).send({
            error: 'A post ID must be provided', 
        });
        return;
    } else {
        const filter = { _id: req.body.postID };
        Post.findOne(filter).then((post) => {
            if (!post) {
                res.status(404).send();
            } else {
                if(post.accountName === req.body.accountName){
                    Post.findByIdAndDelete(post._id).then((post) => {
                        if (!post) {
                            res.status(404).send();
                        } else {
                            res.send(post);
                        }
                    }).catch(() => {
                        res.status(400).send();
                    });
                } else {
                    res.status(400).send();
                }
            }
        }).catch(() => {
            res.status(400).send();
        });
    }
});

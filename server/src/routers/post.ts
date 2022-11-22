import * as express from 'express';
import {Account} from '../models/account';
import {Post} from '../models/post';

/**
 * Contains all the functionality to store items in the database
 */
export const postRouter = express.Router();

/**
 * Stores an account with all its data in the database
 */
postRouter.post('/account', (req, res) => {
  const account = new Account({
    username: req.body.username,
    accountName: req.body.accountName,
    description: req.body.description,
    email: req.body.email,
    posts: req.body.posts,
    likedPosts: req.body.likedPosts
  });
  account.save().then((account) => {
    res.status(201).send(account);
  }).catch((error) => {
    res.status(400).send(error);
  });
});

/**
 * Stores a post with all its data in the database
 */
 postRouter.post('/post', (req, res) => {
  if (!req.body.accountName) {
    res.status(400).send({
      error: 'An account name for the post must be provided',
    })
  } else {
    Account.findOne({name: req.body.accountName.toString()}).then((account) => {
      if (!account) {
        res.status(404).send({
          error: 'Account not found',
        });
      } else {
        const post = new Post({
          title: req.body.title,
          content: req.body.content,
          accountName: req.body.accountName,
          likesFromAccounts: req.body.likesFromAccounts,
          tags: req.body.tags
        });
        post.save().then((post) => {
          res.status(201).send(post);
        }).catch((error) => {
          res.status(400).send(error);
        });
      }
    });
  }
});
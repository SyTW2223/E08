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
    password: req.body.password,
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
    Account.findOne({accountName: req.body.accountName.toString()}).then((account) => {
      if (account === null) {
        res.status(404).send({
          error: 'Account not found',
        });
      } else {
        const newPost = new Post({
          title: req.body.title,
          content: req.body.content,
          accountName: req.body.accountName,
          password: req.body.password,
          likesFromAccounts: req.body.likesFromAccounts,
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
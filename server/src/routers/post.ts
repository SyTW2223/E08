require('dotenv').config();

import * as express from 'express';
import { Account } from '../models/account';
import { Post } from '../models/post';
import * as jwt from '../middleware/authJwt';

const bcryptjs = require('bcryptjs');

/**
 * Contains all the functionality to store items in the database
 */
export const postRouter = express.Router();

/**
 * Stores an account with all its data in the database
 */
postRouter.post('/signup', async (req, res) => {
  const filter = { accountName: req.body.accountName };
  Account.findOne(filter).then(async (account) => {
    if (account === null) {
      let password = req.body.password;
      if (password !== undefined) {
        password = await bcryptjs.hash(password, 10);
      }
      const account = new Account({
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
    } else {
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
postRouter.post('/login', (req, res) => {
  if (!req.body.accountName) {
    res.status(400).send({
      error: 'An account name must be provided',
    });
  } else {
    const filter = { accountName: req.body.accountName.toString() };
    Account.findOne(filter).then(async (account) => {
      const passwd = req.body.password.toString();
      if (account === null) {
        res.status(404).send({
          error: "No account found",
        });
      } else {
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
        } else {
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
postRouter.post('/post', jwt.authenticateToken, (req, res) => {
  if (!req.body.accountName) {
    res.status(400).send({
      error: 'An account name for the post must be provided',
    })
  } else {
    Account.findOne({ accountName: req.body.accountName.toString() }).then(async (account) => {
      if (account === null) {
        res.status(404).send({
          error: 'Account not found',
        });
      } else {
        const newPost = new Post({
          title: req.body.title,
          content: req.body.content,
          accountName: req.body.accountName,
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
postRouter.post('/idposts', (req, res) => {
  Post.find({ '_id': { $in: req.body.idsPosts } })
    .then((posts) => {
      res.send(posts);
    })
    .catch(() => {
      res.status(500).send();
    });
});

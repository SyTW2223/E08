import * as express from 'express';
import { Account } from '../models/account';
import { Post } from '../models/post';

import * as jwt from '../middleware/authJwt';

/**
 * Contains all the functionability related to get post information
 */
export const getRouter = express.Router();

/**
 * Gets all the info from an account by its account name
 */
getRouter.get('/account', jwt.authenticateToken, (req, res) => {
  const filter = req.query.accountName ? { accountName: req.query.accountName.toString() } : undefined;
  if (!filter) {
    res.status(404).send("An account name needs to be provided");
  } else {
    Account.findOne(filter).then((account) => {
      if (account === null) {
        res.status(404).send("No account found");
      } else {
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
getRouter.get('/account/:id', jwt.authenticateToken, (req, res) => {
  Account.findById(req.params.id).then((account) => {
    if (!account) {
      res.status(404).send("No account was found");
    } else {
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
getRouter.get('/postsByPage', (req, res) => {
  let perPage = 5;
  let page = Number(req.query.page)|| 1;
  Post.countDocuments()
    .then((count) => {
      Post.find({})
        .sort({ date: -1 })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then((posts) => {
          res.send({
            posts: posts,
            current: page,
            pages: Math.ceil(count / perPage)
          });
        })
    })
    .catch(() => {
      res.status(500).send();
    });
});


/**
 * Gets all the info from posts by its title
 */
getRouter.get('/post', jwt.authenticateToken, (req, res) => {
  const title = req.query.title ? req.query.title.toString() : undefined;
  if (!title) {
    res.status(404).send("A title needs to be provided");
  } else {
    Post.find({ title: new RegExp(title, "i") }).then((post) => {
      if (post.length !== 0) {
        res.send(post);
      } else {
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
getRouter.get('/post/:id', jwt.authenticateToken, (req, res) => {
  Post.findById(req.params.id).then((post) => {
    if (!post) {
      res.status(404).send("No post was found");
    } else {
      res.send(post);
    }
  }).catch(() => {
    res.status(500).send();
  });
});


/**
 * Gets all the posts
 */
getRouter.get('/posts', (_, res) => {
  Post.find({}).then((posts) => {
    if (posts.length !== 0) {
      res.send(posts);
    } else {
      res.status(404).send("No posts were found");
    }
  }).catch(() => {
    res.status(500).send();
  });
});

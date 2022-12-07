import * as express from 'express';
import {Account} from '../models/account';
import {Post} from '../models/post';

import authenticateToken from '../middleware/authJwt'

/**
 * Contains all the functionability related to get post information
 */
export const getRouter = express.Router();

/**
 * Gets all the info from an account by its account name
 */
getRouter.get('/account', (req, res) => {
  const filter = req.query.accountName?{accountName: req.query.accountName.toString()}:undefined;
  if (!filter) {
    res.status(404).send("An account name needs to be provided");
  } else {
    Account.findOne(filter).then((account) => {
      if (account === null) {
        res.status(404).send("No account found");
      } else {
        res.send(account);
      }
    }).catch(() => {
      res.status(500).send();
    });
  }
});


/**
 * Gets all the info from an account by its id
 */
 getRouter.get('/account/:id', (req, res) => {
  Account.findById(req.params.id).then((account) => {
    if (!account) {
      res.status(404).send("No account was found");
    } else {
      res.send(account);
    }
  }).catch(() => {
    res.status(500).send();
  });
});


/**
 * Gets all the info from posts by its title
 */
getRouter.get('/post', authenticateToken, (req, res) => {
  const title = req.query.title ? req.query.title.toString() : undefined;
  if (!title) {
    res.status(404).send("A title needs to be provided");
  } else {
    Post.find({title: new RegExp(title, "i")}).then((post) => {
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
getRouter.get('/post/:id', authenticateToken, (req, res) => {
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

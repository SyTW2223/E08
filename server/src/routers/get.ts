import * as express from 'express';
import {Account} from '../models/account';
import {Post} from '../models/post';

/**
 * Contains all the functionability related to get post information
 */
export const getRouter = express.Router();

/**
 * Gets all the info from an account by its account name
 */
getRouter.get('/account', (req, res) => {
  const filter = req.query.accountName?{accountName: req.query.accountName.toString()}:{};

  Account.findOne(filter).then((account) => {
    if (account != null) {
      res.send(account);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
});


/**
 * Gets all the info from posts by its account name
 */
getRouter.get('/post', (req, res) => {
  const filter = req.query.accountName?{accountName: req.query.accountName.toString()}:{};

  Account.findOne(filter).then((account) => {
    if (account != null) {
      res.send(account);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
});


/**
 * Gets all the info from posts by its name
 */
getRouter.get('/post', (req, res) => {
  const filter = req.query.title?{title: req.query.title.toString()}:{};

  Post.find(filter).then((post) => {
    if (post.length !== 0) {
      res.send(post);
    } else {
      res.status(404).send();
    }
  }).catch(() => {
    res.status(500).send();
  });
});


/**
 * Gets all the info from a post by its id
 */
getRouter.get('/post/:id', (req, res) => {
  Post.findById(req.params.id).then((post) => {
    if (!post) {
      res.status(404).send();
    } else {
      res.send(post);
    }
  }).catch(() => {
    res.status(500).send();
  });
});
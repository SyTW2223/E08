import * as express from 'express';
import { Account } from '../models/account';
import { Post } from '../models/post';
//import { Post } from '../models/post';

/**
 * Contains all the functionability related to get post information
 */
export const deleteRouter = express.Router();

/**
 * delete all the info from an account by its account name
 */
deleteRouter.delete('/account', (req, res) => {
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
}
);

/**
 * delete all the info from an account by its id
 */
deleteRouter.delete('/account/:id', (req, res) => {
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

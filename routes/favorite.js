const express = require("express");
const router = express.Router();
const { Book, Favorite, User } = require('../lib/db/sequelize');
const passport = require('passport');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Book.findAll({
        include: [
            {
                model: Favorite,
                where: {
                    userId: req.user.id
                }
            }
        ]
    })
        .then(books => {
            res.json({ books })
        })
        .catch(errors => {
            errors.msg = "Could not find books";
            return res.status(400).json(errors);
        });
})

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const input = {
        userId: req.user.id,
        bookId: req.body.id,
    };
    Favorite.create(input)
        .then(fav => {
            res.json(fav)
        })
        .catch(errors => {
            errors.msg = "Could not create favorite";
            return res.status(400).json(errors);
        })
})

router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = req.body.id;
    Favorite.destroy({ where: { id } })
        .then(deletedFav => {
            if (deletedFav === 1) {
                res.json({ deleted: deletedFav })
            } else {
                const errors = {};
                errors.msg = "Nothing deleted";
                res.status(400).json({ errors })
            }
        })
        .catch(errors => {
            errors.msg = "Something went wrong when deleting for this favorite";
            res.status(400).json({ errors })
        })
})


module.exports = router;
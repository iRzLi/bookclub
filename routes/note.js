const express = require("express");
const router = express.Router();
const { Book, Favorite, User, Note } = require('../lib/db/sequelize');
const passport = require('passport');

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const input = {
        userId: req.user.id,
        bookId: req.body.id,
        message: req.body.message,
    };
    Note.create(input)
        .then(note => {
            res.json(note)
        })
        .catch(errors => {
            debugger
            errors.msg = "Could not create note";
            return res.status(400).json(errors);
        })
})

router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = req.body.id;
    Note.destroy({ where: { id, userId: req.user.id } })
        .then(deletedNote => {
            if (deletedNote === 1) {
                res.json({ deleted: deletedNote })
            } else {
                const errors = {};
                errors.msg = "Nothing deleted";
                res.status(400).json({ errors })
            }
        })
        .catch(errors => {
            errors.msg = "Something went wrong when deleting for this note";
            res.status(400).json({ errors })
        })
})


module.exports = router;
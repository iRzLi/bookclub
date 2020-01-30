const express = require("express");
const router = express.Router();
const { Book, Favorite, Note, User } = require('../lib/db/sequelize');
const passport = require('passport');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Book.findAll()
        .then(books => {
            res.json({books})
        })
        .catch(errors => {
            errors.msg = "Could not find books";
            return res.status(400).json(errors);
        });
})

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Book.findOne({
        where:{id: parseInt(req.params.id)},
        include: [
            {
                model: Favorite,
                required: false,
                where: {
                    userId: req.user.id,
                }
            },
            {
                model: Note,
                include: [
                    {
                        model: User,
                        attributes: ['id', 'displayName'],
                    }
                ]
            }
        ]
    })
        .then(book => {
            if(book){
                res.json(book)
            }else{
                const errors = {};
                errors.msg = "Could not find book";
                return res.status(404).json(errors);
            }
        })
        .catch(errors => {
            errors.msg = "Could not find book";
            return res.status(400).json(errors);
        });
})

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const input = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
    };
    Book.create(input)
        .then(book => {
            res.json(book)
        })
        .catch(errors => {
            errors.msg = "Could not create book";
            return res.status(400).json(errors);
        })
})

router.put('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = req.body.id;
    Book.findOne({ where: { id } }).then(book => {
        const errors = {};
        if (book) {
            const input = { 
                title: req.body.title, 
                author: req.body.author,
                genre: req.body.genre,
            }
            book.update({...input})
                .then(updatedBook => {
                    Book.findOne({
                        where: { id: parseInt(updatedBook.id) },
                        include: [
                            {
                                model: Favorite,
                                required: false,
                                where: {
                                    userId: req.user.id,
                                }
                            },
                            {
                                model: Note,
                                include: [
                                    {
                                        model: User,
                                        attributes: ['id', 'displayName'],
                                    }
                                ]
                            }
                        ]
                    })
                        .then(book => {
                            if (book) {
                                res.json(book)
                            } else {
                                const errors = {};
                                errors.msg = "Could not find book";
                                return res.status(404).json(errors);
                            }
                        })
                        .catch(errors => {
                            errors.msg = "Could not find book";
                            return res.status(400).json(errors);
                        });
                })
        } else {
            errors.msg = "Book does not exist";
            return res.status(400).json(errors);
        }
    });
})

router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const id = req.body.id;
    Book.destroy({where: {id}})
        .then(deletedBook => {
            if (deletedBook === 1) {
                res.json({ deleted: deletedBook })
            } else {
                const errors = {};
                errors.msg = "Nothing deleted";
                res.status(400).json({ errors })
            }
        })
        .catch(errors => {
            errors.msg = "Something went wrong when deleting for this book";
            res.status(400).json({ errors })
        })
})


module.exports = router;
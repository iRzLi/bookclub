const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const { User } = require('../lib/db/sequelize');
const keys = require('../config/keys');

const passport = require('passport');

// register
router.post("/register", (req, res) => {
    User.findOne({where: { email: req.body.email }}).then(user => {
        const errors = {};
        if (user) {
            errors.msg = "User already exists";
            return res.status(400).json(errors);
        } else {
            const newUser = new User({
                displayName: req.body.displayName,
                email: req.body.email,
                password: req.body.password,
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => {
                            const payload = {
                                id: user.id,
                                email: user.email,
                                displayName: user.displayName,
                            };
                            jwt.sign(payload, keys.SECRET_OR_KEY, { expiresIn: 3600 }, (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token,
                                    email: user.email,
                                    displayName: user.displayName,
                                });
                            });
                        })
                        .catch(err => {
                            errors.msg = "Could not create user";
                            return res.status(400).json(errors);
                        });
                });
            });
        }
    });
});

// login
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let errors = {};
    User.findOne({ where: { email } }).then(user => {
        if (!user) {
            errors.msg = "This user does not exist";
            return res.status(400).json(errors);
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    email: user.email,
                    displayName: user.displayName,
                };
                jwt.sign(payload, keys.SECRET_OR_KEY, { expiresIn: '1d' }, (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token,
                        email: user.email,
                        displayName: user.displayName,
                    });
                });
            } else {
                errors.msg = "Incorrect password";
                return res.status(400).json(errors);
            }
        });
    });
});

// testing route to see if passport authorization is working
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ email: req.user.email, displayName: req.user.displayName });
})

// testing this file route
router.get('/test', (req, res) => {
    res.json({ email: "req.user.email", displayName: "req.user.displayName" });
})

module.exports = router;
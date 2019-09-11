const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Validation = require('../Validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
    //validate body
    const { error } = Validation.validateRegistrationData(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
    } else {
        //check if email exists
        User.findOne({ email: req.body.email }, (err, user) => {

            if (user) {
                res.status(400).send('Email already exists!');
            } else {
                //hash password
                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(req.body.password, salt);
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword
                });
                user.save((err, user) => {
                    if (err)
                        res.status(400).send(err);

                    res.send(user);
                });
            }
        });
    }
});

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, same) => {
                if(err)
                    res.status(400).send(err);
                if (same) {
                    const token = jwt.sign({userId: user._id}, process.env.TOKEN_KEY);
                    res.header({'auth-token': token}).send('Logged in!');
                } else {
                    res.status(400).send('Password does not match !');
                }
            });
        } else {
            res.status(400).send('Please register to log in');
        }
    });
});

module.exports = router;
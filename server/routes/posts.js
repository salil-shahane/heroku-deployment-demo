const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {

    const token = req.header('auth-token');
    if (token) {
        jwt.verify(token, process.env.TOKEN_KEY, (err, result) => {
            if(err) {
                res.status(401).send(err);
            } else {
                res.send({posts:[{postId: 1, title: 'random title'}]});
            }
        });
    } else {
        res.status(401).send(`You're not authorized to use this API`);
    }
});

module.exports = router;

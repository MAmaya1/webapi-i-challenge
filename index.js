// implement your API here

const express = require('express');

const db = require('./data/db');

const server = express();

// Get Request

server.get('/users', (req, res) => {
    db.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'The users information could not be retrieved'})
        })
})

server.listen(5000, () => {
    console.log('\n*** API running on port 5K ***\n');
})
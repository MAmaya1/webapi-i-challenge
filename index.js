// implement your API here

const express = require('express');

const db = require('./data/db');

const server = express();

// Get Request

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'The users information could not be retrieved'})
        })
})

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    db.findById(userId)
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(404).json({ error: err, message: 'The user with the specified ID does not exist.' })
        })
})

server.listen(5000, () => {
    console.log('\n*** API running on port 5K ***\n');
})
// implement your API here

const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

// GET

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'The users information could not be retrieved'})
        })
})

// GET by id

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

// POST

server.post('/api/users', (req, res) => {
    const newUser = req.body;

    if (!req.body.name && !req.body.bio) {
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
    }

    db.insert(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'There was an error while saving the user to the database.' })
        })
})

// // PUT

server.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;

    if (!req.body.name && !req.body.bio) {
        res.status(400).json({errorMessage: 'Please provide name and bio for the user.' });
    }

    db.findById(userId)
        .then(user => {
            if (user) {
                db.update(userId, updatedUser)
                    .then(user => {
                        res.status(201).json(user)
                    })
                    .catch(err => {
                        res.status(500).json({ error: err, message: 'The user information could not be modified.' })
                    })
            }
        })
})

// DELETE

server.delete('/api/users/:id', (res, req) => {
    const userId = req.params.id;

    if (userId !== req.body.id) {
        res.status(404).json({ errorMessage: 'The user with the specified ID does not exist' })
    }

    db.remove(userId)
        .then(() => {
            res.status(200).delete();
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'The user could not be removed' })
        })
})

server.listen(5000, () => {
    console.log('\n*** API running on port 5K ***\n');
})
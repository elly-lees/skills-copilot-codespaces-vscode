//create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

app.use(bodyParser.json());

const comments = new Map();

app.get('/comments', (req, res) => {
    const commentsArray = [];
    for (const comment of comments.values()) {
        commentsArray.push(comment);
    }
    res.json(commentsArray);
});

app.get('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = comments.get(id);
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).send();
    }
});

app.post('/comments', (req, res) => {
    const comment = req.body;
    comment.id = uuidv4();
    comments.set(comment.id, comment);
    res.status(201).json(comment);
});

app.put('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = req.body;
    comment.id = id;
    comments.set(id, comment);
    res.json(comment);
});

app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    comments.delete(id);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
}); 
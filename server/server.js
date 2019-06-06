const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    
    var todo = new Todo({
        text: req.body.text
    });
    
    todo.save().then((docs) => {
        res.send(docs)
    }, (e) => {
        res.status(400).send(e)
    })
    
})

app.get('/todos', (req, res) => {
    Todo.find()
    .then((todos) => res.send({todos}))
    .catch((e) => res.status(400).send(e))
})

// GET todos/12345
app.get('/todos/:id', (req, res) => {
    
    let id = req.params.id;
    if (!ObjectID.isValid(id)) return res.status(400).send()
    
    Todo.findById(id)
    .then((todos) => {
        if (!todos) return res.status(404).send()
        res.send({todos});
    })
    .catch((e) => res.status(400).send())
})

app.delete('/todos/:id', (req, res) => {
    
    let id = req.params.id;
    if (!ObjectID.isValid(id)) return res.status(404).send()
    
    Todo.findByIdAndRemove(id)
    .then((todos) => {
        if (!todos) return res.status(404).send()
        res.send({todos});
    })
    .catch((e) => res.status(400).send())
})

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
})

module.exports = {app}
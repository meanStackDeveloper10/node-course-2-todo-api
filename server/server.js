const config = require('./config/config')
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');

const app = express();
const port = process.env.PORT;

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

app.patch('/todos/:id', (req, res) => {

    let id = req.params.id;
    console.log(id);
    
    let body = _.pick(req.body, ['text', 'completed'])

    if (_.isBoolean(body.completed) && body.completed) {
        console.log('test1');
        
        body.completedAt = new Date().getTime()
    } else {
        console.log('test 2');
        
        body.completed = false; 
        body.completedAt = null
    };

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then((todos) => {
        console.log(JSON.stringify(todos,null,2));
        
        if (!todos) return res.status(404).send()
        res.send({todos})
    })
    .catch((e) => res.status(404).send())
})

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
})

module.exports = {app}
const config = require('./config/config')
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');
const {authenticate} = require('./middleware/authenticate')

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });
    
    todo.save().then((docs) => {
        res.send(docs)
    }, (e) => {
        res.status(400).send(e)
    })
    
})

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    })
    .then((todos) => res.send({todos}))
    .catch((e) => res.status(400).send(e))
})

// GET todos/12345
app.get('/todos/:id', authenticate, (req, res) => {
    
    let id = req.params.id;
    if (!ObjectID.isValid(id)) return res.status(400).send()
    
    Todo.findOne({
        _id: id,
        _creator: req.user._id
    })
    .then((todos) => {
        if (!todos) return res.status(404).send()
        res.send({todos});
    })
    .catch((e) => res.status(400).send())
})

app.delete('/todos/:id', (req, res) => {
    
    let id = req.params.id;
    if (!ObjectID.isValid(id)) return res.status(404).send()
    
    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    })
    .then((todos) => {
        if (!todos) return res.status(404).send()
        res.send({todos});
    })
    .catch((e) => res.status(400).send())
})

app.patch('/todos/:id', (req, res) => {
    
    let id = req.params.id;
    
    let body = _.pick(req.body, ['text', 'completed'])
    
    if (_.isBoolean(body.completed) && body.completed) {
        
        body.completedAt = new Date().getTime()
    } else {
        
        body.completed = false; 
        body.completedAt = null
    };
    
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then((todos) => {
        
        if (!todos) return res.status(404).send()
        res.send({todos})
    })
    .catch((e) => res.status(404).send())
})

app.post('/users', (req, res) => {
    
    let body = _.pick(req.body, ['email', 'password'])
    
    let user = new User(body)
    
    user.save()
    .then(() => {
        return user.generateAuthToken()
    })
    .then((token) => {
        
        res.header('x-auth', token).send(user)
    })
    .catch((e) => res.status(404).send(e))
})

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
})

app.post('/users/login', (req, res) => {
    
    let body = _.pick(req.body, ['email', 'password'])
    
    User.findByCredentials(body)
    .then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user)
        })
    })
    .catch((e) => res.status(400).send())
})

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send()
    }, () => {
        res.status(400).send()
    })
})

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
})

module.exports = {app}
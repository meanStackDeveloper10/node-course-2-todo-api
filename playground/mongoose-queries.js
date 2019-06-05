const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

let id = '5cf1ededabc1b10b74704126';
if (!ObjectID.isValid(id)) console.log('ID not valid');

// Todo.find({
//     _id: id
// })
// .then((todos) => {console.log(JSON.stringify(todos, null, 2));})

// Todo.findOne({
//     _id: id
// })
// .then((todo) => {console.log(JSON.stringify(todo, null, 2));})

// Todo.findById(id)
// .then((todo) => {
//     if (!todo) return console.log('Id not found');
    
//     console.log(JSON.stringify(todo, null, 2));
// })
// .catch((e) => console.log(e))

User.findById(id)
.then((user) => {
    if (!user) return console.log('User not found');
    
    console.log(JSON.stringify(user, null,2));
    
})
.catch((e) => console.log(e))
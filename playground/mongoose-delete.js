const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

// Todo.remove({}).then((result) => console.log(result))

// Todo.findOneAndRemove({_id: '5cf8a1bd9af2ed3098d2553c'})
// .then((todo) => console.log(todo))

Todo.findByIdAndRemove('5cf8a1bd9af2ed3098d2553c')
.then((todo) => console.log(todo))
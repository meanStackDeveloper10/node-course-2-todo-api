// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// let objectId = new ObjectID();
// console.log(objectId);

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (error, client) => {
if (error) return console.log('Unable to connect to mongoDb server');
console.log('Connected to MongoDb server');

let db = client.db('TodoApp');

// deleteMany
// db.collection('Todos')
// .deleteMany({text: 'Eat lunch'})
// .then((result) => {
//     console.log(result);  
// })

// deleteOne
// db.collection('Todos')
// .deleteOne({text: 'Eat lunch'})
// .then((result) => {
//     console.log(result);
// })

// findOneAndDelete
// db.collection('Todos')
// .findOneAndDelete({completed: false})
// .then((result) => {
//     console.log(result);
// })

// client.close()  
})
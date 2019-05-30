// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// let objectId = new ObjectID();
// console.log(objectId);

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (error, client) => {
if (error) return console.log('Unable to connect to mongoDb server');
console.log('Connected to MongoDb server');

let db = client.db('TodoApp');
db.collection('Todos')
.find({
    _id: new ObjectID('5cef44373bea7cbe04e34be1')
})
.toArray()
.then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, null, 2));
    
}, (error) => {
    console.log('Unable to fetch todos', error);
})

client.close()  
})
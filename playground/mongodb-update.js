// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// let objectId = new ObjectID();
// console.log(objectId);

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (error, client) => {
if (error) return console.log('Unable to connect to mongoDb server');
console.log('Connected to MongoDb server');

let db = client.db('TodoApp');

// db.collection('Todos').findOneAndUpdate({
//     _id: new ObjectID('5cef549c3bea7cbe04e34d99')
// }, {
//     $set: {
//         completed: false
//     }    
// }, {
//     returnOriginal: false
// })
// .then((result) => {
//     console.log(result);
// })

db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5cedfd9116c68625248a29b7')
}, {
    $set: {
        name: 'Sagar',
        location: 'Sahakar Nagar'
    }, $inc: {
        age: 2
    }
}, {
    returnOriginal: false
})
.then((result) => {
    console.log(result);
})

})
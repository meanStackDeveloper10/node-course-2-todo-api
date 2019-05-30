// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

let objectId = new ObjectID();
console.log(objectId);


MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (error, client) => {
    if (error) return console.log('Unable to connect to mongoDb server');
    console.log('Connected to MongoDb server');

    let db = client.db('TodoApp')
    
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {

    //     if (err) return console.log('Unable to insert Todo', err);
    //     console.log(JSON.stringify(result.ops,null,2));
        
    // })

    // db.collection('Users').insertOne({
    //     name: 'Papu',
    //     age: 28,
    //     location: 'Mumbai'
    // }, (error, result) => {

    //     if(error) return console.log('Unable to insert Users', error);
    //     console.log(JSON.stringify(result.ops, null, 2));
    // })

    client.close()  
})
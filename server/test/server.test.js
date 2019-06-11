const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {todos, populateTodos, users, populateUsers}  = require('./seed/seed');

// describe('POST /todos', () => { 
//     beforeEach(populateTodos);
//     it('should create a new todos', (done) => {

    //         let text = 'Test todo text';

    //         request(app)
//         .post('/todos')
//         .send({text})
//         .expect(200)
//         .expect((res) => {
//             console.log('RESPONSE UP, ',res);

//             expect(res.body.text).toBe(text);
//         })
//         .end((err, res) => {
    //             if (err) return done(err)
    //             console.log('RESPONSE INSIDE ',res);

    //             Todo.find({text}).
//             then((todos) => {
//                 expect(todos.length).toBe(1);
//                 expect(todos[0].text).toBe(text);
//                 done()
//             })
//             .catch((e) => done(e))
//         })

//     })

//     it('should not creat todo with invalid body data', (done) =>{

    //         request(app)
    //         .post('/todos')
//         .send({})
//         .expect(400)
//         .end((err, res) => {
    //             if (err) return done(err)
    
//             Todo.find().
//             then((todos) => {
//                 expect(todos.length).toBe(2);
//                 done()
//             })
//             .catch((e) => done(e))
//         })
//     })
// })


// describe('GET /todos', () => {
//     it('should get all todos', (done) => {
    //         request(app)
//         .get('/todos')
//         .expect(200)
//         .expect((res) => {                
//             expect(res.body.todos.length).toBe(2)
//         })
//         .end(done);
//     })
// })

// describe('GET /todos/:id', () => {

    //     let hex = new ObjectID().toHexString();
//     it('shoud return todo doc', (done) => {
    //         request(app)
//         .get(`/todos/${todos[0]._id.toHexString()}`)
//         .expect(200)
//         .expect((res) => {
//             expect(res.body.todos.text).toBe('First test todo')
//         })
//         .end(done)
//     })

//     it('should return 404 if todo is not found', (done) => {
    //         request(app)
//         .get(`/todos/${hex}`)
//         .expect(404)
//         .end(done)
//     })

//     it('should return 400 for non object id', (done) => {
//         request(app)
//         .get('/todos/123avc')
//         .expect(400)
//         .end(done)
//     })
// })

// describe('Delete /todos/:id', () => {
    
//     let hex = todos[1]._id.toHexString();
//     it('should delete todo doc', (done) => {
    //         request(app)
    //         .delete(`/todos/${hex}`)
//         .expect(200)
//         .expect((res) => {
//             expect(res.body.todos._id).toBe(hex)
//         })
//         .end((err, res) => {
    //             if (err) return done(err)

    //             Todo.findById(hex)
//             .then((todo) => {
    //                 expect(todo).toNotExist();
    //                 done();
//             })
//             .catch((e) => done(e))
//         })
//     })

//     it('should return 404 if todo is not found', (done) => {
    //         request(app)
//         .get(`/todos/${hex}`)
//         .expect(404)
//         .end(done)
//     })

//     it('should return 400 for non object id', (done) => {
//         request(app)
//         .get('/todos/123avc')
//         .expect(400)
//         .end(done)
//     })
// })

// describe('PATCH /todos/:id', () => {
    
    
//     it('should update todo', (done) => {
    
//         let hex = todos[0]._id.toHexString();
//         let text = "This should be the updated text";

//         request(app)
//         .patch(`/todos/${hex}`)
//         .send({
    //             completed: true,
//             text
//         })
//         .expect(200)
//         .expect((res) => {
//             expect(res.body.todos.text).toBe(text);
//             expect(res.body.todos.completed).toBe(true);
//             expect(res.body.todos.completedAt).toBeA('number');
//         })
//         .end(done)

//     })

//     // it('should clear completedAt when todo is not completed', (done) => {
    
    //     //     let hex = todos[1]._id.toHexString();
//     //     let text = "This should be the text!!";

//     //     request(app)
//     //     .patch(`/todos/${hex}`)
//     //     .send({
    //     //         text,
//     //         completed: false
//     //     })
//     //     .expect(200)
//     //     .expect((res) => {
//     //         expect(res.body.todos.text).toBe(text);
//     //         expect(res.body.todos.completed).toBe(false);
//     //         expect(res.body.todos.completedAt).toNotExist();
//     //     })
//     //     .end(done)
//     // })

//     // it('should update todo', (done) => {
    
//     // })
// })

it('should create new users', () => {
    beforeEach(populateUsers);
})
describe('POST /users/me', () => {

    it('should return user if authenticated', (done) => {
        request(app)
        .get('users/me')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
            expect(res.body._id).toBe(users[0]._id.toHexString())
            expect(req.body.email).toBe(users[0].email)
        })
        .end(done)
    })
})
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

describe('POST /todos', () => {
    
    let todos = [{
        _id: new ObjectID(),
        text: 'First test todo'
    }, {
        _id: new ObjectID(),
        text: 'Second test todo'
    }];
    
    beforeEach((done) => {
        Todo.remove({}).then(() => {
            return Todo.insertMany(todos)
        }).then(() => done())
    });
    
    it('should create a new todos', (done) => {
        
        let text = 'Test todo text';
        
        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if (err) return done(err)
            
            Todo.find({text}).
            then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done()
            })
            .catch((e) => done(e))
        })
        
    })
    
    it('should not creat todo with invalid body data', (done) =>{
        
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if (err) return done(err)
            
            Todo.find().
            then((todos) => {
                expect(todos.length).toBe(2);
                done()
            })
            .catch((e) => done(e))
        })
    })
    
    describe('GET /todos', () => {
        it('should get all todos', (done) => {
            request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {                
                expect(res.body.todos.length).toBe(2)
            })
            .end(done);
        })
    })
    
    describe('GET /todos/:id', () => {

        let hex = new ObjectID().toHexString();
        it('shoud return todo doc', (done) => {
            request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.text).toBe('First test todo')
            })
            .end(done)
        })

        it('should return 404 if todo is not found', (done) => {
            request(app)
            .get(`/todos/${hex}`)
            .expect(404)
            .end(done)
        })

        it('should return 400 for non object id', (done) => {
            request(app)
            .get('/todos/123avc')
            .expect(400)
            .end(done)
        })
    })

    describe('Delete /todos/:id', () => {

        let hex = todos[1]._id.toHexString();
        it('should delete todo doc', (done) => {
            request(app)
            .delete(`/todos/${hex}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos._id).toBe(hex)
            })
            .end((err, res) => {
                if (err) return done(err)

                Todo.findById(hex)
                .then((todo) => {
                    expect(todo).toNotExist();
                    done();
                })
                .catch((e) => done(e))
            })
        })

        it('should return 404 if todo is not found', (done) => {
            request(app)
            .get(`/todos/${hex}`)
            .expect(404)
            .end(done)
        })

        it('should return 400 for non object id', (done) => {
            request(app)
            .get('/todos/123avc')
            .expect(400)
            .end(done)
        })
    })
    
    
})
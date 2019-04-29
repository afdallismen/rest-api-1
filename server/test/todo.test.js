const chai = require('chai')
const chaiHttp = require('chai-http')
const faker = require('faker')
const jwt = require('jsonwebtoken')

const app = require('../app')
const models = require('../models')

const expect = chai.expect

chai.use(chaiHttp)

describe('Todo Tests', function () {
  function Todo () {
    return {
      title: faker.lorem.sentence(),
      description: faker.lorem.sentence()
    }
  }

  before(function (done) {
    models.User
      .create({
        email: faker.internet.email(),
        password: faker.internet.password()
      })
      .then(user => {
        this.user = user
        this.user.token = jwt.sign({
          id: user.id,
          email: user.email
        }, process.env.JWT_SECRET_KEY)
        return models.Todo
          .create({
            title: faker.lorem.sentence(),
            descrription: faker.lorem.sentence(),
            authorId: user.id
          })
      })
      .then(todo => {
        this.todo = todo
        done()
      })
      .catch(done)
  })
  after(function (done) {
    models.User
      .destroy({ where: {} })
      .then(() => models.Todo.destroy({ where: {} }))
      .then(() => done())
      .catch(done)
  })

  let createdTodo = new Todo()
  let updatedTodo = new Todo()

  describe('GET /api/todos', function () {
    it('should send an object with 200 status code', function (done) {
      chai
        .request(app)
        .get('/api/todos')
        .set('Authorization', this.user.token)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('todos')
          expect(res.body.todos).to.be.an('array')
          done()
        })
    })
  })

  describe('GET /api/todos/:todo_id', function () {
    it('should send an object with 200 status code', function (done) {
      chai
        .request(app)
        .get(`/api/todos/${this.todo.id}`)
        .set('Authorization', this.user.token)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('todo')
          expect(res.body.todo).to.be.an('object')
          expect(res.body.todo).to.have.property('id')
          expect(res.body.todo).to.have.property('title')
          expect(res.body.todo).to.have.property('description')
          expect(res.body.todo).to.have.property('authorId')
          expect(res.body.todo.id).to.equal(this.todo.id)
          expect(res.body.todo.title).to.equal(this.todo.title)
          expect(res.body.todo.description).to.equal(this.todo.description)
          expect(res.body.todo.authorId).to.equal(this.user.id)
          done()
        })
    })
  })

  describe('POST /api/todos', function () {
    it('should send an object with 201 status code', function (done) {
      chai
        .request(app)
        .post('/api/todos')
        .set('Authorization', this.user.token)
        .send({
          title: createdTodo.title,
          description: createdTodo.description,
          authorId: this.user.id
        })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('todo')
          expect(res.body.todo).to.be.an('object')
          expect(res.body.todo).to.have.property('id')
          expect(res.body.todo).to.have.property('title')
          expect(res.body.todo).to.have.property('description')
          expect(res.body.todo).to.have.property('authorId')
          expect(res.body.todo.title).to.equal(createdTodo.title)
          expect(res.body.todo.description).to.equal(createdTodo.description)
          expect(res.body.todo.authorId).to.equal(this.user.id)
          done()
        })
    })
  })

  describe('PUT /api/todos/:todo_id', function () {
    it('should send an object with 200 status code', function (done) {
      chai
        .request(app)
        .put(`/api/todos/${this.todo.id}`)
        .set('Authorization', this.user.token)
        .send({
          title: updatedTodo.title,
          description: updatedTodo.description,
          authorId: this.user.id
        })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('todo')
          expect(res.body.todo).to.be.an('object')
          expect(res.body.todo).to.have.property('id')
          expect(res.body.todo).to.have.property('title')
          expect(res.body.todo).to.have.property('description')
          expect(res.body.todo).to.have.property('authorId')
          expect(res.body.todo.id).to.equal(this.todo.id)
          expect(res.body.todo.title).to.equal(updatedTodo.title)
          expect(res.body.todo.description).to.equal(updatedTodo.description)
          expect(res.body.todo.authorId).to.equal(this.user.id)
          done()
        })
    })
  })

  describe('DELETE /api/todos/:todo_id', function () {
    it('should send an object with 200 status code', function (done) {
      chai
        .request(app)
        .delete(`/api/todos/${this.todo.id}`)
        .set('Authorization', this.user.token)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('todo')
          expect(res.body.todo).to.be.an('object')
          expect(res.body.todo).to.have.property('id')
          expect(res.body.todo.id).to.equal(this.todo.id)
          done()
        })
    })
  })
})

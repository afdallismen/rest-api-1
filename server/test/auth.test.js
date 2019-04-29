const chai = require('chai')
const chaiHttp = require('chai-http')
const faker = require('faker')

const app = require('../app')
const models = require('../models')

const expect = chai.expect

chai.use(chaiHttp)

describe('Auth Tests', function () {
  describe('GET /api/signup', function () {
    let createdUser = {
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    it('should send an object with 201 status code', function (done) {
      chai
        .request(app)
        .post('/api/signup')
        .send({
          email: createdUser.email,
          password: createdUser.password
        })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('user')
          expect(res.body.user).to.be.an('object')
          expect(res.body.user).to.have.property('id')
          expect(res.body.user).to.have.property('email')
          expect(res.body.user).to.have.property('password')
          expect(res.body.user.email).to.equal(createdUser.email)
          // expect(res.body.user.password).to.equal(createdUser.password)
          done()
        })
    })
  })

  describe('POST /auth/signin', function () {
    before(function (done) {
      let rawPassword = faker.internet.password()

      models.User
        .create({
          email: faker.internet.email(),
          password: rawPassword
        })
        .then(user => {
          this.user = user
          this.user.rawPassword = rawPassword
          done()
        })
        .catch(done)
    })
    after(function (done) {
      models.User
        .destroy({ where: {} })
        .then(() => done())
        .catch(done)
    })
    it('should send an object with 201 status code', function (done) {
      chai
        .request(app)
        .post('/api/signin')
        .send({
          email: this.user.email,
          password: this.user.rawPassword
        })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('token')
          expect(res.body.token).to.be.a('string')
          expect(res.body.token).to.not.equal('')
          done()
        })
    })
  })
})

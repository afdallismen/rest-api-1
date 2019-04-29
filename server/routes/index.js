const routes = require('express').Router()

const AuthController = require('../controllers/Auth')

routes.post('/signup', AuthController.signup)
routes.post('/signin', AuthController.signin)

routes.use('/todos', require('./todos'))

module.exports = routes

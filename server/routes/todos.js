const routes = require('express').Router({ mergeParams: true })

const TodoController = require('../controllers/Todo')
const { isAuthor } = require('../middlewares/todos')
const { loggedIn } = require('../middlewares/auth')

routes.use(loggedIn)

routes.get('/', TodoController.findAll)
routes.post('/', TodoController.create)

routes.use('/:todo_id', isAuthor)

routes.get('/:todo_id', TodoController.findById)
routes.put('/:todo_id', TodoController.update)
routes.delete('/:todo_id', TodoController.delete)

module.exports = routes

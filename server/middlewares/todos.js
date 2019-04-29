const models = require('../models')

const isAuthor = (req, res, next) => {
  models.Todo
    .findByPk(req.params.todo_id)
    .then(todo => {
      if (todo) {
        if (todo.authorId === req.user.id) {
          next()
        } else {
          res.status(401).json({ message: 'Unauthorized Access' })
        }
      } else {
        res.status(404).json({ message: 'Todo Not Found' })
      }
    })
}

module.exports = { isAuthor }

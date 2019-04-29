const models = require('../models')

class Todo {
  static findAll (req, res) {
    req.user
      .getTodos()
      .then(todos => res.status(200).json({ todos }))
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static findById (req, res) {
    req.user
      .getTodos({
        where: {
          id: req.params.todo_id
        },
        limit: 1
      })
      .then(([ todo ]) => res.status(200).json({ todo }))
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static create (req, res) {
    models.Todo
      .create({
        title: req.body.title,
        description: req.body.description,
        authorId: req.user.id
      })
      .then(todo => res.status(201).json({ todo }))
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static update (req, res) {
    req.user
      .getTodos({
        where: {
          id: req.params.todo_id
        },
        limit: 1
      })
      .then(([ todo ]) => {
        todo.title = req.body.title
        todo.description = req.body.description
        return todo.save()
      })
      .then(todo => res.status(200).json({ todo }))
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }

  static delete (req, res) {
    req.user
      .getTodos({
        where: {
          id: req.params.todo_id
        },
        limit: 1
      })
      .then(([ todo ]) => {
        todo.destroy()
          .then(() => res.status(200).json({ todo: { id: todo.id } }))
      })
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }
}

module.exports = Todo

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const models = require('../models')

class Auth {
  static signup (req, res) {
    models.User
      .create({
        email: req.body.email,
        password: req.body.password
      })
      .then(user => res.status(201).json({ user }))
      .catch(() => res.status(500).json({ message: 'Internel Server Error' }))
  }

  static signin (req, res) {
    models.User
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then(user => {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign({
            id: user.id,
            email: user.email
          }, process.env.JWT_SECRET_KEY)
          res.status(201).json({ token })
        } else {
          res.status(400).json({ message: 'Invalid email/password' })
        }
      })
      .catch(err => res.status(500).json({ message: 'Iinternal Server Error' }))
  }
}

module.exports = Auth

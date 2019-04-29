const jwt = require('jsonwebtoken')

const models = require('../models')

const loggedIn = (req, res, next) => {
  if ('authorization' in req.headers) {
    let token = req.headers.authorization
    try {
      let payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
      models.User
        .findByPk(payload.id)
        .then(user => {
          req.user = user
          next()
        })
        .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
    } catch (e) {
      res.status(400).json({ message: 'Invalid Token' })
    }
  } else {
    res.status(400).json({ message: 'Missing Token' })
  }
}

module.exports = { loggedIn }

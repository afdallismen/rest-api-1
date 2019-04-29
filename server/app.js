require('dotenv').config()

const express = require('express')

const routes = require('./routes')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', routes)

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000...')
})

module.exports = app

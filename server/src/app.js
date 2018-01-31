const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')

const config = require('./config/config')
const users = require('./routes/users')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(passport.initialize())
app.use(passport.session())

app.use('/users', users)

mongoose.connect(config.database.uri, {user: config.database.user, pass: config.database.pass}).then(
  () => {
    console.log('Successfully connected to MongoDB')
    app.listen(config.port, () => {
      console.log('Server started on port ' + config.port)
    })
  },
  (err) => {
    console.log('Failed to connect to MongoDB ERROR: ' + err)
  }
)

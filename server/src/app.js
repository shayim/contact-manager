const createError = require('http-errors')
const http = require('http')
const express = require('express')
const appsetting = require('./appsettings')

const app = express()
app.set('env', appsetting.ENV)
require('./config/mongoose').init(app)
require('./config/models').init(app)
require('./config/express').init(app)

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

const port = appsetting.port || 3000
const hostname = appsetting.hostname || '127.0.0.1'

if (!module.parent) {
  http.createServer(app).listen(
    port,
    hostname,
    () => {
      console.log(`${appsetting.app.name} is running`)
      console.log(`   listening on ${hostname}: ${port}`)
      console.log(`   environment: ${appsetting.ENV}`)
    }
  )
}

module.exports = app

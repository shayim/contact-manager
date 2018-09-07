const path = require('path')
const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')(session)
const config = require('../appsettings')

function initExpress (app) {
  const root = config.root
  const sessionOpts = {
    secret: config.session.secret,
    key: 'skey.sid',
    resave: config.session.resave,
    saveUninitialized: config.session.saveUninitialized
  }

  // view engine setup
  app.set('views', path.join(root, 'views'))
  app.set('view engine', 'jade')

  app.use(logger('dev'))
  app.use(express.urlencoded({
    extended: true
  }))
  app.use(express.json())
  app.use(cookieParser())
  app.use(methodOverride())
  app.disable('x-powered-by')

  if (config.session.type === 'mongo') {
    sessionOpts.store = new MongoStore({
      url: config.mongodb.uri
    })
  }

  app.use(session(sessionOpts))
  app.use(passport.initialize())
  app.use(passport.session())

  app.use(function (req, res, next) {
    res.locals.app = config.app

    next()
  })

  if (config.serveStatic) {
    app.use(express.static(path.join(root, 'public')))
  }
}

module.exports.init = initExpress

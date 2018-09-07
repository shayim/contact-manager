const env = require('./config/environment')

const devConfig = {
  ENV: env,
  root: __dirname,
  port: 8081,
  hostname: '127.0.0.1',
  baseUrl: `http://localhost:8081`,
  mongodb: {
    uri: 'mongodb://localhost/cm_dev_db'
  },
  app: {
    name: 'Contact Manager Api'
  },
  serveStatic: true,
  session: {
    type: 'mongo',
    secret: 'u+J%E^9!hx?piXLCfiMY.EDc',
    resave: false,
    saveUninitialized: true
  }
}

const prodConfig = {}

if (env === 'development') {
  module.exports = devConfig
} else {
  module.exports = prodConfig
}

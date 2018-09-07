const mongoose = require('mongoose')
const appsettings = require('../appsettings')

function cleanup () {
  mongoose.connection.close(function () {
    console.log('Closing DB connection and stopping the app. Bye bye.')
    process.exit(0)
  })
}

function initMongoose (app) {
  mongoose.connect(appsettings.mongodb.uri, {
    useNewUrlParser: true
  })

  // If the Node process ends, cleanup existing connections
  process.on('SIGINT', cleanup)
  process.on('SIGTERM', cleanup)
  process.on('SIGHUP', cleanup)

  if (app) {
    app.set('mongoose', mongoose)
  }

  return mongoose
}

module.exports.init = initMongoose

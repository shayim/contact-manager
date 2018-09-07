const path = require('path')
const appsettings = require('../appsettings')

function initModels (app) {
  let modelsPath = path.resolve(appsettings.root, 'models')
  let models = ['user', 'contact']
  models.forEach(model => {
    require(path.resolve(modelsPath, model))
  })
}

module.exports.init = initModels

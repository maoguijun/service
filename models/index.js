const Sequelize = require('sequelize')
, fs = require('fs')
, config = require('config')
, path = require('path')
, association = require('./association')
, modelWrapper = require('ljx-sequelize-wrapper')

let dbConfig = config.mysql
let sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig.options)

fs.readdirSync(__dirname, 'utf8')
  .filter(file => file.endsWith('.js') && file !== 'index.js' && file !== 'association.js' && file !== 'redis.js')
  .forEach(file => sequelize.import(path.join(__dirname, file)))

let models = sequelize.models;
let Models = {}

association(models)

for (let key in models) {
  Models[key] = new modelWrapper(models, key)
}

exports.models = models
exports.Models = Models
exports.sequelize = sequelize
exports.Sequelize = Sequelize


const sequelize = require('../../models').sequelize,
  redis = require('redis'),
  Cacher = require('sequelize-redis-cache'),
  redisConfig = require('config').redis,
  redisClient = redis.createClient(redisConfig)

// Cacher.prototype.updateCache = function (opts) {
//   var self = this
//   this.options = opts || this.options
//   let key = self.key()
//   return self.fetchFromDatabase(key)
// }

module.exports = Cacher(sequelize, redisClient)



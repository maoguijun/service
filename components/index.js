const Common = require('./common'),
  Passport = require('./passport'),
  RBAC = require('./rbac'),
  Widgets = require('./widgets'),
  config = require('config')

module.exports = {
  Common,
  Cache: config.cache ? require('./cache') : null,
  Passport,
  RBAC,
  Widgets
}

const
  args = require('./appconfig/args'),
  flowCfg = require('./appconfig/flowCfg'),
  errors = require('./appconfig/errors')

module.exports = {
  mysql: {
    database: 'Freetopia',
    username: 'root',
    password: 'root',
    options: {
      host: '127.0.0.1',
      port: '3306',
      dialect: 'mysql'
    }
  }
}

const
  args = require('./appconfig/args'),
  flowCfg = require('./appconfig/flowCfg'),
  errors = require('./appconfig/errors'),
  init = require('./appconfig/init')

module.exports = {
  mysql: {
    database: 'Freetopia',
    username: 'root',
    password: '123456',
    options: {
      host: '127.0.0.1',
      port: '3306',
      dialect: 'mysql'
    }
  },
  cache: false,
  port: 5800,
  args,
  flowCfg,
  errors,
  init,
  cluster: false,
  basis: {},
  uploadPath: `${process.cwd()}/uploadFile`,
  envIsProduction: process.env.NODE_ENV === 'production',
  dftRemovedFields: [
    'status',
    'createdAt',
    'updatedAt',
    'createdUsr',
    'updatedUsr',
    'remark'
  ],
  $: Object.assign({}, require('../components/common/basic'), require('../components/common/util')),
  _: require('lodash'),
  moment: require('moment')
}

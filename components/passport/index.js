const
  models = require('../../models').models,
  {getPermissionsByAccount} = require('../rbac')

exports.login = (req, username, password, done) => {
  let run = async () => {

    let $account = await models.account.findOne({
      where: {
        id: username,
        status: 1
      },
      attributes: ['id', 'name'],
      include: [
        {
          model: models.role,
          attributes: ['id'],
          through: {
            attributes: [],
            where: {status: 1}
          },
          required: false
        }
      ]
    })

    if (!$account) {
      return done(null, false, {message: '登录失败'})
    }
    return done(null, $account)
  }

  run().catch(err => console.error(err))
}

exports.find = (id, done) => {
  models.account.findOne({
    where: {id},
    include: [
      {
        model: models.role,
        where: {status: 1},
        through: {attributes: []},
        required: false
      }
    ]
  })
    .then(obj => done(null, obj))
    .catch(err => done(err))
}

async function getPermissions (req) {
  let permissions = await getPermissionsByAccount(req.user.id)

  req.user.permissions = permissions
  req.user.dataValues.permissions = permissions
}

exports.getPermissions = getPermissions

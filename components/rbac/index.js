const RBAC = require('rbac').default,
  WebError = require('web-error').default,
  models = require('../../models').models,
  cfg = require('config').get('args'),
  _ = require('lodash')

const unAuthenticatedCode = 401
let newRBAC

exports.buildRBACArgs = async () => {
  let roles = [],
    permissions = {},
    grants = {}

  let $roles = await models.role.findAll({
    where: {status: cfg.status.normal}
  })

  if ($roles.length === 0) console.error('Please Init the Data，Then Restart Backend Node!')

  let $permissions = await models.permission.findAll({where: {status: cfg.status.normal}})
  let $grants = await models.grant.findAll({where: {status: cfg.status.normal}})

  roles = $roles.map($role => $role.id)

  $permissions.forEach($p => {
    if (!_.has(permissions, $p.object)) {
      permissions[$p.object] = [$p.operation]
    }
    if (_.has(permissions, $p.object) && !permissions[$p.object].includes($p.operation)) {
      permissions[$p.object].push($p.operation)
    }
  })

  $grants.forEach($grant => {
    if (!_.has(grants, $grant.seniorRole)) {
      grants[$grant.seniorRole] = []
    }
    if ($grant.juniorRole && !grants[$grant.seniorRole].includes($grant.juniorRole)) {
      grants[$grant.seniorRole].push($grant.juniorRole)
    }
    if ($grant.permissionId && !grants[$grant.seniorRole].includes($grant.permissionId)) {
      grants[$grant.seniorRole].push($grant.permissionId)
    }
  })

  let args = {roles, permissions, grants}

  return new RBAC(args, (err, rbac) => {
    if (err) {
      throw new Error(err)
    }
    newRBAC = rbac
  })
}

exports.can = (operation, object) => {
  let pass = false

  return (req, res, next) => {
    if (req.user && req.user.roles.length !== 0) {
      req.user.roles.forEach(role => {
        newRBAC.can(role.id, operation, object, (err, can) => {
          if (err) {
            throw err
          }
          if (can) {
            pass = true
          }
        })
      })
    }

    if (pass) {
      return next()
    }

    return req.isAuthenticated() ? next(new WebError(unAuthenticatedCode)) : next(new Error('未登录'))
  }
}

exports.getRBAC = () => newRBAC

exports.getPermissionsByAccount = async (accountId, t) => {
  let permissions = []
  let $accountRoles = await models.accountRole.findAll({
    where: {
      accountId,
      status: 1
    },
    transaction: t
  })

  $accountRoles.map($accountRole => $accountRole.roleId).forEach(roleId => {
    permissions = [...permissions, ...exports.getPermissionsByRole(roleId)]
  })
  return permissions
}

exports.getPermissionsByRole = roleId => {
  let permissions

  newRBAC.getScope(roleId, (err, scopes) => {
    if (err) throw err
    permissions = scopes
  })
  return permissions
}

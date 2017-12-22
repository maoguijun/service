const
  {models, Models, sequelize} = require('../models'),
  {ApiDialect, Arg} = require('api-dialect'),
  {$, _, dftRemovedFields} = require('config')

exports.getlist = (req, res) => {
  const api = new ApiDialect(req, res)
  const args = [new Arg('offset'), new Arg('limit')]

  if (!api.setArgs(args)) {
    return
  }

  const run = async args => {
    const attrs = ['$all']
    const objs = await Models.role.setWherestr(args).setAttributes(attrs).all()

    return objs
  }

  run(api.args)
    .then(objs => {
      api
        .setResponse(objs)
        .send({remove: dftRemovedFields})
    })
    .catch(err => api.error(err))
}

exports.get = (req, res) => {
  const api = new ApiDialect(req, res)
  const args = [new Arg('id', true)]

  if (!api.setArgs(args)) {
    return
  }

  const run = async args => {
    const attrs = ['$all']
    const obj = await Models.role.setWherestr(args).setAttributes(attrs).one()

    return obj
  }

  run(api.args)
    .then(obj => {
      api
        .setResponse(obj)
        .send({remove: dftRemovedFields})
    })
    .catch(err => api.error(err))
}

exports.new = (req, res) => {
  const api = new ApiDialect(req, res)
  const args = [...Arg.factory(models.role)]

  if (!api.setArgs(args)) {
    return
  }

  const run = async (args, t) => {
    const obj = await Models.role.create(args, t)

    return obj
  }

  sequelize.transaction(t => run(api.args, t))
    .then(obj => {
      api
        .setResponse(obj)
        .send({remove: dftRemovedFields})
    })
    .catch(err => api.error(err))
}

exports.update = (req, res) => {
  const api = new ApiDialect(req, res)
  const args = [...Arg.factory(models.role, 'put')]

  if (!api.setArgs(args)) {
    return
  }

  const run = async (args, t) => {
    const obj = await Models.role.update(args, t)

    return obj
  }

  sequelize.transaction(t => run(api.args, t))
    .then(obj => {
      api
        .setResponse(obj)
        .send({remove: dftRemovedFields})
    })
    .catch(err => api.error(err))
}

exports.delete = (req, res) => {
  const api = new ApiDialect(req, res)
  const args = [new Arg('id', true)]

  if (!api.setArgs(args)) {
    return
  }

  const run = async (args, t) => {
    api.args.status = 0
    const obj = await Models.role.update(args, t)

    return obj
  }

  sequelize.transaction(t => run(api.args, t))
    .then(obj => {
      api
        .setResponse(obj)
        .send({remove: dftRemovedFields})
    })
    .catch(err => api.error(err))
}

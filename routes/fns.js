const
  {models, Models, sequelize} = require('../models'),
  {$, _, dftRemovedFields, moment} = require('config'),
  fs = require('fs'),
  path = require('path')

exports.updateFiledLog = async (args, t) => {
  const whereBody = []

  if (args.prefix) {
    whereBody.push({
      logType: 'prefix',
      content: args.prefix
    })
  }
  if (args.postfix) {
    whereBody.push({
      logType: 'postfix',
      content: args.postfix
    })
  }
  const objs = await models.filedLog.findAll({
    where: {$or: whereBody},
    transaction: t
  })

  if (!objs || objs.length === 0) {
    await models.filedLog.bulkCreate(whereBody, {transaction: t})
    return
  }

  if (objs.length === 1) {
    const targetBody = _.find(whereBody, i => objs[0].logType !== i.logType)

    if (targetBody) await models.filedLog.create(targetBody, {transaction: t})
  }
}

exports.representativeFilePath = (req, file) => {
  let {name, mobile, description, target} = req.query
  // excel 处理

  if (name === 'excel') {
    let excelFile = path.join(process.cwd(), `uploadFile/${name}`, description)

    $.mkdirRecursion(excelFile)
    return excelFile
  }


  let dir = `${name}-${mobile}`
  let targetPath = path.join(process.cwd(), `uploadFile/${target}`, dir)

  if (fs.existsSync(targetPath)) {
    let files = fs.readdirSync(targetPath)

    files.forEach(f => {
      if (f.includes(description)) {
        if (!fs.existsSync(path.join(targetPath, 'replaced'))) {
          fs.mkdirSync(path.join(targetPath, 'replaced'))
        }
        fs.renameSync(path.join(targetPath, f), path.join(targetPath, 'replaced', `${moment().format('YYYYMMDD')}-${f}`))
      }
    })
  } else {
    $.mkdirRecursion(targetPath)
  }

  return targetPath
}

exports.nameRepetitionInspect = async (args, t) => {
  // 查找不是可用的nameBatchDetail, 如果存在, 则抛出错误
  let objs = await models.nameBatchDetail.findAll({
    where: {
      name: {$in: args.nameBatchDetails.filter(i => _.isEmpty(i.id)).map(j => j.name)},
      flowStatus: {$ne: 'NotUsed'}
    },
    transaction: t
  })

  if (!_.isEmpty(objs)) throw new Error(`名称: ${objs.map(i => i.buildName).join(',')}已经存在, 请替换`)
}


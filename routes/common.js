const
  fs = require('fs'),
  path = require('path'),
  {ApiDialect, Arg} = require('api-dialect'),
  config = require('config'),
  {_, $, args} = config,
  upload = require('debug')('upload'),
  {models} = require('../models'),
  Excel = require('exceljs')

const provinces = JSON.parse(fs.readFileSync(`${process.cwd()}/others/cities.json`, 'utf8')).provinces

exports.cityMatch = (req, res) => {
  const api = new ApiDialect(req, res)
  const args = [new Arg('name', true)]
  let objs = []

  if (!api.setArgs(args)) return

  const cityReg = new RegExp(api.args.name)

  provinces.forEach(province => {
    province.citys.forEach(city => {
      if (cityReg.test(city.citysName)) {
        objs.push(city.citysName)
      }
    })
  })

  objs = objs.map(obj => obj.replace('市', ''))
  api.setResponse(objs).send()
}

exports.upload = (req, res) => {
  if (_.isEmpty(req.file)) {
    return res.json({
      msg: '上传图片不能为空',
      status: 'failed'
    })
  }

  upload(req.file)

  let url = req.file.path.replace(process.cwd(), '').split(path.sep).join('/')

  return res.json({
    ...req.file,
    url,
    status: 'success'
  })
}

exports.args = (req, res) => {
  res.json({
    ...config.args,
    ...config.flowCfg
  })
}

exports.idGenerator = (req, res) => {
  const api = new ApiDialect(req, res)
  const args = [new Arg('name', true), new Arg('companyType'), new Arg('yhStoreId')]

  if (!api.setArgs(args)) return
  let run = async args => {
    let where = {}
    let companyType = {
      个人独资企业: 'SPE',
      有限责任公司: 'LLC',
      合伙企业: 'LLP'
    }

    if (args.companyType) where.id = {$like: `%${companyType[args.companyType]}%`}
    if (args.yhStoreId) where.id = {$like: `%${args.yhStoreId}%`}
    let obj = await models[args.name].findOne({where, order: [['createdAt', 'DESC'], ['id', 'DESC']]})
    let id = ''

    if (!obj) {
      switch (args.name) {
        case 'representative':
          id = 'LP000001'
          break
        case 'company':
          id = `${companyType[args.companyType]}000001`
          break
        case 'yhStore':
          id = 'YHSH0001'
          break
        case 'yhWorkShop':
          id = 'GF01'
          break
        case 'district':
          id = 'SHA-0001'
          break
        case 'yhPartner':
          id = `${args.yhStoreId}-001`
          break
        default:
          id = `${args.name}001`
      }
    } else {
      id = $.increment(obj.id)
    }

    return id
  }

  run(api.args)
    .then(obj => {
      api
        .setResponse(obj)
        .send()
    })
    .catch(err => api.error(err))
}

exports.generateYHRepresentativeFromExcel = (req, res) => {
  const api = new ApiDialect(req, res)
  const workbook = new Excel.Workbook()

  const run = async path => {
    await workbook.xlsx.readFile(path)

    let obj = workbook.getWorksheet('内加盟商信息')
    let container = []
    let data = []
    let yhWorkShopNames = []
    let yhStoreNames = []

    obj.eachRow((row, rowNumber) => {
      let values = row.values

      if (values.includes('永辉云创超级物种内加盟商信息') || values.includes('内加盟商编号')) return
      container.push(values)
    })

    container.forEach(i => {
      if (i[2] && !yhStoreNames.includes(i[2])) yhStoreNames.push(i[2])
      if (i[3] && !yhWorkShopNames.includes(i[3])) yhWorkShopNames.push(i[3])
    })

    let yhStores = await models.yhStore.findAll({where: {name: {$in: yhStoreNames}}})
    let yhWorkShops = await models.yhWorkShop.findAll({where: {name: {$in: yhWorkShopNames}}})

    for (let i of container) {
      let obj = {}

      if (_.isEmpty(data)) {
        let newest = await models.representative.findOne({order: [['createdAt', 'DESC']]})

        !newest ? obj.id = 'LP000001' : obj.id = $.increment(newest.id)
      } else {
        let latest = _.last(data)

        obj.id = $.increment(latest.id)
      }

      let yhStore = _.find(yhStores, yhStore => yhStore.name === i[2])

      if (yhStore) {
        obj.yhStoreId = yhStore.id
      }

      let yhWorkShop = _.find(yhWorkShops, yhWorkShop => yhWorkShop.name === i[3])

      if (yhWorkShop) {
        obj.yhWorkShopId = yhWorkShop.id
      }

      obj.name = i[4]
      if (!obj.name) continue
      obj.gender = i[5] === '男' ? 'Male' : 'Female'
      obj.birthday = i[6]
      obj.nation = i[7]
      obj.culturalLevel = i[8]
      obj.politicalLevel = i[9]
      obj.mobile = i[10]
      obj.telephone = i[11]
      obj.post = i[12]
      obj.email = i[13].text
      obj.idType = i[14]
      obj.idNum = i[15]
      obj.idPlace = i[16]
      obj.bankName = i[17]
      obj.accountNum = i[18]
      obj.limitedPartnerFlag = i[19] === '是' ? 'Y' : 'N'
      obj.ownPersonalFlag = i[20] === '是' ? 'Y' : 'N'
      obj.ownABCCardFlag = i[21] === '是' ? 'Y' : 'N'

      data.push(obj)
    }

    return models.representative.bulkCreate(data)
  }

  run(req.file.path)
    .then(obj => {
      api
        .setResponse(obj)
        .send()
    })
    .catch(err => api.error(err))
}

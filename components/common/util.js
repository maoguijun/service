const
  _ = require('lodash'),
  moment = require('moment'),
  should = require('should'),
  randomstring = require('randomstring'),
  common = require('./basic'),
  Sequelize = require('sequelize'),
  fs = require('fs'),
  path = require('path')

/**
 * limit 和 offset 判断与处理
 * @param {array} objs 待处理的对象
 * @param {object} args 前端传过来的参数
 * @return {array}
 */

exports.pagination = (objs, args) => {
  if (args.limit && !args.offset) {
    return objs.slice(0, args.limit)
  }  else if (args.offset && !args.limit) {
    return objs.slice(args.offset)
  } else if (args.limit && args.offset) {
    return objs.slice(args.offset, args.limit + args.offset)
  }
  return objs
}

/**
 * 比较两者是否是相同的 ( == )
 * @param {object} obj1 对象1
 * @param {object} obj2 对象2
 * @return {boolean}
 */
exports.is = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2)

/**
 * 查找目标, 如果存在就更新, 如果不存在就创建
 * @param {object} model model对象
 * @param {object|array} args 要更新的参数
 * @param {any} t 事务信号
 * @return {Promise.<void>}
 */
exports.insertOrUpdate = async (model, args, t) => {
  let result

  if (_.isArray(args)) {
    result = []
    for (let arg of args) {
      result.push(await exports.insertOrUpdate(model, arg, t))
    }
  } else {
    if (_.isObject(args)) {
      if (args.hasOwnProperty('id')) {
        let obj = await model.findById(args.id, {transaction: t})

        if (obj) {
          return obj.update(args, {transaction: t})
        }
      }

      return model.create(args, {transaction: t})
    }
  }

  return result
}

const numIncrement = (str, length, flag) => {
  let num = String(parseInt(str) + flag)
  let prefix = ''

  if (num.length < length) {
    let difference = length - num.length

    for (let i = 0; i < difference; i++) {
      prefix += 0
    }
  }

  return prefix + num
}

/**
 * 数字自增
 * @param {string} str 对象
 * @param {integer} flag 增 1 减 -1
 * @return {string}
 */
exports.increment = (str, flag = 1) => {
  if (!_.isString(str)) {
    throw new Error('参数必须是 string')
  }
  let reg = /\d+/g
  let prefix = str.split(reg)
  let num = str.match(reg)
  let result = ''

  num = num.map((i, index) => {
    if (index === num.length - 1) {
      return numIncrement(i, i.length, flag)
    }
    return i
  })

  for (let i of prefix) {
    result += i

    if (num.length !== 0) {
      let j = num.shift()

      result += j
    }
  }

  return result
}

/**
 * 将深层的属性复制的浅层
 * e.x: mergeFields(a.layer1, [{value: 'layer2.layer3', prop: 'test'}])
 *
 * @param {object|array} target 对象
 * @param {array} fields 待处理属性
 * @param {object.string} value 属性
 * @param {object.string} prop 命名属性
 * @return {void}
 */

exports.mergeFields = (target, fields) => {
  if (_.isArray(target)) {
    for (let i of target) {
      exports.mergeFields(i, fields)
    }
  } else if (_.isObject(target)) {
    let obj = target.dataValues || target
    let result = {}

    if (obj instanceof Sequelize.Instance) obj = obj.toJSON()

    for (let field of fields) {
      if (field.value.includes('.')) {
        deepFind(obj, field, result)
      }
    }

    Object.assign(obj, result)
  } else {
    throw new Error('target 必须是 object 或者 array')
  }
}


function deepFind (obj, Field, result) {
  let deepValue = Field.value.split('.')
  let [key, field] = deepValue
  let prop = Field.prop

  if (deepValue.length === 2) {
    if (_.isArray(obj[key])) {

      for (let i of obj[key]) {
        if (!result[prop]) {
          result[prop] = [i[field]]
        } else {
          result[prop].push(i[field])
        }
      }
    } else {
      if (obj[key]) result[prop] = obj[key][field]
    }
  } else {
    deepValue.shift()
    if (_.isArray(obj[key])) {
      for (let i of obj[key]) {
        deepFind(i, {
          value: deepValue.join('.'),
          prop
        }, result)
      }
    } else if (_.isObject(obj[key])) {
      deepFind(obj[key], {
        value: deepValue.join('.'),
        prop
      }, result)
    } else {
      result[key] = obj[key]
    }
  }
}

/**
 * 将数组或者对象某个字段 int 化
 * @param {object} obj, 对象
 * @param {array} fields, 待更新字段
 * @return {void}
 */
exports.intify = (obj, fields) => {
  if (_.isArray(obj)) {
    for (let i of obj) {
      exports.intify(i, fields)
    }
  } else if (_.isObject(obj)) {
    fields.forEach(field => obj[field] = parseInt(obj[field]))
  }
}

/**
 * 随机生成 model 实例
 * @param {object} container 实例容器
 * @param {object} model sequelize model
 * @param {object} fields 手动修改的字段
 * @return {{}}
 */
exports.randomInstance = (container, model, fields = {}) => {
  let result = {}

  if (container.constructor.name === 'Model') {
    fields = model
    model = container
  } else {
    result = container
  }

  let numParams = (length = 5, max, min) => ({
    length: length < 1 ? common.randomNumber(max, min) : length,
    charset: 'numeric'
  })
  let stringParams = (length = 12, max, min) => ({
    length: length < 1 ? common.randomNumber(max, min) : length,
    charset: 'alphabetic'
  })
  let randomENUM = obj => obj[common.randomNumber(obj.length - 1)]

  Object.keys(model.attributes).forEach(key => {
    let attr = model.attributes[key]
    let field = attr.fieldName

    if (attr.hasOwnProperty('defaultValue') && attr.type.key !== 'UUID') {
      result[field] = attr.defaultValue
      return
    }
    if ([
      'createdAt',
      'updatedAt',
      'createdUsr',
      'updatedUsr',
      'status'
    ].includes(field)) {
      return
    }
    if ([
      'sentToId',
      'billToId',
      'placedToId',
      'approverId',
    ].includes(field)) {
      result[field] = 'test'
      return
    }
    if (field === 'currencyId') {
      result[field] = 'CNY'
      return
    }
    if (['clientId', 'clientDetailId'].includes(field)) {
      result[field] = 'test-vat'
      return
    }
    if (field === 'groupId') {
      result[field] = 'group001'
      return
    }
    if ([
      'tier1Id',
      'tier2Id',
      'tier3Id',
      'tier4Id'
    ].includes(field)) {
      result[field] = 'test001'
      return
    }
    if (field === 'clientPoType') {
      result[field] = 'Annual-Scope'
      return
    }

    switch (attr.type.key) {
      case 'STRING':
        result[field] = randomstring.generate(stringParams())
        break
      case 'INTEGER':
        result[field] = randomstring.generate(numParams())
        break
      case 'TEXT':
        result[field] = randomstring.generate(stringParams(50))
        break
      case 'DATE':
        result[field] = moment().add(common.randomNumber(30), 'days').format('YYYY-MM-DD')
        break
      case 'ENUM':
        if (attr.hasOwnProperty('defaultValue')) {
          result[field] = attr.defaultValue
        } else {
          result[field] = randomENUM(attr.values)
        }
        break
      default:
        break
    }
  })

  if (!_.isEmpty(fields)) {
    for (let key in fields) {
      result[key] = fields[key]
    }
  }

  return result
}

/**
 * 批量生成模型实例
 * @param {integer} num 数量
 * @param {object} model sequelize model
 * @param {object} fields 手动修改的字段
 * @return {Array}
 */
exports.multiRandomInstance = (num = 1, model, fields = []) => {
  let result = []

  for (let i = 0; i < num; i++) {
    result.push(exports.randomInstance({}, model, fields[i % fields.length]))
  }

  return result
}

/**
 * 递归创建文件夹，如果存在则不创建
 * @param {string} destination 文件夹路径
 * @return {null}
 */
exports.mkdirRecursion = destination => {
  if (!fs.existsSync(destination)) {
    let upperDestination = path.parse(destination).dir

    if (!fs.existsSync(upperDestination)) {
      exports.mkdirRecursion(upperDestination)
    }

    fs.mkdirSync(destination)
  }
}

/** ************************* 测试 widgets ***********************************/
/**
 * 断言判断数组
 * @param {function} done 异步结束方法
 * @param {integer} code 错误代码
 * @param {integer} length 数组长度
 * @param {function} cb 自定义处理函数
 * @return {any}
 */
exports.assertArray = (done, code = -1, length = -1, cb) => (err, res) => {
  if (err) {
    return done(err)
  }
  let data = res.body

  if (code >= 0) {
    console.log(data)
    should(data.status).be.equal('failed')
    should(data.code).be.equal(`${code}`)
    return done()
  } 
  should(data.status).be.equal('success')
  

  if (length >= 0) {
    should(data.objs.length).be.equal(length)
  }

  if (cb) {
    return cb(done, data.objs, data)
  }

  return done()
}

/**
 * 断言判断数组
 * @param {function} done 异步结束方法
 * @param {integer} code 错误代码
 * @param {object} fields 拥有字段判断
 * @param {function} cb 自定义处理函数
 * @return {any}
 */
exports.assertObj = (done, code = -1, fields = {}, cb) => (err, res) => {
  if (err) {
    return done(err)
  }
  let data = res.body

  if (code >= 0) {
    console.log(data)
    should(data.status).be.equal('failed')
    should(data.code).be.equal(`${code}`)
    return done()
  } 
  should(data.status).be.equal('success')


  if (!_.isEmpty(fields)) {
    exports.assertObjHas(data.obj, fields)
  }

  if (cb) {
    return cb(done, data.obj, data)
  }

  return done()
}

exports.assertObjHas =  (obj, fields) => {
  Object.keys(fields).forEach(k => {
    obj.should.has.ownProperty(k)
    if (_.isString(fields[k]) || _.isNumber(fields[k])) {
      obj[k].should.equal(fields[k])
    }
    if (_.isObject(fields[k])) {
      exports.assertObjHas(fields[k], obj[k])
    }
    if (_.isArray(fields[k])) {
      fields[k].every(arg => obj[k].includes(arg)).should.be.ok()
    }
  })
}

exports.assertRequest = (done, code = -1, assert, cb) => (err, res) => {
  if (err) {
    return done(err)
  }
  let data = res.body

  if (code >= 0) {
    console.log(data)
    should(data.status).be.equal('failed')
    should(data.code).be.equal(`${code}`)
    return done()
  }
  if (data.status !== 'success') {
    console.log(data.code, data.msg)
  }
  should(data.status).be.equal('success')
  

  if (data.hasOwnProperty('obj')) {
    exports.assertObj(done, code, assert, cb)(err, res)
  }

  if (data.hasOwnProperty('objs')) {
    exports.assertArray(done, code, assert, cb)(err, res)
  }
}

/**
 * 接口返回字段判断
 * @param {object|array} obj 对象
 * @param {array} fields 要有的字段
 * @return {any}
 */
exports.shouldInclude = (obj, fields) => {
  if (_.isArray(obj)) {
    obj.forEach(i => exports.shouldInclude(i, fields))
  } else {
    for (let m of fields) {
      if (m.includes('.')) {
        let list = m.split('.')

        if (list.length === 2) {
          let [parentField, childField] = list

          if (!_.isEmpty(obj[parentField])) {
            childShouldInclude(obj, parentField, childField)
          }
        } else {
          let parentField = list.shift()

          exports.shouldInclude(obj[parentField], [list.join('.')])
        }

      } else {
        obj.should.have.ownProperty(m)
      }
    }
  }
}

function childShouldInclude (obj, pField, cField) {
  if (_.isArray(obj[pField])) {
    obj[pField].forEach(j => {
      let cFields = cField.split(',').map(i => i.trim())

      cFields.forEach(field => j.should.have.ownProperty(field))
    })
  } else {
    if (cField.includes(',')) {
      let cFields = cField.split(',').map(i => i.trim())

      cFields.forEach(field => obj[pField].should.have.ownProperty(field))
    } else {
      obj[pField].should.have.ownProperty(cField)
    }
  }
}


/** ******************************** 项目相关 ************************************/
const pinyin = require('pinyin')

/**
 * 拼音转 string
 * @param {str} str 对象 汉字
 * @return {string}
 */
exports.pinyin = str => pinyin(str).map(i => i[0]).join(',')


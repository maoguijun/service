const
  fs = require('fs'),
  path = require('path'),
  moment = require('moment')

exports.checkUnique = async (model, condition, t) => {

  // 同年只能有一条数据
  let $checkUnique = await model.count({
    where: condition,
    transaction: t
  })

  if ($checkUnique !== 0) throw new Error(101)
}


exports.getApiFiles = filePath => {
  let result = {}

  fs.readdirSync(filePath, 'utf8')
    .filter(file => !['index.js', 'init', 'sow'].includes(file) && !file.startsWith('.'))
    .forEach(file => {

      // 如果是文件夹
      if (!file.endsWith('.js')) {
        let deepResult = exports.getApiFiles(`${filePath}/${file}`)

        for (let key in deepResult) {
          result[key] = deepResult[key]
        }
      }

      else {
        result[file.replace(/\.js$/, '')] = require(`${filePath}/${file}`)
      }
    })

  return result
}

/**
 * 获得一年中的天数
 * @param {number} year 年份
 * @return {number}
 */
exports.daysInYear = year => moment(year).isLeapYear() ? 366 : 365;


/**
 * 检测 object 中是否存在 attrArr 中所包含的字段
 *
 * @param {object} object 目标对象
 * @param {array} attrArr ['attr1', 'attr2']
 * @return {null}
 */
exports.checkExist = (object, attrArr) => {
  attrArr.forEach(attr => {
    if (object[attr] === null || object[attr] === undefined) throw new Error(`3, ${attr}`)
  })
}

/**
 * 将 object 中指定的字段转为数字
 *
 * @param {object} object 目标对象
 * @param {array} attrArr ['attr1', 'attr2']
 * @return {null}
 */
exports.bulkParseFloat = (object, attrArr) => {
  attrArr.forEach(attr => {
    object[attr] = parseFloat(object[attr])
  })
}


/**
 * 递归创建文件夹，如果存在则不创建
 * 注意 windows 和 linux（posix） 的区别
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

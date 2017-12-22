const moment = require('moment')
const Sequelize = require('../../models').Sequelize
const pluralize = require('pluralize')

/**
 * 返回 sequelize 中展示字段
 * @return {object}
 */
Sequelize.Instance.prototype.clearRedundancyFields = function () {
  return JSON.parse(JSON.stringify(this))
}

/**
 * js自带的toFixed方法，采用的是四舍六入五成双方法，对于普通用户十分诡异，而且返回的是一个字符串
 * 所以写一个简单的处理方法
 *
 * @param {number} fractionDigits=2 保留有效数字
 * @returns {number} 返回处理后的数字
 *
 * @example
 *
 * 1.234.simpleFixed(2)
 * //=> 1.23
 */
Number.prototype.simpleFixed = function (fractionDigits = 2) {
  let temp = this > 0 ? this * Math.pow(10, fractionDigits) + 0.5 : this * Math.pow(10, fractionDigits) - 0.5

  return parseInt(temp) / Math.pow(10, fractionDigits)
}

/**
 * 数字的四舍五入转化
 * @return {number}
 */
Number.prototype.round = function () {
  return Math.round(this)
}

/**
 * 数字粗略判断相等
 * @param {number} n 待比较对象
 * @param {number} digit 粗略等级
 * @return {boolean}
 */
Number.prototype.equal = function (n, digit = 0) {
  n = Math.round(n)
  const diff = Math.abs(this - n)
  const range = 10 ** digit

  return diff <= range
}

/**
 * 判断 Object 中是否存在 keys
 *
 * @return {boolean}
 */
// function ObjHaveProps (...keys) {
//   let result = keys.length
//
//   for (let key of keys) {
//     if (!this.hasOwnProperty(key)) --result
//   }
//   return result
// }
//
// Object.defineProperty(Object.prototype, 'have', {value: ObjHaveProps})

/**
 * 判断 Object 中是否存在某个值
 *
 * @param {any} attr, 值
 * @return {boolean}
 * @constructor
 */
function ObjHasValue (attr) {
  for (let key in this) {
    if (this[key] === attr) {
      return true
    }
  }
  return false
}

Object.defineProperty(Object.prototype, 'hasValue', {
  value: ObjHasValue,
  enumerable: false
})

/**
 * 删除 Object 中的某个属性，并返回 object
 * @param {string} props，待删除属性
 * @return {object}
 */
function deleteProps (...props) {
  for (let prop of props) {
    if (this.hasOwnProperty(prop)) delete this[prop]
  }
  return this
}

Object.defineProperty(Object.prototype, 'deleteProperties', {value: deleteProps})

/**
 * 将 Date 类型的数据字符串化
 * @param {string} format, 字符串化的格式
 * @return {string}
 */
Date.prototype.stringify = function (format = 'YYYY-MM-DD HH:mm') {
  return moment(this).format(format)
}

/**
 * 获取列表中的最大值
 * @param {function} handler, 对于 item 的处理
 * @return {any}
 */
Array.prototype.max = function (handler) {
  if (!handler || typeof handler !== 'function') {
    return this.sort((prev, next) => prev < next)[0]
  }
  return this.sort((prev, next) => handler(prev) < handler(next))[0]
}


/**
 * 获取列表中的最小值
 * @param {function} handler, 对于 item 的处理
 * @return {any}
 */
Array.prototype.min = function (handler) {
  if (!handler || typeof handler !== 'function') {
    return this.sort((prev, next) => prev > next)[0]
  }
  return this.sort((prev, next) => handler(prev) > handler(next))[0]
}

/**
 * 去除数组中的重复值，返回一个处理后的新数组
 * 注：需要 node > 8
 * @param {function} handler, 对 item 的处理过程
 * @return {array}
 */
Array.prototype.removeRepeatItems = function (handler) {
  if (!handler || typeof handler !== 'function') {
    return [...new Set(this)]
  }
  return [...new Set(this.map(handler))]
}

/**
 * 复数化
 * @return {string}
 */
String.prototype.pluralize = function () {
  return pluralize.plural(this)
}

String.prototype.isPlural = function () {
  return pluralize.isPlural(this)
}

String.prototype.singularize = function () {
  return pluralize.singular(this)
}

String.prototype.isSingular = function () {
  return pluralize.isSingular(this)
}

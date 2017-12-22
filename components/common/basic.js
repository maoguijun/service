const _ = require('lodash'),
  moment = require('moment'),
  crypto = require('crypto')

module.exports = {

  /**
   * [] {} undefined null nan '' 默认会被判定为空
   * @param {array|object|string|boolean|number|undefined} value, 值
   * @param {boolean} strict, 严格模式
   * @return {boolean}
   */
  isEmpty: (value, strict = true) => {
    if (_.isBoolean(value) || _.isDate(value) || _.isNumber(value)) {
      return false
    }

    return strict ?
      _.isEmpty(value) :
      _.isNaN(value) || _.isNull(value) || _.isUndefined(value)
  },

  /**
   * 密码 hash 化
   * @param {string} password, 密码
   * @return {string}
   */
  computedPassword: password => crypto.createHash('sha1').update(password).digest('hex'),

  /**
   * 删除 object 中值 null 或者 undefined 的属性
   * @param {object|array} obj 待处理对象
   * @param {array} rm, rm 中的属性也会被删除
   * @param {boolean} strict, 是否是严格模式
   * @return {object}
   */
  clear (obj, rm, strict = true) {
    if (rm && !_.isArray(rm)) {
      throw new Error('remove 函数, rm 参数类型必须为 array')
    }

    if (_.isObject(obj) && !_.isDate(obj)) {
      let items = _.isArray(obj) ? obj : Object.keys(obj)

      items.forEach(i => {
        let value = _.isArray(obj) ? i : obj[i]

        if (rm && rm.includes(i)) {
          _.isArray(obj) ? _.remove(items, item => item === value) : delete obj[i]
          return
        }

        if (_.isNumber(value) || _.isDate(value) || _.isBoolean(value)) {
          return
        }

        if (strict) {
          if (!_.isEmpty(value)) {
            this.clear(value, rm, strict)
          } else if (_.isArray(obj)) {
            _.remove(items, item => item === value)
          } else {
            delete obj[i]
          }
          return
        }

        if (!(_.isNaN(value) || _.isNull(value) || _.isUndefined(value))) {
          this.clear(value, rm, strict)
        } else if (_.isArray(obj)) {
          _.remove(items, item => item === value)
        } else {
          delete obj[i]
        }

      })
    }

    return obj
  },

  /**
   * 删除对象或者数组中的特定字段
   * @param {object} obj
   * @param {array} rm
   *
   * @return {object}
   */

  remove (obj, rm) {
    if (rm && !_.isArray(rm)) {
      throw new Error('remove 函数, rm 参数类型必须为 array')
    }

    if (_.isObject(obj) && !_.isDate(obj)) {
      let items = _.isArray(obj) ? obj : Object.keys(obj)

      items.forEach(i => {
        let value = _.isArray(obj) ? i : obj[i]

        if (rm && rm.includes(i)) {
          _.isArray(obj) ? _.remove(items, item => item === value) : delete obj[i]
          return
        }

        if (_.isNumber(value) || _.isDate(value) || _.isBoolean(value)) {
          return
        }

        if (_.isObject(value) && !_.isDate(value && !_.isEmpty(obj))) {
          this.remove(value, rm)

        }
      })
    }

    return obj
  },

  /*
   * 获取一个随机数字
   * @param {number} min, 允许最小值
   * @param {number} max, 允许最大值
   *
   * @return {number}
   */
  randomNumber: (max, min = 0) => Math.round(Math.random() * (max - min) + min),

  /*
   * 日期格式转化, 输入一个格式, 和待转换的属性
   * @param obj object {} , 'YYYY-MM-DD',
   * @param format string
   * @param {array} args
   *
   * @return {object}
   */
  dateFormat (obj, pattern, args) {
    if (_.isEmpty(obj)) {
      return obj
    }
    let target = obj

    if (_.isArray(target)) {
      target.forEach(i => this.dateFormat(i, pattern, args))
    } else {
      target = obj.dataValues || target
      Object.keys(target).forEach(k => {

        if (args.includes(k) && (_.isDate(target[k]) || _.isString(target[k]))) {
          target[k] = moment(target[k]).format(pattern)
          return
        }
        if (_.isObject(target[k]) || _.isArray(target[k])) {
          this.dateFormat(target[k], pattern, args)
        }
      })
    }

    return target
  }
}

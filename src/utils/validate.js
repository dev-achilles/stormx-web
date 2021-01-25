/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * 保留两位小数（非负）
 * @param {*object} obj
 */
export function limitTowDecimals(value) {
  value = String(value).replace(/[^\d.]/g, '') // 清除"数字"和"."以外的字符
  value = String(value).replace(/^\./g, '') // 验证第一个字符是数字
  value = String(value).replace(/\.{2,}/g, '.') // 只保留第一个, 清除多余的
  value = String(value).replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  value = String(value).replace(/^()*(\d+)\.(\d\d).*$/, '$1$2.$3') // 只能输入两个小数
  return String(value)
}

export function toPrecision(num, n) {
  const r = Math.pow(10, Number(n))
  var result = Math.round(Number(num || 0) * r) / r
  return result
}


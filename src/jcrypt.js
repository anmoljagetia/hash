module.exports = jcrypt

var sjcl = require('./sjcl.js')

// Range 33 - 122
function genString(arr) {
  var out = '', bl = sjcl.bitArray.bitLength(arr), i, tmp
  for (i = 0; i < bl / 8; i++) {
    if ((i & 3) === 0) {
      tmp = arr[i / 4]
    }
    out += String.fromCharCode(Math.floor((tmp >>> 24) / 2.87) + 33)
    tmp <<= 8
  }
  return out
}

function hash(str, n) {
  var i = -1
  var result = str
  while (++i < n) {
    result = genString(sjcl.hash.sha256.hash(result))
  }
  return result
}

function floorsqrt(n) {
  return Math.floor(Math.sqrt(n))
}

function jcrypt(privateKey, publicKey, iterations) {
  var length = privateKey.length
  var key = hash(publicKey, floorsqrt(Math.pow(length, iterations)))[0]
  var salt = hash(publicKey, length)
  var n = [0].concat(privateKey.split('')).reduce(function (a, b) {
    return a + b.charCodeAt(0)
  })
  return hash(key.concat(salt, privateKey), floorsqrt(n))
}

//v3
var jcrypt = require('./jcrypt')
var password = prompt('Private Key?')
var xx = prompt('length/iterations?').split('/')
var length = xx[0] || 32
var iterations = xx[1] || 1
if (password) {
  var hash = jcrypt(password, location.hostname, iterations).slice(0, length)
  Array.prototype.forEach.call(document.querySelectorAll('input'), function (x) {
    if (x.type == 'password') x.value = hash
  })
}

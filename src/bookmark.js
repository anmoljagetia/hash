//v2
var encrypt = function (str) {
  return sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(str));
}
var fields = document.querySelectorAll("input");
var hostname = location.hostname;
var d = document.createElement('div');
var password = prompt("Enter a password");
var size = password.length * 2;
var hash;
if (password) {
  hash = btoa(encrypt(hostname + password)).substr(0 - size, size);
  for (var i = 0, l = fields.length; i < l; i += 1) {
    var field = fields[i];
    if (field.type === "password") field.value = hash;
  }
}

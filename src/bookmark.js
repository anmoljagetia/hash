var encrypt = function (str) {
  return sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(str));
}
var fields = document.querySelectorAll("input");
var hostname = location.hostname;
var d = document.createElement('div');
var password = prompt("Enter a password");
var num = /->(\d+-\d+)$/;
var range;
var r;
var hash;
if (password) {
  hash = encrypt(hostname + password);
  if (num.test(password)) {
    range = num.exec(password)[1];
  } else {
    range = prompt("(optional) Enter a range n-n eg: 1-32");
  }
  if (range) {
    r = range.split("-");
    hash = hash.substr(r[0], r[1]);
  }
  for (var i = 0, l = fields.length; i < l; i += 1) {
    var field = fields[i];
    if (field.type === "password") field.value = hash;
  }
}

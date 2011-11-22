encrypt = ->
  hostname = $("#hostname")[0].value
  password = $("#password")[0].value

  sha256 = new sjcl.hash.sha256
  sha256.update hostname
  sha256.update password
  bits = sha256.finalize()

  hash = sjcl.codec.hex.fromBits bits

  $("#hash").html(hash)

$.domReady ->
  $("#encrypt").on "click", encrypt

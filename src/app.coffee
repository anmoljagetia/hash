class App

  constructor: ->
    $("#hash").hide()
    @hostname = $("#hostname")
    @hostnameParent = @hostname.parents "div.clearfix"
    @password = $("#password")
    @passwordParent = @password.parents "div.clearfix"
    @sha256 = new sjcl.hash.sha256

    @addListeners()

  getValues: ->
    { hostname: @hostname.val(), password: @password.val() }

  encrypt: ->
    { hostname, password } = @getValues()
    return @error() if !hostname or !password

    @sha256.update hostname
    @sha256.update password
    bits = @sha256.finalize()

    hash = sjcl.codec.hex.fromBits bits
    size = password.length * 2

    @render btoa(hash).substr 0 - size, size

  render: (hash) ->
    $("#hash").show()
    $("#hash h2.result").html(hash)

  error: ->
    { hostname, password } = @getValues()

    if !hostname
      @hostnameParent.addClass "error"

    if !password
      @passwordParent.addClass "error"

  noerror: (el) ->
    switch el
      when @hostname then @hostnameParent.removeClass "error"
      when @password then @passwordParent.removeClass "error"

  addListeners: ->
    @hostname.on "click", => @noerror @hostname
    @password.on "click", => @noerror @password


$.domReady ->
  app = new App
  $("#encrypt").on "click", -> app.encrypt()

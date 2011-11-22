(function() {
  var App;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  App = (function() {
    function App() {
      $("#hash").hide();
      this.hostname = $("#hostname");
      this.hostnameParent = this.hostname.parents("div.clearfix");
      this.password = $("#password");
      this.passwordParent = this.password.parents("div.clearfix");
      this.sha256 = new sjcl.hash.sha256;
      this.addListeners();
    }
    App.prototype.getValues = function() {
      return {
        hostname: this.hostname.val(),
        password: this.password.val()
      };
    };
    App.prototype.encrypt = function() {
      var bits, hash, hostname, password, _ref;
      _ref = this.getValues(), hostname = _ref.hostname, password = _ref.password;
      if (!hostname || !password) {
        return this.error();
      }
      this.sha256.update(hostname);
      this.sha256.update(password);
      bits = this.sha256.finalize();
      hash = sjcl.codec.hex.fromBits(bits);
      return this.render(hash);
    };
    App.prototype.render = function(hash) {
      $("#hash").show();
      return $("#hash h2.result").html(hash);
    };
    App.prototype.error = function() {
      var hostname, password, _ref;
      _ref = this.getValues(), hostname = _ref.hostname, password = _ref.password;
      if (!hostname) {
        this.hostnameParent.addClass("error");
      }
      if (!password) {
        return this.passwordParent.addClass("error");
      }
    };
    App.prototype.noerror = function(el) {
      switch (el) {
        case this.hostname:
          return this.hostnameParent.removeClass("error");
        case this.password:
          return this.passwordParent.removeClass("error");
      }
    };
    App.prototype.addListeners = function() {
      this.hostname.on("click", __bind(function() {
        return this.noerror(this.hostname);
      }, this));
      return this.password.on("click", __bind(function() {
        return this.noerror(this.password);
      }, this));
    };
    return App;
  })();
  $.domReady(function() {
    var app;
    app = new App;
    return $("#encrypt").on("click", function() {
      return app.encrypt();
    });
  });
}).call(this);

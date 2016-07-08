define(function (require) {
  var system  = require('durandal/system'),
      $       = require('jquery');

  function extensions() {

    (function arrayExtensions() {
      var apply = Function.prototype.apply;
      var flatten = apply.bind(Array.prototype.concat, []);
   
      Array.prototype.selectMany = function (fn) {
        return flatten(this.map(fn));
      };
    }());

    system.extend(system, {
      when: function () {
          var isSingleArrayArg = arguments.length === 1 && $.isArray(arguments[0]);
          return $.when.apply(this, isSingleArrayArg ? arguments[0] : arguments);
      },
      format: function() {
          var formatted = arguments[0];
          for (var i = 1; i < arguments.length; i++) {
              var regexp = new RegExp('\\{'+(i-1)+'\\}', 'gi');
              formatted = formatted.replace(regexp, arguments[i]);
          }
          return formatted;
      },
      resolve: function() {
        var dfd = $.Deferred();
        return dfd.resolve.apply(dfd, arguments);
      },
      reject: function(error) {
        return $.Deferred().reject(error);
      }
    });
  }

  return { apply: extensions };
});
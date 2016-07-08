define(function(require) {
  var ko = require('knockout');

  var href = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
      var path = valueAccessor();
      var replaced = path.replace(/:([A-Za-z_]+)/g, function(_, token) {
          return ko.unwrap(viewModel[token]);
      });
      element.href = replaced;
    }
  };

  return { 
    'href': href
  };
});
define(function(require) {
  var ko = require('knockout');

  var retention = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var settings = {
        model: valueAccessor(),
        view: 'bindings/reports/retention'
      };
      ko.applyBindingsToNode(element, { compose: settings }, bindingContext);
    }
  };

  ko.virtualElements.allowedBindings.retention = true;

  return {
    'retention': retention
  };
});
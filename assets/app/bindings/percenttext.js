define(function(require) {
  var ko = require('knockout');

  return {
    percenttext: {
      update: function(element, valueAccessor) {
        var field = valueAccessor(),
            value = ko.unwrap(field);

        var displayValue = (value * 100);

        ko.bindingHandlers.text.update(element, displayValue);
      }
    }
  };
});

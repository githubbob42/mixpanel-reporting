define(function(require) {
  var ko = require('knockout');

  var gLineChart = {
    init: function (element, valueAccessor, allBindingsAccesor, viewModel, bindingContext) {
      var data = ko.unwrap(valueAccessor());
      var chart = new google.visualization.ComboChart(element);
      chart.draw(data.data, data.options);
    }
  };

  return {
    'gLineChart': gLineChart
  };
});

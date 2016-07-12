define(function(require) {
  var ko = require('knockout');
  var Chart = require('chart');

  ko.observableGroup = function(observables) {
    var observableManager = {};
    var throttle = 0;
    var throttleTimeout;

    observableManager.throttle = function(duration) {
      throttle = duration;
      return observableManager;
    };

    observableManager.subscribe = function(handler) {
      function throttledHandler(val) {
        if(throttle > 0) {
          if(!throttleTimeout) {
            throttleTimeout = setTimeout(function() {
              throttleTimeout = undefined;
              handler(val);
            }, throttle);
          }
        }
        else
        { handler(val); }
      }

      for(var i = 0; i < observables.length; i++)
      { observables[i].subscribe(throttledHandler); }

      return observableManager;
    };

    return observableManager;
  };

  var getType = function(obj) {
    if ((obj) && (typeof (obj) === "object") && (obj.constructor == (new Date).constructor)) return "date";
    return typeof obj;
  };

  var getSubscribables = function(model) {
    var subscribables = [];
    scanForObservablesIn(model, subscribables);
    return subscribables;
  };

  var scanForObservablesIn = function(model, subscribables){
    for (var parameter in model)
    {
      var typeOfData = getType(model[parameter]);
      switch(typeOfData)
      {
        case "object": { scanForObservablesIn(model[parameter], subscribables); } break;
        case "array":
        {
          var underlyingArray = model[parameter]();
          underlyingArray.forEach(function(entry, index){ scanForObservablesIn(underlyingArray[index], subscribables); });
        }
        break;

        default:
        {
          if(ko.isComputed(model[parameter]) || ko.isObservable(model[parameter]))
          { subscribables.push(model[parameter]); }
        }
        break;
      }
    }
  };

  var chart = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
      var allBindings = allBindingsAccessor();
      var chartBinding = allBindings.chart;
      var activeChart;
      var chartData;

      var createChart = function() {
        var chartType = ko.unwrap(chartBinding.type);
        var data = ko.toJS(chartBinding.data);
        var options = ko.toJS(chartBinding.options);

        chartData = {
          type: chartType,
          data: data,
          options: options
        };

        activeChart = new Chart(element, chartData);
      };

      var refreshChart = function() {
        chartData.data = ko.toJS(chartBinding.data);
        activeChart.update();
        activeChart.resize();
      };

      var subscribeToChanges = function() {
        var throttleAmount = ko.unwrap(chartBinding.options.throttle) || 1000;
        var dataSubscribables = getSubscribables(chartBinding.data);
        console.log("found obs", dataSubscribables);

        ko.observableGroup(dataSubscribables)
          .throttle(throttleAmount)
          .subscribe(refreshChart);
      };

      createChart();

      if(chartBinding.options && chartBinding.options.observeChanges)
      {
console.log(' >>>> subscribeToChanges... ');
        subscribeToChanges();
      }
    }
  };

  return {
    'chart': chart
  };

  //   var chartType = {
  //       init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
  //           if (!allBindings.has('chartData')) {
  //               throw Error('chartType must be used in conjunction with chartData and (optionally) chartOptions');
  //           }
  //       },
  //       update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
  //           var ctx = element.getContext('2d'),
  //               type = ko.unwrap(valueAccessor()),
  //               data = ko.unwrap(allBindings.get('chartData')),
  //               options = ko.unwrap(allBindings.get('chartOptions')) || {};

  //           ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
  //                           $(element).chart.destroy();
  //                       delete $(element).chart;
  //                       });

  //                       $(element).chart = new Chart(ctx)[type](data, options);
  //       }
  //   };

  //   var chartData = {
  //       init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
  //           if (!allBindings.has('chartType')) {
  //               throw Error('chartData must be used in conjunction with chartType and (optionally) chartOptions');
  //           }
  //       }
  //   };

  //   var chartOptions = {
  //       init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
  //           if (!allBindings.has('chartData') || !allBindings.has('chartType')) {
  //               throw Error('chartOptions must be used in conjunction with chartType and chartData');
  //           }
  //       }
  //   };

  // return {
  //   'chartType': chartType,
  //   'chartData': chartData,
  //   'chartOptions': chartOptions
  // };
});
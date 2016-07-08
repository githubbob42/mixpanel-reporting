define(function (require) {
  "use strict";

  var ko = require('knockout'),
      api = require('api/api'),
      // app = require('durandal/app'),
      moment = require('moment');

  // app.on('CloseReport').then(function(returnUrl) {
  //     window.location.href = returnUrl;
  // });

  function ReportViewModel() {
    ko.utils.extend(this, {
        data: ko.observable(),
        report: ko.observable(),
        templateData: {},
        title: ko.observable(),
        errorMessage: ko.observable(),
        returnUrl : ko.observable()
    });
  }


  function arrayifyData(data) {
    if (!data) return;

    var dates = [],
        maxCounts = 0;

    Object.keys(data).sort().forEach(function(date) {
      data[date].date = moment(date).format('ll');
      var numCounts = data[date].counts.length;
      maxCounts = maxCounts > numCounts ? maxCounts : numCounts;
      var countsCalced = [];
      data[date].counts.forEach(function(count) {
        var calced = count === 0 ? 0 : (count / data[date].first) * 100;
        countsCalced.push(calced.toFixed(2));
      });
      data[date].countsCalced = countsCalced;
      dates.push(data[date]);
    });
    var headers = [];
    for (var i=1; i < maxCounts; i++) {
      headers.push(i);
    }
    return {
      dates: dates,
      headers: headers,
      maxCounts: maxCounts
    };
  }

  ReportViewModel.prototype.activate = function(routeInfo) {
// console.log(' >>>> ReportViewModel.prototype.activate ', routeInfo);

    this.title("Reports for " + routeInfo.orgName);
    this.returnUrl(location.protocol + '//' + location.host + '/' + routeInfo.id);

    var self = this;
    return api.getRetentionData(routeInfo)
      .catch(function (err) {
console.log(' >>>> ReportViewModel.prototype.activate api.getRetentionData catch', err);
        self.errorMessage(err.responseText);
        return;
      })
      .then(arrayifyData)
      .then(this.data);
  };

  // ReportViewModel.prototype.displayVersion = api.displayVersion;

  return ReportViewModel;
});

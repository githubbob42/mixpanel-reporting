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
        segmentationData1: ko.observable(),
        segmentationData2: ko.observable(),
        segmentationData3: ko.observable(),
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

  function calculateHeatMap() {
  }

  function googlifyData( event, data) {
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('date', event);
    dataTable.addColumn('number', 'Counts');
    var dataRows = data.data.series.map(function(date) {
      return [new Date(date), data.data.values[event][date]];
    });
    dataTable.addRows(dataRows);

      var options = {
        title: event,
        width:1000, height:440,
        hAxis: {title: "", format:'MMM dd'},
        vAxis: {title: "Counts", viewWindow: {min: 0}}
      }

    return {data: dataTable, options: options};
  }

  ReportViewModel.prototype.activate = function(routeInfo) {
    this.title("Reports for " + routeInfo.orgName);
    this.returnUrl(location.protocol + '//' + location.host + '/' + routeInfo.id);

    var self = this;
    return $.when(
        api.getRetentionData(routeInfo).then(arrayifyData),
        api.getSegmentData({orgName: routeInfo.orgName, event: 'TicketAddedToJob'}).then(googlifyData.bind(self, 'TicketAddedToJob')),
        api.getSegmentData({orgName: routeInfo.orgName, event: 'JobCreated'}).then(googlifyData.bind(self, 'JobCreated')),
        api.getSegmentData({orgName: routeInfo.orgName, event: 'QuoteCreated'}).then(googlifyData.bind(self, 'QuoteCreated'))
      )
      .done(function (retentionData, segData, segDataJobCreated, segDataQuoteCreated) {
          self.data(retentionData);
          self.segmentationData1(segData);
          self.segmentationData2(segDataJobCreated);
          self.segmentationData3(segDataQuoteCreated);
        })
      .fail(function (err) {
        console.log(' >>>> ReportViewModel.prototype.activate api.getRetentionData catch', err);
        self.errorMessage(err.responseText);
        return;
      });

  };

  // ReportViewModel.prototype.displayVersion = api.displayVersion;

  return ReportViewModel;
});

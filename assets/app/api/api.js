define(function (require) {
  var $ = require('jquery');

  var api = {
  getRetentionData: function(options) {
    var baseUrl = 'https://51afb48b7ed3d808053df292b1ab6012@mixpanel.com/api/2.0/retention/?',
        from_date, to_date, interval_count,
        retention_type = options.retention_type || 'birth',
        born_event = options.born_event || 'TicketItemAdded', event = options.event || 'TicketItemAdded',
        where = '"_orgName_" in properties["organization"]',
        parts = [];


    switch(options.timespan) {
      case '14days':
        //date_range:(from:-13,to:0),date_unit:day (13)
        break;
      case '12weeks':
        //date_range:(from:-84,to:0),date_unit:week (7*12)
        break;
      case '12months':
        //date_range:(from:-372,to:0),date_unit:month (31*12)
        break;
      default:
        interval_count = 13;
        to_date = new Date();
        from_date = new Date();
        from_date = new Date(from_date.setDate(to_date.getDate() - interval_count));
        parts.push("interval_count=" + interval_count);
        parts.push("to_date=" + to_date.toISOString().slice(0,10));
        parts.push("from_date=" + from_date.toISOString().slice(0,10));
        break;
    }

    parts.push("retention_type=" + retention_type);
    if (retention_type === 'birth' && !born_event) {
      return Promise.reject('"born_event" required if retention_type is "birth"');
    }

    if (born_event) {
      parts.push("born_event=" + born_event);
    }
    if (event) {
      parts.push("event=" + event);
    }

    if (options.orgName) {
      parts.push(encodeURI("where=" + where.replace('_orgName_', options.orgName)));
    }

    //from_date=2016-06-18&to_date=2016-07-01&retention_type=compounded&interval_count=14&born_event=TicketItemAdded&event=TicketItemAdded&where=%22CARBER%22%20in%20properties[%22organization%22]

    var url = baseUrl + parts.join('&') + '&callback=?';
// console.log(' >>>> url ', url);
    return getData(url)
      .then(function(res) {
        return res;
      });
    }
  };

  function getData(url) {
    return Promise.resolve($.getJSON(url));
  }

  return api;
});
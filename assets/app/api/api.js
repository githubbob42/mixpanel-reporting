define(function (require) {
  var $ = require('jquery');
  //var md5 = require('md5');

  var api_key = '1a1bee68c8edb1918f4e010823ef760d';
  var api_secret = '51afb48b7ed3d808053df292b1ab6012';

  var baseUrl = 'https://mixpanel.com/api/2.0';

  var api = {
  getRetentionData: function(options) {
    // https://mixpanel.com/api/2.0/segmentation/?from_date=2016-06-18&to_date=2016-07-01&retention_type=compounded&interval_count=14&born_event=TicketItemAdded&event=TicketItemAdded&where=%22CARBER%22%20in%20properties[%22organization%22]
    var url = baseUrl + '/retention/?',
        from_date, to_date, interval_count,
        retention_type = options.retention_type || 'birth',
        born_event = options.born_event || 'TicketItemAdded', event = options.event || 'TicketItemAdded',
        where = '"_orgName_" in properties["organization"]',
        params = [];


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
        params.push("interval_count=" + interval_count);
        params.push("to_date=" + to_date.toISOString().slice(0,10));
        params.push("from_date=" + from_date.toISOString().slice(0,10));
        break;
    }

    params.push("retention_type=" + retention_type);
    if (retention_type === 'birth' && !born_event) {
      return Promise.reject('"born_event" required if retention_type is "birth"');
    }

    if (born_event) {
      params.push("born_event=" + born_event);
    }
    if (event) {
      params.push("event=" + event);
    }

    if (options.orgName) {
      params.push(encodeURI("where=" + where.replace('_orgName_', options.orgName)));
    }

    // params.push('expire=' + (+new Date() + 60000));
    // params.push('api_key=' + api_key);
    // params = params.sort();
    // var paramsSorted = params.join('');
    // var sig = md5(paramsSorted + api_secret);
    // params.push('sig=' + sig);

    url = url + params.join('&'); // + '&callback=?';

    return getData(url)
      .then(function(res) {
        return res;
      });
  },

  getSegmentData: function(options) {
    // https://mixpanel.com/api/2.0/segmentation/?from_date=2016-06-08&to_date=2016-07-08&event=TicketAddedToJob&unit=day&where=%22TOTAL%20SAFETY%22%20in%20properties[%22organization%22]
    var url = baseUrl + '/segmentation/?',
        from_date, to_date, interval_count, unit,
        retention_type = options.retention_type || 'birth',
        born_event = event = options.event || 'TicketAddedToJob',
        where = '"_orgName_" in properties["organization"]',
        params = [];


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
        unit='day';
        interval_count = 30;
        to_date = new Date();
        from_date = new Date();
        from_date = new Date(from_date.setDate(to_date.getDate() - interval_count));
        // params.push("interval_count=" + interval_count);
        params.push("to_date=" + to_date.toISOString().slice(0,10));
        params.push("from_date=" + from_date.toISOString().slice(0,10));
        break;
    }

    if (event) {
      params.push("event=" + event);
    }

    if (options.orgName) {
      params.push(encodeURI("where=" + where.replace('_orgName_', options.orgName)));
    }

    // params.push('expire=' + (+new Date() + 60000));
    // params.push('api_key=' + api_key);
    // params = params.sort();
    // var paramsSorted = params.join('');
    // var sig = md5(paramsSorted + api_secret);
    // params.push('sig=' + sig);

    url = url + params.join('&'); // + '&callback=?';

    return getData(url)
      .then(function(res) {
        return res;
      });
    }

  };

  function getData(url) {
    var opts = {
      method: 'GET',
      url: url,
      beforeSend: function(xhr) {
        // this is to get around dropped support for embedded credentials in subresource requests:
        // * https://www.chromestatus.com/feature/5669008342777856
        // * https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/lx-U_JR2BF0
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(api_secret + ':'));
      }
    };
    //console.log('%c>>>> getData:opts ', 'background-color: yellow;' , opts );
    return $.Deferred().resolve($.ajax(opts));
  }

  return api;
});
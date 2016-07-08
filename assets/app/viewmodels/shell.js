define(function (require) {
  var ko = require('knockout');

  var activationData = ko.observable();

  // function getQueryVariable(variable) {
  //   var query = window.location.search.substring(1);
  //   var vars = query.split("&");
  //   for (var i=0; i < vars.length; i++) {
  //       var pair = vars[i].split("=");
  //       if (pair[0] === variable){
  //        return pair[1];
  //        }
  //   }
  //   return(false);
  // }

  function getActivationData() {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    var data = vars.reduce(function(obj, kvp) {
      var pair = kvp.split("=");
      obj[pair[0]] = pair[1];
      return obj;
    }, {});

    return data;
  }

// from_date=2016-06-18
// to_date=2016-07-01
// retention_type=compounded
// interval_count=10
// born_event=TicketItemAdded
// event=TicketItemAdded
// where="CARBER" in properties["organization"]

  return {
    activate: function() {
      var options = getActivationData();
      options.retention_type = 'compounded';
      options.orgName = decodeURIComponent(options.orgName).replace(/\+/g, ' ');
      activationData(options);
console.log(' >>>> activationData ', activationData());
    },
    activationData: activationData
  };
});
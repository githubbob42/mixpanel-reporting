define(['jquery', 'knockout'], function($, ko) {
  return {
    delegatedEvent: {
        init: function(element, valueAccessor, allBindings, viewModel) {
          var eventsToHandle = valueAccessor() || {};
          //if a single event was passed, then convert it to an array
          if (!$.isArray(eventsToHandle)) {
            eventsToHandle = [eventsToHandle];
          }
          ko.utils.arrayForEach(eventsToHandle, function(eventOptions) {
            var realCallback = function(event) {
              var options = eventOptions,
                  target = event.target,
                  $target = $(target),
                  match = $target.closest(options.selector);

              //verify that the element matches our selector
              if ($(element).has(match).length > 0) {
                //get real context
                var context = ko.dataFor(match.get(0));
                //if a string was passed for the function, then assume it is a function of the real context
                if (typeof options.callback === "string" && typeof context[options.callback] === "function") {
                    return context[options.callback].call(context, event);
                }
                //if a function was passed, then give it the real context as a param
                return options.callback.call(viewModel, context, event);
              }
            };

            ko.utils.registerEventHandler(element, eventOptions.event, realCallback);
          });
        }
      }
    };
});

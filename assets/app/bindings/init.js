define(function (require) {
	var ko = require('knockout'),
		$ = require('jquery');

	return {
		applyBindings: function() {
			$.extend(ko.bindingHandlers,
				require('./href'),
				require('./delegated-events'),
				require('./reports/index'),
				require('./init-subject-accessibility')
			);
		}
	};
});
define(function (require) {
	var language = require('languages');
	
	return {
		i18n: function () {
			var user = window.user || {},
				languageKey = user.language || 'en_US';

			return language[languageKey];
		}
	};
});
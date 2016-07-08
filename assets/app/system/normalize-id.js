//adapted from: http://boards.developerforce.com/t5/General-Development/display-18-character-ID-in-Page-Layout/m-p/49924
define(function () {
	return function (_id) {
		var	id = _id || '',
			suffix = '';

		id = id.replace(/\"/g, '');
		if (!id || id.length !== 15) return null;

		for (var i = 0; i < 3; i++) {
			var flags = 0;
			for (var j = 0; j < 5; j++) {
				var c = id.charAt(i * 5 + j);
				if (c >= 'A' && c <= 'Z') {
					flags += 1 << j;
				}
			}
			if (flags <= 25) {
				suffix += "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(flags);
			} else {
				suffix += "012345".charAt(flags-26);
			}
		}

		return id + suffix;
	};
});
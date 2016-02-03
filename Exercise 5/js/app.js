(function () {
	'use strict'

	var app = {
		init: function() {
			routes.init();
			console.log("initialized");
		}
	};

	var routes = {
		init: function() {
			window.addEventListener('hashchange', function(hashObj) {
				var hash = hashObj.newURL.split('#')[1];
				sections.toggle(hash);
				console.log(hash);
			}, false);
		}
	};

	var sections = {
		toggle: function(route) {
			document.getElementById(route).style.display = 'block';
		}
	};
	app.init();
}());
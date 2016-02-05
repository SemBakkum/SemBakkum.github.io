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
				var sections = document.querySelectorAll('section');

                Array.prototype.forEach.call(sections, function(el) {
                    el.classList.add('disabled');
                });

				var route1 = document.getElementById(route);
				route1.classList.remove("disabled");
		}
	};
	app.init();
}());

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
				var secties = document.querySelectorAll('section');
				console.log(secties);

				for (var s = 0; s < secties.length; s++){
					secties[s].classList.add("disabled");
				}

				var route1 = document.getElementById(route);
				console.log(route1);
				route1.classList.remove("disabled");
		}
	};
	app.init();
}());
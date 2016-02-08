(function () {
	'use strict'

	var app = {
		//Start all functions, in this case only the routes function.
		init: function() {
			routes.init();
			console.log("initialized");
		}
	};

	var routes = {
		// Initializing routes.
		init: function() {
			//At initializing sets the hash to home.
			window.location.hash = 'home';//Special thank to Emiel Zuurbier (https://github.com/EmielZuurbier/WAFS/blob/master/opdracht%205/static/script/script.js) for supplying me with this piece of code.
			//Seeks for a hashchange in the URL
			window.addEventListener('hashchange', function(hashObj) {
				//If there is a haschange this is where to URL is spilt into two pieces and we use the secend piece after the #.
				var hash = hashObj.newURL.split('#')[1];
				//Adds content of hash to the sections toggle.
				sections.toggle(hash);
				console.log(hash);
			}, false);
		}
	};

	var sections = {
		toggle: function(route) {
				//Selects all sections in the HTML.
				var select = document.querySelectorAll('section');
				console.log(select);
				//Counts how many sections there are and adds the class "disabled to them".
				for (var s = 0; s < select.length; s++){
					select[s].classList.add("disabled");
				}
				//Gets the parameter from the function, so which route is used at that moment in the URL.
				var route1 = document.getElementById(route);
				//Logs the section of the route.
				console.log(route1);
				//Removes the class "disabled" from that section.
				route1.classList.remove("disabled");
		}
	};
	app.init();
}());
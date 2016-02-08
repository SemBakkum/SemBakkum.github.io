(function () {
	'use strict'

	var app = {
		init: function() { 
			routes.init();
		}
	};

	var routes = {
		init: function() {

			var wheater = document.getElementById('demo');

			microAjax("http://api.openweathermap.org/data/2.5/weather?id=2759794&units=metric&appid=44db6a862fba0b067b1930da0d769e98", function(data){
				data = JSON.parse(data);
				var wheaterData = {
					city: data.name,
					temp: data.main.temp,
					weather: data.weather[0].main

				}
				console.log(wheaterData.weather);

				Transparency.render(wheater, wheaterData);
			})
		}
	}
	app.init();
}());
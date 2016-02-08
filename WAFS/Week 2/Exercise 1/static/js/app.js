(function () {
	'use strict'

	var app = {
		init: function() { 
			routes.init();
		}
	};

	var routes = {
		init: function() {

			var weather = document.getElementById('demo');

			microAjax("http://api.openweathermap.org/data/2.5/weather?id=2759794&units=metric&appid=44db6a862fba0b067b1930da0d769e98", function(data){
				data = JSON.parse(data);
				var weatherData = {
					city: data.name,
					temp: data.main.temp,
					weatherType: data.weather[0].description,
					weatherIcon: data.weather[0].icon,
					country: data.sys.country,
					sunUp: data.sys.sunset
				}
				console.log(weatherData.weather);
				console.log(weatherData.sunUp);

				var iconImg = document.getElementById('weatherIcon');

				iconImg.src = 'http://openweathermap.org/img/w/' +weatherData.weatherIcon+ '.png';
				console.log(iconImg);

				var timeStampValue = parseInt(weatherData.sunUp);
				var newTime = new Date(timeStampValue*1000);
				document.getElementById('sunSetValue').innerHTML = newTime;
				console.log(newTime);

				Transparency.render(weather, weatherData);
			})
		}
	}
	app.init();
}());
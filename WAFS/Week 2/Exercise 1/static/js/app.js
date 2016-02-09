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
					sunUp: data.sys.sunrise,
					sunDown: data.sys.sunset,
					gotData: data.dt,
					windSpeed: data.wind.speed
				}
				console.log(weatherData.windSpeed)

				var iconImg = document.getElementById('weatherIcon');

				iconImg.src = 'http://openweathermap.org/img/w/' +weatherData.weatherIcon+ '.png';
				console.log(iconImg);

				var sunDownValue = parseInt(weatherData.sunDown);
				var newSunDown = new Date(sunDownValue*1000);
				document.getElementById('sunSetValue').innerHTML = newSunDown;
				console.log(newSunDown);

				var sunUpValue = parseInt(weatherData.sunUp);
				var newSunUp = new Date(sunUpValue*1000);
				document.getElementById('sunUpValue').innerHTML = newSunUp;
				console.log(newSunUp);

				var gotDataValue = parseInt(weatherData.gotData);
				var newGotData = new Date(gotDataValue*1000);
				document.getElementById('gotDataValue').innerHTML = newGotData;
				console.log(newGotData);				

				Transparency.render(weather, weatherData);
			})
		}
	}
	app.init();
}());
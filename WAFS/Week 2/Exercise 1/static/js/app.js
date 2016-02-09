(function () {
	'use strict'

	var homeDisplay = document.getElementById('home');
	var weatherDisplay = document.getElementById('weatherCity');

	var app = {
		init: function() { 
			routes.init();

			routie({
				'home': function(){
					sections.toggle('home');
				},
				'weatherZaandam': function(){
					sections.toggle('weatherCity');
					routes.init('http://api.openweathermap.org/data/2.5/weather?id=2744118&units=metric&appid=44db6a862fba0b067b1930da0d769e98');
				},
				'weatherAmsterdam': function(){
					sections.toggle('weatherCity');
					routes.init('http://api.openweathermap.org/data/2.5/weather?id=2759794&units=metric&appid=44db6a862fba0b067b1930da0d769e98');
				},
				'weatherZaanstad': function(){
					sections.toggle('weatherCity');
					routes.init('http://api.openweathermap.org/data/2.5/weather?id=2744113&units=metric&appid=44db6a862fba0b067b1930da0d769e98');
				},
				'*': function(){
					homeDisplay.classList.add('active');	
				}
			});
		}
	};

	var routes = {
		init: function(urlCity) {

			microAjax(urlCity, function(data){
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

				Transparency.render(weatherDisplay, weatherData);
			})
		}
	};

	var sections = {
		toggle: function(route){

			var allSections = document.querySelectorAll('section');
			var toggleSection = document.getElementById(route);

			console.log(toggleSection);

			// Source For Loop Sem Bakkum: https://github.com/SemBakkum/SemBakkum.github.io/tree/master/WAFS/Week%201/Exercise%205
			for (var c = 0; c < allSections.length; c++) {
				allSections[c].classList.remove('active');
			}

			toggleSection.classList.toggle('active');

		}
	};

	app.init();
}());
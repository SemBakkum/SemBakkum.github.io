(function () {
	'use strict'

	var homeDisplay = document.getElementById('home');
	var weatherDisplay = document.getElementById('weatherCity');
	var headerDisplay = document.getElementById('header');

	var app = {
		init: function() { 
			routes.init();

			routie({
				'home': function(){
					sections.toggle('home');
				},
				'*': function(){
					homeDisplay.classList.add('active');	
				}
			});
		}
	};

	var routes = {
		init: function() {

			microAjax('http://api.openweathermap.org/data/2.5/group?id=2759794,2744113,2747373,945813,2751738,2760134&units=metric&lang=nl&appid=44db6a862fba0b067b1930da0d769e98', function(data){
				data = JSON.parse(data);
				var weatherData = {
					city: data.list
				}
				console.log(weatherData)

				// var iconImg = document.getElementById('weatherIcon');

				// iconImg.src = 'http://openweathermap.org/img/w/' +weatherData.weatherIcon+ '.png';
				// console.log(iconImg);

				// var sunDownValue = parseInt(weatherData.sunDown);
				// var newSunDown = new Date(sunDownValue*1000);
				// document.getElementById('sunSetValue').innerHTML = newSunDown;
				// console.log(newSunDown);

				// var sunUpValue = parseInt(weatherData.sunUp);
				// var newSunUp = new Date(sunUpValue*1000);
				// document.getElementById('sunUpValue').innerHTML = newSunUp;
				// console.log(newSunUp);

				// var gotDataValue = parseInt(weatherData.gotData);
				// var newGotData = new Date(gotDataValue*1000);
				// document.getElementById('gotDataValue').innerHTML = newGotData;
				// console.log(newGotData);
				var cityName = function(){
					return this.name;
				}

				var directives = {
					link: {
						href: cityName,
						text: cityName
					}
				}

				Transparency.render(headerDisplay, weatherData.city, directives)				

				// Transparency.render(weatherDisplay, weatherData);
			})
		}
	};

	var sections = {
		toggle: function(route){

			var allSections = document.querySelectorAll('section');
			var toggleSection = document.getElementById(route);

			console.log(toggleSection);

			for (var c = 0; c < allSections.length; c++) {
				allSections[c].classList.remove('active');
			}

			toggleSection.classList.toggle('active');

		}
	};

	app.init();
}());
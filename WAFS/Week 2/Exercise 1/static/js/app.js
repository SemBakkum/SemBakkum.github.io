(function () {
	'use strict'

	var homeDisplay = document.getElementById('home');
	var weatherDisplay = document.getElementById('current');
	var overviewDisplay = document.getElementById('overview');

	var app = {
		init: function() { 

			routie({
				'': function(){
					sections.toggle('home');
				},
				':city': function(city){
					sections.toggle('current');
					routes.current(city);
				},
				':city/overview': function(city) {
					sections.toggle('overview');
					routes.overview(city);
				}
			});
		}
	};

	var routes = {

		current: function(city) {
			console.log(city);
			microAjax('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&lang=nl&appid=44db6a862fba0b067b1930da0d769e98', function(data){
				var data = JSON.parse(data);
                   		
                    var filteredData = _.pick(data, 'name', 'main', 'weather', 'sys', 'dt', 'wind');

                    console.log(filteredData);
				
				var weatherData = {
					city: filteredData.name,
					temp: filteredData.main.temp,
					weatherType: filteredData.weather[0].description,
					weatherIcon: filteredData.weather[0].icon,
					country: filteredData.sys.country,
					sunUp: filteredData.sys.sunrise,
					sunDown: filteredData.sys.sunset,
					gotData: filteredData.dt,
					windSpeed: filteredData.wind.speed
				}

				console.log(weatherData)

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

				var directives = {
					link: {
						href: function() {
							return '#' + city + '/overview';
						}
					}
				}

				Transparency.render(weatherDisplay, weatherData, directives);
			});
		},

		overview: function(city) {
			microAjax('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&units=metric&cnt=7&lang=nl&appid=44db6a862fba0b067b1930da0d769e98', function(data){
				var data = JSON.parse(data);
				var filteredData2 = _.pick(data, 'list');

                console.log(filteredData2);
				console.log(data);
				var weatherOverview = {
					day: helpers.calculateDatetime(filteredData2.list[1].dt),
					temp: filteredData2.list[1].temp.day,
					icon: helpers.getIcon(filteredData2.list[1].weather[0].icon),
					day2: helpers.calculateDatetime(filteredData2.list[2].dt),
					temp2: filteredData2.list[2].temp.day,
					icon2: helpers.getIcon(filteredData2.list[2].weather[0].icon),
					day3: helpers.calculateDatetime(filteredData2.list[3].dt),
					temp3: filteredData2.list[3].temp.day,
					icon3: helpers.getIcon(filteredData2.list[3].weather[0].icon),
					day4: helpers.calculateDatetime(filteredData2.list[4].dt),
					temp4: filteredData2.list[4].temp.day,
					icon4: helpers.getIcon(filteredData2.list[4].weather[0].icon),
					day5: helpers.calculateDatetime(filteredData2.list[5].dt),
					temp5: filteredData2.list[5].temp.day,
					icon5: helpers.getIcon(filteredData2.list[5].weather[0].icon),
				}

				var directives = {
					icon: {
						src: function() {
							return this.icon;
						}
					},
					icon2: {
						src: function() {
							return this.icon2;
						}
					},
					icon3: {
						src: function() {
							return this.icon3;
						}
					},
					icon4: {
						src: function() {
							return this.icon4;
						}
					},
					icon5: {
						src: function() {
							return this.icon5;
						}
					},
				}			

				Transparency.render(overviewDisplay, weatherOverview, directives);
			});
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
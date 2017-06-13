(function () {
	'use strict'

	var app = {
		init: function(){
			routes.init();
		}
	};


	var routes = {
		init: function() { 

			routie({
				//fallback if route doesn't exist. Credits to https://github.com/reauv/minor-web-app-from-scratch
				'': function(){
					switcher.toggle('home');
				},
				//Goes to which city is displayed in the URL.
				':city': function(city){
					switcher.toggle('current');
					sections.current(city);
				},
				//Goes to which city/overview is displayed in de URL
				':city/overview': function(city) {
					switcher.toggle('overview');
					sections.overview(city);
				}
			});
		}
	};

	var loading = {

		start: function(){
			document.getElementById('spinner').classList.add('activated');
		},

		stop: function(){
			document.getElementById('spinner').classList.remove('activated');
		}
	};

	var gestures = {

		left: function(){
			var options = {
			  dragLockToAxis: true,
			  dragBlockHorizontal: true
			};

			var mc = new Hammer(current, options);

			mc.on ("dragleft swipeleft", function(ev){
				console.log('swipeleft');
				console.log(window.location.hash);
				routie( window.location.hash + '/overview')
			});
		},

		right: function(){
			var mc = new Hammer(overviewDisplay);

			mc.on ("swiperight", function(ev){
				console.log('swiperight');
				routie( window.location.hash.split('/')[0]);
				console.log(routie);
				overviewDisplay.classList.remove('active')
			});
		},

		shake: function(){
			var myShakeEvent = new Shake({
				    threshold: 15,
				    timeout: 1000
				})

			myShakeEvent.start();

			window.addEventListener('shake', shakeEventDidOccur, false);

			//function to call when shake occurs
			function shakeEventDidOccur () {
				window.location = 'app.html'
			};
		}
	};

	var request = {
		// je zou van je url variable kunnen maken is netter bijv.: 
		var apiUrl = {
			baseUrl: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=Amsterdam&appid=d55e532e359ca4e0b28bc4cf0ae34bce&units=metric',
			chipUrl: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=', 
			id: '&appid=d55e532e359ca4e0b28bc4cf0ae34bce&units=metric'
		};



		currentData: function(city, cb) {
			microAjax('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&lang=nl&appid=44db6a862fba0b067b1930da0d769e98', cb)
		},

		forecastData: function(city, cb) {
			microAjax('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&units=metric&cnt=7&lang=nl&appid=44db6a862fba0b067b1930da0d769e98', cb)
		}
	};

	var sections = {

		current: function(city) {

			loading.start();

			request.currentData(city, function(data) {

				loading.stop();

				//Parses the data to a JSON format.
				var data = JSON.parse(data);
                   	
                //Filters the data so I only get what I need.	
                var filteredData = _.pick(data, 'name', 'main', 'weather', 'sys', 'dt', 'wind');

                gestures.left();

                gestures.shake();
				
				//Put data from filtered API in object.
				var weatherData = {
					city: filteredData.name,
					temp: filteredData.main.temp,
					weatherType: filteredData.weather[0].description,
					weatherIcon: helpers.getIcon(filteredData.weather[0].icon),
					country: filteredData.sys.country,
					sunUp: helpers.calculateDatetime(filteredData.sys.sunrise, true),
					sunDown: helpers.calculateDatetime(filteredData.sys.sunset, true),
					gotData: helpers.calculateDatetime(filteredData.dt, true),
					windSpeed: filteredData.wind.speed
				}		

				//Add links to section for forecast.
				var directives = {
					icon: {
						src: function() {
							return this.weatherIcon;
						}
					},

					link: {
						href: function() {
							return '#' + city + '/overview';
						}
					}
				}

				//Renders template with data.
				Transparency.render(weatherDisplay, weatherData, directives);
			});
		},

		overview: function(city) {

			loading.start();

			request.forecastData(city, function(data){

				loading.stop();

				var data = JSON.parse(data);

				var filteredData2 = _.pick(data, 'list');

				gestures.right();

				gestures.shake();

				var weatherOverview = [];

				//Gets function from helpers.js to calculate day & icon source.
				for( var i = 1; i <= 5; i++){
					weatherOverview.push({
						day: helpers.calculateDatetime(filteredData2.list[i].dt),
						temp: filteredData2.list[i].temp.day,
						icon: helpers.getIcon(filteredData2.list[i].weather[0].icon)
					})
				}

				var directives = {
					icons: {
						src: function() {
							return this.icon;
						}
					}
				}			

				Transparency.render(overviewDisplay, weatherOverview, directives);
			});
		}
	};

	var switcher = {

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
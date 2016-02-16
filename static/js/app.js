(function () {
	'use strict'

	//putting the sections in vars for later use.
	var homeDisplay = document.getElementById('home');
	var weatherDisplay = document.getElementById('current');
	var overviewDisplay = document.getElementById('overview');

	document.addEventListener("touchstart", function(){}, true);

	var app = {
		init: function() { 

			routie({
				//fallback if route doesn't exist. Credits to https://github.com/reauv/minor-web-app-from-scratch
				'': function(){
					sections.toggle('home');
				},
				//Goes to which city is displayed in the URL.
				':city': function(city){
					sections.toggle('current');
					routes.current(city);
				},
				//Goes to which city/overview is displayed in de URL
				':city/overview': function(city) {
					sections.toggle('overview');
					routes.overview(city);
				}
			});
		}
	};

	var routes = {

		current: function(city) {
			//Console.log() the city that is selected.
			console.log(city);

			weatherDisplay.style.display = 'none';
			document.getElementById('spinner').style.display = 'block';
			//Loads in the data from the API via microAjax.
			microAjax('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&lang=nl&appid=44db6a862fba0b067b1930da0d769e98', function(data){
				document.getElementById('spinner').style.display = 'none';
				weatherDisplay.style.display = 'block';
				//Parses the data to a JSON format.
				var data = JSON.parse(data);
                   	
                   	//Filters the data so I only get what I need.	
                    var filteredData = _.pick(data, 'name', 'main', 'weather', 'sys', 'dt', 'wind');

                    console.table(filteredData);

                    

                    var mc = new Hammer(current);

				mc.on ("swipeleft", function(ev){
					console.log('swipeleft');
					console.log(window.location.hash);
					routie( window.location.hash + '/overview')
				})
				
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

				console.log(weatherData)			

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
			weatherDisplay.style.display = 'none';
			overviewDisplay.style.display = 'none';
			document.getElementById('spinner').style.display = 'block';
			microAjax('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&units=metric&cnt=7&lang=nl&appid=44db6a862fba0b067b1930da0d769e98', function(data){
				document.getElementById('spinner').style.display = 'none';
				overviewDisplay.style.display = 'block';
				var data = JSON.parse(data);
				var filteredData2 = _.pick(data, 'list');

                console.log(filteredData2);
				console.log(data);

				var mc = new Hammer(overviewDisplay);

				mc.on ("swiperight", function(ev){
					console.log('swiperight');
					routie('city');
				})

				var weatherOverview = [];

				//Gets function from helpers.js to calculate day & icon source.
				for( var i = 1; i <= 5; i++){
					weatherOverview.push({
						day: helpers.calculateDatetime(filteredData2.list[i].dt),
						temp: filteredData2.list[i].temp.day,
						icon: helpers.getIcon(filteredData2.list[i].weather[0].icon)
					})
				}

				console.table(weatherOverview);

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
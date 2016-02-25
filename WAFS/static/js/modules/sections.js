var sections = (function(){

	var toggle = function(route){

			var allSections = document.querySelectorAll('section');

			var toggleSection = document.getElementById(route);

			console.log(toggleSection);

			for (var c = 0; c < allSections.length; c++) {
				allSections[c].classList.remove('active');
			}

			toggleSection.classList.toggle('active');

	}

	var home = function(){

		toggle('home');

	}

	var current = function(city){

		toggle('current')

		loading.start();

		retrieve.currentData(city, function(data) {

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
						return '#' + city + '/forecast';
					}
				}
			}

			//Renders template with data.
			Transparency.render(views.weatherDisplay, weatherData, directives);
		});
	}

	var overview = function(city) {

		toggle('forecast')

		loading.start();

		retrieve.forecastData(city, function(data){

			loading.stop();

			var data = JSON.parse(data);

			var filteredData = _.pick(data, 'list');

			gestures.right();

			gestures.shake();

			var weatherOverview = [];

			//Gets function from helpers.js to calculate day & icon source.
			for( var i = 1; i <= 5; i++){
				weatherOverview.push({
					day: helpers.calculateDatetime(filteredData.list[i].dt),
					temp: filteredData.list[i].temp.day,
					icon: helpers.getIcon(filteredData.list[i].weather[0].icon)
				})
			}

			var directives = {
				icons: {
					src: function() {
						return this.icon;
					}
				}
			}			

			Transparency.render(views.overviewDisplay, weatherOverview, directives);
		});
	}

	return{
		toggle: toggle,
		home: home,
		current: current,
		overview: overview
	}
	
}());
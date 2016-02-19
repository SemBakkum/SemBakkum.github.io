var sections = (function(){

	var current = function(city){

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
						return '#' + city + '/overview';
					}
				}
			}

			//Renders template with data.
			Transparency.render(weatherDisplay, weatherData, directives);
		});
	}

	var overview = function(city) {

		loading.start();

		retrieve.forecastData(city, function(data){

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

	return{
		current: current,
		overview: overview
	}
	
}());
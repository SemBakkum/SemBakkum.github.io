

var retrieve = (function(){

	var currentData = function(city, cb) {
		microAjax('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&lang=nl&appid=44db6a862fba0b067b1930da0d769e98', cb)
	};

	var forecastData = function(city, cb) {
		microAjax('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&units=metric&cnt=7&lang=nl&appid=44db6a862fba0b067b1930da0d769e98', cb)
	};

	return {
		currentData: currentData,
		forecastData: forecastData
	}
}());
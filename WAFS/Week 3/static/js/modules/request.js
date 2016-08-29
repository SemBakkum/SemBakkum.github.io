

var retrieve = (function(){

	var currentData = function(city, cb) {
		microAjax('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&lang=nl&appid=992bfff1b942695c9266d29b8f3a0ab7', cb)
	}

	var forecastData = function(city, cb) {
		microAjax('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&units=metric&cnt=7&lang=nl&appid=992bfff1b942695c9266d29b8f3a0ab7', cb)
	}

	return {
		currentData: currentData,
		forecastData: forecastData
	}
}());

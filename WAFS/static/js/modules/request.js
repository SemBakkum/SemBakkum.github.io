var retrieve = (function(){

	var sc = {
		baseUrl: "http://api.openweathermap.org/data/2.5/",
		clientId: "appid=44db6a862fba0b067b1930da0d769e98"
	}

	var currentData = function(city, cb) {
		microAjax( sc.baseUrl + 'weather?q=' + city + '&units=metric&lang=nl&' + sc.clientId, cb)
	}

	var forecastData = function(city, cb) {
		microAjax( sc.baseUrl + 'forecast/daily?q=' + city + '&units=metric&cnt=7&lang=nl&' + sc.clientId, cb)
	}

	return {
		currentData: currentData,
		forecastData: forecastData
	}
}());
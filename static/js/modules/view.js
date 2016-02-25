var views = (function(){

	var homeDisplay = document.getElementById('home');

	var weatherDisplay = document.getElementById('current');

	var overviewDisplay = document.getElementById('forecast');

	return {
		homeDisplay: homeDisplay,
		weatherDisplay: weatherDisplay,
		overviewDisplay: overviewDisplay
	}

	console.log(weatherDisplay);

}());


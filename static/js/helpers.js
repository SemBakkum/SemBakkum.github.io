var helpers = (function(){
	'use strict'

	var calculateDatetime = function(timestamp) {
		var datetime = parseInt(timestamp);
		return new Date(datetime*1000);
	}

	var getIcon = function(icon) {
		return 'http://openweathermap.org/img/w/' +icon+ '.png';
	}

	return {
		calculateDatetime: calculateDatetime,
		getIcon: getIcon
	}

})();
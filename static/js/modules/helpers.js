var helpers = (function(){
	'use strict'

	var calculateDatetime = function(timestamp, withTime) {
		var datetime = parseInt(timestamp);
		var date = new Date(datetime*1000);
		var maanden = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
		var dag = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];

		if(withTime === true){
			return dag[date.getDay()] + ' ' + date.getDate() + ' ' + maanden[date.getMonth()] + ' ' + date.getHours() + ':' + date.getMinutes();
		} else {
			return dag[date.getDay()] + ' ' + date.getDate() + ' ' + maanden[date.getMonth()];
		}
	}

	var getIcon = function(icon) {
		return 'http://openweathermap.org/img/w/' +icon+ '.png';
	}

	return {
		calculateDatetime: calculateDatetime,
		getIcon: getIcon
	}

})();
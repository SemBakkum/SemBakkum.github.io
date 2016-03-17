var retrieve = (function(){

	var scCp = {
		baseUrl: "https://maps.googleapis.com/maps/api/geocode/json?latlng=",
		clientId: "AIzaSyCAQ016Onzg6QVsXju1PUS7mx9trdtgJmY"
	}

	var scHs = {
		baseUrl: "http://funda.kyrandia.nl/feeds/Aanbod.svc/json/",
		clientId: "e2d60e885b8742d4b0648300e3703bd7/"
	}

	var currentPosition = function(position, cb) {
		microAjax( scCp.baseUrl + position.lat + ',' + position.lng + '&key=' + scCp.clientId, cb)
	}

	var houses = function(apiData, cb) {
		microAjax( scHs.baseUrl + scHs.clientId + '?type=' + views.setting() +'&zo=/' + apiData.city + '/' + apiData.postal + '/+2km/&page=1&pagesize=25', cb);
	}
    
    var inputHouses = function (cb) {
        microAjax(scHs.baseUrl + scHs.clientId + '?type=' + views.setting() +'&zo=/' + views.place.value.toLowerCase() + '/straat-' + views.street.value.toLowerCase() + '/+2km/&page=1&pagesize=25', cb);
    }

	return {
		currentPosition: currentPosition,
		houses: houses,
        inputHouses: inputHouses
	}
}());


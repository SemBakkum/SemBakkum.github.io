var converter = (function() {

	var display = document.getElementById('streetName');

	var onPositionUpdate = function(position)
	{
	    var lat = position.coords.latitude;
	    var lng = position.coords.longitude;

	    var latLng = {
	    	lat: lat,
	    	lng: lng
	    }

	    currentPosition(latLng, function(cb){
	    	var data = JSON.parse(cb);
	    	console.log(data);

	    	var address = {
	    	street: data.results[0].address_components[1].long_name,
	    	city: data.results[0].address_components[4].long_name
		    }

		    address.street = address.street.split(' ').join('-');

		    console.log(address);

		    houses(address, function(cb){
		    	console.log(houses);
		    })

		    Transparency.render(display, address);
	    });
	}

}());
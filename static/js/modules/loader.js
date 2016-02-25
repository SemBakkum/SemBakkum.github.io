var loading = (function () {

	var start = function(){
		document.getElementById('loader').classList.add('activated');
		// document.getElementById('spinner').classList.add('activated');
	}

	var stop = function(){
		document.getElementById('loader').classList.remove('activated');
		// document.getElementById('spinner').classList.remove('activated');
	}

	return {
		start: start,
		stop: stop
	}


}());
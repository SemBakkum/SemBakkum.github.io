	var loading = (function () {

		var start = function(){
			document.getElementById('spinner').classList.add('activated');
		}

		var stop = function(){
			document.getElementById('spinner').classList.remove('activated');
		}

		return {
			start: start,
			stop: stop
		}


	}());
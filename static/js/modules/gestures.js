var gestures = (function(){


		var shake = function(){
			var myShakeEvent = new Shake({
				    threshold: 15,
				    timeout: 1000
				})

			myShakeEvent.start();

			window.addEventListener('shake', shakeEventDidOccur, false);

			//function to call when shake occurs
			function shakeEventDidOccur () {
				window.location = 'funda.html'
			};
		}

		return{
			shake: shake
		}

}())
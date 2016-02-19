var gestures = {

	// Let op je indenting
	// zo is het nog meer OOP

	left: function(){
		var options = {
		  dragLockToAxis: true,
		  dragBlockHorizontal: true
		};

		var mc = new Hammer(current, options);

		mc.on ("dragleft swipeleft", function(ev){
			console.log('swipeleft');
			console.log(window.location.hash);
			routie( window.location.hash + '/overview')
		});

		return this;
	};

	right: function(){
		var mc = new Hammer(overviewDisplay);

		mc.on ("swiperight", function(ev){
			console.log('swiperight');
			routie( window.location.hash.split('/')[0]);
			console.log(routie);
			overviewDisplay.classList.remove('active')
		});

		return this;
	};

	shake: function(){
		var myShakeEvent = new Shake({
			    threshold: 15,
			    timeout: 1000
			})

		myShakeEvent.start();

		window.addEventListener('shake', shakeEventDidOccur, false);

		//function to call when shake occurs
		function shakeEventDidOccur () {
			window.location = 'app.html'
		};

		return this;
	}

}());
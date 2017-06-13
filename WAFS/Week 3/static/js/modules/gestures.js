var gestures = (function(){

		var left = function(){
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
		}

		var right = function(){
			var mc = new Hammer(overviewDisplay);

			mc.on ("swiperight", function(ev){
				console.log('swiperight');
				routie( window.location.hash.split('/')[0]);
				console.log(routie);
				overviewDisplay.classList.remove('active')
			});
		}

		 var shake = function(){
			var myShakeEvent = new Shake({
				    threshold: 15,
				    timeout: 1000
				})

			myShakeEvent.start();

			window.addEventListener('shake', shakeEventDidOccur, false);

			//function to call when shake occurs
			function shakeEventDidOccur () {
				window.location = 'index.html'
			};
		}

		return{
			left: left,
			right: right,
			shake: shake
		}

	}());

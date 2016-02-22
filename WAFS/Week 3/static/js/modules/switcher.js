	var switcher = (function(){

		var toggle = function(route){

			var allSections = document.querySelectorAll('section');

			var toggleSection = document.getElementById(route);

			console.log(toggleSection);

			for (var c = 0; c < allSections.length; c++) {
				allSections[c].classList.remove('active');
			}

			toggleSection.classList.toggle('active');

		};

		return {
			toggle: toggle
		}

	}());
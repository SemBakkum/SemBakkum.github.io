var routes = (function() {

	var init = function() { 

			routie({
				//fallback if route doesn't exist. Credits to https://github.com/reauv/minor-web-app-from-scratch
				'': function(){
					sections.home();
				},
				//Goes to which city is displayed in the URL.
				'results': function(){
					sections.overview();
				},

				'likes': function(){
					sections.likes();
				}
			})
		}

		return {
			init: init
		}
}())
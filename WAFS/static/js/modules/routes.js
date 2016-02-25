var routes = (function() {

	var init = function() { 

			routie({
				//fallback if route doesn't exist. Credits to https://github.com/reauv/minor-web-app-from-scratch
				'': function(){
					sections.home();
				},
				//Goes to which city is displayed in the URL.
				':city': function(city){
					sections.current(city);
				},
				//Goes to which city/overview is displayed in de URL
				':city/forecast': function(city) {
					sections.overview(city);
				}
			})
		}

		return {
			init: init
		}
}())
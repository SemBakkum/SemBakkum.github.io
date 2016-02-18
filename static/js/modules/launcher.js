var launcher = (function(){

	var init = function(){
		routes.init();
		// switcher.toggle(route);
	}

	return {
		init: init
	}

}());
var homeDisplay = document.getElementById('home');
var weatherDisplay = document.getElementById('current');
var overviewDisplay = document.getElementById('overview');
launcher.init();
var launcher = (function(){

	var init = function(){
		document.addEventListener("touchstart", function(){}, true);
		routes.init();
	}

	return {
		init: init
	}

}());
var homeDisplay = document.getElementById('home');
var weatherDisplay = document.getElementById('current');
var overviewDisplay = document.getElementById('overview');
launcher.init();
var launcher = (function(){

	var init = function(){
		routes.init();
		// switcher.toggle(route);
	}

	return {
		init: init
	}

}());
launcher.init();
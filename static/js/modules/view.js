var views = (function(){

	var homeDisplay = document.getElementById('home');

	var display = document.getElementById('overview');

	var likes = document.getElementById('likes')

	var dataCap = document.getElementById("selected");

	var setting = dataCap.value;

	dataCap.addEventListener('change',function() {
		setting = dataCap.value;
		console.log(setting)
	});

	var getSetting = function() {
		return setting;
	}

	return {
		homeDisplay: homeDisplay,
		display: display,
		likes: likes,
		setting: getSetting

	}

}());


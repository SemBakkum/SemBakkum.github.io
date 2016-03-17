var views = (function(){

	var homeDisplay = document.getElementById('home');

	var display = document.getElementById('overview');

	var likes = document.getElementById('likes')

	var dataCap = document.getElementById("selected");

	var setting = dataCap.value;
    
    var place = document.getElementById("place");

    var street = document.getElementById("street");
    
    var form = document.getElementById("form");
    
	dataCap.addEventListener('change',function() {
		setting = dataCap.value;
		console.log(setting)
	});

	var getSetting = function() {
		return setting;
	}
    
    form.addEventListener('submit', function(e) {
        window.location.href = '#results';
        e.preventDefault();
    }, false);


	return {
		homeDisplay: homeDisplay,
		display: display,
		likes: likes,
		setting: getSetting,
        place: place,
        street: street
	}

}());


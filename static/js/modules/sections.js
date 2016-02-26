var sections = (function(){

	var toggle = function(route){

		var allSections = document.querySelectorAll('section');

		var toggleSection = document.getElementById(route);

		console.log(allSections);

		for (var c = 0; c < allSections.length; c++) {
			allSections[c].classList.remove('active');
		}

		toggleSection.classList.toggle('active');

	}

	var home = function() {
		toggle('home');
	}

	var overview = function() {

		loading.start();

		if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(function(position){
	        	var lat = position.coords.latitude;
	    		var lng = position.coords.longitude;

	    		var latLng = {
	    		lat: lat,
	    		lng: lng
	    		}

	    		retrieve.currentPosition(latLng, function(data){
	    		var data = JSON.parse(data);
	    		console.log(data);

	    		var filteredData = _.map(data.results, function(street){
	    			return _.pick(street, 'address_components');
	    		});

	    		console.log(filteredData)

	    		var components = filteredData[0].address_components;

	    		var postal = components.filter(function(component){
	    			return component.types.indexOf('postal_code') >= 0;
	    		})

	    		postal = postal[0].long_name.split(' ').join('');

	    		console.log(postal);

	    		var city = components.filter(function(component){
	    			return component.types.indexOf('administrative_area_level_2') >= 0;
	    		})

	    		city = city[0].long_name;

	    		console.log(city);

	    		var apiData = { 
	    			postal: postal,
	    			city: city
	    		}

		    	retrieve.houses(apiData, function(data){

		    		var data = JSON.parse(data);

		    		console.log(data)

		    		var filteredData = _.map(data.Objects, function(house){
	    				return _.pick(house, 'Adres', 'FotoLargest', 'PrijsGeformatteerdHtml', 'Woonplaats', 'WGS84_X', 'WGS84_Y', 'Id');
	    			});

	    			var liked = JSON.parse(localStorage.getItem('liked'));

	    			filteredData = _.map(filteredData, function(house) {
	    				var isLiked = _.find(liked, function(like) {
	    					return like.Id === house.Id;
	    				});

	    				if (isLiked) {
	    					isLiked = true;
	    				} else {
	    					isLiked = false;
	    				}

	    				house.Liked = isLiked;

	    				return house;
	    				
	    			});

	    			console.log(filteredData)

		    		var directives = {
						FotoLargest: {
							src: function() {
								return this.FotoLargest;
							}
						},

						route: {
							href: function(){
								return 'http://maps.google.com/maps?saddr=Current%20Location&daddr=' + this.WGS84_Y + ',' + this.WGS84_X;
							}
						},

						PrijsGeformatteerdHtml: {
							html: function() {
								return this.PrijsGeformatteerdHtml;
							}
						},

						Liked: {
							class: function(){
								if(this.Liked === true){
									return 'flaticon-shapes like likeColor'
								} else{
									return 'flaticon-shapes like'
								}
							},

							html: function(){
								return ''
							}
						}
					}

					gestures.shake();

		    		Transparency.render(views.display, filteredData, directives);

		    		var liked = document.querySelectorAll('.like');

		    		console.log(liked)

		    		var savedLike;

		    		for (var i = 0; i < liked.length; i++){
		  				savedLike = filteredData[i];
	    				(function(like) {
							liked[i].addEventListener('click', function(evt) {
								var liked = JSON.parse(localStorage.getItem('liked')) || [];

								if(!evt.currentTarget.classList.contains('likeColor')) {
			    					evt.currentTarget.classList.add('likeColor');
			    					liked.push(like)
			    				}
			    				else {
			    					evt.currentTarget.classList.remove('likeColor');
			    					liked = _.without(liked, _.findWhere(liked, { Id: like.Id }));
			    				}

			    				localStorage.setItem('liked', JSON.stringify(liked));
							});
	    				}(savedLike));
		    		}

		    		toggle('overview')
		    		loading.stop();
		    	})
	    		});
	        });
	    }
	}

	var likes = function(){

		toggle('likes')

		var liked = JSON.parse(localStorage.getItem('liked'));

		console.log(liked)

		var directives = {
			FotoLargest: {
				src: function() {
					console.log(this)
					return this.FotoLargest;
				}
			},

			route: {
				href: function(){
					return 'http://maps.google.com/maps?saddr=Current%20Location&daddr=' + this.WGS84_Y + ',' + this.WGS84_X;
				}
			},

			PrijsGeformatteerdHtml: {
				html: function() {
					return this.PrijsGeformatteerdHtml;
				}
			}
		}

		gestures.shake();

		Transparency.render(views.likes, liked, directives);
	}

	return{
	    	toggle: toggle,
	    	home: home,
	    	overview: overview,
	    	likes: likes
	    }


}());
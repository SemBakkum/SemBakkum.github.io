# Readmeof the branch

##Core feature

The core feature of this prototype is the ability to search houses based on your geolocation. 

##Fallback

As a fallback I made a check to see if geolocation is supported on your device. 

```javascript 

if (navigator.geolocation) {
            document.getElementById('place').classList.add('noInput');
            document.getElementById('place').required = false;
            document.getElementById('street').classList.add('noInput');
            document.getElementById('street').required = false;
        }
        
```

If the geolocation is supported the fallback input boxes aren't displayed anymore. 

For the results page of the prototype the check is doen again, but this time if geolocation isn't supported the prototype will run the fallback script. 

```javascript

if (navigator.geolocation) {
            
            loading.start();
            
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                
                var latLng = {
                    lat: lat,
                    lng: lng
                }
                
                retrieve.currentPosition(latLng, function(data) {
                    var data = JSON.parse(data);
                    
                    var filteredData = _.map(data.results, function(street) {
                        return _.pick(street, 'address_components');
                    });
                    
                    var components = filteredData[0].address_components;
                    
                    var postal = components.filter(function(component) {
                        return component.types.indexOf('postal_code') >= 0;
                    });
                    
                    postal = postal[0].long_name.split(' ').join('');
                    console.log(postal);
                    
                    var city = components.filter(function(component) {
                        return component.types.indexOf('administrative_area_level_2') >= 0;
                    });
                    
                    city = city[0].long_name;
                    
                    var apiData = {
                        postal: postal,
                        city: city
                    }
                    
                    retrieve.houses(apiData, function(data) {
                        var data = JSON.parse(data);
                        console.log(data);
                        
                        var filteredData = _.map(data.Objects, function(house) {
                            return _.pick(house, 'Adres', 'FotoLargest', 'PrijsGeformatteerdHtml', 'Woonplaats', 'WGS84_X', 'WGS84_Y', 'Id');
                        });
                        
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
						}

					}
                        loading.stop();
                        
                        Transparency.render(views.display, filteredData, directives);
                        
                        toggle('overview');
                        
                    })
                    
                    
                })
            })
            
        } else if (!geolocation.navigator) {
            
            loading.start();
            
            retrieve.inputHouses(function (data) {
                var data = JSON.parse(data);
                console.log(data);

                var filteredData = _.map(data.Objects, function(house) {
                    return _.pick(house, 'Adres', 'FotoLargest', 'PrijsGeformatteerdHtml', 'Woonplaats', 'WGS84_X', 'WGS84_Y', 'Id');
                });

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
                    }
                }
                
                loading.stop();

                Transparency.render(views.display, filteredData, directives);

                toggle('overview');
            })
        }
	}

	var likes = function(){

		toggle('likes')

		var liked = JSON.parse(localStorage.getItem('liked'));

		//console.log(liked)

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
	
	```
	
	

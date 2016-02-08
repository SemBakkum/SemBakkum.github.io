(function () {
	'use strict'

    var app = {
        init: function() {
            routie({
                'home': function() {
                    debugger;
                    sections.toggle(window.location.hash);
                },
                'localWheater': function() {
                    sections.toggle(window.location.hash);
                    wheater.init();
                }
            });
        },

  var wheater = {
        init : function() {
            microAjax("http://api.openweathermap.org/data/2.5/weather?q=Amsterdam&appid=44db6a862fba0b067b1930da0d769e98", function (data) {
               console.log(data.);
                /*var templateData = {
                    name: data.username,
                    city: data.city,
                    country : data.country,
                    likes : data.public_favorites_count,
                    online : data.online,
                    avatar : data.avatar_url,
                    followers : data.followers_count,
                    following : data.followings_count,
                };
                var template = document.getElementById("soundcloudTemplate");
                Transparency.render(template, templateData);
            });
        }
    }

    };*/
	app.init();
}());
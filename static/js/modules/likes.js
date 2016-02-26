var liking = ( function(){

	var makeLike = function(){

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
		
		}

		var checkLike = function(){

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
	}

	return {
		makeLike: makeLike,
		checkLike: checkLike
	}

}())
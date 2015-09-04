function buildNameCard () {

	var $nameCard = $( '<div>', {'class': 'nameCard'} );

	var $profilePic = $('<img>', {'src': /*USER GRAVATAR URL*/, 'class': 'nameCard__image'});
	var $profileName = $('<h1>', {'class': 'nameCard__title'}).html( /*USER PROFILE NAME*/ );

	$div.append($profilePic);
	$div.append($profileName);

	return $nameCard;

}


function buildRecommendationCard () {

	var $recommendationCard = $( '<div>', {'class': 'recommendationCard'} );

	var recommendedBadges = recommendBadgesFor(users[ user ]);

	for ( var i = 0; i < 3; i++ ) {
		if ( recommendedBadges[i].badge.name !== 'undefined' ) {
			var $recommendedBadgeIcon = $('<img>', {'src': recommendedBadges[i].badge.icon_url, 'class': 'recommendationCard__image'});
			$recommendationCard.append($recommendedBadgeIcon);
		}
	}

	return $recommendationCard;

}

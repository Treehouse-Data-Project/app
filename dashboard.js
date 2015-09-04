if(typeof require !== "undefined") {
	var BadgeFunctions 		  = require('./badge-functions');
	var hasBadges 			    = BadgeFunctions.hasBadges;
	var usersWhoEarned 		  = BadgeFunctions.usersWhoEarned;
  var badgesEarnedBy 		  = BadgeFunctions.badgesEarnedBy;
  var intersectBadges 	  = BadgeFunctions.intersectBadges;
  var similarity 			    = BadgeFunctions.similarity;
  var score 				      = BadgeFunctions.score;
  var recommendBadgesFor 	= BadgeFunctions.recommendBadgesFor;
	var $ 					        = require('./jquery-2.1.4');
}



function buildNameCard () {

	var $nameCard = $( '<div>', {'class': 'nameCard'} );

	var $image = $('<img>', { /* 'src': */ 'class': 'nameCard__image'});
	var $title = $('<h1>', {'class': 'nameCard__title'}).html( /*USER PROFILE NAME*/ );

	$nameCard.append($image);
	$nameCard.append($title);

	return $nameCard;

}

function buildTimeLine () {

	var $timeLine = $('<div>', {'class': 'timeLine'} );

	var $title = $('<h2>', {'class': 'timeLine__title' });
	var $graph = $('<div>', {'class': 'timeLine__div' });

	$timeLine.append($title)
	$timeLine.append($graph);

	return $timeLine;
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

function buildTopicsLearned () {

	var $topicsLearned = $('<div>', {'class': 'topicsLearned'} );

	var $title = $('<h2>', {'class': 'topicsLearned__title'} );
	var $list  = $('<ul>', {'class': 'topicsLearned__list'} );

	for ( var i = 0; i < 3; i++ ){
		var $topic = $('<li>').html( /* user.points[i] */);
		$list.append($topic);
	}

	$topicsLearned.append( $title );
	$topicsLearned.append( $list );

	return $topicsLearned;
}

function buildRecentBadges () {

	var $recentBadges = $('<div>', {'class': 'recentBadges'})

	for ( var i = 0; i < 10; i++ ){

		//make a card to hold badge image and title
		var $badge = $('<div>', {'class': 'recentBadges__badge'})


		//make badge image and title
		var $badgeImage = $('<img>', { /*'src': */ 'class': 'recentBadges__badge--image'} );
		var $badgeTitle = $('<span>', {'class': 'recentBadges__badge--title'}).html( /* user.badges[i].name */ );


		//add the title and image to a badge card
		$badge.append($badgeTitle);
		$badge.append($badgeImage);


		//add the current badge card to the badges container
		$recentBadges.append($badge);
	}

	return $recentBadges;
}



function buildDashBoard ( user ) {

	var $body = $('body');


	//make a container to act as the user's dashboard, attach a name, and attach
	//the whole thing to the body
	var $dashboard = $('<div>', {'class': 'user__dashboard'} );
	( $('<h1>', {'class': 'user__name'}) ).html( user ).appendTo($dashboard);
	$body.append($dashboard);


	var $nameCard = buildNameCard();
	var $timeLine = buildTimeLine();
	var $recommendationCard = buildRecommendationCard();
	var $recentBadges = buildRecentBadges();
	var $topicsLearned = buildTopicsLearned();

	$dashboard.append($nameCard)
			  .append($timeLine)
			  .append($recommendationCard)
			  .append($recentBadges)
			  .append($topicsLearned)

}	// <----------END OF DASHBOARD CONSTRUCTION--------->



if(typeof module !== "undefined") {
	module.exports = {
    buildDashBoard: buildDashBoard
  };
}

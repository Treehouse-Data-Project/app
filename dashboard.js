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



function buildNameCard (user) {

	var $nameCard = $( '<div>', {'class': 'nameCard'} );

	var $image = $('<img>', { 'src': users[user].gravatar_url, 'class': 'nameCard__image'});
	var $title = $('<h1>', {'class': 'nameCard__title'}).html( users[user].name );

	$nameCard.append($image);
	$nameCard.append($title);

	return $nameCard;

}

function buildTimeLine () {

	var $timeLine = $('<div>', {'class': 'timeLine'} );

	var $title = $('<h2>', {'class': 'timeLine__title' });
	var $graph = $('<div>', {'class': 'timeLine__graph' }).append( $('<img>', {'src': './css/graph.png', 'style': 'width: 100%;'}) );

	$timeLine.append($title)
	$timeLine.append($graph);

	return $timeLine;
}

function buildRecommendationCard (user) {

	var $recommendationCard = $( '<div>', {'class': 'recommendationCard'} );

	var recommendedBadges = recommendBadgesFor(users[ user ]);

	var $title = $('<h2>').html('Top 3 badges for you to try: ');
	$recommendationCard.append($title);


	for ( var i = 0; i < 3; i++ ) {
		if ( recommendedBadges[i].badge.name !== 'undefined' ) {
			var $recommendedBadgeIcon = $('<img>', {'src': recommendedBadges[i].badge.icon_url, 'class': 'recommendationCard__image'});
			$recommendationCard.append($recommendedBadgeIcon);
		}
	}


	return $recommendationCard;

}

function buildTopicsLearned ( user ) {

	var $topicsLearned = $('<div>', {'class': 'topicsLearned'} );

	var $title = $('<h2>', {'class': 'topicsLearned__title'} ).html('Top subjects: ');
	var $list  = $('<ul>', {'class': 'topicsLearned__list'} );

	var topicsArray = [] 

	for ( topic in users[user].points ){
		
		var topicObject = {}

		topicObject.points = users[user].points[topic];
		topicObject.name = topic;

		topicsArray.push( topicObject );
	}

	console.log( topicsArray );

	var orderedTopics = topicsArray.sort( function( first, second ){
		
		console.log( 'first object ', first )

		if( first.points > second.points ) {
	      return -1;
	    }
	    return 1;
	})


	for ( var i = 1; i < 4; i++ ){
		console.log(users[user].points)
		var $topic = $('<li>').html( topicsArray[i].name + ' - ' + topicsArray[i].points );
		$list.append($topic);
	}

	$topicsLearned.append( $title );
	$topicsLearned.append( $list );

	return $topicsLearned;
}

function startHover ( ) {
	var $info = $('<div>', {'class': 'recentBadges__badge--tooltip'}).html( this.name )
	$info.appendTo( $(this) );
}

function stopHover ( ) {
	$('.recentBadges__badge--tooltip').remove();
}

function buildRecentBadges ( user ) {

	var $recentBadges = $('<div>', {'class': 'recentBadges'}).append($('<h2>').html('Recent badges: '))

	var orderedBadges = badgesEarnedBy( user ).sort( 
		function( first, second ){ 

			console.log( 'first object ', first )
			console.log( first.earned_date )

			if( first.earned_date > second.earned_date ) {
		      return -1;
		    }
		    return 1;
		})

	for ( var i = 0; i < orderedBadges.length; i++ ){

		if ( i < 10 ) {
		//if ( orderedBadges[i].name !== 'undefined' ) {

			var earnedDate = new Date( orderedBadges[i].earned_date );
			earnedDateTrimmed = (earnedDate.getMonth() + 1) + '/' + earnedDate.getDate() + '/' + earnedDate.getFullYear().toString().slice(2);


			//make a card to hold badge image and title
			var $badge = $('<div>', {'class': 'recentBadges__badge'})
			$badge[0].name = orderedBadges[i].name;


			//make badge image and title
			var $badgeImage = $('<img>', { 'src': orderedBadges[i].icon_url, 'class': 'recentBadges__badge--image'} );
			
			$badge.hover( startHover, stopHover );

			var $badgeTitle = $('<span>', {'class': 'recentBadges__badge--title'}).html( earnedDateTrimmed );


			//add the title and image to a badge card
			$badge.append($badgeTitle);
			$badge.append($badgeImage);


			//add the current badge card to the badges container
			$recentBadges.append($badge);
		//}
		}
	}

	return $recentBadges;
}



function buildDashBoard ( user ) {

	var $body = $('body');


	//make a container to act as the user's dashboard, attach a name, and attach
	//the whole thing to the body
	var $dashboard = $('<div>', {'class': 'user__dashboard'} );
	$body.append($dashboard);


	var $nameCard 			= buildNameCard(user);
	var $timeLine 			= buildTimeLine(user);
	var $recommendationCard = buildRecommendationCard(user);
	var $recentBadges 		= buildRecentBadges(user);
	var $topicsLearned 		= buildTopicsLearned(user);

	$dashboard.append($nameCard)
			  .append($timeLine)
			  .append($recentBadges)
			  .append($recommendationCard)
			  .append($topicsLearned)

}



if(typeof module !== "undefined") {
	module.exports = {
    buildDashBoard: buildDashBoard
  };
}

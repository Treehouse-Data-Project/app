if(typeof require !== "undefined") {
	var BadgeFunctions 		= require('./badge-functions');
	var hasBadges 			= BadgeFunctions.hasBadges;
	var usersWhoEarned 		= BadgeFunctions.usersWhoEarned;
    var badgesEarnedBy 		= BadgeFunctions.badgesEarnedBy;
    var intersectBadges 	= BadgeFunctions.intersectBadges;
    var similarity 			= BadgeFunctions.similarity;
    var score 				= BadgeFunctions.score;
    var recommendBadgesFor 	= BadgeFunctions.recommendBadgesFor;
	var $ 					= require('./jquery-2.1.4');
}



var userNames 	= ['Jasonsiren', 'josephfraley2', 'adamtaitano', 'kathleenkent', 'mkelley2', 'donguyen', 'jeffdunn', 'erikphansen', 'patharryux', 'mitchelllillie', 'jenniferminetree'];

var users 		= { };	//people
var badges 		= { }; 	//chores



// run ajax call for a single user
//================================

function getData ( username ) {
	//console.log('im gonna get ', username, ' data now!')
	$.ajax( ('https://teamtreehouse.com/' + username + '.json') ).done( callback );
}



// call back for the ajax call puts json data into the users object
//=================================================================

function callback ( results ) {
	users[results.name] = results;

	if ( userNames.length === Object.keys(users).length ) {
	 		collectAllBadges();
	}
}



// put all the users in the object from the start
//===============================================
function populate () {
	for ( var i = 0; i < userNames.length; i++){
	 	getData(userNames[i]);	 	
	}
}

populate();



//		get all the badges for the whole class
//================================================

function collectAllBadges ( ){

	//userBadges 	=> [{badge},{badge},{badge}]
	//badge 		=> {name, icon_url, earned_date}
	//badges 		=> { {uniqueBadge}, {uniqueBadge}, {uniqueBadge} }

	for ( var user in users ) {

		var userBadges = getBadges( user );

		for ( var badge in userBadges ) {
			
			if ( !(userBadges[badge].name in badges) ){
				badges[userBadges[badge].name] = userBadges[badge];
			}
		
			//	call this method to return an array of user objects that have this badge
			badges[userBadges[badge].name].who = function ( ){

				var who = [];

				// if ( arguments.length > 1 ){
					
				// }
				
				for ( var user in users ) {

					for ( var i = 0; i < users[user].badges.length; i++ ) {

						if ( users[user].badges[i].name === this.name ){
							who.push(users[user]);
						}
					}
				}

				return who;
			}

		}
	}
}




//		get badges for a single user
//===============================================================

// ex: getBadges('Joseph Fraley') => [{badge}, {badge}, {badge}]
function getBadges ( userName ) {
	var badges = users[ userName ].badges;
	return badges;
}



//		add a who property containing user objects
//===============================================================

// ex: getBadges('Joseph Fraley') => [{badge}, {badge}, {badge}]
function addWho ( ) {
	for ( var badge in badges ) {
		for ( var user in users ) {
			if ( badge in user.badges ) {

			}
		}
	}
}



// 		make a badge div for a user
//================================================

function buildDashBoard ( user ) {
	
	var $body = $('body');


	//make a container to act as the user's dashboard, attach a name, and attach
	//the whole thing to the body
	var $dashboard = $('<div>', {'class': 'user__dashboard'} );
	( $('<h1>', {'class': 'user__name'}) ).html( user ).appendTo($dashboard);
	$body.append($dashboard);


	//make a container for all the badges and attach it to the dashboard
	var $badges = $('<div>', {'class': 'user__badges'} )	
	$dashboard.append($badges);


	//this loops through each of the user's badges
	for ( badge in users[user].badges ){


		//make a card to hold badge image and title
		var $badge = $('<div>', {'class': 'badges__badge'})


		//make badge image and title
		var $badgeImage = $('<img>', {'src': users[user].badges[badge].icon_url, 'class': 'badges__badge--image'} );
		var $badgeTitle = $('<span>', {'class': 'badges__badge--title'}).html( users[user].badges[badge].name );
		

		//add the title and image to a badge card
		$badge.append($badgeTitle);
		$badge.append($badgeImage);


		//add the current badge card to the badges container
		$badges.append($badge);	
	}

	//make a container for the user's recommended badges, then save the
	//recommendations in an array
	var $recommendations = $('<div>', {'class': 'user__recommendations'})
	$recommendations.html('<h4>Consider getting some of these badges: </h4>')
	var array = recommendBadgesFor(users[ user ]);
	
	var $containerRecs = $('<div>', {'class': 'rec-container'})


	//loop through the first three recommended
	for ( var i = 0; i < 3; i++ ) {

		var $recommended 		= $('<div>', {'class': 'recommendations__recommended'})

		//same as badge cards above
		var $recommendedTitle 	= $('<h2>', {'class': 'recommendations__recommended--title'}).html(array[i].badge.name);
		var $recommendedImage   = $('<img>', {'src': array[i].badge.icon_url, 'class': 'recommendations__recommended--image'});

		$recommended.append($recommendedTitle);
		$recommended.append($recommendedImage);

		$containerRecs.append($recommended);
	}

	//attach the recommended container to the dashboard
	$recommendations.append($containerRecs);
	$dashboard.append($recommendations);
}	// <----------END OF DASHBOARD CONSTRUCTION--------->




//		make a user dashboard div from input
//================================================




//
//================================================



//
//================================================



//
//================================================



//
//================================================


//
//================================================

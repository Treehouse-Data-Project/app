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
	console.log('im gonna get ', username, ' data now!')
	$.ajax( ('https://teamtreehouse.com/' + username + '.json') ).done( callback );
}

//*********FIGURE OUT HOW TO AUTOMATICALLY GENERATE BADGE ARRAY
//*********ONLY AFTER A SYNC AJAX CALL IS FINISHED?


// call back for the ajax call puts json data into the users object
//=================================================================

function callback ( results ) {
	console.log('this is getData using a callback function')
	users[results.name] = results;
}



// put all the users in the object from the start
//===============================================
function populate () {

	console.log('this starts the loop of ajax calls broh!')

	for ( var i = 0; i < userNames.length; i++){
	 	console.log('current loop: ', i)

	 	getData(userNames[i]);
	 	console.log('length of users: ', Object.keys(users).length)
	 	if ( userNames.length === Object.keys(users).length ) {
	 		collectAllBadges();
	 	}
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

	var $dashboard = $('<div>', {'class': 'user__dashboard'} );
	$dashboard.append( $('<h1>', {'class': 'user__name'}) ).html( user );

	$body.append($dashboard);

	for ( badge in users[user].badges ){

		var $badgeBoard = $('<div>', {'class': 'user__badge-board'} )
		
		$dashboard.append($badgeBoard);

		var $badge = $('<img>', {'src': users[user].badges[badge].icon_url, 'class': 'user__badge'} );
		var $title = $('<span>', {'class': 'user__badge--title'}).html( users[user].badges[badge].name );
		$badgeBoard.append($title);
		$badgeBoard.append($badge);
		
	}

	var $recommended = $('<div>', {'class': 'user__recommended'})

	for ( var i = 0; i < 3; i++ ) {
		var array = recommendBadgesFor(users[ user ]);

		console.log(array)

		var $badgeName 	= $('<h2>', {'class': 'user__recommended--title'}).html(array[i].badge.name);
		var $badgeImage = $('<img>', {'src': array[i].badge.icon_url, 'class': 'user__recommended--image'});

		$recommended.append($badgeName);
		$recommended.append($badgeImage);
	}

	$dashboard.append($recommended);

}



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


var userNames 	= ['Jasonsiren', 'josephfraley2', 'adamtaitano', 'kathleenkent', 'mkelley2', 'donguyen', 'jeffdunn', 'erikphansen', 'patharryux', 'mitchelllillie', 'jenniferminetree'];

var users 		= { };	//people
var badges 		= { }; 	//chores



// run ajax call for a single user
//================================

function getData ( username ) {
	$.ajax( ('https://teamtreehouse.com/' + username + '.json') ).done( callback );
}



// call back for the ajax call puts json data into the users object
//=================================================================

function callback ( results ) {
	// console.log( 'I am the result of the ajax request!: ')
	// console.log( results )
	// console.log( "\n I'm the name property on that guy!: " + results.name )
	users[results.name] = results;
}



// put all the users in the object from the start
//===============================================

for ( var i = 0; i < userNames.length; i++){
 	getData(userNames[i]);
}



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
	var $div = $('<div>', {'class': 'user__dashboard'} );
	$div.append( $('<h1>', {'class': 'user__name'}) ).html( user );

	var $body = $('body');

	$body.append($div);

	for ( badge in users[user].badges ){

		console.log('this badge image url, ', users[user].badges[badge].icon_url )
		console.log('this badge title, ', users[user].badges[badge].name)

		var $badgeBoard = $('<div>', {'class': 'user__badge-board'} )
		$div.append($badgeBoard);

		var $badge = $('<img>', {'src': users[user].badges[badge].icon_url, 'class': 'user__badge'} );
		var $title = $('<span>', {'class': 'user__badge__title'}).html( users[user].badges[badge].name );
		$badgeBoard.append($title);
		$badgeBoard.append($badge);
		
	}
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

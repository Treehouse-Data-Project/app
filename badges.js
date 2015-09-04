if(typeof require !== "undefined") {
	var DashBoard 		 = require('./dashboard');
	var buildDashBoard = DashBoard.buildDashBoard;
	var $ 					   = require('./jquery-2.1.4');
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

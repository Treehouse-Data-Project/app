
var userNames = ['Jasonsiren', 'josephfraley2', 'adamtaitano', 'kathleenkent', 'mkelley2', 'donguyen', 'jeffdunn', 'erikphansen', 'patharryux', 'mitchelllillie'];
var users = {};	 //people
var badges = {}; //chores



// run ajax call for a single user
//================================

function getData ( username ) {
	$.ajax( ('https://teamtreehouse.com/' + username + '.json') ).done( callback );
}



// call back for the ajax call puts json data into the users object
//=================================================================

function callback ( results ) {
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
		}
	}
}



//		get badges for a single user
//================================================

function getBadges ( userName ) {
	var badges = users[ userName ].badges;
	return badges;
}



// 		make a badge div for a user
//================================================

function displayBadge () {
	
}



//		make a user dashboard div
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

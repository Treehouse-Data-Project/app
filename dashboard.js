function buildNameCard () {

	var $nameCard = $( '<div>', {'class': 'nameCard'} );

	var $profilePic = $('<img>', {'src': /*USER GRAVATAR URL*/, 'class': 'nameCard__image'});
	var $profileName = $('<h1>', {'class': 'nameCard__title'}).html( /*USER PROFILE NAME*/ );

	$div.append($profilePic);
	$div.append($profileName);

	return $nameCard;

}
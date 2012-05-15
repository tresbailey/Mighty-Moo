function loadShip(clickedID) {
	$(".scrollNavList a").click(scrollNavLinkClick);
}

function changeShip(clickedID) {
	$('.contentText').hide();
	$('.'+clickedID).show();	
}
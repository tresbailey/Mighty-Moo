	var pageSelector = { 	'LoadHome' : '',
						'LoadEvents' : loadEvent,
						'LoadShips' : loadShip,
						'LoadPics' : loadPic,
						'LoadMap' : loadMap,
						'LoadSponsors' : loadSponsors,
						'ChangeHome' : '',
						'ChangeEvents' : changeEvent,
						'ChangeShips' : changeShip,
						'ChangePics' : changePic,
						'ChangeMap' : changeMap
					}
	
	var currentPage;
	
	function loadSponsors(clickedID) {
		$.ajax({
			url: "./"+clickedID+"_Min.html?time="+ new Date(),
			type: "GET",
			dataType: "html",
			success: function(html) {
				$("#mainPage").replaceWith(html);
				currentPage = clickedID;
				$.each(pageSelector, function(key, val) {
					if(key == ('Load'+currentPage)) {
						callBackFunc = val;	
					}
		  	    });
				if(jQuery.isFunction(callBackFunc)){
					callBackFunc.call(this,clickedID);
				}
				window.location.hash = clickedID;
			}
		});
	}

	function majorLinkClick(event) {
		var clickedID = $(this).attr("id");
		$.ajax({
			url: "./"+clickedID+"_Min.html?time="+ new Date(),
			type: "GET",
			dataType: "html",
			success: function(html) {
				$("#mainPage").replaceWith(html);
				currentPage = clickedID;
				$.each(pageSelector, function(key, val) {
					if(key == ('Load'+currentPage)) {
						callBackFunc = val;	
					}
		  	    });
				if(jQuery.isFunction(callBackFunc)){
					callBackFunc.call(this,clickedID);
				}
				window.location.hash = clickedID;
			}
		});
	}
	
	function scrollNavLinkClick(event) {
		var clickedID = $(this).attr("id");
		$('.scrollNavList').removeClass('active');
		$(this).parent().addClass('active');
		
		$.each(pageSelector, function(key, val) {
			if(key == ('Change'+currentPage)) {
				callBackFunc = val;	
			}
  	    });
		if(jQuery.isFunction(callBackFunc)){
			callBackFunc.call(this,clickedID);
		}
	}

	
	
	$('.majorLinks').mouseover(function() {
		  $(this).css('bottom','20px');
	});
	$('.majorLinks').mouseout(function() {
		  $(this).css('bottom','0px');
	});
	$(".majorLinks").click(majorLinkClick);
	$(".minorLinks a").click(majorLinkClick);
	
	if($.browser.msie && ($.browser.version != '9.0')) {
		$(".mainPage").css('height','120px');
	}

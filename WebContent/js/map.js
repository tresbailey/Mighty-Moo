var map;
  var directionDisplay;
  var directionsService;
  var stepDisplay;
  var markerArray = [];


function getMapEvents(map) {
	$.ajax({
		url: "../content/Events.xml?time="+ new Date(),
		type: "GET",
		dataType: "xml",
		success: function(xml) {
			var evDt;
			var NDX = 0;
			$(xml).find("event").each(function() {
				var eventNm = $(this).find("name").text();
				var mInfo = $(this).find("mapInfo");
				var stLoc = $(mInfo).find("startLocation");
				var lat = $(stLoc).find("lat").text();
				var lng = $(stLoc).find("lng").text();
				var endLoc = $(mInfo).find("endLocation").text();
				var mImg = $(mInfo).find("mapImage").text();
				if(lat != '') {
					latlng = new google.maps.LatLng(lat,lng);
					marker = new google.maps.Marker({       
						position: latlng,        
						map: map,        
						title: eventNm   
					});
				}
			});
		},
		error: function() {
			alert(2);
		}
	});

	
}


function initialize() {
    // Instantiate a directions service.
    directionsService = new google.maps.DirectionsService();

	var latlng = new google.maps.LatLng(35.014717,-81.802606);     
	var myOptions = {       
			zoom: 14,       
			center: latlng,       
			mapTypeId: google.maps.MapTypeId.ROADMAP     
	};     
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

	// Create a renderer for directions and bind it to the map.
    var rendererOptions = {
      map: map
    }
    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions)
    
    // Instantiate an info window to hold step text.
    stepDisplay = new google.maps.InfoWindow();

	getMapEvents(map);
}



function calcRoute() {
	  
    // First, remove any existing markers from the map.
    for (i = 0; i < markerArray.length; i++) {
      markerArray[i].setMap(null);
    }
 
    // Now, clear the array itself.
    markerArray = [];
 
    // Retrieve the start and end locations and create
    // a DirectionsRequest using WALKING directions.
    var start = $("#startPointDir").val();
    var end = "127 Palmetto St, Cowpens, SC";
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
 
    // Route the directions and pass the response to a
    // function to create markers for each step.
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        var warnings = document.getElementById("warnings_panel");
	    warnings.innerHTML = "<b>" + response.routes[0].warnings + "</b>";
        directionsDisplay.setDirections(response);
        showSteps(response);
      }
    });
  }
 
  function showSteps(directionResult) {
    // For each step, place a marker, and add the text to the marker's
    // info window. Also attach the marker to an array so we
    // can keep track of it and remove it when calculating new
    // routes.
    var myRoute = directionResult.routes[0].legs[0];
 
    for (var i = 0; i < myRoute.steps.length; i++) {
    	/*
      var marker = new google.maps.Marker({
        position: myRoute.steps[i].start_point, 
        map: map
      });
      */
      attachInstructionText(marker, myRoute.steps[i]);
      //markerArray[i] = marker;
    }
	$(".driveInstr li:odd").addClass("rowOddItem");
  }
 
  function attachInstructionText(marker, step) {
	  $(".driveInstr").append('<li><div class="mapDir">'+step.instructions +'</div><div class="mapDist">'+ step.distance.text +'</div></li>');

	  /*
    google.maps.event.addListener(marker, 'click', function() {
      // Open an info window when the marker is clicked on,
      // containing the text of the step.
      stepDisplay.setContent(text);
      stepDisplay.open(map, marker);
    });
    */
  }

  

  function loadMap(clickedID) {
  	initialize();
	$(".scrollNavList").click(scrollNavLinkClick);
	$("#startPointDir").keypress(function(event) {
		if(event.which == '13') {
			calcRoute();
		}
	});
  }

  function changeMap(clickedID) {
  	calcRoute()
  }
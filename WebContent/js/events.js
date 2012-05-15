
	function loadEvent(clickedID) {
		
		
		$.ajax({
			url: "../content/Events.xml?time="+ new Date(),
			type: "GET",
			dataType: "xml",
			success: function(xml) {
				var evDt;
				var NDX = 0;
				$(xml).find("day").each(function() {
					NDX++;
					var act = '';
					evDt = $(this).attr("date");
					if(NDX==1)
						act = 'active';
					$('#scrollNavDates').append('<li class="scrollNavList '+ act +'"><a href="#" id="day'+ NDX +'">'+ evDt +'</a></li>');

					$(".scrollNavList a").click(scrollNavLinkClick);		
					
					
				});
			},
			error: function() {
				alert(2);
			}
		});


		loadEventPage(0);
		
	}
	
	function changeEvent(clickedID) {
		var index = $('.scrollNavList').index($('#'+clickedID).parent());
		loadEventPage(index);
	}

var imgNDX = 1;
var imgXML;

	function loadEventPage( index ) {
		$('.eventList').html('');
		$(".event_tabs").removeClass("selected_Tab");
		$(".event_tabs").eq(index).addClass("selected_Tab");	
		$.ajax({
			url: "../content/Events.xml?time="+ new Date(),
			type: "GET",
			dataType: "xml",
			success: function(xml) {
				var evDt;
				var time;
				var NDX = 0;
				var dayNDX = 0;
				$(xml).find("day").each(function() {
					NDX=0;
					if(dayNDX == index) {
					evDt = $(this).attr("date");
					$("#dateShow").text(evDt);
					$(".thumbImg").attr("src",$(this).find("pic").text());
					$(this).find("time").each(function() {
						time = $(this).attr("date");
						$('.eventList').append('<li class="eventListItem" style=""><div class="title-text-black">'+time+'</div><ul class="eventTimeList"></ul></li>');

						$(this).find("event").each( function() {
							$('.eventTimeList').eq(NDX).append('<li><div class="text-grey">'+ $(this).find("name").text() +'</div></li>');
						});
						NDX++;
					});
					
					var evEls = evDt.split(/ |,/);
					if($.browser.msie  && ($.browser.version != '9.0')) {
						$("#eventCalMonth").text(evEls[1]);
						$("#eventCalDay").text(evEls[2]);
						$("#eventCalYear").text(evEls[3]);
						
					} else {
						$("#eventCalMonth").text(evEls[2]);
						$("#eventCalDay").text(evEls[3]);
						$("#eventCalYear").text(evEls[5]);
					}
					} else {
					}
					dayNDX++;
				});
				$(".eventListItem li:odd").addClass("rowOddItem");
			},
			error: function() {
				alert(2);
			}
		});
	}

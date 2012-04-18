
var imgNDX = 1;
var imgXML;

	function loadEventPage( index ) {
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
				while($(".eventListItem").size() > 1) { 
					$(".eventListItem:last-child").remove();
				}
				$(xml).find("day").each(function() {
					if(dayNDX == index) {
					evDt = $(this).attr("date");
					$("#dateShow").text(evDt);
					$(".thumbImg").attr("src",$(this).find("pic").text());
					$(this).find("time").each(function() {
							var cloneItem = $(".eventListItem").eq(0).clone();
							$(cloneItem).show();
							//alert(cloneItem.html());
							NDX++;
							time = $(this).attr("date");
							$(cloneItem).find(".title-text-black").html(time);
							var nd2=0;
							$(this).find("event").each( function() {
								var cloneTime = $(cloneItem).find(".eventTimeList li").html($(this).text());
								//var cloneLI = $(".eventListItem").eq(0).clone();
								//$(cloneLI).find(".text-grey").html($(this).text());
								//$(cloneLI).appendTo(".eventListItem");
							});
							$(cloneItem).appendTo(".eventList");
							//alert($(cloneItem).html());
					});
					//$(".contentText .eventListItem").eq(0).hide();
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

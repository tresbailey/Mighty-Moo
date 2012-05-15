function showLoading() {
	var opH = $(".footer").offset().top + $(document).height();
	$(".opaqueOverlay").height(opH);
	$(".opaqueOverlay").width($(window).width());
	var pageHDiff = $(window).height() - $(".dialogBox").height();
	pageHDiff = pageHDiff / 2;
	$(".dialogBox").css("top",pageHDiff);
	var pageWDiff = $(document).width() - $(".dialogBox").width();
	pageWDiff = pageWDiff / 2;
	$(".dialogBox").css("left",pageWDiff);
	$(".load1").effect("pulsate", { times: 200 }, 1000);
	$(".load2").effect("pulsate", { times: 200 }, 1500);
	$(".load3").effect("pulsate", { times: 200 }, 2000);
	$(".load4").effect("pulsate", { times: 200 }, 2500);		
	
}

function startPage() {
	$(".dialogBox").hide();
	$(".opaqueOverlay").hide();	
}



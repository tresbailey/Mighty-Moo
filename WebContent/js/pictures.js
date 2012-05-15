	
var imgNDX = 1;
var imgXML;
var picScrollr;
var selectedFldr;
var slider;

function gcd(num1, num2) {
	var floor = Math.floor(num1 / num2);
	var result = num1 - (num2 * floor);
	if(result == 0 ) {
		return num2;
	} else {
		return gcd(num2, result);
	}
}

function hoverPicture(id, mouseX) {
	/*var opH = $(".footer").offset().top + $(document).height();
	$(".opaqueOverlay").height(opH);
	$(".opaqueOverlay").width($(window).width());
	*/
	$(".pictureBox").height($(".pictureBox img").height()+100);
	var pageHDiff = $(window).height() - $(".pictureBox").height();
	pageHDiff = pageHDiff / 2;
	$(".pictureBox").css("top",pageHDiff);
	var pageWDiff = $(document).width() - $(".pictureBox").width();
	pageWDiff = pageWDiff / 2;
	if(mouseX <= pageWDiff) {
		$(".pictureBox").css("left",mouseX+200);
	} else {
		$(".pictureBox").css("left",mouseX-50-$(".pictureBox").width());
	}
	
	var imgEl = $('#'+id).find(".picSrc").val();
	var capEl = $('#'+id).find(".picCap").val();
	
	$(".pictureBox img").attr("src",selectedFldr +''+ imgEl);
	$(".pictureDesc span").html(capEl);
	$(".pictureBox").show();
	
	$("a.pictureClose").hide();
	
}

function showPicture(id) {
	/*var opH = $(".footer").offset().top + $(document).height();
	$(".opaqueOverlay").height(opH);
	$(".opaqueOverlay").width($(window).width());
	*/
	$(".picWrap img").unbind('mouseenter mouseleave');
	$("a.pictureClose").show();
	var pageHDiff = $(window).height() - $(".pictureBox").height();
	pageHDiff = pageHDiff / 2;
	$(".pictureBox").css("top",pageHDiff);
	var pageWDiff = $(document).width() - $(".pictureBox").width();
	pageWDiff = pageWDiff / 2;
	$(".pictureBox").css("left",pageWDiff);
	
	var imgEl = $('#'+id).find(".picSrc").val();
	var capEl = $('#'+id).find(".picCap").val();
	
	$(".pictureBox img").attr("src",selectedFldr +''+ imgEl);
	$(".pictureDesc span").html(capEl);
	$(".pictureBox").show();
	
	$("a.pictureClose").click(function() {
		$(".pictureBox").hide();
		$(".picWrap img").hover(function(e) {
			hoverPicture($(this).parent().attr("id"), e.pageX);
		}, function(e) {
			$(".pictureBox").hide();
			$("a.pictureClose").show();
		});
	});
	
}


function loadShownImages() {
	//showLoading();
	$.ajax({
		url: selectedFldr+"dragDir.xml?time="+ new Date(),
		type: "GET",
		dataType: "xml",
		success: function(xml) {
			var ind = 0;
			imgXML = xml;
			$(xml).find("pic").each(function() {
				ind++;
				var srcTxt = jQuery("source",this).text();
				var capTxt = jQuery("caption",this).text();
				var thumbTxt = jQuery("thumb",this).text();
				//var app = $('#picWin').html();
				$('#picWin').prepend('<div id="picWrap'+ind+'" class="picWrap"><img alt="" src="'+ selectedFldr +''+ thumbTxt +'" /><input type="hidden" class="picCap" value="'+ capTxt +'" /><input type="hidden" class="picSrc" value="'+ srcTxt +'" /></div>');
				$(".picWrap img").hover(function(e) {
					hoverPicture($(this).parent().attr("id"), e.pageX);
				}, function(e) {
					$(".pictureBox").hide();
					$("a.pictureClose").show();
				});
				$(".picWrap img").click(function(e) {
					showPicture($(this).parent().attr("id"));
				});
			});
	}

	});
	
}



function loadPic(clickedID) {
	$(".scrollNavList a").click(scrollNavLinkClick);
	//showLoading();

	var folderCnt = 0;
	$.ajax({
		url: "../content/ImageFolders.xml?time="+ new Date(),
		type: "GET",
		dataType: "xml",
		success: function(xml) {
			folderXML = xml;
			$(xml).find("folder").each(function() {
				if(folderCnt < 8) {
					var folder = $(this).find("name").eq(0).text()
					if(folderCnt == 0) {
						selectedFldr = $(this).find("name").eq(0).text();
//						selectedFldr = '../images/thumbs/2009/';
						loadShownImages();
					}
					$("table tr td").eq(folderCnt).prepend("<div class='title-text-black' style='text-align: center; display: block'>"+ $(this).find("displayName").eq(0).text() +"</div>");
					var sample = $(this).find("sample").eq(0).text();
					$(".folderContainer").eq(folderCnt).append("<img class='folderImg1' src='"+folder+ sample +"' alt='' />");
					sample = $(this).find("sample").eq(1).text();
					$(".folderContainer").eq(folderCnt).append("<img class='folderImg2' src='"+folder+ sample +"' alt='' />");
					sample = $(this).find("sample").eq(2).text();
					$(".folderContainer").eq(folderCnt).append("<img class='folderImg3' src='"+folder+ sample +"' alt='' />");
					$(".folderContainer").eq(folderCnt).attr("id",$(this).find("id").eq(0).text());
					
				} 
				folderCnt++;
			});

			$(".folderContainer").hover(function() {
				$(this).css("cursor", "hand");
			});
			
			$(".folderContainer").click(function() {
				var selectedID = $(this).attr("id");
				var idCnt = 0;
				$(folderXML).find("id").each(function() {
					if(selectedID == $(this).text()) {
						selectedFldr = $(folderXML).find("name").eq(idCnt).text();
						var index = 0;
						$(".tPic").each(function() {
							if(index >0) 
								$(this).remove();
							index++;
						});
					}
					idCnt++;
				});

				$("#picViewGroup").trigger('click');
			});
			//startPage();
		}
	});
}

function changePic(clickedID) {
	$('.contentText').hide();
	$('.'+clickedID).show();

	$('#picWin').html('');
	
	//selectedFldr = '../images/thumbs/2010/Parade/';
	loadShownImages();
}






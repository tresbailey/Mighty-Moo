<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<link type="text/css" href="../css/mootheme/jquery-ui-1.7.2.custom.css" rel="Stylesheet" />	
<link type="text/css" href="../css/MightyMoo.css" rel="Stylesheet" />	
<script type="text/javascript" src="../js/jquery-1.3.2.min.js"></script>
<script type="text/javascript" src="../js/jquery-ui-1.7.1.custom.min.js"></script>
<script type="text/javascript" src="../js/jQuery/ui/ui.core.js"></script>
<script type="text/javascript" src="../js/jQuery/ui/ui.datepicker.js"></script>
<script type="text/javascript" src="../js/jQuery/ui/ui.tabs.js"></script>
<script type="text/javascript" src="../js/jQuery/ui/ui.draggable.js"></script>
<script type="text/javascript" src="../js/jQuery/ui/ui.dialog.js"></script>
<script type="text/javascript" src="../js/jQuery/ui/ui.slider.js"></script>
<script type="text/javascript" src="../js/jQuery/ui/effects.core.js"></script>

<SCRIPT type=text/javascript>
	$(function() {
		$("#datepicker").datepicker();
		$("#tabs").tabs();
	});
	</SCRIPT>

	<script type="text/javascript">

	var imgCounter = { first: 1,
						middle: 2,
						last: 3,
						total: 0
	};
						
	$(function() {
		$("#draggable").draggable({ axis: 'y' });
		$(".draggable2").draggable({ containment: '.viewer-wrapper', handle: '.pic-Drag-Handle',
			stop: function(event,ui) {
				$(this).appendTo("#picView");
			}
			});
		
		$("#draggable3").draggable({ containment: '#containment-wrapper', scroll: false });
		$("#draggable4").draggable({ containment: '#demo-frame' });
		$("#draggable5").draggable({ containment: 'parent' });

	});

	function viewLargeImg($link) {
		var src = $link.attr('src');
		var title = $link.attr('alt');
		var $modal = $('img[src$="'+src+'"]');
		var img = $('<img alt="'+title+'" style="display:none;padding: 8px;height: 250px; width: 250px; " />')
			.attr('src',src).appendTo('body');
		setTimeout(function() {
			img.dialog({
				title: title,
				width: 500,
				height: 500,
				modal: true
			});
		}, 1);
	}

	function moveRight() {
	
			  $(".tPic2").contents().filter("img").animate({ width: "175px",height: "175px"}, 500, 'linear');
			  $(".tPic2").animate( { width: "175px",height: "175px" }, 500, 'swing');
			  $(".tPic1").animate( { width: "200px",height: "200px" }, 500, 'swing');
			$(".tPic1").contents().filter("img").animate({ width: "200px",height: "200px"}, 500, 'swing');
			$(".tPic3").hide();
			$(".tPic3").removeClass("tPic3");
			$(".tPic2").addClass("tPic3");
			$(".tPic2").removeClass("tPic2");

			imgCounter.first--;
			imgCounter.middle--;
			imgCounter.last--;
			$(".tPic"+imgCounter.first).show();
			$(".tPic1").addClass("tPic2");
			$(".tPic1").removeClass("tPic1");
			$(".tPic"+imgCounter.first).addClass("tPic1");
			$(".tPic"+imgCounter.first).removeClass(".tPic"+imgCounter.last);

					var nextN = parseInt(imgCounter.last + 1);
					if($(".tPic"+ nextN).size() <= 0) {
						$("#scrollL").hide();
					}
					
	}

	function moveLeft() {

		  //$(".tPic2").animate( { width: "200px",height: "200px" }, 500, 'swing');
		$(".tPic2").contents().filter("img").animate({ width: "175px",height: "175px"}, 200, 'linear');
		  //$(".tPic3").animate( { width: "200px",height: "200px" }, 500, 'swing');
		$(".tPic3").contents().filter("img").animate({ width: "200px",height: "200px"}, 200, 'swing');
		
		$(".tPic1").hide();
		$(".tPic1").removeClass("tPic1");
		$(".tPic2").addClass("tPic1");
		$(".tPic2").removeClass("tPic2");

		imgCounter.first++;
		imgCounter.middle++;
		imgCounter.last++;
		$(".tPic"+imgCounter.last).show();
		$(".tPic3").addClass("tPic2");
		$(".tPic3").removeClass("tPic3");
		$(".tPic"+imgCounter.last).addClass("tPic3");
		$(".tPic"+imgCounter.last).removeClass(".tPic"+imgCounter.last);

				var nextN = parseInt(imgCounter.last + 1);
				if($(".tPic"+ nextN).size() <= 0) {
					$("#scrollL").hide();
				}
				if(imgCounter.first > 1) {
					$("#scrollR").show();
				}
	}

	function moveTo(value) {
		var src = $(imgXML).find("source").eq(value).text();
		$(".tPic1").find(".baseImg").attr("src",src);
		src = $(imgXML).find("source").eq(value+1).text();
		if(src != "" && src != null) {
			$(".tPic2").find(".baseImg").attr("src",src);
			src = $(imgXML).find("source").eq(value+2).text();
			if(src != "" && src != null) {
				$(".tPic3").find(".baseImg").attr("src",src);
				$(".tPic3").show();
			} else {
				$(".tPic3").hide();
			}
		}
	}


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
					$(".thumbImg").attr("src",$(this).find("pic").text());
					$(this).find("time").each(function() {
							var cloneItem = $(".eventListItem").eq(0).clone();
							NDX++;
							time = $(this).attr("date");
							$(cloneItem).find(".title-text-black").html(time);
							$(this).find("event").each( function() {
								$(cloneItem).find(".eventTimeList").html($(this).text());
								//var cloneLI = $(".eventListItem").eq(0).clone();
								//$(cloneLI).find(".text-grey").html($(this).text());
								//$(cloneLI).appendTo(".eventListItem");
							});
							$(cloneItem).appendTo(".eventList");
							$(cloneItem).show();
					});
					$(".eventListItem").eq(0).hide();
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
	
var imgNDX = 1;
var imgXML;
	$(document).ready( function() {
		


		$(".roundBox").wrap("<div class='boxT'><div class='boxB'><div class='boxL'><div class='boxR'><div class='boxBL'><div class='boxBR'><div class='boxTL'><div class='boxTR'></div></div></div></div></div></div></div></div>");

		$.ajax({
			url: "../images/thumbs/dragDir.xml?time="+ new Date(),
			type: "GET",
			dataType: "xml",
			success: function(xml) {
				$(xml).find("source").each(function() {
					imgCounter.total++;
					var cloned = $(".tPic").eq(0).clone();
					$(cloned).find(".baseImg").attr("src",$(this).text());
					$(cloned).find(".reflectImg").attr("src",$(this).text());
					$(cloned).addClass("tPic"+imgCounter.total);
					$(cloned).addClass("picHldr"+imgCounter.total);
					$(cloned).appendTo("#picWin");
					/*
					$(".tPic"+imgCounter.total).contents().filter(".baseImg").attr("src",$(this).text());
					$(".tPic"+imgCounter.total).contents().filter(".reflectImg").attr("src",$(this).text());
					*/
					if(imgCounter.total > 3) {
						$(".tPic"+imgCounter.total).hide();
					}
					//alert($(".tPic"+imgCounter.total).html());
				});

				$(".tPic").eq(0).remove();

				$(".tPic img").hover( function() {
					//$(this).animate({ "border-width": "10px","border-style": "solid", "border-color": "#ffffff"}, 'linear');
					$(this).parent().parent().parent().parent().parent().eq(0).addClass("hvrPic");
					$(this).addClass("hvrPicImg");
					$(this).parent().parent().parent().parent().parent().eq(0).removeClass("tPic");
				}, function() {
					//$(this).animate({ width: "175px",height: "175px"}, 100, 'swing');
					$(this).parent().parent().parent().parent().parent().eq(0).removeClass("hvrPic");
					$(this).removeClass("hvrPicImg");
					$(this).parent().parent().parent().parent().parent().eq(0).addClass("tPic");
				});
				$(".baseImg").click( function(ev) {
					var $target = $(ev.target);
					viewLargeImg($target);
				});
										
				$(xml).find("caption").each(function() {
					if(imgNDX <= 3) {
						var cpTxt = $(this).text();
						var cap = $(cpTxt).wrap("<div class='captionText'></div>");
					$(".tPic"+imgNDX).contents().filter(".tCap"+imgNDX).html("<div class='captionText'>"+$(this).text()+"</div>");
					imgNDX++;
					}
				});
				imgXML = xml;
				$("#slider-range-min").slider({
					value: 0,
					min: 0,
					max: imgCounter.total - 2,
					step: 1,
					stop: function(event, ui) {
					moveTo(ui.value);
					}
				});					
			}


		});

		loadEventPage(0);

	});
	</script>


</head>
<body>
<div class="pageHeader">

<div style="font-size: 28pt; font-weight: bold; color: #E0162B" >
The Mighty
</div>
<div style="font-size: 28pt; font-weight: bold; color: #E0162B; margin-left: 30px;" >
Moo Festival
</div>


<div class="menu_box">
   <div class="menu_top"><div></div></div>
      <div class="menu_content">
<ul style="list-style: none; padding: 0px; margin: 0px; width: 100%;">
	<li style="display: inline; float: left; "><div class="title-text selected_Tab"><a href="#">HOME</a></div></li>
	<li style="display: inline; float: left; "><div class="title-text" onmouseover="$(this).addClass('hover_Tab')" onmouseout="$(this).removeClass('hover_Tab')"><a href="#">EVENTS</a></div></li>
	<li style="display: inline; float: left;"><div class="title-text" onmouseover="$(this).addClass('hover_Tab')" onmouseout="$(this).removeClass('hover_Tab')"><a href="#">PICS</a></div></li>
	<li style="display: inline; float: left;"><div class="title-text" onmouseover="$(this).addClass('hover_Tab')" onmouseout="$(this).removeClass('hover_Tab')"><a href="#">SHIPS</a></div></li>
</ul>
      </div>
   <div class="menu_bottom"><div></div></div>
</div>
<div class="menu_box menu_box_FLIP">
   <div class="menu_top"><div></div></div>
      <div class="menu_content">
<ul style="list-style: none; padding: 0px; margin: 0px; width: 100%;">
	<li style="display: inline; float: left; "><div class="title-text selected_Tab"><a href="#">HOME</a></div></li>
	<li style="display: inline; float: left; "><div class="title-text"><a href="#">EVENTS</a></div></li>
	<li style="display: inline; float: left;"><div class="title-text" ><a href="#">PICS</a></div></li>
	<li style="display: inline; float: left;"><div class="title-text" ><a href="#">SHIPS</a></div></li>
</ul>
      </div>
   <div class="menu_bottom"><div></div></div>
</div>

</div>
<script type="text/javascript" charset="UTF-8" src="tinc?key=SAahqoBq"></script>

<div class="sectionHeader">
	<span class="sectionHeaderTxt">
	The Festival
	</span>
</div>

<div style="width: 980px; margin-top: 25px;">
	<div class="content_box" style="background: #0054a5">
	<div class="menu_top">
	<div></div>
	</div>
	<div class="menu_content">
	<div class="title-text"></div>
	</div>
	</div>

<div class="contentSection" style="background-color: #0054a5">
<div id="picWin" style="width: 820px; margin: 10px; float: left; padding-left: 75px">
<div class="tPic" style="">
<div class="wideBox" style="clear: both">
<div class="borderTop"><b></b></div>
<div class="borderLeft">
<div class="borderRight">
<div class="borderMiddle">
<img class="baseImg"
	src="../images/thumbs/dragPic.jpg" alt="Finley Shoveling"/></div>
</div>
</div>
<div class="borderBottom"><b></b></div>
</div>
</div>
</div>

<div id="slider-range-min" style="width: 619px; position: relative; left: 90px"></div>
</div>

<img src="../images/thumbs/dragPic.jpg" alt="Finley Bucket" class="thumbImg" style="float: right;" />
			<ul class="eventList">
				<li class="eventListItem">
					<div class="title-text-black">0:30 AM
					</div>
						<ul class="eventTimeList">
							<li>
								<div class="text-grey">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
								</div>
							</li>
						</ul>
				</li>
			</ul>

</div>






<div style="width: 100%; text-align: middle; ">
<div style="margin-top: 30px; width: 50%; border-top: 1px solid #000000; text-align: center">
		<span><a href="#">Contact Us</a></span>

</div>
</div>


</body>
</html>

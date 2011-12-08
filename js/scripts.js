$(function(){
	$('body').removeClass('nojs');
	
	//detect proper page and scroll width
	var $pane = $('#jScrollPane').css({'padding':0,'margin':0});
	var $pages = $("#jScrollPane").find(".pages");
	var pagesNum = $pages.length;
	$pages.width($(window).width());
	$pane.find(".h-scroll").width($pages.width() * pagesNum);
	
	$pane.jScrollPane({animateScroll: true, animateDuration: 500, animateEase: "circEaseInOut"});
	var api = $pane.data('jsp');
	
	//url-hash scroll
	if(window.location.hash.length > 0 && $(window.location.hash).length > 0)
		api.scrollToElement(window.location.hash, true, false);
	
	//arrows scroll
	$(".l-arrow, .r-arrow").find('a').bind('click', function(){
		window.location.hash = $(this).attr('href');
		api.scrollToElement(window.location.hash, true);
		return false;
	});
	
	//autoscroll to element
	$pane.find('.jspDrag').bind('mousedown', function(event){
		var gesture, prevX = event.clientX;
		//detect mouse gesture
		$(document).bind('mousemove.jsp.custom', function(event){
			var curX = event.clientX;
			var delta = curX - prevX;
			if(delta > 1)
				gesture = "moveRight";
			else if(delta < -1)
				gesture = "moveLeft";
			else if(delta > 30)
				gesture = "moveFastRight";
			else if(delta < -30)
				gesture = "moveFastLeft";
			prevX = event.clientX;
		})
		//detect closest page and scroll to it
		$(document).bind('mouseup.jsp.custom', function(event){
			var closestPageNum = getClosestPage();
			var cur_page_hash = "#"+$pages.eq(closestPageNum).attr('id');
			
			window.location.hash = cur_page_hash;
			api.scrollToElement(window.location.hash, true);
			
			$(this).unbind('.jsp.custom');
		})
	});
	function getClosestPage(){
		var percentScrolled = api.getPercentScrolledX() * 100;
		var pagePercentage = 100 / pagesNum;
		var closestPageNum = Math.floor(percentScrolled/pagePercentage);	
		
		closestPageNum = (closestPageNum >= pagesNum) ? pagesNum - 1 : closestPageNum; 
		return closestPageNum;
	}
})
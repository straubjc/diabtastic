$(document).ready(function() {
	$("body").removeClass("preload");
	// Show first level nav
	$('.main-nav > ul').show();
	
	// Hover
	$(".main-nav li").hover(
	    // Reposition if off screen
	function () {
	    if ($(this).find('> ul').length) {        
	        $(this).find('> .nav-reposition').removeClass();
	        $(this).addClass('nav-parent');
	        $(this).find('> ul').slideDown(150);

	        var absoluteLeft = $(this).find('> ul').offset().left;
	        var absoluteRight = absoluteLeft + $(this).outerWidth();
	        var viewportRight = $(window).width() + $(window).scrollLeft();


	        if (absoluteRight > viewportRight) {
	            $(this).find('> ul').addClass('nav-reposition');
	        } else {
	            $(this).find('> ul').removeClass('nav-reposition');
	        }
	    }
	}, function () {
	    $(this).removeClass('nav-parent');
	    $(this).find('> ul').stop().slideUp(150, function(){ 
	        $(this).attr("style","overflow:visible");
	    });
	});
	// Save main nav html
	var navHtml = $('.main-nav ul').html();
	// Append down-arrows for parents
	$('.main-nav li:has(> ul)').find(">:first-child").append(' <span class="arrow">▼</span>');
	// Populate mobile nav html
	$('.mobile-nav').html(navHtml);
	$('.mobile-nav li:has(> ul)').find(">:first-child").parent().append('<div class="indicator"><i class="fa fa-chevron-down"></i></div>');
	// Mobile Indicators
    $(document).on('click','.mobile-nav .indicator', function() {
		$(this).addClass('indicator-active').removeClass('indicator');
		$(this).html('<i class="fa fa-chevron-up"></i>');
	    	$(this).parent().find('ul:first').slideToggle('fast', function() {
	    	var sideHeight = $('.mobile-nav').outerHeight(),
	    		viewportHeight = ($(window).height()+50);
	    	if (sideHeight > viewportHeight) {
	    		$('.overlay, .mobile-nav-wrap').css('height', sideHeight);
	    	}
	    });
	});

    $(document).on('click','.mobile-nav .indicator-active', function() {
		$(this).addClass('indicator').removeClass('indicator-active');
		$(this).html('<i class="fa fa-chevron-down"></i>');
	    	$(this).parent().find('ul:first').slideToggle('fast', function() {
	    	var sideHeight = $('.mobile-nav').height();
	    	var viewportHeight = $(window).height();
	    	if (sideHeight > viewportHeight) {
	    	$('.overlay, .mobile-nav-wrap').css('height', sideHeight);
	    	}
	    	else {
	    		$('.overlay, .mobile-nav-wrap').css('height', '100%');
	    	}
	    });
	});
    
	$('.open').click(function(){
		$('html').css({
			'overflowX':'hidden'
		});
		$('body').not('#mobile').css({
	      "position": "relative",
	      "left": "250px"
	    });
	    $('.mobile-nav').css({
	    	left:'0px',
	    	opacity: '1'
	    });
	    $('.overlay').show();
	});

	$('.mobile-cancel, .overlay').click(function(){
		$('html').css({
			'overflowX':'auto'
		});
		$('body').css({
	      "position": "relative",
	      "left": "0px"
	    });
	    $('.mobile-nav').css({
	    	left:'-50px',
	    	opacity: '0'
	    });
	    $('.overlay').fadeOut();
	});

});

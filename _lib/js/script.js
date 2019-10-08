$(document).ready(function() {
    init();

    function init() {
        var tl = new TimelineMax(),
            $blockreveal = $('.home > #quote > .block-text');
        tl.set('.desktop', {
            className: '+=loaded'
        }, '+=.5').staggerTo($blockreveal, .01, {
            className: '+=reveal'
        }, 0.3, '+=.55').set('.btn--start', {
            className: '+=reveal'
        }, '+=.5');
    }

    $('.btn--start').on('click', function() {
        $('#video').parents('.video-wrapper').addClass('fs');
        $('.--q').addClass('wipeoff');
        setTimeout(function() {
            $('.--q').addClass('wipe');
            $('.btn--start').addClass('hint');
            $('.bit-button').text('tickets');
        }, 2000);
    });

    $('.bit-events-container').on('click', function(e) {
        e.preventDefault();
        window.open('https://www.eventbrite.com/e/neon-pink-party-tickets-37985643081?aff=eac2#tickets');
    });

    setTimeout(function() {
        $('.bit-show-upcoming').text('Upcoming Shows');
        $('.bit-button').text('Tickets');
    }, 500);

    if(!isMobile.detectMobile()){

    	var musicShowMenuTL = new TimelineMax({paused: true}),
    		musicHideMenuTL = new TimelineMax({paused: true}),
    		videoShowMenuTL = new TimelineMax({paused: true}),
    		videoHideMenuTL = new TimelineMax({paused: true}),
    		menuplaying = 0;

    	$(document).delegate('.btn--menu', 'click', function(e){
    		$('.main-menu .menu-item-hover-container img').each(function(){
    			var $imgsrc = $(this).attr('data-src');
    			$(this).attr('src', $imgsrc);
    		});
    	});

    	$(document).on('mouseenter','.menu-open .menu-item-title-container .menu-item-title-wrap', function(e) {
    		
    		var item = $(this).attr('class').replace('menu-item-title-wrap menu-item-title-wrap-','');
    		var $titleclass = 'absolute-container menu-item-title-container ';
    		var $itemclass = 'absolute-container menu-item-container ';

    		switch (item) {
    			case 'music':                                                                                                        
    				console.log('music');
    				$('.show-menu-items .menu-item-title-container').attr('class','absolute-container menu-item-title-container');
    				$('.show-menu-items .menu-item-title-container').addClass('music-menu-active');
    				$('.show-menu-items .menu-item-container').attr('class','absolute-container menu-item-container');
    				$('.show-menu-items .menu-item-container').addClass('music-menu-active');
    				break;
    			case 'videos':
    				console.log('videos');
    				$('.show-menu-items .menu-item-title-container').attr('class','absolute-container menu-item-title-container');
    				$('.show-menu-items .menu-item-title-container').addClass('videos-menu-active');
    				$('.show-menu-items .menu-item-container').attr('class','absolute-container menu-item-container');
    				$('.show-menu-items .menu-item-container').addClass('videos-menu-active');
    				break;
    			case 'tour':
    				console.log('tour');
    				$('.show-menu-items .menu-item-title-container').attr('class','absolute-container menu-item-title-container');
    				$('.show-menu-items .menu-item-title-container').addClass('tour-menu-active');
    				$('.show-menu-items .menu-item-container').attr('class','absolute-container menu-item-container');
    				$('.show-menu-items .menu-item-container').addClass('tour-menu-active');
    				break;
    			case 'merch':
    				console.log('merch');
    				$('.show-menu-items .menu-item-title-container').attr('class','absolute-container menu-item-title-container');
    				$('.show-menu-items .menu-item-title-container').addClass('merch-menu-active');
    				$('.show-menu-items .menu-item-container').attr('class','absolute-container menu-item-container');
    				$('.show-menu-items .menu-item-container').addClass('merch-menu-active');
    				break;
    			// default:
    			// 	$('.show-menu-items .menu-item-title-container').attr('class','absolute-container menu-item-title-container');
    			// 	$('.show-menu-items .menu-item-container').attr('class','absolute-container menu-item-container');
    			// break;
    		}
    	});

	    $('.btn--close').bind('mouseenter', function(e) {
	    	$('.menu-open .menu-item-title-container .menu-item-title-wrap').removeClass('active');
	    });

    };

	// tourDatesLoop();

	var dates = $('.tour-date');

var tl = new TimelineLite({
			onComplete: function(){
				tl.restart();
			}
		});

 
TweenLite.defaultEase = Circ.easeInOut;

var time = 2;
var y = 320;

tl
	.add ( TweenMax.staggerFromTo (
		dates, time,
			{
				opacity: 0,
				y:y,
			},
			{	
				opacity: 1,
				y: 0,
			},
		3.1 ))
	.add ( TweenMax.staggerTo (
		dates, time,
			{
				delay: .9,
				opacity: 0,
				y: -y,
			},
		3.1 ), 2.4);

});
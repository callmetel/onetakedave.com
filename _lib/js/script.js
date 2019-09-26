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
	    $(document).on('mouseenter','.menu-open .menu-item-title-container .menu-item-title-wrap', function (e) {
	    	var item = $(this).attr('class').replace('menu-item-title-wrap menu-item-title-wrap-','');
	    	switch (item) {
	    		case 'music':
	    			showMusicMenu();
	    			break;
	    		default:
	    			// statements_def
	    			break;
	    	}
	    }).on('mouseleave','.menu-open .menu-item-title-container .menu-item-title-wrap',  function(){
	    	var item = $(this).attr('class').replace('menu-item-title-wrap menu-item-title-wrap-','');
	    	switch (item) {
	    		case 'music':
	    			hideMusicMenu();
	    			break;
	    		default:
	    			// statements_def
	    			break;
	    	}
	    });

	    $('.btn--close').bind('mouseenter', function(e) {
	    	$('.menu-open .menu-item-title-container .menu-item-title-wrap').removeClass('active');
	    });

	    function showMusicMenu() {
	    	var musicMenuTL = new TimelineMax({paused: true});
			musicMenuTL.set('.menu-item-title-wrap:not(.menu-item-title-wrap-music)', {
				className:'+=menu-item-not-active'
			}).set('.menu-item-title-wrap-music .menu-item-title', {
				alpha: 0,
				y: 0,
				className:'+=current-menu-item'
			}).set('.menu-item-music .menu-item-title', {
				alpha: 1,
				y: 0
			}, '-=2').fromTo('.menu-item-container .menu-item-hover-bg', 1, {
				width: '20%'
			}, {
				width: '100%'
			}, '-=2.5').fromTo('.menu-item-music .menu-item-hover-container', 1.5, {
				alpha: 0,
				y: 40
			}, {
				alpha: 1,
				y: 0
			});
			musicMenuTL.play();
	    }

	    function hideMusicMenu() {
	    	var musicMenuTL = new TimelineMax({paused: true});
			musicMenuTL.set('.menu-item-title-wrap:not(.menu-item-title-wrap-music)', {
				className:'-=menu-item-not-active'
			}).fromTo('.menu-item-music .menu-item-hover-container', 1, {
				alpha: 1,
				y: 0
			}, {
				alpha: 0,
				y: 40
			}).fromTo('.menu-item-container .menu-item-hover-bg', 1, {
				width: '100%'
			}, {
				width: 0
			},'-=1.5').set('.menu-item-title-wrap-music .menu-item-title', {
				alpha: 1,
				filter: 'blur(0px)',
				x: 0
			},'-=.5').set('.menu-item-music .menu-item-title', {
				alpha: 0
			},'-=.5');
			musicMenuTL.play();
	    }	
    }

    

});
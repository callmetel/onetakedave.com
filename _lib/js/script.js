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
    		$('.block-hover').addClass('active');

    		$('.main-menu .menu-item-hover-container img').each(function(){
    			var $imgsrc = $(this).attr('data-src');
    			$(this).attr('src', $imgsrc);
    		});

    		setTimeout(function(){
    			$('.block-hover').removeClass('active');
    		},3000);
    	});

    	$(document).on('mouseenter','.menu-open .menu-item-title-container .menu-item-title-wrap', function(e) {
    		
    		var item = $(this).attr('class').replace('menu-item-title-wrap menu-item-title-wrap-','');
    		var $titleclass = 'absolute-container menu-item-title-container ';
    		var $itemclass = 'absolute-container menu-item-container ';

    		switch (item) {
    			case 'music':                                                                                                        
    				console.log('hover music');
    				$('.show-menu-items .menu-item-title-container').attr('class','absolute-container menu-item-title-container');
    				$('.show-menu-items .menu-item-title-container').addClass('music-menu-active');
    				$('.show-menu-items .menu-item-container').attr('class','absolute-container menu-item-container');
    				$('.show-menu-items .menu-item-container').addClass('music-menu-active');
    				tourDatesTL.pause();
    				productsTL.pause();
    				break;
    			case 'videos':
    				console.log('hover videos');
    				$('.show-menu-items .menu-item-title-container').attr('class','absolute-container menu-item-title-container');
    				$('.show-menu-items .menu-item-title-container').addClass('videos-menu-active');
    				$('.show-menu-items .menu-item-container').attr('class','absolute-container menu-item-container');
    				$('.show-menu-items .menu-item-container').addClass('videos-menu-active');
    				tourDatesTL.pause();
    				productsTL.pause();
    				break;
    			case 'tour':
    				console.log('hover tour');
    				$('.show-menu-items .menu-item-title-container').attr('class','absolute-container menu-item-title-container');
    				$('.show-menu-items .menu-item-title-container').addClass('tour-menu-active');
    				$('.show-menu-items .menu-item-container').attr('class','absolute-container menu-item-container');
    				$('.show-menu-items .menu-item-container').addClass('tour-menu-active');
    				tourDatesTL.play();
    				productsTL.pause();
    				break;
    			case 'merch':
    				console.log('hover merch');
    				$('.show-menu-items .menu-item-title-container').attr('class','absolute-container menu-item-title-container');
    				$('.show-menu-items .menu-item-title-container').addClass('merch-menu-active');
    				$('.show-menu-items .menu-item-container').attr('class','absolute-container menu-item-container');
    				$('.show-menu-items .menu-item-container').addClass('merch-menu-active');
    				tourDatesTL.pause();
    				productsTL.play();
    				break;
    			// default:
    			// 	$('.show-menu-items .menu-item-title-container').attr('class','absolute-container menu-item-title-container');
    			// 	$('.show-menu-items .menu-item-container').attr('class','absolute-container menu-item-container');
    			// break;
    		}
    	});

    	$(document).on('mouseenter','header .btn--menu', function(e) {
    		console.log('hover close');
    		$('.show-menu-items .menu-item-title-container').attr('class','absolute-container menu-item-title-container');
			$('.show-menu-items .menu-item-container').attr('class','absolute-container menu-item-container');
    	});

	    $('.btn--close').bind('mouseenter', function(e) {
	    	$('.menu-open .menu-item-title-container .menu-item-title-wrap').removeClass('active');
	    });

    };


	var dates = $('.tour-date');
	var tourDatesTL = new TimelineLite({
				paused: true,
				onComplete: function(){
					tourDatesTL.restart();
				}
			});
	 
	TweenLite.defaultEase = Circ.easeInOut;

	var time = 2;
	var y = 320;

	tourDatesTL
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
			3.1 ), time);

	var products = $('.featured-products .product'),
		productinfo = $('.featured-products .product .product-info');
	var productsTL = new TimelineMax({
				paused: true,
				onComplete: function(){
					productsTL.restart();
				}
			});
	 
	TweenLite.defaultEase = Circ.easeInOut;

	var product_time = 2;
	var xright = '100%';
	var xcenter = '0%';
	var xleft = '-100%';
	var xoff = '-250%';

	productsTL
		.fromTo(products[2], 2,
			{
				opacity: 1,
				x: xleft,
			},
			{
				opacity: 0,
				x: xoff,
			}, '+=.85'
		)
		.fromTo(products[0], 2, 
			{
				opacity: 1,
				x: xcenter,
			},
			{
				opacity: 1,
				x: xleft,
			},'-=2'
		)
		.fromTo(products[1], 2, 
			{
				opacity: 0,
				x: xright,
			},
			{
				opacity: 1,
				x: xcenter,
			},'-=2'
		)
		.staggerFromTo('.featured-products .product:eq(1) .product-info span', .6, 
			{
				opacity: 0,
				y: 20,
			},
			{
				opacity: 1,
				y: 0,
			}, .25, '-=.75'
		)
		.staggerFromTo('.featured-products .product:eq(0) .product-info span', .6, 
			{
				opacity: 1,
				y: 0,
			},
			{
				opacity: 0,
				y: 20,
			}, .25, '-=1.75'
		)
		.to(products[1], 2,
			{
				opacity: 1,
				x: xleft,
			},'+=2'
		)
		.to(products[0], 2, 
			{
				opacity: 0,
				x: xoff,
			},'-=2'
		)
		.staggerFromTo('.featured-products .product:eq(1) .product-info span', .6, 
			{
				opacity: 1,
				y: 0,
			},
			{
				opacity: 0,
				y: 20,
			}, .25, '-=1.75'
		)
		.fromTo(products[2], 2, 
			{
				opacity: 0,
				x: xright,
			},
			{
				opacity: 1,
				x: xcenter,
			},'-=2'
		)
		.staggerFromTo('.featured-products .product:eq(2) .product-info span', .6, 
			{
				opacity: 0,
				y: 20,
			},
			{
				opacity: 1,
				y: 0,
			}, .25, '-=.75'
		)
		.to(products[2], 2,
			{
				opacity: 1,
				x: xleft,
			},'+=2'
		)
		.to(products[1], 2, 
			{
				opacity: 0,
				x: xoff,
			},'-=2'
		)
		.fromTo(products[0], 2, 
			{
				opacity: 0,
				x: xright,
			},
			{
				opacity: 1,
				x: xcenter,
			},'-=2'
		)
		.staggerFromTo('.featured-products .product:eq(0) .product-info span', .6, 
			{
				opacity: 0,
				y: 20,
			},
			{
				opacity: 1,
				y: 0,
			}, .25, '-=.75'
		)
		.staggerFromTo('.featured-products .product:eq(2) .product-info span', .6, 
			{
				opacity: 1,
				y: 0,
			},
			{
				opacity: 0,
				y: 20,
			}, .25, '-=1.75'
		);

		// .add ( TweenMax.staggerFromTo (
		// 	products, product_time,
		// 		{
		// 			opacity: 0,
		// 			x: xright,
		// 		},
		// 		{	
		// 			opacity: 1,
		// 			x: xcenter,
		// 		},
		// 	2 ))
		// .add ( TweenMax.staggerFromTo (
		// 	products, product_time,
		// 		{
		// 			opacity: 1,
		// 			x: xcenter,
		// 		},
		// 		{	
		// 			opacity: 1,
		// 			x: xleft,
		// 		},
		// 	2 ),'-=4')
		// .add ( TweenMax.staggerTo (
		// 	products, product_time,
		// 		{
		// 			opacity: 0,
		// 			x: xoff,
		// 		},
		// 	2 ),'-=4');
});


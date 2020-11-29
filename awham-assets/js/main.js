jQuery(document).ready(function($) {
	var introTL = gsap.timeline({paused:true, delay:1}),
			title = $('.title'),
			images = $('.images-grid-wrap'),
			button = $('#listen-now');

	introTL.set([title,button],
						{ y:100, alpha:0 },
					)
					.to(images,
						{ duration:2, alpha:1, ease: "power4.inOut" }
					)
					.to(title,
						{ duration:2, alpha:1, y:0, ease: "power4.inOut", delay:-1 }
					)
					.to(button,
						{ duration:1, alpha:1, y:0, ease: "power4.inOut", delay:-1.5 }
					);

	introTL.play();

	button.click(function(event) {
		event.preventDefault();
		gsap.to('.title-wrap', {duration:2, y: "-100vh", ease: "power4.inOut"});
		gsap.to('.links-grid-wrap', {duration:2, y: "0", ease: "power4.inOut"});
	});

	$('#preview').click(function(event) {
		event.preventDefault();
		if($(this).find('.play').hasClass('active')) {
			$('#snippet')[0].play();
			$('.play').removeClass('active');
			$('.pause').addClass('active');
		}
		else {
			$('#snippet')[0].pause();
			$('.play').addClass('active');
			$('.pause').removeClass('active');
			$('#progress').removeAttr('style');
		}
	});

	$('#snippet').on('ended',function(e){
		$('.play').addClass('active');
		$('.pause').removeClass('active');
	});

	$('#snippet').on('timeupdate',function(e){
		var currTime = Math.floor(this.currentTime*3.333);
		console.log(currTime);
		gsap.set('#progress', {width: "calc("+currTime+"% - 40px)"});
	});
});
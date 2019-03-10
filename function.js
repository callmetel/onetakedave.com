$(document).ready(function() {

    if (/iPhone/.test(navigator.userAgent) && !window.MSStream && window.orientation !== 0) {
        $('body, #main').addClass('is-not-scrollable');
        $('video').detach();
        $('#mobile-background').before('<audio src="app/images/intro.mp3" autoplay="true" loop="true" id="music"></audio>');
        setTimeout(function(){
            $('#music')[0].play();
        },2000);
    } else if (/iPhone/.test(navigator.userAgent) && !window.MSStream && window.orientation == 0 || /iPad|iPod/.test(navigator.userAgent) && !window.MSStream){
        $('body, #main').removeClass('is-not-scrollable');
        $('video').detach();
        $('#mobile-background').before('<audio src="app/images/intro.mp3" autoplay="true" loop="true" id="music"></audio>');
        setTimeout(function(){
            $('#music')[0].play();
        },2000);
    };

    $('#volume').on('click', function(){
        if( !$(this).hasClass('is-muted') ){

            $(this).addClass('is-muted');
            $('#background, #music').prop('muted', true);

        } else if( $(this).hasClass('is-muted') ){

            $(this).removeClass('is-muted');
            $('#background, #music').prop('muted', false)

        }
    });

    $('.container').on('click', function(){
        $('#contact').css('zIndex', '1');
    });

    var iScrollPos = 0;

    $('#main').scroll(function(){
        var iCurScrollPos = $(this).scrollTop();
        if(iCurScrollPos > iScrollPos ){
            //do nothing
        } else{
            $('#contact').css('zIndex', '-10');
        }
    });

    //Scrollmagic

    var windowWidth = parseFloat($(window).outerWidth());
    var windowHeight = parseFloat($(window).outerHeight());
    var windowHeight2 = parseFloat($(window).outerHeight()) /3;
    var halfHeight = parseFloat($('body')[0].scrollHeight / 2);

    TweenMax.set('#contact', {left: '170%', x:'-50%', y:'-50%', scaleY:.003});
    TweenMax.set('.info', {opacity:0});

    var scrollMagicController = new ScrollMagic.Controller();

    var tween0 = TweenMax.to('#contact', 1, {left:'50%', x:'-50%', y:'-50%', ease:Power1.easeInOut});

    var scene0 = new ScrollMagic.Scene({
                    triggerElement: '#trigger',
                    duration: halfHeight,
                    offset: windowHeight2 /* offset the trigger 150px below #scene's top */
                })
                .setTween(tween0);

    var tween1 = TweenMax.to('#scroll', 1, {opacity:0, ease:Power1.easeInOut});

    var scene1 = new ScrollMagic.Scene({
                    triggerElement: '#trigger',
                    duration: halfHeight,
                    offset: windowHeight2 /* offset the trigger 150px below #scene's top */
                })
                .setTween(tween1);

    var tween2 = TweenMax.to('#contact', 1, {scaleY:1, x:'-50%', y:'-50%', ease:Power1.easeInOut});

    var scene2 = new ScrollMagic.Scene({
                    triggerElement: '#trigger',
                    duration: halfHeight,
                    offset: windowHeight2 + halfHeight /* offset the trigger 150px below #scene's top */
                })
                .setTween(tween2);

    var tween3 = TweenMax.to('.info', 1, {opacity:1, ease:Power1.easeInOut});

    var scene3 = new ScrollMagic.Scene({
                    triggerElement: '#trigger',
                    duration: 100,
                    offset: windowHeight2 + halfHeight + halfHeight /* offset the trigger 150px below #scene's top */
                })
                .setTween(tween3);

    scrollMagicController.addScene([
      scene0,
      scene1,
      scene2,
      scene3
    ]);

});
$(document).ready(function(){init();function init(){var tl=new TimelineMax(),$blockreveal=$('.home > #quote > .block-text');tl.set('.desktop',{className:'+=loaded'},'+=.5').staggerTo($blockreveal,.01,{className:'+=reveal'},0.3,'+=.55').set('.btn--start',{className:'+=reveal'},'+=.5');}
$('.btn--start').on('click',function(){$('#video').parents('.video-wrapper').addClass('fs');$('.--q').addClass('wipeoff');setTimeout(function(){$('.--q').addClass('wipe');$('.btn--start').addClass('hint');$('.bit-button').text('tickets');},2000);});$('.bit-events-container').on('click',function(e){e.preventDefault();window.open('https://www.eventbrite.com/e/neon-pink-party-tickets-37985643081?aff=eac2#tickets');});setTimeout(function(){$('.bit-show-upcoming').text('Upcoming Shows');$('.bit-button').text('Tickets');},500);});
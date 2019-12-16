jQuery(document).ready(function($) {
  var height = 100,
      perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
      EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
      time = parseInt((EstimatedTime/1000)%60)*100;

  // Loadbar Animation
  $(".loadbar").animate({
    height: height + "%"
  }, time);
          
  function animateValue(id, start, end, duration) {
    
      var range = end - start,
        current = start,
        increment = end > start? 1 : -1,
        stepTime = Math.abs(Math.floor(duration / range)),
        obj = $(id);
      
      var timer = setInterval(function() {
          current += increment;
          $(obj).text(current + "%");
        //obj.innerHTML = current;
          if (current == end) {
              clearInterval(timer);
          }
      }, stepTime);
  }

  // Fading Out Loadbar on Finised
  setTimeout(function(){
    $('#preloader-logo').addClass('page-loaded');
    setTimeout(function(){
      $('.desktop').show().addClass('page-loaded');
      $('#preloader').addClass('page-loaded');
    },500);
    
  }, time);
});
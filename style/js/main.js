/*-----------------------------------------------------------------------------------
/*
/* Main JS
/*
-----------------------------------------------------------------------------------*/  

(function($) {

	/*---------------------------------------------------- */
	/* 预加载
  ------------------------------------------------------ */ 
  	$(window).load(function() {

   	// will first fade out the loading animation 
  	$("#status").fadeOut("slow"); 

  	// will fade out the whole DIV that covers the website. 
  	$("#preloader").delay(500).fadeOut("slow").remove();     
    
  	$('.js .home .pro .thumbnail').addClass("animated fadeInUp show"); 
    // $('.js .home .pro .icon').addClass("animated shake"); 


  /*----------------------------------------------------*/
	/* Waypoints Animations
 ------------------------------------------------------ */  

	var intr = new Waypoint.Inview({
	  element: $('.js .intr'),
	  entered: function(direction) {
	    $('.js .intr img').addClass( 'animated pulse' );  
	  }
	});

	var news = new Waypoint.Inview({
	  element: $('.js .news'),
	  enter: function(direction) {
	    $('.js .news .lastNews').addClass( 'animated fadeInLeftBig show' );  
	    $('.js .news .newsList').addClass( 'animated fadeInRightBig show' );  
	  }
	});

	$('.title').each(function(index,element){
		var title = new Waypoint.Inview({
		  element: element,
		  enter: function(direction) {
		    $('.title').eq(index).addClass( 'animated fadeIn' );  
		  }
		});

	});


    
   

  }); 
})(jQuery)
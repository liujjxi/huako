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


		var pro = new Waypoint.Inview({
		  element: $('.js .pro'),
		  entered: function(direction) {
		  	if(direction=='down'){
		  		$('.proTooltip').addClass( 'animated fadeInUp show');
		  	}
		  	
		  }
		});

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

	/*---------------------------------------------------- */
	/* ajax 加载
  ------------------------------------------------------ */ 


  	//pro
		openInfo($('.pro .thumbnail,.proTooltip'),$('.proInfo'),'pro','.product',true)

		//intr
		openInfo($('.intr .btn'),$('.intrInfo'),'about','.about',false)
		
		//news
		openInfo($('.news .btn'),$('.newsInfo'),'news','.news',true)
		
		
		function closeInfo(btn){
			btn.on('click',function(){
				$(this).prev('.infoBox').fadeOut('slow').removeClass('animated fadeInUp show');
				$(this).remove();
				$('body').css('overflow','auto');
			});
		}
		function openInfo(btn,infoBox,box,el,isCopyTitle){
			btn.on('click',function(e){
				e.preventDefault();
				infoBox.addClass('animated fadeInUp show').after('<span class="closeBtn animated fadeInRight show"></span>');
    		if(infoBox.children().length==0){
					getAjax(infoBox,'/'+box+'/index.html',el,isCopyTitle);
				}
				closeInfo(infoBox.next('.closeBtn'));
				$('body').css('overflow','hidden');
			});
		}
    function getAjax(infoBox,url,el,isCopyTitle){
		    $.ajax( {
		      url: url, //这里是静态页的地址
		      type: "GET", //静态页用get方法，否则服务器会抛出405错误
		      error:function(){
		      	console.log('error')
		      },
		      success: function(data){
	      		console.log('ajax')
	          var result = $(data).find(el);
	          var title=infoBox.parent().find('.title').clone();
	          infoBox.addClass('pt30').html(result);
	          if(isCopyTitle){
	          	infoBox.prepend(title);
	          }

		      }

				});

	  	}
    

  }); 
})(jQuery)
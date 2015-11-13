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
 		if($('.js .home').length==1){
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
			    $('.js .news .lastNews').addClass( 'animated fadeInLeft show' );  
			    $('.js .news .newsList').addClass( 'animated fadeInRight show' );  
			  }
			});
			var contact = new Waypoint.Inview({
			  element: $('.js .contact'),
			  enter: function(direction) {
			    $('.js .contact .map').addClass( 'animated fadeInLeftBig show' );  
			    $('.js .contact .address').addClass( 'animated fadeInRightBig show' );  
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

 		}

	/*---------------------------------------------------- */
	/* ajax 加载
  ------------------------------------------------------ */ 


  	//pro
		openInfo($('.js .pro .thumbnail,.proTooltip'),$('.proInfo'),'pros','.product',true)

		//intr
		openInfo($('.js .intr .btn'),$('.intrInfo'),'about','.about',false)
		
		//news
		openInfo($('.js .news .btn'),$('.newsInfo'),'news','.news',true)
		
		
		function closeInfo(btn){
			btn.on('click',function(){
				var _this=$(this);
				var infoBox=_this.prev('.infoBox');
				if(infoBox.hasClass('error')){
					infoBox.html('');
				}
				infoBox.removeClass('fadeInLeftBig midCenter').addClass('fadeOut');
				_this.removeClass('fadeInRight').addClass('fadeOutRight');
				setTimeout(function(){
					_this.remove();
					infoBox.addClass('hide').removeClass('show');
				},500)
				$('body').css('overflow','auto');
			});
		}
		function openInfo(btn,infoBox,box,el,isCopyTitle){
			btn.on('click',function(e){
				e.preventDefault();
				if(infoBox.hasClass('error')){
					infoBox.addClass('midCenter');
				}
				infoBox.removeClass('hide fadeOut').addClass('animated fadeInLeftBig show').after('<span class="closeBtn animated fadeInRight show"></span>');
    		if(infoBox.children().length==0){
					getAjax(infoBox,box+'/index.html',el,isCopyTitle);
				}
				closeInfo(infoBox.next('.closeBtn'));
				$('body').css('overflow','hidden');
			});
		}
    function getAjax(infoBox,url,el,isCopyTitle){
	    $.ajax( {
	      url: url, //这里是静态页的地址
	      type: "GET", //静态页用get方法，否则服务器会抛出405错误
	      beforeSend:function(XMLHttpRequest){
          infoBox.html("<img src='style/images/preloader.gif' width='64' height='64' />").addClass('midCenter');
       	},
	      error:function(){
	      	infoBox.addClass('error')
	      },
	      success: function(data){
    		  $("#loading").empty();
          var result = $(data).find(el);
          var title=infoBox.parent().find('.title').clone();
          infoBox.addClass('pt30').html(result).removeClass('midCenter');
          if(isCopyTitle){
          	infoBox.prepend(title);
          }

	      }

			});

  	}
	/*---------------------------------------------------- */
	/* baidu map
  ------------------------------------------------------ */ 
		//创建和初始化地图函数：
		function initMap() {
		    createMap(); //创建地图
		    setMapEvent(); //设置地图事件
		    addMapControl(); //向地图添加控件
		    addMarker(); //向地图中添加marker
		}

		//创建地图函数：
		function createMap() {
		    var map = new BMap.Map("dituContent"); //在百度地图容器中创建一个地图
		    var point = new BMap.Point(112.888753, 28.236388); //定义一个中心点坐标
		    map.centerAndZoom(point, 18); //设定地图的中心点和坐标并将地图显示在地图容器中
		    window.map = map; //将map变量存储在全局
		}

		//地图事件设置函数：
		function setMapEvent() {
		    map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
		    map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
		    map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
		    map.enableKeyboard(); //启用键盘上下左右键移动地图
		}

		//地图控件添加函数：
		function addMapControl() {
		    //向地图中添加缩放控件
		    var ctrl_nav = new BMap.NavigationControl({
		        anchor: BMAP_ANCHOR_TOP_LEFT,
		        type: BMAP_NAVIGATION_CONTROL_LARGE
		    });
		    map.addControl(ctrl_nav);
		    //向地图中添加缩略图控件
		    var ctrl_ove = new BMap.OverviewMapControl({
		        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
		        isOpen: 1
		    });
		    map.addControl(ctrl_ove);
		    //向地图中添加比例尺控件
		    var ctrl_sca = new BMap.ScaleControl({
		        anchor: BMAP_ANCHOR_BOTTOM_LEFT
		    });
		    map.addControl(ctrl_sca);
		}

		//标注点数组
		var markerArr = [{
		    title: "湖南滑客网络科技有限公司",
		    content: "湖南省长沙市高新区尖山路39号<br>中电软件园总部大楼607—610",
		    point: "112.888753|28.236388",
		    isOpen: 1,
		    icon: {
		        w: 21,
		        h: 21,
		        l: 0,
		        t: 0,
		        x: 6,
		        lb: 5
		    }
		}];
		//创建marker
		function addMarker() {
		    for (var i = 0; i < markerArr.length; i++) {
		        var json = markerArr[i];
		        var p0 = json.point.split("|")[0];
		        var p1 = json.point.split("|")[1];
		        var point = new BMap.Point(p0, p1);
		        var iconImg = createIcon(json.icon);
		        var marker = new BMap.Marker(point, {
		            icon: iconImg
		        });
		        var iw = createInfoWindow(i);
		        var label = new BMap.Label(json.title, {
		            "offset": new BMap.Size(json.icon.lb - json.icon.x + 10, -20)
		        });
		        marker.setLabel(label);
		        map.addOverlay(marker);
		        label.setStyle({
		            borderColor: "#808080",
		            color: "#333",
		            cursor: "pointer"
		        });

		        (function() {
		            var index = i;
		            var _iw = createInfoWindow(i);
		            var _marker = marker;
		            _marker.addEventListener("click", function() {
		                this.openInfoWindow(_iw);
		            });
		            _iw.addEventListener("open", function() {
		                _marker.getLabel().hide();
		            })
		            _iw.addEventListener("close", function() {
		                _marker.getLabel().show();
		            })
		            label.addEventListener("click", function() {
		                _marker.openInfoWindow(_iw);
		            })
		            if (!!json.isOpen) {
		                label.hide();
		                _marker.openInfoWindow(_iw);
		            }
		        })()
		    }
		}
		//创建InfoWindow
		function createInfoWindow(i) {
		    var json = markerArr[i];
		    var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>" + json.content + "</div>");
		    return iw;
		}
		//创建一个Icon
		function createIcon(json) {
		    var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w, json.h), {
		        imageOffset: new BMap.Size(-json.l, -json.t),
		        infoWindowOffset: new BMap.Size(json.lb + 5, 1),
		        offset: new BMap.Size(json.x, json.h)
		    })
		    return icon;
		}

		initMap(); //创建和初始化地图
    

  }); 
})(jQuery)
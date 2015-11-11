var header = (function() {

	var docElem = document.documentElement,
		header = document.querySelector( '.site-header' ),
		didScroll = false,
		changeHeaderOn = 10;

	function init() {
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				setTimeout( scrollPage, 0 );
			}
		}, false );
	}

	function scrollPage() {
		var sy = scrollY();
		if ( sy >= changeHeaderOn ) {
			classie.add( header, 'affix' );
		}
		else {
			classie.remove( header, 'affix' );
		}
		didScroll = false;
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	init();

})();
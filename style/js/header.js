var header = (function() {

	var docElem = document.documentElement,
		header = document.querySelector( '.site-header' ),
		logo=$('.logo')
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
			logo.attr('src',logo.attr('min-src'));
		}
		else {
			classie.remove( header, 'affix' );
			logo.attr('src',logo.attr('logo-src'));
		}
		didScroll = false;
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	init();

})();
/*
	Twenty by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		wide: '(max-width: 1680px)',
		normal: '(max-width: 1280px)',
		narrow: '(max-width: 980px)',
		narrower: '(max-width: 840px)',
		mobile: '(max-width: 736px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$banner = $('#banner');
			$logo = $('#logo');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on narrower.
			skel.on('+narrower -narrower', function() {
				$.prioritize(
					'.important\\28 narrower\\29',
					skel.breakpoint('narrower').active
				);
			});

		// Scrolly links.
			$('.scrolly').scrolly({
				speed: 1000,
				offset: -10
			});

		// Dropdowns.
			$('#nav > ul').dropotron({
				mode: 'fade',
				noOpenerFade: true,
				expandMode: (skel.vars.mobile ? 'click' : 'hover')
			});

		// Off-Canvas Navigation.

			// Navigation Button.
				$(
					'<div id="navButton">' +
						'<a href="#navPanel" class="toggle"></a>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#navButton, #navPanel, #page-wrapper')
						.css('transition', 'none');

		// Header.
		// If the header is using "alt" styling and #banner is present, use scrollwatch
		// to revert it back to normal styling once the user scrolls past the banner.
		// Note: This is disabled on mobile devices.
			if (!skel.vars.mobile
			&&	$header.hasClass('alt')
			&&	$banner.length > 0) {

				$window.on('load', function() {

					$banner.scrollwatch({
						delay:		0,
						range:		1,
						anchor:		'top',
						on:			function() { 
							$header.removeClass('alt reveal'); 
							// $logo.addClass('hidden'); 
						},
						off:		function() { 
							// $header.addClass('hidden'); 
							// $logo.removeClass('hidden'); 
						},
					});

				});

			}

			// Homepage video
			$(document).ready(function() {
			    scaleVideoContainer();
			    initBannerVideoSize('.video-container .poster img');
			    initBannerVideoSize('.video-container .filter');
			    initBannerVideoSize('.video-container video');

			    $(window).on('resize', function() {
			        scaleVideoContainer();
			        scaleBannerVideoSize('.video-container .poster img');
			        scaleBannerVideoSize('.video-container .filter');
			        scaleBannerVideoSize('.video-container video');
			    });

			});

			function scaleVideoContainer() {
			    var height = $(window).height() + 5;
			    var unitHeight = parseInt(height) + 'px';
			    $('.homepage-hero-module').css('height',unitHeight);
				$('.filter').css('height',unitHeight);
			}

			function initBannerVideoSize(element){
			    $(element).each(function(){
			        $(this).data('height', $(this).height());
			        $(this).data('width', $(this).width());
			    });
			    scaleBannerVideoSize(element);

			}

			function scaleBannerVideoSize(element){

			    var windowWidth = $(window).width(),
			    windowHeight = $(window).height() + 5,
			    videoWidth,
			    videoHeight;

			    // console.log(windowHeight);

			    $(element).each(function(){
			        var videoAspectRatio = $(this).data('height')/$(this).data('width');

			        $(this).width(windowWidth);

			        if(windowWidth < 1000){
			            videoHeight = windowHeight;
			            videoWidth = videoHeight / videoAspectRatio;
			            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

			            $(this).width(videoWidth).height(videoHeight);
			        }

			        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

			    });
			}

			// Hide/Show Information
			// Toggle for the learn more sections on the index page
			$(document).ready(function(){
				var scrollTime = 500;
				$("#products").click(function(){
					$("#integrationsInfo").hide();
					$("#discoveryInfo").hide();
					var isVisible = $("#productInfo").is(":visible");
					$("#productInfo").slideToggle();
					if (!isVisible) {
						$('html, body').animate({scrollTop: $("#productInfo").offset().top }, scrollTime);
					}
				});
				$("#integrations").click(function(){
					$("#productInfo").hide();
					$("#discoveryInfo").hide();
					var isVisible = $("#integrationsInfo").is(":visible");
					$("#integrationsInfo").slideToggle();
					if (!isVisible) {
						$('html, body').animate({scrollTop: $("#integrationsInfo").offset().top }, scrollTime);
					}
				});
				$("#discovery").click(function(){
					$("#productInfo").hide();
					$("#integrationsInfo").hide();
					var isVisible = $("#discoveryInfo").is(":visible");
					$("#discoveryInfo").slideToggle();
					if (!isVisible) {
						$('html, body').animate({scrollTop: $("#discoveryInfo").offset().top }, scrollTime);
					}
				});
			})
	});

})(jQuery);

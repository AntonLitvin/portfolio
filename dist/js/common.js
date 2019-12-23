$(window).on('load', function() { 
	$('.loader').delay(400).fadeOut(1000); 
});


$(function() {

// classes for animation
$('.subject-name').addClass('wow fadeInDown');
$('.hero-text p').addClass('wow fadeInUp');
$('.section-header').addClass('wow fadeInUp');

$('.my-photo-wrapper').addClass('wow flipInY');
$('.about-me-left').addClass('wow fadeInLeft');
$('.about-me-right').addClass('wow fadeInRight');
$('.work-item').addClass('wow fadeInLeft');
$('.study-item').addClass('wow fadeInRight');


// Animation

new WOW({
	offset: 50,
	mobile: false,
}).init();



// fix hover in portfolio menu

$('.portfolio-item').on('click', function(){
	$('.portfolio-item-descr').removeAttr('style');
	$(this).find('.portfolio-item-descr').css({'opacity':'1', 'transform':'scale(1)'});
});

$('.portfolio-item-descr a').on('click', function(e){
	e.stopPropagation();
	$(this).parent('.portfolio-item-descr').css({'opacity':'0', 'transform':'scale(0.7)'});
});

$('.portfolio-item').on('mouseover', function(){
	$('.portfolio-item-descr').removeAttr('style');
});


// Sandwich button and menu

$('.menu-toggle').on('click', function() {
	$('.sandwich').toggleClass('active');
	$('.hidden-menu').toggleClass('active');
});

function menuDelay(selector, startDelay) {
	var delay = startDelay;
	var items = $(selector);
	items.each(function(){
		$(this).css('transition-delay', delay + 'ms');
		delay += 150;
	});
}

menuDelay('.hidden-menu-list li', 100);


// Scroll to block

$('.hidden-menu a, .arrow-down').on('click', function () {

	var elementClick = $(this).attr("href");
	var destination = $(elementClick).offset().top;

	$('html, body').animate({ scrollTop: destination }, 800);
	$('.sandwich').removeClass('active');
	$('.hidden-menu').removeClass('active');
	return false; 
});


// To top button

$('.to-top-btn').on('click', function() {
	$('body, html').animate({ scrollTop:0 },800);
	if ($('.hidden-menu').is(':visible')) {
		$('.hidden-menu').removeClass('active');
		$('.sandwich').removeClass('active');
	}
	return false;
});

$(window).scroll(function() {
	if($(this).scrollTop() > 150) {
		$('.to-top-btn').addClass('active');
	} else {
		$('.to-top-btn').removeClass('active');
	}
});


// Isotope

 $('.portfolio-wrap').imagesLoaded (function() {
	var $grid = $('.portfolio-wrap');

	$grid.isotope({
		//sortBy : 'random',
		itemSelector: '.portfolio-item',
		layoutMode: 'fitRows',
		percentPosition: true
	});

	$('.filter-buttons').on( 'click', 'button', function() {
		var filterValue = $(this).attr('data-filter');
		$grid.isotope({ filter: filterValue });
	});

	$('.filter-buttons').each( function( i, buttonGroup ) {
		var $buttonGroup = $(buttonGroup);
		$buttonGroup.on( 'click', 'button', function() {
			$buttonGroup.find('.is-checked').removeClass('is-checked');
			$(this).addClass('is-checked');
		});
	});
});


// Popup

$('.js-popup').magnificPopup({
	type: 'image',
	closeOnContentClick: true,
	zoom: {
		enabled: true,
	}
});


});
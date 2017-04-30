$(window).load(function() { 
	$('.loader-inner').fadeOut(); 
	$('.loader').delay(400).fadeOut('slow'); 

	$('.hidden-menu a').animated('fadeInUp');
	$('.subject-name').animated('fadeInDown');
	$('.header-name p').animated('fadeInUp');
	$('.section-header').animated('fadeInUp');
	$('.services-item:nth-child(3),.services-item:nth-child(4)').animated('fadeInRight');
	$('.my-photo-wrapper').animated('flipInY');
	$('.about-me-left').animated('fadeInLeft');
	$('.about-me-right').animated('fadeInRight');
	$('.work-item').animated('fadeInLeft');
	$('.study-item').animated('fadeInRight');
});


$(function() {


/* fix hover in portfolio menu
===============================*/
$('.portfolio-item').on('click', function(){
	$('.portfolio-item-descr').removeAttr('style');
	$(this).find('.portfolio-item-descr').css({'opacity':'1', 'height':'100%'});
});

$('.portfolio-item-descr a').on('click', function(e){
	e.stopPropagation();
	$(this).parent('.portfolio-item-descr').css({'opacity':'0', 'height':'0'});
});

$('.portfolio-item').on('mouseover', function(){
	$('.portfolio-item-descr').removeAttr('style');
});


/* Resize header height
===============================*/
function heightDetect() {
	$('.main-header').css('height', $(window).height() + 2);
};

heightDetect();

$(window).resize(function() {
	heightDetect();
});


/* Sandwich button and menu
===============================*/
$('.menu-toggle').on('click', function() {
	$('.sandwich').toggleClass('active');
	$('.hidden-menu').fadeToggle();
	$('.top-menu a').toggleClass('fadeInUp animated');
})


/* Scroll to block
===============================*/
$('.hidden-menu a').on('click', function () {

	var topNavHeight = $('.navbar-custom').innerHeight();
	var elementClick = $(this).attr("href");
	var destination = $(elementClick).offset().top;

	$('html, body').animate({ scrollTop: destination + 5 }, 800);
	$('.sandwich').removeClass('active');
	$('.hidden-menu').fadeOut();
	return false; 
});


/* to-top button
===============================*/
$(window).scroll(function() {
	if($(this).scrollTop() > 100) {
		$('.to-top-btn').fadeIn();
	} else {
		$('.to-top-btn').fadeOut();
	}
});

$('.to-top-btn').on('click', function() {
	$('body, html').animate({ scrollTop:0 },800);
	if ($('.hidden-menu').is(':visible')) {
		$('.hidden-menu').fadeOut();
		$('.sandwich').removeClass('active');
	}
	return false;
});


/* MixItUp
===============================*/
$('.portfolio-wrap').mixItUp();


/* Set Active menu item
===============================*/
$('.portfolio-nav a').on('click', function(){
	$('.portfolio-nav a').removeClass('active');
	$(this).addClass('active');
	return false;
});


/* Popup
===============================*/
$('.js-popup').magnificPopup({type:'image'});



});
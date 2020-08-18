var quotes;
var leftArrow = document.querySelector('#prev-next');
var rightArrow = document.querySelector('#prev-quote');

document.addEventListener('DOMContentLoaded', function() {
	quotes = new Splide( '.splide', { 
		arrows: false, 
		pagination: false, 
		speed: 1000, 
		waitForTransition: false,
		type: 'loop'
	}).mount();

	quotes.on('mounted', function(){
		document.querySelector('.quote-nav .numbers .total-slides').textContent = document.querySelectorAll('.splide__slide').length;
	});

	quotes.on('move', function(){
		var current = quotes.index + 1;
		if(current <= 9) current = '0' + current.toString();
		document.querySelector('.quote-nav .numbers .number-left').textContent = current;
	});
});

if (leftArrow) {
	leftArrow.addEventListener('click', function() {
		quotes.go('+1');
	});
}
if (rightArrow) {
	rightArrow.addEventListener('click', function() {
		quotes.go('-1');
	});
}
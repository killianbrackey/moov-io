function scrollTo(element, to, duration) {
	var start = element.scrollTop,
		change = to - start,
		currentTime = 0,
		increment = 20;
		
	var animateScroll = function(){        
		currentTime += increment;
		var val = Math.easeInOutQuad(currentTime, start, change, duration);
		element.scrollTop = val;
		if(currentTime < duration) {
			setTimeout(animateScroll, increment);
		}
	};
	animateScroll();
}

//t = current time //b = start value //c = change in value //d = duration
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};


var scroll_elements = document.querySelectorAll('[data-scrollTo]');
for (var i = 0; i < scroll_elements.length; i++) {
	scroll_elements[i].onclick = function(event) {
		event.preventDefault();
		var to = document.querySelector('#' + scroll_elements[i].dataset.scrollto).offsetTop;
		scrollTo(document.documentElement, to, 100);
	}
}

if(document.querySelectorAll('#nav-icon').length) {
	document.querySelector('#nav-icon').addEventListener('click', function(event) {
		this.classList.contains('open') ? this.classList.remove('open') : this.classList.add('open');
		document.querySelector('body').classList.contains('body-fixed') ? document.querySelector('body').classList.remove('body-fixed') : document.querySelector('body').classList.add('body-fixed');
		document.querySelector('body').classList.contains('nav-open') ? document.querySelector('body').classList.remove('nav-open') : document.querySelector('body').classList.add('nav-open');
	});	
}


if (typeof Waypoint === "function") { 

	var top_view_elements = document.querySelectorAll('.top-in-view');
	for (var i = 0; i < top_view_elements.length; i++) {
		var topinviewWaypoint = new Waypoint({
			element: top_view_elements[i],
			handler: function(direction) {
				if(direction == 'down') {
					//add the class to start the animation
					this.element.classList.add('in-view');
					//then destroy this waypoint, we don't need it anymore
				} else {
					this.element.classList.remove('in-view');
				}
			},
			offset: '0%'
		});
	};

	var fadeup_elements = document.querySelectorAll('.fadeup');
	for (var i = 0; i < fadeup_elements.length; i++) {
		var fadeupWaypoint = new Waypoint({
			element: fadeup_elements[i],
			handler: function(direction) {
				if(direction == 'down') {
					//add the class to start the animation
					this.element.classList.add('in-view');
					//then destroy this waypoint, we don't need it anymore
				} else {
					this.element.classList.remove('in-view');
				}
			},
			offset: '80%'
		});
	};

	var fadein_elements = document.querySelectorAll('.fadein');
	for (var i = 0; i < fadein_elements.length; i++) {
		var fadeinWaypoint = new Waypoint({
			element: fadein_elements[i],
			handler: function(direction) {
				if(direction == 'down') {
					//add the class to start the animation
					this.element.classList.add('in-view');
					//then destroy this waypoint, we don't need it anymore
				} else {
					this.element.classList.remove('in-view');
				}
			},
			offset: '80%'
		});
	};

	var slideleft_elements = document.querySelectorAll('.slideleft');
	for (var i = 0; i < slideleft_elements.length; i++) {
		var slideleftWaypoint = new Waypoint({
			element: slideleft_elements[i],
			handler: function(direction) {
				if(direction == 'down') {
					//add the class to start the animation
					this.element.classList.add('in-view');
					//then destroy this waypoint, we don't need it anymore
				} else {
					this.element.classList.remove('in-view');
				}
			},
			offset: '80%'
		});
	};

	var appear_elements = document.querySelectorAll('.appear');
	for (var i = 0; i < appear_elements.length; i++) {
		var appearWaypoint = new Waypoint({
			element: appear_elements[i],
			handler: function(direction) {
				if(direction == 'down') {
					//add the class to start the animation
					this.element.classList.add('in-view');
					//then destroy this waypoint, we don't need it anymore
				} else {
					this.element.classList.remove('in-view');
				}
			},
			offset: '80%'
		});
	};

	var blur_elements = document.querySelectorAll('.blur');
	for (var i = 0; i < blur_elements.length; i++) {
		var blurWaypoint = new Waypoint({
			element: blur_elements[i],
			handler: function(direction) {
				this.element.classList.contains('blurred') ? this.element.classList.remove('blurred') : this.element.classList.add('blurred');
			},
			offset: function(){
				return this.element.height * -0.5;
			}
		});
	};
}

var previousTop = 0;
window.addEventListener('scroll', function(e) {
	var currentTop = window.scrollY;
	var number = currentTop / 30;
	if(currentTop >= 20) {

		if(document.querySelectorAll('nav').length) {
			if(currentTop < previousTop) {
				document.querySelector('nav').classList.add('show-nav');
			} else {
				document.querySelector('nav').classList.remove('show-nav');
			}

			if(currentTop === 0) {
				document.querySelector('nav').classList.add('transparent');
			} else {
				document.querySelector('nav').classList.remove('transparent');
			}
		}
		
		var bgimg_elements = document.querySelectorAll('.bg-image');
		for (var i = 0; i < bgimg_elements.length; i++) {
			if ( bgimg_elements[i].offsetTop + bgimg_elements[i].offsetHeight > window.scrollY ) {
				bgimg_elements[i].style.transform = 'translateX(' + number * 8 + 'px)';
			}
		};

		var mask_elements = document.querySelectorAll('.mask');
		for (var i = 0; i < mask_elements.length; i++) {
			if ( mask_elements[i].offsetTop + mask_elements[i].offsetHeight > window.scrollY ) {
				mask_elements[i].style.transform = 'translateX(' + number * 5 + 'px)';
			}
		};

	}
	previousTop = currentTop;
});


if(document.querySelectorAll('.cyclevertical').length) {
	var timer = setInterval(function () {
		rotateWords();
	}, 2000);	
}


function rotateWords() {
	var ele, eleIndex, totalWordsToRotate;
	totalWordsToRotate = document.querySelectorAll('.cyclevertical span').length;
	ele = document.querySelector('.cyclevertical span.show');
	eleIndex = Array.prototype.indexOf.call(document.querySelector('.cyclevertical').children, ele) + 1;

	ele.classList.remove('show');
	if (eleIndex == totalWordsToRotate) {
		eleIndex = 1;
		document.querySelector('.cyclevertical span:nth-child(' + eleIndex + ')').classList.add('show');
	} else {
		document.querySelector('.cyclevertical span:nth-child(' + (eleIndex + 1) + ')').classList.add('show');
	}
}

function objectFit(image) {
    if ('objectFit' in document.documentElement.style === false && image.currentStyle['object-fit']) {
        image.style.background = 'url("' + image.src + '") no-repeat 50%/' + image.currentStyle['object-fit'];
        image.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + image.width + "' height='" + image.height + "'%3E%3C/svg%3E";
    }
}


var elem = document.getElementsByClassName("cover");
objectFit(elem);

function formPost(method, url, data, success, error) {
	var xhr = new XMLHttpRequest();
	xhr.open(method, url);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState !== XMLHttpRequest.DONE) return;
		if (xhr.status === 200) {
			success(xhr.response, xhr.responseType);
		} else {
			error(xhr.status, xhr.response, xhr.responseType);
		}
	};
	xhr.send(data);
}

var signupForm = document.getElementById("signup-form");
var signupStatus = document.getElementById("signup-status");

function signupSuccess() {
	signupForm.reset();
	signupForm.style.display = "none ";
	signupStatus.innerHTML = "<p>Thanks for joining the waitlist. We'll be in touch soon.</p>";
}

function signupError() {
	signupForm.innerHTML = "Oops! There was a problem.";
}

signupForm.addEventListener("submit", function(event) {
	event.preventDefault();
	var data = new FormData(signupForm);
	formPost(signupForm.method, signupForm.action, data, signupSuccess, signupError);
});

// Waitlist dialog
var dialog = document.querySelector('#waitlist-dialog');
var dialogLaunchers = document.querySelectorAll('.opens-waitlist-dialog');
var dialogCloser = document.querySelector('.closes-dialog');
for (var i = 0; i < dialogLaunchers.length; i++) {
	dialogLaunchers[i].addEventListener('click', function(event) {
		event.preventDefault();
		dialog.classList.add('in');
		dialog.setAttribute('aria-hidden', false);
	})
}
dialogCloser.addEventListener('click', function(event) {
	event.preventDefault();
	dialog.classList.remove('in');
	dialog.setAttribute('aria-hidden', true);
	signupForm.style.display = "";
	signupStatus.innerHTML = "";
});

// Investors dialog
var investorsDialog = document.querySelector('#investors-dialog');
var investorsDialogLaunchers = document.querySelectorAll('.opens-investors-dialog');
var investorDialogCloser = document.querySelector('.closes-investor-dialog');
for (var i = 0; i < investorsDialogLaunchers.length; i++) {
	investorsDialogLaunchers[i].addEventListener('click', function(event) {
		event.preventDefault();
		investorsDialog.classList.add('in');
		investorsDialog.setAttribute('aria-hidden', false);
		document.body.style.overflowY = 'hidden';
	})
}
investorDialogCloser.addEventListener('click', function(event) {
	event.preventDefault();
	document.body.style.overflowY = '';
	investorsDialog.classList.remove('in');
	investorsDialog.setAttribute('aria-hidden', true);
});


var quotes;

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
		var logos = document.querySelectorAll('.investor-logos .image');
		for (var i = 0; i < logos.length; i++) {
			logos[i].classList.remove('active');
		};
		document.querySelectorAll('.investor-logos .image')[quotes.index].classList.add('active')
	});
});

document.querySelector('#prev-next').addEventListener('click', function() {
	quotes.go('+1');
});

document.querySelector('#prev-quote').addEventListener('click', function() {
	quotes.go('-1');
});

var investor_logos = document.querySelectorAll('.investor-logos .image');
for (var i = 0; i < investor_logos.length; i++) {
	investor_logos[i].addEventListener('click', function(){
		var child = this;
		var parent = child.parentNode;
		var index = Array.prototype.indexOf.call(parent.children, child);
		quotes.go(index);
	});
};
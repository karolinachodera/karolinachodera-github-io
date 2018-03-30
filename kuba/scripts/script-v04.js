function scrollSlow(e) {
	e.preventDefault();
	var id = e.target.getAttribute("href");
	var position = (document.querySelector(id).offsetTop - 50) > 0? (document.querySelector(id).offsetTop - 50) : (document.querySelector(id).offsetTop);
	if (position > document.body.offsetHeight - window.innerHeight) {
		position = document.body.offsetHeight - window.innerHeight;
	}
		function scroll() {
			if(window.scrollY) {
				if( window.scrollY  <  (position - 20)) {
					window.scrollBy(0, 30);
					if(window.innerWidth <= 680) {
						setTimeout(scroll, 1)
					} else {
						setTimeout(scroll, 3);
					}
				} else if ( window.scrollY >  (position + 20)) {
					window.scrollBy(0, -30);
					if(window.innerWidth <= 680) {
						setTimeout(scroll, 1)
					} else {
						setTimeout(scroll, 3);
					}
				} else {
					window.scrollTo(window.scrollX, position);
					clearInterval(scroll);
				} 
			} else {
				if( document.documentElement.scrollTop  <=  position - 20 ) {
					window.scrollBy(0, 20);
					setTimeout(scroll, 5);
				} else if ( document.documentElement.scrollTop >=  position + 20 ) {
					window.scrollBy(0, -20);
					setTimeout(scroll, 5);
				} else {
					window.scrollTo(0, position);
					clearInterval(scroll);
			}
			}
		}
		scroll();
}

(function buttonVisible() {
	var button = document.querySelector(".up");
	var isVisible = false;
	function buttonVisible() {
		if(!isVisible && window.scrollY >= 100 || document.documentElement.scrollTop >= 100) {
			button.classList.add("visible");
			isVisible = true;
		} else {
			button.classList.remove("visible");
			isVisible = false;
		}
	}
	window.addEventListener("scroll", buttonVisible, false);
	button.addEventListener("click", scrollSlow, false);
})();

(function navScroll() {
	var mainNavElems = [].slice.call(document.querySelectorAll(".mainNav li a"));
	for(var i = 0; i < mainNavElems.length; i++) {
		mainNavElems[i].addEventListener("click", scrollSlow, false);
		mainNavElems[i].addEventListener("click", responsiveNav, false);
	};
})();

(function descriptionVisible() {
	var descriptions = [].slice.call(document.querySelectorAll(".relative .mousedsc"));
	function visible(e) {
			e.target.classList.add("visible");
	};
	function hidden(e) {
			e.target.classList.remove("visible");
	};
	for (var i = 0; i < descriptions.length; i++) {
		descriptions[i].addEventListener("mouseenter", visible, false);
		descriptions[i].addEventListener("mouseleave", hidden, false);
	};
})();
(function highlightNavigation () {
	var lastI = 100;
	var sections = document.querySelectorAll("section");
	function selectElement (i) {
		lastI = i;
		var id = "[href='#" + sections[i].getAttribute("id") + "']";
		var elseId = ".mainNav a:not([href='#" + sections[i].getAttribute("id") + "']).current";
		var elseNavElement = document.querySelector(elseId);
		if(elseNavElement) {
			elseNavElement.classList.remove("current");
		};
		document.querySelector(id).classList.add("current");
		
	}

	function highlightNav() {
		for (var i = 0; i < sections.length; i++) {
			if( i < sections.length - 1 && window.scrollY >= sections[i].offsetTop - 300 && window.scrollY < sections[i+1].offsetTop - 300) {
				if(i !== lastI || i == 0) {
					selectElement(i);
				};
				break;
			} else if( i == sections.length - 1 && window.scrollY >= sections[i].offsetTop - 300) {
				if(i !== lastI) {
					selectElement(i);
				};
				break;
			} else if (i == 0 && window.scrollY < sections[i].offsetTop - 300 && document.querySelector(".current")){
				document.querySelector(".current").classList.remove("current");
			}
		};
	};

	window.addEventListener("scroll", highlightNav, false);
	
})();

(function setHeight() {
	var element = document.querySelectorAll("#team .column");
	for (var i = 0; i < element.length; i++) {
		element[i].parentNode.setAttribute("style", "height: " + element[i].offsetHeight + "px");
	}
})();

(function team() {
	var isDone = false;
	function animationTeam() {
		if(window.innerWidth >= 1080 && !isDone) {
			if(window.scrollY >= document.querySelector("#team").offsetTop - window.innerHeight) {
				document.querySelector(".column.left").classList.add("animationLeft");
				document.querySelector(".column.right").classList.add("animationRight");
				isDone = true;
			};
		};
	};

	window.addEventListener("scroll", animationTeam, false);
})();

function responsiveNav() {
	var mainNavLi = [].slice.call(document.querySelectorAll(".mainNav li:not(:last-child)"));
	for (var i = 0; i < mainNavLi.length; i++) {
		mainNavLi[i].classList.toggle("display");
	};
};
document.querySelector(".mainNav li:last-child").addEventListener("click", responsiveNav, false);




(function slider () {
	var sliderFirstSlide = document.querySelector(".slider .slide");
	var slides = [].slice.call(document.querySelectorAll(".slider .slide"));
	var sliderSection = document.getElementById("slider");
	var sliderBox = document.querySelector(".carousel");
	var arrows = [].slice.call(sliderSection.querySelectorAll(".arrow"));
	var indicators = [].slice.call(sliderSection.querySelectorAll(".indicators li"));
	
		function setHeight(sliderBox) {
			sliderBox.setAttribute("style", "height: " + sliderBox.querySelector("img").offsetHeight + "px");
		};

		function slider(slides) {
			var position = 100;

			function setCurrentIndicator(index) {
				if(sliderSection.querySelector(".current")){
					sliderSection.querySelector(".current").classList.remove("current");
					indicators[index].classList.add("current");
				}
			};

			function carousel() {
				var positionX = "transform: translateX(-" + position + "%)";
				for (var i = 0; i < slides.length; i++) {
					slides[i].setAttribute("style", positionX);
				}
				var index = position / 100;
				if ( index <= slides.length - 1) {
					setCurrentIndicator(index);
				}
				position += 100;
				if( position === (slides.length + 1) * 100) {
					for (var i = 0; i < slides.length; i++) {
						slides[i].removeAttribute("style");
					}
					setCurrentIndicator(0);
					position = 100;
				}
			};
			var interval = setInterval(carousel, 5000);
			
			function clickToSlide(indicator) {
				clearInterval(interval);
				var index = indicators.indexOf(indicator.target);
				position = index * 100;
				carousel();
				interval = setInterval(carousel, 5000);
			};
			
			function arrowsClick(e) {
				clearInterval(interval);
				var left = this.classList.contains("arrow-left");
				if (left) {
					position = position - 200;
					if (position < 0) {
						position = (slides.length - 1) * 100;
					}
					carousel();
					interval = setInterval(carousel, 5000);
				} else {
					carousel();
					interval = setInterval(carousel, 5000);
				}
			};
			
			for (var i = 0; i < slides.length; i++) {
				slides[i].addEventListener("mouseenter", function() {
					clearInterval(interval);
				}, false);
				slides[i].addEventListener("mouseleave", function() {
					interval = setInterval(carousel, 5000);
				}, false);
			}
			
			for (var i = 0; i < indicators.length; i++) {
				indicators[i].addEventListener("click", clickToSlide, false);
			}
		
			for (var i = 0; i < arrows.length; i++) {
				arrows[i].addEventListener("click", arrowsClick, false);
			}
		}
		slider(slides);
	})();
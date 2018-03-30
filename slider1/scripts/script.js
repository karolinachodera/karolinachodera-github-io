function slider(image, num, list) {
	var actualSrc = image.getAttribute("src");
	var index = actualSrc.indexOf(1);
	var firstPart = actualSrc.slice(0, index);
	var secondPart = actualSrc.slice(index + 1);
	var counter = 1;
	var op = 50;
	var lis;
		function opacity() {
			if(op <= 95) {
				image.setAttribute("style", ("opacity: " + Number("0." + op)));
				op += 5;
				setTimeout(opacity, 30);
			} else {
				image.setAttribute("style", ("opacity: 1" ));
				op = 50;
			}
		};
		
		(function initIndicator() {
			for (var i = 1; i <= num; i++) {
				list.appendChild(document.createElement("li"));
				
				if ( i === 1) {
					list.querySelector("li:nth-child(1)").classList.add("current");
				}
			}
			lis = [].slice.call(list.querySelectorAll("li"));
		})();
		
		function indicatorSwitch() {
			for(var i = 1; i <= num; i++) {
				if(i === counter) {
					lis[i - 1].classList.add("current");
				} else {
					lis[i - 1].classList.remove("current");
				}
			}
		};
		
		function changeNumber() {
			if(counter < num) {
			counter++;
			var newSrc = firstPart + counter + secondPart;
			image.setAttribute("src", newSrc);
			indicatorSwitch();
			opacity();
			} else if (counter === num) {
				counter = 1;
				var newSrc = firstPart + counter + secondPart;
				image.setAttribute("src", newSrc);
				indicatorSwitch();
				opacity();
			}
		};
		var interval = setInterval(changeNumber, 5000);
		function imageLink(e) {
			var index;
			var children = [].slice.call(e.target.parentNode.children);
			for (var i = 0; i < children.length; i++) {
				if (e.target === children[i]) {
					index = i;
				}
			}
			counter = index;
			clearInterval(interval);
			changeNumber();
			interval = setInterval(changeNumber, 5000);
		};
		
		for(var i = 0; i < num; i++) {
			lis[i].addEventListener("click", imageLink, false);
		};
}


slider(document.querySelector("header img"), 4, document.querySelector("header .switch"));

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


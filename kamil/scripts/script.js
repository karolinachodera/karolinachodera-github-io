function initMap() {
	var uluru = {lat: 53.030696, lng: 18.6573606};
	var map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 12,
	  center: uluru
	});
	var marker = new google.maps.Marker({
	  position: uluru,
	  map: map
	});
}

(function buttonUp() {
	var button = document.querySelector(".up");
	
	function buttonVisibility() {
		if(window.scrollY >= 100 || document.documentElement.scrollTop >= 100) {
			button.classList.remove("hidden");
		} else {
			button.classList.add("hidden")
		}
	}
	
	function scrollUp() {
		if(window.scrollY >= 100 || document.documentElement.scrollTop >= 100) {
			window.scrollBy(0, -30);
			window.setTimeout(scrollUp, 5);
		}
	}
	
	window.addEventListener("scroll", buttonVisibility, false);
	button.addEventListener("click", scrollUp, false);
})();

(function navFullColor() {
	var nav = document.querySelector("nav");
	
	function fullColor() {
		if(window.scrollY >= 300 || document.documentElement.scrollTop >= 300) {
			nav.classList.add("fullcolor");
		} else {
			nav.classList.remove("fullcolor");
		}
	}
	
	window.addEventListener("scroll", fullColor, false);
})();


(function navRwd() {
	var navUl = document.querySelector("nav ul");
	
	function navSwitch() {
		navUl.classList.toggle("responsive");
	}
	
	var navHamburger = document.querySelector(".icon");
	
	navHamburger.addEventListener("click", navSwitch, false);
})();


(function navigationLinks() {
	var navLinks = [].slice.call(document.querySelectorAll("nav ul li a"));
	var navUl = document.querySelector("nav ul");
	function navLink(e) {
		e.preventDefault();
		var id = e.target.hash;
		var sectionHeaderPosition = document.querySelector(id).offsetTop - 100;
		window.scrollTo(0, sectionHeaderPosition);
		console.log("elo");
		navUl.classList.remove("responsive");
	}

	for(var i = 0; i < navLinks.length; i++) {
		navLinks[i].addEventListener("click", navLink, false);
	}
	
})();


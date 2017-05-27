//map
function initMap() {
	var uluru = {lat: 54.3976292, lng: 18.6080133};
	var map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 8,
	  center: uluru
	});
	var marker = new google.maps.Marker({
	  position: uluru,
	  map: map
	});
}
	  
//adding button to scroll to top  

function animateScroll() {
	if(window.innerWidth <=680) {
		if(window.scrollY > 0 || document.documentElement.scrollTop > 0) {
			window.scrollBy(0, -15);
			setTimeout(animateScroll, 2);
		}
	} else {
		if(window.scrollY > 0 || document.documentElement.scrollTop > 0) {
		window.scrollBy(0, -10);
		setTimeout(animateScroll, 5);
		}
	}
}

var buttonUp = document.querySelector(".up");

buttonUp.addEventListener("click", function(e) {
	e.stopPropagation();
	animateScroll();
	navList.removeAttribute("class");
}, false)

window.addEventListener("scroll", function() {
	if(window.scrollY >= 100 || document.documentElement.scrollTop >= 100) /*second part for IE */ {
		buttonUp.classList.remove("hidden");
	} else {
		buttonUp.classList.add("hidden");
	}
}, false)


//form validation
var form = document.querySelector("#contact-form");
var formFields = document.querySelectorAll("[data-error]");

function createTable(errors) {
	var errorList = document.querySelector("#table-errors");
	
	if(!errorList) {
	errorList = document.createElement("ul");
	errorList.setAttribute("id", "table-errors");
	formFields[0].parentNode.insertBefore(errorList, formFields[0]);
	}
	
	errorList.innerHTML = "";
	
	errors.forEach(function (error) {
		var li = document.createElement("li");
		li.textContent = error;
		errorList.appendChild(li);
	});
}

function validateTextLength(field) {
	return field.value.length >= 3;
}

function validateMail(field) {
	return field.value.indexOf("@") !== -1;
}

form.addEventListener("submit", function(e) {
	e.preventDefault();
	var errors = [];
	
	for(var i = 0; i < formFields.length; i++) {
		var field = formFields[i];
		var isValid;
			if(field.type === "text" || field.type === "textarea") {
				isValid = validateTextLength(field);
			} else if(field.type === "email") {
				isValid = validateMail(field);
			}
			if(isValid === false) {
				errors.push(field.dataset.error);
			}
	}
	if(errors.length > 0) {
		createTable(errors);
	} else if(document.querySelector("#table-errors")){
		form.removeChild(document.querySelector("#table-errors"));
		form.submit();
	} else {
		form.submit();
	}

	
}, false);

//mailto

var mailTo = document.querySelector("#mail a");
mailTo.addEventListener("mousedown", function () {
	this.href = this.href.replace("MALPA", "a@g");
	this.href = this.href.replace("KROPKA", ".");
	
}, false);

//fixed nav
var navBar = document.querySelector("nav");
function scrollNav() {
	var headerHeight = document.querySelector("header").offsetHeight;
	if(window.scrollY >= 0) {
		if(window.scrollY >= headerHeight) {
			navBar.setAttribute("class", "fixed-nav");
		} else {
			navBar.removeAttribute("class");
		}
	} else {
		if(document.documentElement.scrollTop >= headerHeight) {
			navBar.setAttribute("class", "fixed-nav");
		} else {
			navBar.removeAttribute("class");
		}
	}
}
window.addEventListener("scroll", scrollNav, false);

//responsive nav
var navList = document.querySelector("nav ul");
function responsiveNav() {
	if(navList.className === "") {
		navList.className = "responsive";
	} else if(navList.className === "responsive") {
		navList.removeAttribute("class");
	}
}

var navIcon = document.querySelector(".icon");
navIcon.addEventListener("click", responsiveNav, false);

//highlighting nav during scrolling
var headers = document.querySelectorAll(".linked");
var navHeight = document.querySelector("nav").offsetHeight;
var sectionStart = 100;
var scrollPosition = navHeight + sectionStart;

function sectionTopBorder(header) {
	if (window.scrollY >= 0) {
		if(window.scrollY >= header.offsetTop - scrollPosition) {
			return true;
		} else {
			return false;
		}
	} else {
		if(document.documentElement.scrollTop >= header.offsetTop - scrollPosition) {
			return true;
		} else {
			return false;
		}
	}
}

function sectionBottomBorder(nextHeader) {
	if (window.scrollY >= 0) {
		if(window.scrollY < nextHeader.offsetTop - scrollPosition) {
			return true;
		} else {
			return false;
		}
	} else {
		if(document.documentElement.scrollTop < nextHeader.offsetTop - scrollPosition) {
			return true;
		} else {
			return false;
		}
	}
}

function highlightingNav() {
	
	for(var i = 0; i < headers.length; i++) {
		var checkTopBorder = sectionTopBorder(headers[i]);
		
		if(i < headers.length - 1) {
			var checkBottomBorder = sectionBottomBorder(headers[i+1]);
		}
		
		if(i < headers.length - 1 && checkTopBorder && checkBottomBorder) {
				var id = headers[i].getAttribute("id");
				var selector = "[href='#" + id + "']";
				document.querySelector(selector).classList.add("active");
				
		} else if( i === headers.length - 1 && checkTopBorder) {
				var id = headers[i].getAttribute("id");
				var selector = "[href='#" + id + "']";
				document.querySelector(selector).classList.add("active");
				
		} else {
				var id = headers[i].getAttribute("id");
				var selector = "[href='#" + id + "']";
				document.querySelector(selector).classList.remove("active");
		}
	}
}

window.addEventListener("scroll", highlightingNav, false);


// slow jumping to sections
var navLinks = [].slice.call(document.querySelectorAll("nav ul li a"));

function headerPositionTop(position) {
	if(window.scrollY >= 0) {
		if(window.scrollY  <=  position - 10) {
			return true;
		}
		else {
			return false;
		}
	} else {
		if(document.documentElement.scrollTop  <=  position - 10) {
			return true;
		}
		else {
			return false;
		}
	}
}

function headerPositionBottom(position) {
	if(window.scrollY >= 0) {
		if(window.scrollY >=  position + 10) {
			return true;
		}
		else {
			return false;
		}
	} else {
		if(document.documentElement.scrollTop  >=  position + 10) {
			return true;
		}
		else {
			return false;
		}
	}
}

for(var i = 0; i < navLinks.length; i++) {
	navLinks[i].addEventListener("click", function (e) {
		e.preventDefault();
		navList.removeAttribute("class");
		var link = e.target.hash;
		var checkHeaderPositionTop;
		var checkHeaderPositionBottom;
		var linkTargetPosition ;
		(function scrolling() {
			linkTargetPosition = document.querySelector(link).offsetTop - sectionStart;
			checkHeaderPositionTop = headerPositionTop(linkTargetPosition);
			checkHeaderPositionBottom = headerPositionBottom(linkTargetPosition);
			if(checkHeaderPositionTop) {
				window.scrollBy(0, 10);
				setTimeout(scrolling, 3);
			} else if (checkHeaderPositionBottom) {
				window.scrollBy(0, -10);
				setTimeout(scrolling, 3);
			} else {
				window.scrollTo(0, linkTargetPosition );
				clearInterval(scrolling);
			}
		})();
	}, false);
};

//start website with #url 100px higher
function offsetAnchor() {
    if(location.hash.length !== 0) {
		if (window.scrollY >= 0) {
        window.scrollTo(window.scrollX, document.documentElement.scrollTop - sectionStart);
		} else {
			window.scrollTo(document.documentElement.scrollLeft, window.scrollY - sectionStart);
		}
    }
}

window.addEventListener("hashchange", offsetAnchor);
window.setTimeout(offsetAnchor, 1); 
	
//animated charts
var chartSection = document.getElementById("charts");
var charts = [].slice.call(document.querySelectorAll(".chart"));

window.addEventListener("scroll", function() {
	if(window.scrollY >= chartSection.offsetTop - 250 || document.documentElement.scrollTop >= chartSection.offsetTop - 250) {
		for(var i = 0; i < charts.length; i++) {
			switch(i) {
				case 0:
					charts[0].setAttribute("id", "chart1");
				case 1:
					charts[1].setAttribute("id", "chart2");
				case 2:
					charts[2].setAttribute("id", "chart3");
				case 3:
					charts[3].setAttribute("id", "chart4");
			}
		}
	}
}, false);
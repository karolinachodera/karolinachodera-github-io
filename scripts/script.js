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
	
	if(window.scrollY > 0 || document.documentElement.scrollTop > 0) {
		window.scrollBy(0, -10);
		setTimeout(animateScroll, 5);
	}
}

var button = document.querySelector(".up");

button.addEventListener("click", function(e) {
	e.stopPropagation();
	animateScroll();
	
}, false)

window.addEventListener("scroll", function(e) {
	
	if(window.scrollY >= 100 ) /*second part for IE */ {
		button.classList.remove("hidden");
	} else {
		button.classList.add("hidden");
	}
}, false)


//form validation
var form = document.querySelector("#contact-form");
var fields = document.querySelectorAll("[data-error]");
var buttonForm = document.querySelector("#button-form");


function createTable(errors) {
	var ul = document.querySelector("#table-errors");
	
	if(!ul) {
	ul = document.createElement("ul");
	ul.setAttribute("id", "table-errors");
	fields[0].parentNode.insertBefore(ul, fields[0]);
	}
	
	ul.innerHTML = "";
	
	errors.forEach(function (error) {
		var li = document.createElement("li");
		li.textContent = error;
		ul.appendChild(li);
	});
}

function atLeast(field) {
	return field.value.length >= 3;
}

function isMail(field) {
	return field.value.indexOf("@") !== -1;
}


form.addEventListener("submit", function(e) {
	e.preventDefault();
	var errors = [];
	
	for(var i = 0; i < fields.length; i++) {
		var field = fields[i];
		var isValid;
			if(field.type === "text" || field.type === "textarea") {
				isValid = atLeast(field);
			} else if(field.type === "email") {
				isValid = isMail(field);
			}
			if(isValid === false) {
				errors.push(field.dataset.error);
			}
	}
	if(errors.length > 0) {
		createTable(errors);
	} else {
		fields[0].parentNode.removeChild(document.querySelector("#table-errors"));
	}
console.log(errors);
	
}, false);

//mailto

var mailto = document.querySelector("#mail a");
mailto.addEventListener("mousedown", function () {
	this.href = this.href.replace("MALPA", "a@g");
	this.href = this.href.replace("KROPKA", ".");
	
}, false);

//fixed nav
var nav = document.querySelector("nav");
function scrollNav() {

var hHeight = document.querySelector("header").offsetHeight;
var scroll = window.scrollY? window.scrollY : document.documentElement.scrollTop;
if(scroll >= hHeight) {
	nav.setAttribute("class", "fixed-nav");
} else {
	nav.removeAttribute("class");
}
}
window.addEventListener("scroll", scrollNav, false);

//responsive nav
var ul = document.querySelector("nav ul");
function responsiveNav() {
	
	
	if(ul.className === "") {
		ul.className = "responsive";
	} else if(ul.className === "responsive") {
		ul.removeAttribute("class");
	}
}

var icon = document.querySelector(".icon");
icon.addEventListener("click", responsiveNav, false);

//highlighting nav during scrolling
function activeNav() {

var  headings = document.querySelectorAll(".linked");
for(var i = 0; i < headings.length; i++) {
	if(window.scrollY) {
	if(i < headings.length - 1 && window.scrollY >= headings[i].offsetTop - 100 - 56 && window.scrollY < headings[i+1].offsetTop - 100 - 56) {
		var id = headings[i].getAttribute("id");
		var selector = "[href='#" + id + "']";
		document.querySelector(selector).classList.add("active");
		
	} else if( i === headings.length - 1 && window.scrollY >= headings[i].offsetTop - 100 - 56) {
		var id = headings[i].getAttribute("id");
		var selector = "[href='#" + id + "']";
		document.querySelector(selector).classList.add("active");
		
	} else {
		var id = headings[i].getAttribute("id");
		var selector = "[href='#" + id + "']";
		document.querySelector(selector).classList.remove("active");
}
} else {
	if(i < headings.length - 1 && document.documentElement.scrollTop >= headings[i].offsetTop - 100 - 56 && document.documentElement.scrollTop < headings[i+1].offsetTop - 100 - 56) {
		var id = headings[i].getAttribute("id");
		var selector = "[href='#" + id + "']";
		document.querySelector(selector).classList.add("active");
		
	} else if( i === headings.length - 1 && document.documentElement.scrollTop >= headings[i].offsetTop - 100 - 56) {
		var id = headings[i].getAttribute("id");
		var selector = "[href='#" + id + "']";
		document.querySelector(selector).classList.add("active");
		
	} else {
		var id = headings[i].getAttribute("id");
		var selector = "[href='#" + id + "']";
		document.querySelector(selector).classList.remove("active");
}
	
}
}
}

window.addEventListener("scroll", activeNav, false);


// slow scrolling 
var as = [].slice.call(document.querySelectorAll("nav ul li a"));
var lis = document.querySelectorAll("nav ul li");

// 56 -> nav height

for(var i = 0; i < as.length; i++) {
	as[i].addEventListener("click", function (e) {
		e.preventDefault();
		ul.removeAttribute("class");
		var a = e.target.hash;
		var aPos = document.querySelector(a).offsetTop - 100;
		var isFixed = nav.classList.contains("fixed-nav");
		function scr() {
			if(isFixed === true) {
				if( window.scrollY  <=  aPos - 10 || document.documentElement.scrollTop <= aPos - 10) {
					window.scrollBy(0, 10);
					setTimeout(scr, 3);
				} else if ( window.scrollY >=  aPos + 10 || document.documentElement.scrollTop >= aPos + 10) {
					window.scrollBy(0, -10);
					setTimeout(scr, 3);
				} else if (window.scrollY){
					window.scrollTo(window.scrollX, aPos);
					clearInterval(scr);
				} else {
					window.scrollTo(document.documentElement.scrollLeft, aPos);
					clearInterval(scr);
				}
			} else {
				if( window.scrollY  <=  aPos - 56 - 10 || document.documentElement.scrollTop <= aPos - 56 - 10) {
					window.scrollBy(0, 10);
					setTimeout(scr, 3);
				} else if ( window.scrollY >=  aPos - 56 + 10 || document.documentElement.scrollTop <= aPos - 56 + 10) {
					window.scrollBy(0, -10);
					setTimeout(scr, 3);
				} else if (window.scrollY){
					window.scrollTo(window.scrollX, aPos - 56);
					clearInterval(scr);
				} else {
					window.scrollTo(document.documentElement.scrollLeft, aPos - 56);
					clearInterval(scr);
				}
			}
		}
		scr();
	}, false);
};

//start website with #url 100px higher
function offsetAnchor() {
    if(location.hash.length !== 0) {
		if (window.scrollY) {
        window.scrollTo(window.scrollX, window.scrollY - 100);
		} else {
			window.scrollTo(document.documentElement.scrollLeft, window.scrollY - 100);
		}
    }
}

window.addEventListener("hashchange", offsetAnchor);
window.setTimeout(offsetAnchor, 1); 
	
//animated charts
var chartSection = document.getElementById("charts");
var charts = [].slice.call(document.querySelectorAll(".chart"));
if(window.scrollY >= chartSection.offsetTop - 150) {
	for(var i = 0; i < charts.length; i++) {
		if( i === 0) {
			charts[i].setAttribute("id", "chart1");
		}
	}
}

window.addEventListener("scroll", function() {
	if(window.scrollY >= chartSection.offsetTop - 150 || document.documentElement.scrollTop >= chartSection.offsetTop - 150) {
		for(var i = 0; i < charts.length; i++) {
			switch(i) {
				case 0:
					charts[0].setAttribute("id", "chart1");
				case 1:
					charts[1].setAttribute("id", "chart2");
				case 2:
					charts[2].setAttribute("id", "chart3");
			}
		}
	}
}, false);
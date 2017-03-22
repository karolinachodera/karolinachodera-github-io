//walidacja formularza

var form = document.querySelector("#myForm");
var fields = document.querySelectorAll("form [data-error]");

var ul = document.querySelector("#errList");


function isMail(field) {
	return field.value.indexOf("@") !== -1;
}

function isText(field) {
	return field.value.length >= 2;
}

function tableErrors(table) {
	if(!ul) {
		ul = document.createElement("ul");
		form.insertBefore(ul, fields[0]);
		ul.setAttribute("id", "errList");
	}
	ul.innerHTML = "";
	table.forEach(function (error) {
		var li = document.createElement("li");
		li.textContent = error;
		ul.appendChild(li);
	});
	
}	



form.addEventListener("submit", function(e) {
	e.preventDefault();
	var table = [];
	var isValid;
	for(i = 0; i < fields.length; i++) {
		var field = fields[i];
		
		if(field.name === "your-name") {
			isValid = isText(field);
		} else if(field.name ==="your-email") {
			isValid = isMail(field);
		}
		if(isValid === false) {
			table.push(field.dataset.error);
		}
	}
	if(table.length !== 0) {
		tableErrors(table);
	} else {
		form.removeChild(document.querySelector("#errList"));
	}
}, false);



// skaczący przycisk

var button = document.querySelector("header a");
var end = document.querySelector("#first");

function scroll(e) {
	e.preventDefault();
	var y = end.offsetTop;
	
	function down () {

		if(document.body.scrollTop < end.offsetTop) {
	
			window.scrollBy(0, 10)
			setTimeout(down, 5)
		} else {
			clearInterval(down);
		}
	}
	down();
	
	
}

function hidden() {
	if(document.body.scrollTop > 100) {
		button.classList.add("hidden");
	} else {
		button.classList.remove("hidden");
	}
}

var  last;

function bounce() {

	var bottom = parseInt(document.querySelector("header a").style.bottom);
	setTimeout(bounce, 500);
	
	if (bottom > 0) {
		bottom = parseInt(bottom);
		bottom = 0;
		bottom = bottom + "%";
		document.querySelector("header a").style.bottom = bottom;
		
	} else if (bottom == 0 && last == 0 || !last) {
		bottom = 5;
		last = 5;
		bottom = bottom + "%";
		document.querySelector("header a").style.bottom = bottom;
	} else if (bottom == 0 && last == 5) {
		bottom = 4;
		last = 4;
		bottom = bottom + "%";
		document.querySelector("header a").style.bottom = bottom;
	} else if (bottom == 0 && last == 4) {
		bottom = 3;
		last = 3;
		bottom = bottom + "%";
		document.querySelector("header a").style.bottom = bottom;
	} else if (bottom == 0 && last == 3) {
		bottom = 2;
		last = 2;
		bottom = bottom + "%";
		document.querySelector("header a").style.bottom = bottom;
	} else if (bottom == 0 && last == 2) {
		bottom = 0;
		last = 0;
		bottom = bottom + "%";
		document.querySelector("header a").style.bottom = bottom;
	}
}
bounce();

button.addEventListener("click", scroll, false);
window.addEventListener("scroll", hidden, false);


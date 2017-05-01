/* slider wersja 1 - na stronie jest jeden obrazek <img>, któremu zmieniana jest ścieżka src
linkowanie do kolejnych obrazków nie może być ustawione za pomocą a href i dodaniem id do obrazków, ponieważ w danym momencie na stronie jest tylko jeden obrazek w sliderze.
Linkowanie jest rozwiązane dodanym eventListenerem - onclick zmieniana jest ścieżka src istniejącego <img>

Możliwa wersja 2 - na stronie są wstawione wszystkie, które chcemy <img>, w tej samej pozycji, jeden nad drugim (przysłaniają się). Zmieniany jest index obrazków.

Wersja 3 - <img> są wstawione w długim divie, jeden obok drugiego - float: left. Wtedy wczytanie kolejnego obrazka odbywa się przez zmianę pozycji diva.
*/


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
		}
		
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
		}
		
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
		}
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
		}
		
		for(var i = 0; i < num; i++) {
			lis[i].addEventListener("click", imageLink, false);
		}
}


slider(document.querySelector("header img"), 2, document.querySelector("header .switch"));


(function descriptionVisible() {
	var descriptions = [].slice.call(document.querySelectorAll(".relative .mousedsc"));
	
	function visible(e) {
			e.target.classList.add("visible");
	}
	
	function hidden(e) {
			e.target.classList.remove("visible");
	}
	
	for (var i = 0; i < descriptions.length; i++) {
		descriptions[i].addEventListener("mouseenter", visible, false);
		descriptions[i].addEventListener("mouseleave", hidden, false);
	}
})();

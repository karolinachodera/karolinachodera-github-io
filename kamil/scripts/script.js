function initMap() {
	var uluru = {lat: 53.0302626, lng: 18.654473};
	var map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 12,
	  center: uluru
	});
	var marker = new google.maps.Marker({
	  position: uluru,
	  map: map
	});
}
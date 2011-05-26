var conf_icon = new google.maps.MarkerImage("http://www.google.com/intl/en_us/mapfiles/ms/micons/red-dot.png");
var group_icon = new google.maps.MarkerImage("http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png");

var addMarker = function(data, map) {
	console.log(data)
	if(data.lat && data.lng) {
		var myLatlng = new google.maps.LatLng(data.lat, data.lng);
		var icon = (data.continent == 'Conference') ? conf_icon : group_icon;
		var marker = new google.maps.Marker({
			position: myLatlng,
			icon: icon
		});
		google.maps.event.addListener(marker, 'click', function() {
			location.href = "#" + data.id;
		});
		marker.setMap(map);       
	} else {
		console.log('Cant display ' + data.town)
	}
}

window.addEventListener("load", function() {
	var latlng = new google.maps.LatLng(46.619261,12.6562);
	var myOptions = {
		zoom: 1,
		center: latlng,
		disableDefaultUI: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

	for(var i in data) {
		addMarker(data[i], map);
	}
	}, false);


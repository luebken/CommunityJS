var addMarker = function(data, map) {
    if(data.lat && data.lng) {
        var myLatlng = new google.maps.LatLng(data.lat, data.lng);
        var marker = new google.maps.Marker({
              position: myLatlng,
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
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    
    for(var i in data) {
        addMarker(data[i], map);
    }
});


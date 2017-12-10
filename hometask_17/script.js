var div = document.getElementById("map");

var xhr = new XMLHttpRequest();
xhr.open("GET", "country.json", true);
xhr.onload = function(){
	var data = JSON.parse(this.responseText);
	var coords = { lat: data[1].lat, lng: data[1].lng}; //изначальный центр
	var settings = {
		zoom: 4, //1-15
		center: coords,
		mapTypeId: google.maps.MapTypeId.ROADMAP // тип карт: дорожная, стпутник, гибрид
	};
	var map = new google.maps.Map(div, settings);
	var arr = [];
	var coords2 = [];
	data.forEach(function(elem){
		var coords1 = {lat: elem.lat, lng: elem.lng} 
		var infowindow = new google.maps.InfoWindow({
		    content: elem.content
		});
		arr.push(infowindow);
		var marker = new google.maps.Marker({
			position: coords1, // куда попадет
			map: map,// какую карту использовать
			title: elem.title
		})
		marker.addListener('click', function(){
			arr.forEach(function(elem){
				elem.close();
			})
		    infowindow.open(map, marker);
		});
		coords2.push(coords1);
	})
	var flightPath = new google.maps.Polyline({
          path: coords2,
          geodesic: true,
          strokeColor: 'red',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        flightPath.setMap(map);
}
xhr.send();




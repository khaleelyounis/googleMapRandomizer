//Global Variables
let map;
let streetMap1;
let streetMap2;
let streetMap3;

/***************************************************************************
 * renderInitialMap - creates Google map on initial page load
 * @param {none}
 * @return {none}
 */
function renderInitialMap() {
    let usa = { lat: 33.9584404, lng: -118.3941214 };
    map = new google.maps.Map(document.getElementById("map"), {
        center: usa,
        zoom: 3
    });
    let defaultbounds = new google.maps.LatLngBounds(
        //San Diego Bounds
        new google.maps.LatLng(32.7157, 117.1611),
        //Fresno Bounds
        new google.maps.LatLng(36.7378, 119.7871)
    );
    let options = {
        bounds: defaultbounds
    };
    let input = document.getElementById('pac-input');

    //Create the autocomplete object.
    let autocomplete = new google.maps.places.Autocomplete(input, options);

    autocomplete.bindTo('bounds', map);

    let infowindow = new google.maps.InfoWindow();
    let marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });
    //Event Listener for when auto complete finishes and a location has been chosen.
    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        marker.setVisible(false);
        let place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }
        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        let address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
        infowindow.setContent(address);
        infowindow.open(map, marker);

        //Street Map #1 and it's marker.
        streetMap1 = new google.maps.Map(document.getElementById("streetMap1"), {
            center: usa,
            zoom: 3
        });
        let streetGeocoder1 = new google.maps.Geocoder;
        let streetWindow1 = new google.maps.InfoWindow();
        let positiveStreetDifferenceInLat = (Math.random() * (.5 - .2) + .2);
        let smallLngDifference = ((Math.random() * (.8 - .4) + .4) * -1);
        console.log(place.geometry.viewport.f.b);
        console.log(place.geometry.viewport.b.b);
        let streetLatLng1 = {
            lat: place.geometry.viewport.f.b + positiveStreetDifferenceInLat,
            lng: place.geometry.viewport.b.b + smallLngDifference
        }
        function streetGeocodeLatLng1(geocoder, map, infowindow) {
            let input = streetLatLng1
            let latlng = { lat: parseFloat(input.lat), lng: parseFloat(input.lng) };
            geocoder.geocode({ 'location': latlng }, function (results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        map.setZoom(11);
                        let streetMarker1 = new google.maps.Marker({
                            position: latlng,
                            map: map
                        });
                        infowindow.setContent(results[0].formatted_address);
                        infowindow.open(map, streetMarker1);
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });
        };
        streetGeocodeLatLng1(streetGeocoder1, streetMap1, streetWindow1);
        streetMap1.setZoom(17);

        //Street Map #2 and it's marker.
        streetMap2 = new google.maps.Map(document.getElementById("streetMap2"), {
            center: usa,
            zoom: 3
        });
        let streetGeocoder2 = new google.maps.Geocoder;
        let streetWindow2 = new google.maps.InfoWindow();
        let smallLatDifference = (Math.random() * (.2 - .02) + .02);
        let negativeStreetDifferenceInlng = (Math.random() * (1 - .6) + .6);
        let streetLatLng2 = {
            lat: place.geometry.viewport.f.b + smallLatDifference,
            lng: place.geometry.viewport.b.b + negativeStreetDifferenceInlng
        }
        function streetGeocodeLatLng2(geocoder, map, infowindow) {
            let input = streetLatLng2
            let latlng = { lat: parseFloat(input.lat), lng: parseFloat(input.lng) };
            geocoder.geocode({ 'location': latlng }, function (results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        map.setZoom(11);
                        let streetMarker2 = new google.maps.Marker({
                            position: latlng,
                            map: map
                        });
                        infowindow.setContent(results[0].formatted_address);
                        infowindow.open(map, streetMarker2);
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });
        };
        streetGeocodeLatLng2(streetGeocoder2, streetMap2, streetWindow2);
        streetMap2.setZoom(17);

        //Street Map #3 and it's marker.
        streetMap3 = new google.maps.Map(document.getElementById("streetMap3"), {
            center: usa,
            zoom: 3
        });
        let streetGeocoder3 = new google.maps.Geocoder;
        let streetWindow3 = new google.maps.InfoWindow();
        let negativeLatDifference = ((Math.random() * (.7 - .5) + .5) * -1);
        let positiveLngDifference = ((Math.random() * (.7 - .5) + .5));
        let streetLatLng3 = {
            lat: place.geometry.viewport.f.b + negativeLatDifference,
            lng: place.geometry.viewport.b.b + positiveLngDifference
        }
        function streetGeocodeLatLng3(geocoder, map, infowindow) {
            var input = streetLatLng3
            var latlng = { lat: parseFloat(input.lat), lng: parseFloat(input.lng) };
            geocoder.geocode({ 'location': latlng }, function (results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        map.setZoom(11);
                        let streetMarker3 = new google.maps.Marker({
                            position: latlng,
                            map: map
                        });
                        infowindow.setContent(results[0].formatted_address);
                        infowindow.open(map, streetMarker3);
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });
        };
        streetGeocodeLatLng3(streetGeocoder3, streetMap3, streetWindow3);
        streetMap2.setZoom(17);
    });
}
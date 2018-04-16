//Global variables
var map;
var streetMap1;
var streetMap2;
var streetMap3;

//Run initializeApp when document has fully loaded;
$(document).ready(initializeApp);

//function that runs after page has loaded
function initializeApp() {

    var mainMap = $('#map');
    var secondMap = $('#streetMap1');
    var thirdMap = $('#streetMap2');
    var fourthMap = $('#streetMap3');
    var mapModal = $('#mapModal');
    var slider = document.getElementById("myRange");

    //Map Modal Click Handlers
    mainMap.click(presentModalInformation);
    mapModal.on('hide.bs.modal', function () {
        $('.mapContainer').append(mainMap);
        secondMap.css('width', '33%');
        thirdMap.css('width', '33%');
        fourthMap.css('width', '33%');
        $('.streetViewContainer').append(secondMap);
        $('.streetViewContainer').append(thirdMap);
        $('.streetViewContainer').append(fourthMap);
    });

    //function that allows for the control of the sliders;
    slider.oninput = function () {
        if (!$('#mapModal').is(':visible')) {
            return;
        } else {
            if (this.value >= 1 && this.value <= 25) {
                $(".mapModalContainer").empty();
                $(".mapModalContainer").append(mainMap);
            } else if (this.value >= 26 && this.value <= 50) {
                $('.streetMap').css('width', '100%');
                $(".mapModalContainer").empty();
                $(".mapModalContainer").append(secondMap);
            } else if (this.value >= 51 && this.value <= 75) {
                $('.streetMap').css('width', '100%');
                $(".mapModalContainer").empty();
                $(".mapModalContainer").append(thirdMap);
            } else if (this.value >= 76 && this.value <= 100) {
                $('.streetMap').css('width', '100%');
                $(".mapModalContainer").empty();
                $(".mapModalContainer").append(fourthMap);
            }
        }
    }
}

/***************************************************************************
 * renderInitialMap - creates Google map on initial page load
 * @param {none}
 * @return {none}
 */
function renderInitialMap() {
    //sets default view to the US
    let usa = { lat: 33.9584404, lng: -118.3941214 };

    //Initialize the First Map
    map = new google.maps.Map(document.getElementById("map"), {
        center: usa,
        zoom: 3
    });

    //Setting Default Bounds for the Map ( this is not usually required )
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

    //Binding our autocomplete to the first map
    autocomplete.bindTo('bounds', map);

    //creates our first marker and infowindow
    let infowindow = new google.maps.InfoWindow();
    let marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    //Event Listener for when auto complete finishes and a location has been chosen.
    autocomplete.addListener('place_changed', function () {

        //closes old marker/infowindow
        infowindow.close();
        marker.setVisible(false);

        //get location from autocomplete
        let place = autocomplete.getPlace();

        //set new marker and making invisibile
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        //gathers address for infowindow
        let address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        //labels infowindow and opens it up
        infowindow.setContent(address);
        infowindow.open(map, marker);

        //Street Map #1 and it's marker.
        streetMap1 = new google.maps.Map(document.getElementById("streetMap1"), {
            center: usa,
            zoom: 3
        });

        //enable geocoder ( latlng to address translator )
        let streetGeocoder1 = new google.maps.Geocoder;

        //creates new infowindow
        let streetWindow1 = new google.maps.InfoWindow();

        // creates a random lat and lng difference towards the north west
        let positiveStreetDifferenceInLat = (Math.random() * (.5 - .3) + .3);
        let smallLngDifference = ((Math.random() * (.8 - .5) + .5) * -1);

        //sets the new location 50-70 miles away from original
        let streetLatLng1 = {
            lat: place.geometry.viewport.f.b + positiveStreetDifferenceInLat,
            lng: place.geometry.viewport.b.b + smallLngDifference
        }

        //function that turns lat and lng to address and sets marker and infowindow
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

        //call function
        streetGeocodeLatLng1(streetGeocoder1, streetMap1, streetWindow1);
        streetMap1.setZoom(17);

        //Street Map #2 and it's marker.
        streetMap2 = new google.maps.Map(document.getElementById("streetMap2"), {
            center: usa,
            zoom: 3
        });

        //enable geocoder ( latlng to address translator )
        let streetGeocoder2 = new google.maps.Geocoder;
        let streetWindow2 = new google.maps.InfoWindow();


        // creates a random lat and lng difference towards the east
        let smallLatDifference = (Math.random() * (.2 - .02) + .02);
        let negativeStreetDifferenceInlng = (Math.random() * (1 - .6) + .6);

        //sets the new location 50-70 miles away from original
        let streetLatLng2 = {
            lat: place.geometry.viewport.f.b + smallLatDifference,
            lng: place.geometry.viewport.b.b + negativeStreetDifferenceInlng
        }

        //function that turns lat and lng to address and sets marker and infowindow
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

        //call function
        streetGeocodeLatLng2(streetGeocoder2, streetMap2, streetWindow2);
        streetMap2.setZoom(17);

        //Street Map #3 and it's marker.
        streetMap3 = new google.maps.Map(document.getElementById("streetMap3"), {
            center: usa,
            zoom: 3
        });

        //enable geocoder ( latlng to address translator )
        let streetGeocoder3 = new google.maps.Geocoder;
        let streetWindow3 = new google.maps.InfoWindow();

        // creates a random lat and lng difference towards the south
        let negativeLatDifference = ((Math.random() * (.7 - .5) + .5) * -1);
        let positiveLngDifference = ((Math.random() * (.7 - .5) + .5));

        //sets the new location 50-70 miles away from original
        let streetLatLng3 = {
            lat: place.geometry.viewport.f.b + negativeLatDifference,
            lng: place.geometry.viewport.b.b + positiveLngDifference
        }

        //function that turns lat and lng to address and sets marker and infowindow
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

        //call function
        streetGeocodeLatLng3(streetGeocoder3, streetMap3, streetWindow3);
        streetMap2.setZoom(17);

        //Distance Matrix Calculation
        let directionsService = new google.maps.DirectionsService();

        //Three street locations 
        let location1 = new google.maps.LatLng(streetLatLng1.lat, streetLatLng1.lng);
        let location2 = new google.maps.LatLng(streetLatLng2.lat, streetLatLng2.lng);
        let location3 = new google.maps.LatLng(streetLatLng3.lat, streetLatLng3.lng);

        //Defining the map being used
        let rendererOptions = {
            map: map
        };

        //Assigning directionsDisplay the options and setting the correct map
        directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions)

        //function to calculate the route with all waypoints included
        function calcRoute() {
            // Retrieve the start and end locations and create
            // a DirectionsRequest using DRIVING directions.
            var request = {
                origin: location1,
                destination: location3,
                travelMode: 'DRIVING',
                //require these points to be hit on the route
                waypoints: [
                    {
                        location: address,
                        stopover: true
                    },
                    {
                        location: location2,
                        stopover: true
                    }
                ],
            };
            //display the route on the map
            directionsService.route(request, function (response, status) {
                if (status == "OK") {
                    if (map) {

                        //resets map for new route
                        map = new google.maps.Map(document.getElementById("map"), {
                            center: usa,
                            zoom: 3
                        });
                    }
                    directionsDisplay.setMap(map);
                    directionsDisplay.setDirections(response);
                }
            });
        };

        //calling the function to run here
        calcRoute();
    });
}

//Modal function for when the map is clicked
function presentModalInformation() {
    $(".mapModalContainer").empty();
    var modalMap = $('#map').clone();
    $(".mapModalContainer").append(modalMap);
    $('#mapModal').modal('show');
}
$(document).ready(initializeApp);


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
}
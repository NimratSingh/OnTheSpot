var map = L.map('map').setView([45.5048,-73.57908551043636],16);
var OpenStreetMap_HOT = L.tileLayer(
        'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
        }
);
OpenStreetMap_HOT.addTo(map)


var markerGroup = L.layerGroup().addTo(map);


var McLennan = L.marker([45.503267,-73.57593739082246]).addTo(map);
McLennan.bindPopup("<h3>McLennan Library</h3><p>Open: all week 8:00-00:00<br><a href=https://www.mcgill.ca/library/branches/hssl/study-areas/floor-plans#MCL>View location</a></p>");

var Redpath = L.marker([45.50355915,-73.57672868246595]).addTo(map);
Redpath.bindPopup("<h3>Redpath Library</h3><p>Open: all week 8:00-00:00<br><a href=https://www.mcgill.ca/library/branches/hssl/study-areas/floor-plans#REDPATH>View location</a></p>");

var Osler = L.marker([45.503009, -73.582502]).addTo(map);
Osler.bindPopup("<h3>Osler Library</h3><p>Open: Monday to Friday 9:00-17:00<br><a href=https://www.mcgill.ca/library/branches/osler>View location</a></p>");

var Law = L.marker([45.50341, -73.58081]).addTo(map);
Law.bindPopup("<h3>Law Library</h3><p>Open: all week 9:00-00:00<br><a href=https://www.mcgill.ca/library/branches/osler>View location</a></p>");

var Burnside = L.marker([45.50472,-73.57494]).addTo(map);
Burnside.bindPopup("<h3>Burnside Basement</h3><p>Open: 24/7<br><a href=https://www.mcgill.ca/library/branches/osler>View location</a></p>");

var Schulich = L.marker([45.50507,-73.57532]).addTo(map);
Schulich.bindPopup("<h3>Schulich Library</h3><p>Open: all week 9:00-00:00<br><a href=https://www.mcgill.ca/library/branches/schulich>View location</a></p>");

var Bronfman = L.marker([45.50255,-73.57645]).addTo(map);
Bronfman.bindPopup("<h3>Bronfman Building</h3><p>Open: Monday to Friday 7:00-22:30<br><a href=https://www.mcgill.ca/arts/bronfman-building>View location</a></p>");

L.control.locate().addTo(map);

markerGroup.addLayer(McLennan);
markerGroup.addLayer(Redpath);
markerGroup.addLayer(Osler);
markerGroup.addLayer(Law);
markerGroup.addLayer(Burnside);
markerGroup.addLayer(Schulich);
markerGroup.addLayer(Bronfman);

var allMarkers = [
	McLennan,
	Redpath,
	Osler,
	Law,
	Burnside,
	Schulich,
	Bronfman,
]



function clearAllPins() {
        markerGroup.clearLayers();
}





//------------------------------------------------------------------------------------------------------------------------------------------------

const studySpots = [
  {
        name: "McLennan",
        lat: 45.503267,
        lng: -73.57593739082246,
        tags: ["0", "1", "1", "1", "0", "1", "1",],
  },

  {
	name: "BurnsideB",
        lat: 45.50472,
        lng: -73.57494,
        tags: ["0", "1", "1", "1", "1", "0", "0"],

  },

  {     
        name: "Redpath",
        lat: 45.50355915,
        lng: -73.57672868246595,
        tags: ["0", "1", "1", "1", "1", "0", "1"],
  
  },

  {     
        name: "Osler",
        lat: 45.503009,
        lng: -73.582502,
        tags: ["1", "0", "0", "0", "0", "1", "0"],
  
  },

  {     
        name: "Law",
        lat: 45.50341,
        lng: -73.58081,
        tags: ["1", "0", "1", "1", "0", "1", "1"],
  
  },

  {     
        name: "Schulich",
        lat: 45.50507,
        lng: -73.57532,
        tags: ["1", "1", "1", "1", "0", "1", "0"],
  
  },

  {     
        name: "Bronfman",
        lat: 45.50255,
        lng: -73.57645,
        tags: ["0", "1", "0", "0", "1", "1", "0"],
  
  }
]




function getSelectedCriteria() {
	const checkboxes = document.querySelectorAll("#filter_form input[type='checkbox']");
	const selectedCriteria = [];

	checkboxes.forEach((checkbox, index) => {
		if (checkbox.checked) {
			selectedCriteria.push(checkbox.value);
		}
	});
	console.log("SelectedCriteria:", selectedCriteria);
	return selectedCriteria;
}




function filterStudySpots(criteria) {
	return studySpots.filter(spot => {
		return criteria.every(index => spot.tags[index] == "1");
	});
}




function updateMap(filteredSpots) {
	// Add new pins for each filtered spot
	filteredSpots.forEach(spot => {
		console.log(`Adding pin for ${spot.name} at (${spot.lat}, ${spot.lng})`);
		allMarkers.forEach(marker => {
			// if (parseInt(spot.lat) === marker.getLatLng().lat) {
			if (Math.abs(spot.lat - marker.getLatLng().lat) < 0.000001 && Math.abs(spot.lng - marker.getLatLng().lng) < 0.000001) {
				markerGroup.addLayer(marker);
			}
		});
	});

}




// Event Listener for the Filter Button
document.getElementById("search_button").addEventListener("click", () => {
	const selectedCriteria = getSelectedCriteria();
	const filteredSpots = filterStudySpots(selectedCriteria);
	const errorMessageElement = document.getElementById("no_results");

	console.log("Filtered Spots:", filteredSpots);
	clearAllPins();

	if (filteredSpots.length > 0) {
		updateMap(filteredSpots);
		errorMessageElement.textContent = " ";
	} else {
		errorMessageElement.textContent = "Unfortunately, no study spots match the selected criteria :(";
	}

});



// Create the search control
const PinSearchControl = (map, searchMarkers) => {
  return L.control.pinSearch({
    position: "topright",
    placeholder: "Search...",
    buttonText: "Search",
    onSearch: function (query) {
      // Initialize an empty array to store matching markers
      const matchingMarkers = [];
      // Loop through the searchMarkers array to check for matches
      searchMarkers.forEach(function (marker) {
        const markerTitle = marker.options.title;
        if (markerTitle.toLowerCase().includes(query.toLowerCase())) {
          matchingMarkers.push(marker);
        }
      });
      if (matchingMarkers.length > 0) {
        // If there are matching markers, focus on the first one and open its popup
        const firstMatchingMarker = matchingMarkers[0];
        const markerLatLng = firstMatchingMarker.getLatLng();
        // Fly to the marker and open its popup
        map.flyTo(markerLatLng, 19, {
          maxZoom: 19,
          duration: 0.3,
          animate: true,
        });
        firstMatchingMarker.openPopup();
      }
      // Clear the search input
      document.querySelector(".search-input").value = "";
    },
    searchBarWidth: "150px",
    searchBarHeight: "30px",
    maxSearchResults: 5,
  });
};

// Export the function to be used in other modules
export default PinSearchControl;

const map = L.map("map", {
    center: [6.6993, -1.68009],
    zoom: 16,
    zoomControl: false,
  });
  
  // OpenStreetMap layer
  const osmLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 25,
    }
  ).addTo(map);
  
  // Esri World Imagery layer
  const esriWorldImageryLayer = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    }
  );
  
  // Define base maps
  const baseMaps = {
    OpenStreetMap: osmLayer,
    "Esri World Imagery": esriWorldImageryLayer,
  };
  
  // Create a layer control
  const layerControl = L.control.layers(baseMaps).addTo(map);
   // Dummy markers
   L.marker([51.505, -0.09], { title: 'Marker 1' }).addTo(map);
   L.marker([51.51, -0.1], { title: 'Marker 2' }).addTo(map);
   L.marker([51.515, -0.09], { title: 'Marker 3' }).addTo(map);


   // PinSearch component
   var searchBar = L.control.pinSearch({
       position: 'topright',
       placeholder: 'Search...',
       buttonText: 'Search',
       onSearch: function(query) {
           console.log('Search query:', query);
           // Handle the search query here
       },
       searchBarWidth: '200px',
       searchBarHeight: '30px',
       maxSearchResults: 3
   }).addTo(map);
  
  
// Routing control
const routingControl = L.Routing.control({
    waypoints: [
      L.latLng(57.74, 11.94),
      L.latLng(57.6792, 11.949),
    ],
    routeWhileDragging: false,
   
  }).addTo(map);
  
  function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
  }
  
  map.on('click', function(e) {
    var container = L.DomUtil.create('div');
    var startBtn = createButton('Start from this location', container);
    var destBtn = createButton('Go to this location', container);
  
    L.popup()
      .setContent(container)
      .setLatLng(e.latlng)
      .openOn(map);
  
    L.DomEvent.on(startBtn, 'click', function() {
      routingControl.spliceWaypoints(0, 1, e.latlng);
      map.closePopup();
    });
  
    L.DomEvent.on(destBtn, 'click', function() {
      routingControl.spliceWaypoints(routingControl.getWaypoints().length - 1, 1, e.latlng);
      map.closePopup();
    });
  });
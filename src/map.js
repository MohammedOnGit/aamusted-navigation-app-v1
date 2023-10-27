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
  
// Create a Leaflet map
const map = L.map("map", {
  center: [6.7004, -1.6811],
  zoom: 10,
  zoomControl: false,
});

// Create a reusable function for adding tile layers
function addTileLayer(url, attribution) {
  return L.tileLayer(url, { attribution, maxZoom: 19 }).addTo(map);
}

// Handle tile layer errors
function handleTileError(layer) {
  layer.on("tileerror", function (e) {
    console.error(
      `Error loading ${layer.options.attribution} tile:`,
      e.error.target.src
    );
    const userChoice = window.confirm(
      `Error loading ${layer.options.attribution} tiles. Do you want to reload the page?`
    );
    if (userChoice) {
      window.location.reload(); // Reload the page
    }
  });
}

// Define tile layer URLs and attributions
const osmLayer = addTileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
);

const esriWorldImageryLayer = addTileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
);

// Create a function to display an offline message
function showOfflineMessage() {
  alert(
    "You are currently offline. Please check your internet connection and try again."
  );
}

// Create a function to reload the page
function reloadPage() {
  window.location.reload();
}

// Listen for online and offline events
window.addEventListener("offline", showOfflineMessage);
window.addEventListener("online", reloadPage);

// Add error handling for other tile layers as needed

const baseMaps = {
  "Esri World Imagery": esriWorldImageryLayer,
  OpenStreetMap: osmLayer,
};

// Create a function to handle location errors
function onLocationError(e) {
  alert("Error getting your location: " + e.message);
}

// Create the locate control with the error handler function
const locateControl = L.control
  .locate({
    position: "bottomright",
    showCompass: true,
    drawCircle: true,
    drawMarker: true,
    onLocationError: onLocationError, // Pass the error handler function here
    locateOptions: {
      enableHighAccuracy: true,
    },
  })
  .addTo(map);

const routingControl = L.Routing.control({
  waypoints: [L.latLng(6.6993, -1.68009), L.latLng(6.7004, -1.68215)],
  routeWhileDragging: false,
}).addTo(map);

const createButton = (label, container) => {
  const btn = L.DomUtil.create("button", "", container);
  btn.setAttribute("type", "button");
  btn.innerHTML = label;
  return btn;
};

map.on("click", function (e) {
  const container = L.DomUtil.create("div");
  const startBtn = createButton("Start from this location", container);
  const destBtn = createButton("Go to this location", container);

  L.popup().setContent(container).setLatLng(e.latlng).openOn(map);

  L.DomEvent.on(startBtn, "click", function () {
    routingControl.spliceWaypoints(0, 1, e.latlng);
    map.closePopup();
  });

  L.DomEvent.on(destBtn, "click", function () {
    routingControl.spliceWaypoints(
      routingControl.getWaypoints().length - 1,
      1,
      e.latlng
    );
    map.closePopup();
  });
});

const layerControl = L.control.layers(baseMaps).addTo(map);

// Social medial links
const twitterLink =
  '<div class="child child-1"><button class="button btn-1"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="#1e90ff"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg></button></div>';

const instagramLink =
  '<div class="child child-2"><button class="button btn-2"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#ff00ff"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg></button></div>';

const githubLink =
  '<div class="child child-3"><button class="buttonbtn-3"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg></button></div>';

const facbookLink =
  '<div class="child child-4"> <button class="button btn-4"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" fill="#4267B2"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg></button></div>';

//social media links all
//writing this code is was biggest archievement througout the project
const allLinks =
  '<div class="parent">' +
  twitterLink +
  instagramLink +
  githubLink +
  facbookLink +
  "</div>";

//Acoordion Item
const officesAcordionItem =
  '<h2 class="header collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">OFFICES</h2><span class="uw-slant"></span><div class="accordion-item"><div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample"><div class="accordion-body"><div class="list-group"><button type="button" id = "acount-office-btn" class="list-group-item list-group-item-action" aria-current="true">Accounts Office</button><button type="button" class="list-group-item list-group-item-action">A second item</button><button type="button" class="list-group-item list-group-item-action">A third button item</button><button type="button" class="list-group-item list-group-item-action">A fourth button item</button><button type="button" class="list-group-item list-group-item-action" disabled>A disabled button item</button></div></div></div></div>';

//accordion item 2

const hostelsAccordionItem =
  ' <h2 class="header collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">HOSTELS</h2><span class="uw-slant"></span><div class="accordion-item"><div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample"><div class="accordion-body"><div class="list-group"><button type="button" class="list-group-item list-group-item-action" aria-current="true">The current button</button><button type="button" class="list-group-item list-group-item-action">A second item</button><button type="button" class="list-group-item list-group-item-action">A third button item</button><button type="button" class="list-group-item list-group-item-action">A fourth button item</button><button type="button" class="list-group-item list-group-item-action" disabled>A disabled button item</button></div></div></div></div>';

// Lecture Halls Accordion item
const letureHallsAccordionItem =
  '<h6 class="header collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">LECTURE HALLS</h6><div class="accordion-item"><span class="uw-slant"></span><div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"data-bs-parent="#accordionFlushExample"><div class="accordion-body"><div class="list-group"><button type="button" id="rob-btn" class="list-group-item list-group-item-action">ROB</button><button type="button" id="new-buildinglh-btn" class="list-group-item list-group-item-action">New building</button><button type="button" id="NFB-btn" class="list-group-item list-group-item-action">New faculty building</button><button type="button" id="NLB-btn" class="list-group-item list-group-item-action">New library building</button><button type="button" id="computer-lab1-btn" class="list-group-item list-group-item-action">Computer lab one</button><button type="button" id="computer-lab2-btn" class="list-group-item list-group-item-action">Computer lab two</button></div></div></div></div>';

// Buildings Accordion
const buildingsAccordionItem =
  '<div class="accordion-item"><h6 class="header collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree"aria-expanded="false" aria-controls="flush-collapseThree">BUILDINGS</h6><span class="uw-slant"></span><div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree"data-bs-parent="#accordionFlushExample"><div class="accordion-body"><div class="list-group"><button type="button" id="opoku-ware-btn" class="list-group-item list-group-item-action"aria-current="true">Opoku ware hall</button><button type="button" id="opoku-ware-mosqueBtn"class="list-group-item list-group-item-action">Opoku ware mosque</button><button type="button" id="canteen-btn"class="list-group-item list-group-item-action">Canteen</button><button type="button" id="uncom-auditorium-btn"class="list-group-item list-group-item-action">Uncompleted auditorium</button><button type="button" id="autonomy-hall-btn"class="list-group-item list-group-item-action">Autonomy hall</button><button type="button" id="atwima-hall-btn" class="list-group-item list-group-item-action">Atwima hall</button></div></div></div></div>';

// Main Accordion
const sideMenuAccordion = `
  <div class="accordion accordion-flush" id="accordionFlushExample">
    ${buildingsAccordionItem}${officesAcordionItem}${letureHallsAccordionItem}${hostelsAccordionItem}
  </div>
`;

const imageSection =
  '<div class="container-fluid"><div class="row"> <h1 id="title">AAMUSTED NAVIGATION</h1> <span id="title-slant" class="uw-slant-large"></span><div class="col"><img src="./src/img/cropped-AAMUSTED-LOGO.jpg" class="img-fluid" alt="aamusted logo"/></div></div></div>';

const terms =
  '<div class="list-group" id="terms"><a style="color: #FFFFFF; text-decoration:underline;" href="./public/Terms-of-Service/">Terms of Service</a><span style="color: #FFFFFF; text-decoration:underline;">|</span><a style="color: #FFFFFF; text-decoration:underline;" href="./public/Cookie-Policy/">Cookie Policy</a</div>';

var slideMenu = L.control
  .slideMenu(imageSection + sideMenuAccordion + allLinks + terms, {
    position: "topleft",
    width: "240px",
    height: "800px",
  })
  .addTo(map);

// opuku ware popupText
const opokuWarePopupText =
  'OpukuWare hall<button type="button" class="btn btn-link" data-bs-toggle="modal"  data-bs-target="#opuku-ware-Modal">View</button>';

//Autonomy hall popuptxt
const autonomyPopuptxt =
  'Autonomy hall<button type="button" class="btn btn-link" data-bs-toggle="modal"  data-bs-target="#autonomy-hall-modal">View</button>';

//ROB popuptxt
const robPopupTxt =
  'ROB <button type="button" class="btn btn-link" data-bs-toggle="modal"  data-bs-target="#ROB-modal">View</button>';

//uncompleted auditorium popupTxt
const uncompAuditoriumPopupTxt =
  'Uncompleted auditorium <button type="button" class="btn btn-link" data-bs-toggle="modal"  data-bs-target="#uncompleted-auditorium-modal">View</button>';

//Atwima hall popUptxt
const atwimahallPopupTxt =
  'Atwima hall<button type="button" class="btn btn-link" data-bs-toggle="modal"  data-bs-target="#atwima-hall-mmodal">View</button>';

const coordinatesData = [
  {
    coordinates: [6.69782, -1.68286],
    title: "Opoku ware hall",
    buttonId: "opoku-ware-btn",
    popupText: opokuWarePopupText,
  },
  {
    coordinates: [6.70049, -1.6823],
    title: "ROB",
    buttonId: "rob-btn",
    popupText: robPopupTxt,
  },
  {
    coordinates: [6.69779, -1.68397],
    title: "Opoku ware mosque",
    buttonId: "opoku-ware-mosqueBtn",
    popupText: "Opoku ware mosque",
  },
  {
    coordinates: [6.69847, -1.68345],
    title: "Canteen",
    buttonId: "canteen-btn",
    popupText: "Canteen",
  },
  {
    coordinates: [6.69841, -1.68094],
    title: "Uncompleted auditorium",
    buttonId: "uncom-auditorium-btn",
    popupText: uncompAuditoriumPopupTxt,
  },
  {
    coordinates: [6.69797, -1.68023],
    title: "New building",
    buttonId: "new-buildinglh-btn",
    popupText: "autonomyCard",
  },
  {
    coordinates: [6.70058, -1.67685],
    title: "Autonomy hall",
    buttonId: "autonomy-hall-btn",
    popupText: autonomyPopuptxt,
  },
  {
    coordinates: [6.69804, -1.68066],
    title: "Acounts Office",
    buttonId: "acount-office-btn",
    popupText: "Account office",
  },

  {
    coordinates: [6.70119, -1.68301],
    title: "NFB",
    buttonId: "NFB-btn",
    popupText: "New foculty building",
  },
  {
    coordinates: [6.7021, -1.68254],
    title: "NLB",
    buttonId: "NLB-btn",
    popupText: "New library building",
  },
  {
    coordinates: [6.69777, -1.68092],
    title: "Computer lab one",
    buttonId: "computer-lab1-btn",
    popupText: "Computer lab one",
  },
  {
    coordinates: [6.69777, -1.68092],
    title: "Computer lab two",
    buttonId: "computer-lab2-btn",
    popupText: "Computer lab two",
  },
  {
    coordinates: [6.69659, -1.67957],
    title: "Atwima hall",
    buttonId: "atwima-hall-btn",
    popupText: atwimahallPopupTxt,
  },
  // Add more coordinate sets and button IDs as needed 6.70217,-1.68257
];

function setupMarkerAndFly(coordinates, buttonId, speed, popupText) {
  const marker = L.marker(coordinates).addTo(map);
  const popup = L.popup({ closeButton: true }).setContent(popupText);

  function flyToCoordinates() {
    map.flyTo(coordinates, 19, {
      duration: speed,
    });
    // Find the marker associated with the provided buttonId
    const marker = searchMarkers.find(
      (marker) => marker.options.title === buttonId
    );

    // Open the popup for the marker
    if (marker) {
      marker.openPopup();
    }
  }

  marker.bindPopup(popup).openPopup();

  document.getElementById(buttonId).addEventListener("click", flyToCoordinates);

  marker.on("click", function () {
    marker.openPopup();
  });
}

const searchMarkers = []; // Initialize an empty array to store search markers

coordinatesData.forEach(function (data) {
  setupMarkerAndFly(
    data.coordinates,
    data.buttonId,
    0.5,
    data.popupText,
    searchMarkers
  );
});

coordinatesData.forEach(function (data) {
  const marker = L.marker(data.coordinates, { title: data.title }).addTo(map);
  const popup = L.popup({ closeButton: true }).setContent(data.popupText);
  marker.bindPopup(popup);
  searchMarkers.push(marker);
});

// Create the search control
const searchBar = L.control
  .pinSearch({
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
          duration: 0.5,
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
  })
  .addTo(map);

import 'bootstrap/dist/css/bootstrap.css';
// import 'leaflet/dist/leaflet.css';
import 'leaflet.pinsearch/src/Leaflet.PinSearch.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-slidemenu/src/L.Control.SlideMenu.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import 'leaflet-openweathermap/leaflet-openweathermap.css';
// import '../css/social.css'; 
import './src/css/social.css'
import './src/css/style.css'

// import '../css/style.css'; 

// Import JavaScript libraries
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'leaflet/dist/leaflet.js';
import 'leaflet.pinsearch/src/Leaflet.PinSearch.js';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.min.js';
import 'leaflet-slidemenu/src/L.Control.SlideMenu.js';
import '@bagage/leaflet.restoreview/leaflet.restoreview.js';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.js';
import 'leaflet-openweathermap/leaflet-openweathermap.js';

// Import custom scripts
import { coordinatesData } from "./src/js/Data.js";
import searchBar from "./src/js/pinsearch.js";

// Create a Leaflet map
const map = L.map("map", {
  center: [6.7004, -1.6811],
  zoom: 1,
  zoomControl: false,
});

// Reusable function for adding tile layers
function addTileLayer(url, attribution) {
  return L.tileLayer(url, { attribution, maxZoom: 19 }).addTo(map);
}

// Define tile layer URLs and attributions
const osmLayer = addTileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
);

const esriWorldImageryLayer = addTileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  "© Esri"
);

const baseMaps = {
  osmLayer,
  esriWorldImageryLayer,
};

// Create a function to handle location errors
function onLocationError(e) {
  alert("Error getting your location: " + e.message);
}

// Create the locate control with the error handler function
const locateControl = L.control
  .locate({
    position: "bottomright", // Position of the control on the map
    showCompass: true, // Display a compass icon (if supported)
    drawCircle: true, // Draw a circle around the user's location
    drawMarker: true, // Draw a marker at the user's location
    onLocationError: onLocationError, // Function to handle location errors
    locateOptions: {
      enableHighAccuracy: true, // Request high accuracy from the GPS
      setView: true, // Center the map on the user's location
    },
  })
  .addTo(map);

const createRoutingControl = () => {
  return L.Routing.control({
    waypoints: [L.latLng(6.6993, -1.68009), L.latLng(6.7004, -1.68215)],
    routeWhileDragging: false,
    createMarker: function (i, waypoint, n) {
      const label = i === 0 ? "start location" : "Destination"; // Assign 'A' to the start and 'B' to the destination
      return L.marker(waypoint.latLng)
        .bindTooltip(label, {
          permanent: true,
          direction: "right",
        })
        .openTooltip();
    },
  }).addTo(map);
};

const routingControl = createRoutingControl(); // Initialize the routing control initially

const createButton = (label, container) => {
  const btn = L.DomUtil.create("button", "", container);
  btn.setAttribute("type", "button");
  btn.innerHTML = label;
  btn.style.margin = "3px 0";
  btn.style.borderRadius = "10px";
  return btn;
};

let clickCount = 0;
map.on("click", function (e) {
  const container = L.DomUtil.create("div");
  container.style.display = "flex";
  container.style.flexDirection = "column"; // Corrected to "column"

  if (clickCount % 2 === 0) {
    const startBtn = createButton("Start from this location", container);
    L.DomEvent.on(startBtn, "click", function () {
      routingControl.spliceWaypoints(0, 1, e.latlng);
      map.closePopup();
    });
  } else {
    const destBtn = createButton("Go to this location", container);
    L.DomEvent.on(destBtn, "click", function () {
      routingControl.spliceWaypoints(
        routingControl.getWaypoints().length - 1,
        1,
        e.latlng
      );
      map.closePopup();
    });
  }
  L.popup().setContent(container).setLatLng(e.latlng).openOn(map);
  clickCount++;
});

const layerControl = L.control.layers(baseMaps).addTo(map);

// // Add weather control to the map
// document.addEventListener("DOMContentLoaded", () => {
//   // Initialize weather control with options
  

//   const API_KEY = "43ddd296d66e7cc444c5105a82a6abe5"
//   // add the weather control
//   L.control.weather({
//     apikey: {API_KEY},
//     lang: "es",
//     units: "metric"
//   }).addTo(map);



// Optional: Add weather control to the map (if using leaflet-openweathermap)
// document.addEventListener('DOMContentLoaded', () => {
//   const weatherControl = L.control.weather({
//     apiKey: '43ddd296d66e7cc444c5105a82a6abe5', // Replace with your API key
//     lang: 'en',
//     units: 'metric',
//   });
//   weatherControl.addTo(map);


//   // Check if the control has been added
//   console.log("Weather control added:", weatherControl);
// });

// ALERT TO BE IMPLEMENTED LATER

// Function to show the Bootstrap alert and make it disappear after 2 seconds
// function showAlert() {

//   // Show the Bootstrap alert
//   document.getElementById('customAlert');

//   // Set a timeout to hide the alert after 2000 milliseconds (2 seconds)
//   setTimeout(function() {
//     // Hide the alert
//     document.getElementById('customAlert').style.display = 'none';
//   }, 4000);
// }

// // Call the function when the page loads (you can call it based on an event like button click, etc.)
// showAlert();

// Social medial links
const twitterLink =
  '<div class="child child-1"><a href="https://x.com/aamusted_gh" target="_blank" class="button btn-1"><button class="button btn-1"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="#1e90ff"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg></button></a></div>';

const instagramLink =
  '<div class="child child-2"><a href="https://www.instagram.com/aamusted_gh?igsh=MWhzemE0aW5hcGUzOQ==" target="_blank" class="button btn-2"><button class="button btn-2"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#ff00ff"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg></button></a></div>';

const githubLink =
  '<div class="child child-3"><button  class="button btn-3"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg></button></div>';

const facbookLink =
  '<div class="child child-4"><a href="https://www.facebook.com/Aamustedgh" target="_blank" class="button btn-4"><button class="button btn-4"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" fill="#4267B2"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg></button></a></div>';

//social media links all
//writing this code is was biggest archievement througout the project
const allLinks =
  '<div class="parent">' +
  twitterLink +
  instagramLink +
  // githubLink +
  facbookLink +
  "</div>";

const deanFTEListItem = `<button type="button" id="dean-faculty-of-tech-edu-btn" class="list-group-item list-group-item-action">Dean Faculty of Technical Education (FTE)</button>`;

const accountOfficeListItem = `<button type="button" id="account-office-btn" class="list-group-item list-group-item-action">Account office</button>`;
const FBR7ListItem = `<button type="button" id="fbr7-btn" class="list-group-item list-group-item-action">FBR 7</button>`;

const FBR9ListItem = `<button type="button" id="fbr9-btn" class="list-group-item list-group-item-action">FBR 9</button>`;

const FBR10ListItem = `<button type="button" id="fbr10-btn" class="list-group-item list-group-item-action">FBR 10</button>`;

//Acoordion Item
const officesAcordionItem = `<h2 class="header collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">OFFICES</h2><span class="uw-slant"></span><div class="accordion-item"><div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample"><div class="accordion-body"><div class="list-group">${accountOfficeListItem}${deanFTEListItem}${FBR9ListItem}${FBR10ListItem}<button type="button" class="list-group-item list-group-item-action">A third button item</button><button type="button" class="list-group-item list-group-item-action">A fourth button item</button><button type="button" class="list-group-item list-group-item-action" disabled>A disabled button item</button></div></div></div></div>`;

//accordion item 2

const kesewaaHostelListItem = `<button type="button" id="kesewaa-btn" class="list-group-item list-group-item-action">Kesewaa hostel</button>`;

const hostelsAccordionItem = `<h2 class="header collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">HOSTELS</h2><span class="uw-slant"></span><div class="accordion-item"><div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample"><div class="accordion-body"><div class="list-group">${kesewaaHostelListItem}<button type="button" class="list-group-item list-group-item-action">A second item</button><button type="button" class="list-group-item list-group-item-action">A third button item</button><button type="button" class="list-group-item list-group-item-action">A fourth button item</button><button type="button" class="list-group-item list-group-item-action" disabled>A disabled button item</button></div></div></div></div>`;

const ROBListItem = `<button type="button" id="rob-btn" class="list-group-item list-group-item-action">ROB</button>`;

const computerLabOneListItem = `<button type="button" id="computer-lab-one-btn" class="list-group-item list-group-item-action">Computer lab one</button>`;

const gradateLectureBlockListItem = `<button type="button" id="graduate-lecture-block-btn" class="list-group-item list-group-item-action">Graduate lecture block</button>`;

const opokuWareHallListItem = `<button type="button" id="opoku-ware-btn" class="list-group-item list-group-item-action"aria-current="true">Opoku ware hall</button>`;

const opokuWareMosqueListItem = `<button type="button" id="opoku-ware-mosqueBtn"class="list-group-item list-group-item-action">Opoku ware mosque</button>`;

const canteenListItem = `<button type="button" id="canteen-btn"class="list-group-item list-group-item-action">Canteen</button>`;

const uncompletedAuditoriumListItem = `<button type="button" id="uncom-auditorium-btn"class="list-group-item list-group-item-action">Uncompleted auditorium</button>`;

const autonomyHallListItem = `<button type="button" id="autonomy-hall-btn"class="list-group-item list-group-item-action">Autonomy hall</button>`;

const atwimaHallListItem = `<button type="button" id="atwima-hall-btn" class="list-group-item list-group-item-action">Atwima hall</button>`;

const fasmeListItem = `<button type="button" id="fasme-btn" class="list-group-item list-group-item-action">Faculty of Applied Science and Mathematics Education(FASME)</button>`;

const tourismHospitalityLabListItem = `<button type="button" id="hospitality-tourism-btn" class="list-group-item list-group-item-action">Tourism and Hospitality Lab</button>`;

const newAuditoriumListItem = `<button type="button" id="new-auditorium-btn" class="list-group-item list-group-item-action">New auditorium</button>`;

const mechanicalWorkshopListItem = `<button type="button" id="mechenical-workshop-btn" class="list-group-item list-group-item-action">Machenical workshop</button>`;

const constructionLab = `<button type="button" id="construction-lab-btn" class="list-group-item list-group-item-action">Construction Lab</button>`;

const frankyJayListItem = `<button type="button" id="franky-jay" class="list-group-item list-group-item-action">Franky Jay</button>`;

const automotiveWorkshopListItem = `<button type="button" id="automotive-workshop" class="list-group-item list-group-item-action">Automotive workshop</button>`;

const stWilliamsItemList = `<button type="button" id="st-wiliams-btn" class="list-group-item list-group-item-action">St williams Chaplaincy</button>`;

const kwamanmanListItem = `<button type="button" id="kwamanman-rural-bank" class="list-group-item list-group-item-action">Kwamanman</button>`;

const facultyOfTechEduListItem = `<button type="button" id="faculty-of-tech-edu-btn" class="list-group-item list-group-item-action">Faculty of Technical Education (FTE)</button>`;

const administrationListItem = `<button type="button" id="administration-btn" class="list-group-item list-group-item-action">Administration</button>`;

// Buildings Accordion
const buildingsAccordionItem = `<div class="accordion-item"><h6 class="header collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree"aria-expanded="false" aria-controls="flush-collapseThree">BUILDINGS</h6><span class="uw-slant"></span><div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree"data-bs-parent="#accordionFlushExample"><div class="accordion-body"><div class="list-group">${administrationListItem}${opokuWareHallListItem}${opokuWareMosqueListItem}${canteenListItem}${uncompletedAuditoriumListItem}${autonomyHallListItem}${atwimaHallListItem}${automotiveWorkshopListItem}${newAuditoriumListItem}${mechanicalWorkshopListItem}${constructionLab}${frankyJayListItem}${constructionLab}${frankyJayListItem}${stWilliamsItemList}${kwamanmanListItem}${facultyOfTechEduListItem}</div></div></div></div>`;

// Lecture Halls Accordion item
const letureHallsAccordionItem = `<h6 class="header collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">LECTURE HALLS</h6><div class="accordion-item"><span class="uw-slant"></span><div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"data-bs-parent="#accordionFlushExample"><div class="accordion-body"><div class="list-group">${ROBListItem}${computerLabOneListItem}${gradateLectureBlockListItem}<button type="button" id="new-buildinglh-btn" class="list-group-item list-group-item-action">New building</button><button type="button" id="NFB-btn" class="list-group-item list-group-item-action">New faculty building</button><button type="button" id="NLB-btn" class="list-group-item list-group-item-action">New library building</button><button type="button" id="computer-lab2-btn" class="list-group-item list-group-item-action">Computer lab two</button><button type="button" id="hospitality-dep-btn" class="list-group-item list-group-item-action">Hospitality department</button></div></div></div></div>`;

const aamustedWorkshopListItem = `<button type="button" id="aamusted-workshop" class="list-group-item list-group-item-action">AAMUSTED workshop</button>`;

const sideMenuAccordion = `
  <div class="accordion accordion-flush" id="accordionFlushExample">
    ${buildingsAccordionItem}${officesAcordionItem}${letureHallsAccordionItem}${hostelsAccordionItem}
  </div>
`;

const imageSection = `<div class="container-fluid"><div class="row"> <h1 id="title">AAMUSTED NAVIGATION</h1> <span id="title-slant" class="uw-slant-large"></span><div class="col"><img src="/images/cropped-AAMUSTED-LOGO.jpg" class="img-fluid" alt="aamusted logo"/></div></div></div>`;

const terms = `<div class="list-group" id="terms"><a style="color: #FFFFFF; text-decoration:underline;" href="./public/Terms-of-Service/">Terms of Service</a><span style="color: #FFFFFF; text-decoration:underline;">|</span><a style="color: #FFFFFF; text-decoration:underline;" href="./public/Cookie-Policy/">Cookie Policy</a</div>`;

var slideMenu = L.control
  .slideMenu(imageSection + sideMenuAccordion + allLinks + terms, {
    position: "topleft",
    width: "240px",
    height: "88%",
  })
  .addTo(map);

// Array to store the markers
let searchMarkers = [];

// Add markers and popups to the map
coordinatesData.forEach(function (data) {
  const marker = L.marker(data.coordinates, { title: data.title }).addTo(map);
  const popup = L.popup({ closeButton: true }).setContent(data.popupText);
  marker.bindPopup(popup);
  searchMarkers.push(marker); // Ensure each marker is added to searchMarkers
});

// Function to fly to coordinates and open the marker popup
function flyToCoordinates(buttonId) {
  const marker = searchMarkers.find(
    (marker) => marker.options.title === buttonId
  );

  if (marker) {
    const markerLatLng = marker.getLatLng();
    // Fly to the marker coordinates and open the popup
    map.flyTo(markerLatLng, 19, {
      maxZoom: 19,
      duration: 0.5,
      animate: true,
    });
    marker.openPopup();
  }
}

// Add event listeners to the buttons in the accordion
coordinatesData.forEach(function (data) {
  const button = document.getElementById(data.buttonId);
  if (button) {
    button.addEventListener("click", function () {
      flyToCoordinates(data.title);
    });
  }
});

// Create and add the search control to the map
const searchControl = searchBar(map, searchMarkers);
searchControl.addTo(map);

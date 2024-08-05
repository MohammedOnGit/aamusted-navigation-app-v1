
function showOfflineAlert() {
  // Show the Bootstrap alert
  const alertElement = document.getElementById("offline-alert");
  alertElement.style.display = "block";

  // Set a timeout to hide the alert after 2000 milliseconds (2 seconds)
  setTimeout(function () {
    // Hide the alert
    alertElement.style.display = "none";
  }, 5000);
}
// Event listener for when the document is ready
document.addEventListener("DOMContentLoaded", function () {
  // Listen for online and offline events
  window.addEventListener("offline", showOfflineAlert);
});

// Function to display an online message
function showOnlineAlert() {
  // Show the Bootstrap alert
  const alertElement = document.getElementById("online-alert");
  alertElement.style.display = "block";

  // Set a timeout to hide the alert after 2000 milliseconds (2 seconds)
  setTimeout(function () {
    // Hide the alert
    alertElement.style.display = "none";
  }, 5000);
}

// Function to reload the page
function reloadPage() {
  setTimeout(function () {
    // Reload the page
    window.location.reload();
  }, 5000);
}

// Listen for online and offline events
window.addEventListener("offline", showOfflineAlert);

// Listen for online and offline events
window.addEventListener("online", function () {
  // Show online message after a delay
  setTimeout(function () {
    showOnlineAlert();
    // Reload the page
    reloadPage();
  }, 3000); // Adjust the delay time as needed
});

// Handle tile layer errors
function handleTileError(layer) {
  layer.on("tileerror", function (e) {
    const attribution = layer.options.attribution;
    console.error(`Error loading ${attribution} tile:`, e.error.target.src);
    const userChoice = window.confirm(
      `Error loading ${attribution} tiles. Do you want to reload the page?`
    );
    if (userChoice) {
      reloadPage(); // Reload the page
    }
  });
}
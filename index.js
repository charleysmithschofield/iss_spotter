
// Require fetchMyIP from the iss.js file
const { fetchMyIP } = require('./iss');

// Call fetchMyIp function
fetchMyIP((error, ip) => {
  // Check if there was an error
  if (error) {
    // Log error message and error
    console.log("It didn't work!", error);
    return;
  }
  // if no error, return success message and ip
  console.log('It worked! Returned IP:', ip);
});


// Require fetchCoordsByIP from iss.js file
const { fetchCoordsByIP } = require('./iss');

// Call fetchCoordsByIP function with the IP address
fetchCoordsByIP('50.117.138.58', (error, coordinates) => {
  // Check if there was an error
  if (error) {
    // Log an error message and the error
    console.log("Fetching coordinates didnt work!", error);
    return;
  }
  // If no error, log a message and the data (coordinates)
  console.log("It worked! Returned coordinates:", coordinates);
});
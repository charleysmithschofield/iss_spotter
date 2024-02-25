
const { nextISSTimesForMyLocation } = require('./iss');

/**
 * Input:
 *   Array of data objects defining the next fly-overs of the ISS.
 *   [ { risetime: <number>, duration: <number> }, ... ]
 * Returns:
 *   undefined
 * Sideffect:
 *   Console log messages to make that data more human readable.
 *   Example output:
 *   Next pass at Mon Jun 10 2019 20:11:44 GMT-0700 (Pacific Daylight Time) for 468 seconds!
 */

// Define a function called printPassTimes that takes the passTimes as its argument
const printPassTimes = function(passTimes) {
  // Use a for..of loop to iterate through the passTimes
  for (const pass of passTimes) {
    // set the datetime to January 1st
    const datetime = new Date(0);
    // Set the seconds portion of the date tot he value of pass.risetime
    datetime.setUTCSeconds(pass.risetime);
    // Extract the duration of the pass fromt he pass object
    const duration = pass.duration;
    // Log the date and duration of the next pass to the console
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});

// ALL OF THE COMMENTED OUT CODE BELOW IS SUMMED UP IN THE CODE ABOVE:

// // Call fetchMyIp function
// fetchMyIP((error, ip) => {
//   // Check if there was an error
//   if (error) {
//     // Log error message and error
//     console.log("It didn't work!", error);
//     return;
//   }
//   // if no error, return success message and ip
//   console.log('It worked! Returned IP:', ip);
// });


// // Require fetchCoordsByIP from iss.js file
// const { fetchCoordsByIP } = require('./iss');

// // Call fetchCoordsByIP function with the IP address
// fetchCoordsByIP('50.117.138.58', (error, coordinates) => {
//   // Check if there was an error
//   if (error) {
//     // Log an error message and the error
//     console.log("Fetching coordinates didnt work!", error);
//     return;
//   }
//   // If no error, log a message and the data (coordinates)
//   console.log("It worked! Returned coordinates:", coordinates);
// });


// // Require fetchISSFlyOverTimes from iss.js file
// const { fetchISSFlyOverTimes } = require('./iss');

// // Define the coordinates that we previous got from the fetchCoordsByIP function
// const coordinates =  { latitude: 60.7211871, longitude: -135.0568449 };

// // Call fetchISSFlyOverTimes with the coordinated
// fetchISSFlyOverTimes(coordinates, (error, flyOverTimes) => {
//   // Check if there was an error
//   if (error) {
//     // log the error
//     console.log("Error fetching ISS fly over times:", error);
//     return;
//   }
//   // If there was no error, log the ISS fly over times
//   console.log("ISS fly over times:", flyOverTimes);
// });

// index.js
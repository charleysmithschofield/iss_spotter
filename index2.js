
// require the printPassTimes function
const { printPassTimes } = require('.');
// require the nextISSTimesForMyLocation
const { nextISSTimesForMyLocation } = require('./iss_promised');


// Call the nextISSTimesForMyLocation() function
nextISSTimesForMyLocation()
  // If the promise is fulfilled, execute the following code
  .then((passTimes) => {
    // Call the printPassTimes function with the passtimes data received from the resolved promise
    printPassTimes(passTimes);
  })
  // If the promise is rejected, execute the following code
  .catch((error) => {
    // Log the error message including the error's message
    console.log("It didn't work: ", error.message);
  });
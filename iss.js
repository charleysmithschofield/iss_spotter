/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *  - A callback (to pass back an error or the IP string)
 * Returns (via Callback)
 *  - An error, if any (nullable)
 *  - The IP address as a string (null if error). Example: "162.245.144.188"
*/

// Require the request module
const request = require('request');

// Define fetchMyIp function that takes in a callback as its argument
const fetchMyIP = function(callback) {
  // Use request to fetch IP address from JSON API
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    // Check if there was an error during the request
    if (error) return callback(error, null);

    // Check if the statusCode is not equal to 200 (OK)
    if (response.statusCode !== 200) {
      // Create an error object with details about the statusCode and pass it back via the callback function
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    // If everything is successful, extract the IP address from the response body and pass it to the callback
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */

// Define the fetchCoordsByIP with ip and callback as its arguments
const fetchCoordsByIP = function(ip, callback) {
  // use request to fetch IP address from
  request(`http://ipwho.is/${ip}`, (error, response, body) => {

    // if there was an error
    if (error) {
      // Send the error and a null callback into the callback
      callback(error, null);
      return;
    }

    // Parse the response body
    const parsedBody = JSON.parse(body);

    // Check if anything failed
    if (!parsedBody.success) {
      // Initialize a variable for a message to use if anything failed
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      // If anything failed, return a new Error object with a message and pass it to the callback with null.
      callback(Error(message), null);
      return;
    }

    // Include the latitude and longitude in the API response
    const { latitude, longitude } = parsedBody;

    callback(null, {latitude, longitude});
  });
};


/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const fetchISSFlyOverTimes = function(coords, callback) {
  // Initialize a variable for the URL of the ISS API
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  // request the URL
  request(url, (error, response, body) => {
    // if there was an error
    if (error) {
      // pass the error and null to the callback
      callback(error, null);
      return;
    }

    // if the statusCode is not equal to 200 (aka OK)
    if (response.statusCode !== 200) {
      // Create an error object with details about the statusCode
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    // If no error, parse the response body
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};


/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */

// Define the nextISSTimesForMyLocation function
const nextISSTimesForMyLocation = function(callback) {
  // First, call the fetchMyIP function to retrieve the user's IP address
  fetchMyIP((error, ip) => {
    // Check if there was an error
    if (error) {
      // If there was an error, return the error and a null IP address via the callback function
      return callback(error, null);
    }

    // Second, call the fetchCoordsByIP function to retrieve the latitude and longitude that corresponds with the user's IP address
    fetchCoordsByIP(ip, (error, location) => {
      // Check if there was an error
      if (error) {
        // If there was an error, return the error and null for the location via the callback function
        return callback(error, null);
      }

      // Third, call the fetchISSFlyOverTimes function to retrieve the ISS fly over times
      fetchISSFlyOverTimes(location, (error, nextPasses) => {
        // Check if there was an error
        if (error) {
          // If there was an error, return the error, and null for the ISS fly over times via the callback
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

// Export only the nextISSTimesForMyLocation because the other three functions no longer need to be exported
module.exports = { nextISSTimesForMyLocation };
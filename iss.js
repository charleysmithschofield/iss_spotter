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
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    // check if there was an error, return the error and a null ip address
    if (error) return callback(error, null);

    // if the statusCode is not equal to 200 (aka OK)
    if (response.statusCode !== 200) {
      
      // Create a new Error object with a message containing the statusCode, and pass it to the callback with null.
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }

    // If everything is successful, extract the IP address from the response body and pass it to the callback
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

// Define the fetchCoordsByIP
const fetchCoordsByIP = function(ip, callback) {
  // use request to fetch IP address from
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    // if there was an error, return the error and a null IP address
    if (error) return callback(error, null);
      
    // if the statusCode is not equal to 200 (aka OK)
    if (response.statusCode !== 200) {
      
      // Create a new Error object with a message containing the statusCode, and pass it to the callback with null.
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }

    // Parse the response body
    const parsedBody = JSON.parse(body);

    // Check if anything failed
    if (!parsedBody.success) {
      // Initialize a variable for a message to use if anything failed
      const msg = `Failed to get geographical location for IP. Error:, ${parsedBody.message}`;
      // If anything failed, return a new Error object with a message and pass it to the callback with null.
      return callback(Error(msg), null);
    }
    // Include the latitude and longitude in the API response
    const { latitude, longitude } = parsedBody;

    callback(null, { latitude, longitude });
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

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
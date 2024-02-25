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

// Defin fetchMyIp function that takes in a callback as its argument
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


    // If everything is successful, extract the IP sddress from the response body and pass it to the callback
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

module.exports = { fetchMyIP };
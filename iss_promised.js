
// Require request-promise-native
const request = require('request-promise-native');

// We will still refer to this function as request instead of a convoluted name like requestPromiseNative.

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
*/

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

/*
* Makes a request to ipwho.is using the provided IP address to get its geographical information (latitude/longitude)
* Input: JSON string containing the IP address
* Returns: Promise of request for lat/lon
*/

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};

/*
* Makes a request to https://iss-flyover.herokuapp.com using the provided IP address to get its ISS fly over times
* Input: JSON body containing geo data response from ipwho.is
* Returns: Promise of request for fly over data, returned as JSON string
*/

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

/*
 * Input: None
 * Returns: Promise for fly over data for users location
*/

// Define the nextISSTimesForMyLocation function
const nextISSTimesForMyLocation = function(callback) {
  // Fetch the IP address
  return fetchMyIP()
  // Once the IP has been fetched, .then() method fetch the coordinates (latitude and longitude)
    .then(fetchCoordsByIP)
    // Once the coordinates have been fetched, .then() method fetch the ISS fly over times
    .then(fetchISSFlyOverTimes)
    // Once we have the fly over times, .then() parse JSON response (converts from JSON string to object)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };
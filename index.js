
// Require fetchMyIP from the iss.js file
const { fetchMyIP } = require('./iss');


fetchMyIP((error, ip) => {
  // check if there was an error
  if (error) {
    // log error message and error
    console.log("It didn't work!", error);
    return;
  }
  // if no error, return success message and ip
  console.log('It worked! Returned IP:', ip);
});
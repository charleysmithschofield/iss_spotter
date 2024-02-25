# ISS Spotter

We'll build a cool little app for space enthusiasts who are interested in spotting the International Space Station (ISS). 

The ISS completes multiple revolutions around Earth per day. 

In fact, it passes overhead every ~90 minutes, and in some cases can even be spotted with the naked eye, though not every time.

## The Approach
We'll be making API requests to three different services to solve this problem.

  1. Fetch our IP Address.

  2. Fetch the geo coordinates (Latitude & Longitude) for our IP.

  3. Fetch the next ISS flyovers for our geo coordinates.
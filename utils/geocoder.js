const NodeGeocoder = require('node-geocoder');
require('dotenv').config();

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
}

const geoCoder = NodeGeocoder(options);

module.exports = geoCoder;
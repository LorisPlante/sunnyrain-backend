const mongoose = require("mongoose");

const openSchema = mongoose.Schema({
  lat: Number,
  lon: Number,
  date: String,
  time: String,
  temp: Number,
  ressenti: Number,
  desc: String,
  city: String,
  speed: Number,
  humidity: Number,
  pression: Number,
  sunrise: String,
  sunset: String,
});

module.exports = mongoose.model("openWeather", openSchema);

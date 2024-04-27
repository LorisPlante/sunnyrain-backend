const axios = require("axios");
const Open = require("../models/open_model");
const User = require("../models/user_model");

exports.getLoc = async (req, res) => {
  try {
    console.log("getLoc");
    const open = await Open.find();
    // console.log(open);
    return res.status(200).json(open);
  } catch (error) {
    return res.status(500).json({ error: "Impossible de récupérer les données" });
  }
};

exports.saveOrGet = async (req, res) => {
  const body = req.body;
  // console.log(body);
  // console.log(body.lat);

  if (body.lat && body.lon && body.email) {
    const API_KEY = process.env.OPEN_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${body.lat}&lon=${body.lon}&units=metric&lang=fr&appid=${API_KEY}`;

    const apiResponse = await axios.post(url);
    const data = apiResponse.data;
    // console.log(data);

    const open = new Open({
      lat: body.lat,
      lon: body.lon,
      date: new Date().toLocaleDateString("fr").toString(),
      time: new Date().toLocaleTimeString("fr").toString(),
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
      temp: data.main.temp,
      ressenti: data.main.feels_like,
      desc: data.weather[0].description,
      city: data.name,
      speed: (data.wind.speed * 3.6).toFixed(2),
      humidity: data.main.humidity,
      pression: data.main.pressure,
    });

    await open.save();
    res.status(201).json(open);
  } else {
    return res.status(400).json({ error: "Données manquantes" });
  }
};

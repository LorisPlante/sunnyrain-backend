require("dotenv").config();
require("./config/connection");
const express = require("express");
const cors = require("cors");
const users = require("./routes/user_route");
const api = require("./routes/api_open_route");

const app = express();
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Backend connecté");
});

app.use("/user", users);
app.use("/api", api);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Serveur connecté");
});

module.exports = app;

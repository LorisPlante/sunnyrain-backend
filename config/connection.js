const mongoose = require("mongoose");
const connectionLink = process.env.CONNECTION_LINK;

mongoose
  .connect(connectionLink, { connectTimeoutMS: 2000 })
  .then(() => console.log("Base de données connectée"))
  .catch((error) => console.error(error));

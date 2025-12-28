const express = require("express");
const app = express();

app.use(express.json());

const deliveryRoutes = require("./routes/deliveryRoutes");
app.use("/api", deliveryRoutes);

app.get("/", (req, res) => {
  res.send("Last-Mile Delivery Backend is running");
});

module.exports = app;

const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const app = require("./app");
require("./db/db");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
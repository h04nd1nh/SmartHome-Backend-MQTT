const express = require("express");
const cors = require("cors");
const app = express();
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { Sequelize } = require('sequelize');
const dbconfig = require("./config/db.config");

// Connect to database
const db = require("./models");

db.sequelize.sync({ force: false }).then(() => {
    console.log("Connect to database successfully");
    // Init Database
    // initial();
});

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: "http://localhost:8080",
}));
app.use(morgan("common"));

app.get("/", (req, res) => {
    res.json({ message: "Mobile App Smart Home" });
  });
  
// routes
require("./routes/action_history.route")(app);
require("./routes/data_sensor.route")(app);




const PORT = process.env.PORT || 8989;
app.listen(PORT, () => {
    console.log(`Mobile App Smart Home is running on port ${PORT}.`);
  });
const config = require("../config/db.config.js");
const Sequelize = require("sequelize");


const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    port: config.POST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
    define: {
      timestamps: false,
    },
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.data_sensor = require("../models/data_sensor.model.js")(sequelize, Sequelize);
db.action_history = require("../models/action_history.model.js")(sequelize, Sequelize);


module.exports = db;
const { where } = require("sequelize");
const db = require("../models");
const { startOfDay, endOfDay } = require("date-fns");
const Op = db.Sequelize.Op;

const data_sensor = db.data_sensor;

exports.getNewData = async (req, res) => {
    try {
        const newData = await data_sensor.findOne({
            order: [['createdat', 'DESC']]
        });
        res.json(newData);
    } catch (error) {
        console.error("Error fetching new data:", error);
        res.status(500).json({ error: "Error fetching new data" });
    }
};

exports.getDayData = async (req, res) => {
    try {
        const currentDate = new Date();
        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
        const dayData = await data_sensor.findAll({
            where: {
                createdat: {
                    [Op.between]: [startOfDay, currentDate]
                }
            }
        });
        res.json(dayData);
    } catch (error) {
        console.error("Error fetching day data:", error);
        res.status(500).json({ error: "Error fetching day data" });
    }
};

exports.pushData = async (req, res) => {
    const { temperature, humidity, light } = req.body;
    try {
        const newData = await data_sensor.create({ temperature, humidity, light });
        res.status(201).json(newData);
    } catch (error) {
        console.error("Error pushing data:", error);
        res.status(500).json({ error: "Error pushing data" });
    }
};
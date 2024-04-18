const { where } = require("sequelize");
const db = require("../models");
const { startOfDay, endOfDay } = require("date-fns");
const Op = db.Sequelize.Op;


const action_history = db.action_history;

exports.action = async (req, res) => {
    const { device } = req.body;
    
    try {
        // Tìm bản ghi mới nhất của device trong bảng action_history
        const latestData = await action_history.findOne({
            where: { device },
            order: [['createdat', 'DESC']]
        });

        if (!latestData) {
            return res.status(404).json({ error: "Device not found" });
        }

        // Lấy hành động (action) của bản ghi mới nhất
        const currentAction = latestData.action;

        // Xác định hành động mới
        const newAction = currentAction === 'on' ? 'off' : 'on';

        // Cập nhật hành động mới vào bảng action_history
        await action_history.update(
            { action: newAction },
            { where: { device, id: latestData.id } }
        );

        res.status(200).json({ device, action: newAction });
    } catch (error) {
        console.error("Error performing action:", error);
        res.status(500).json({ error: "Error performing action" });
    }
};

exports.action_history = async (req, res) => {
    const { device } = req.body;

    try {
        // Lấy thời điểm bắt đầu và kết thúc của ngày hiện tại
        const todayStart = startOfDay(new Date());
        const todayEnd = endOfDay(new Date());

        // Tìm tất cả các bản ghi của device trong khoảng thời gian của ngày hiện tại
        const deviceActions = await action_history.findAll({
            where: {
                device,
                createdat: {
                    [Op.between]: [todayStart, todayEnd]
                }
            }
        });

        res.json(deviceActions);
    } catch (error) {
        console.error("Error fetching action history:", error);
        res.status(500).json({ error: "Error fetching action history" });
    }
};

exports.action_history_all = async (req, res) => {
    try {
        // Lấy thời điểm bắt đầu và kết thúc của ngày hiện tại
        const todayStart = startOfDay(new Date());
        const todayEnd = endOfDay(new Date());

        // Tìm tất cả các bản ghi trong khoảng thời gian của ngày hiện tại
        const allDeviceActions = await action_history.findAll({
            where: {
                createdat: {
                    [Op.between]: [todayStart, todayEnd]
                }
            }
        });

        res.json(allDeviceActions);
    } catch (error) {
        console.error("Error fetching action history for all devices:", error);
        res.status(500).json({ error: "Error fetching action history for all devices" });
    }
};

exports.state = async (req, res) => {
    const { device } = req.body;

    try {
        // Tìm bản ghi mới nhất của device trong bảng Action_history
        const latestAction = await action_history.findOne({
            where: { device },
            order: [['createdat', 'DESC']]
        });

        if (!latestAction) {
            return res.status(404).json({ error: "Device not found" });
        }

        // Lấy trạng thái hành động (action) mới nhất của device
        const state = latestAction.action;

        res.json({ device, state });
    } catch (error) {
        console.error("Error fetching state:", error);
        res.status(500).json({ error: "Error fetching state" });
    }
};
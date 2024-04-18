const controller = require("../controllers/action_history.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });


  app.post("/api/v1/data", controller.action);

  app.post("/api/v1/state", controller.state);

  app.post("/api/v1/history", controller.action_history);

  app.get("/api/v1/history_all", controller.action_history_all);
};
